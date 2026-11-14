// Build-time content validator. Runs before `astro build` and fails on broken references, unsourced or unverified claims,
// safety fields that are missing, and plan rules (session time, back-to-back heavy spinal loading).
// Run `npm run check:content -- --report` to print weekly volume per muscle for the main program.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';
import { estimateMinutes, peakSpinalLoad, SPINAL_RANK, sessionGaps, volumeStatus, weeklyVolume } from '../src/lib/plan.ts';

const root = new URL('../src/content/', import.meta.url).pathname;
const errors = [];
const warnings = [];
const fail = msg => errors.push(msg);
const warn = msg => warnings.push(msg);

const yamlList = async file => parse(await readFile(path.join(root, file), 'utf8')) ?? [];
const yamlDir = async dir => (await Promise.all((await readdir(path.join(root, dir))).filter(f => f.endsWith('.yml')).sort().map(f => yamlList(`${dir}/${f}`)))).flat();
const markdownDir = async dir => Promise.all((await readdir(path.join(root, dir))).filter(f => f.endsWith('.md')).sort().map(async f => {
  const text = await readFile(path.join(root, dir, f), 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  return { id: f.replace(/\.md$/, ''), ...parse(match[1]), body: match[2] };
}));

const groups = await yamlList('groups.yml');
const sources = await yamlList('sources.yml');
const claims = await yamlDir('claims');
const painRules = await yamlList('pain-rules.yml');
const muscles = await yamlDir('muscles');
const exercises = await yamlDir('exercises');
const programs = await yamlList('programs.yml');
const principles = await markdownDir('principles');
const cricket = await markdownDir('cricket');
const glossary = await yamlList('glossary.yml');

const idSet = list => {
  const set = new Set();
  for (const item of list.map(i => i.id)) {
    if (set.has(item)) fail(`Duplicate id: ${item}`);
    set.add(item);
  }
  return set;
};
const ids = {
  group: idSet(groups), source: idSet(sources), claim: idSet(claims), pain: idSet(painRules), muscle: idSet(muscles),
  exercise: idSet(exercises), program: idSet(programs), principle: idSet(principles), cricket: idSet(cricket),
};
const ref = (kind, value, where) => { if (!ids[kind].has(value)) fail(`${where}: unknown ${kind} "${value}"`); };

// Sources: DOI-backed entries must have been verified against Crossref.
for (const s of sources) {
  if (s.doi && !s.verifiedOn) fail(`Source ${s.id}: DOI has not been verified (run npm run verify:sources -- --write)`);
  if (!s.doi && !s.url) fail(`Source ${s.id}: needs a DOI or a URL`);
}
const usedSources = new Set();

// Claims: must be sourced; EMG-only evidence is capped at grade C.
for (const c of claims) {
  if (!c.sources?.length) fail(`Claim ${c.id}: no sources`);
  for (const s of c.sources ?? []) { ref('source', s, `Claim ${c.id}`); usedSources.add(s); }
  if (c.emgOnly && !['C', 'D'].includes(c.grade)) fail(`Claim ${c.id}: EMG-only evidence cannot be graded above C`);
  if (c.grade === 'Mixed' && !/(whereas|while|but|found|however|argues|concluded?)/i.test(c.statement)) warn(`Claim ${c.id}: a Mixed grade should state both sides`);
  if (c.sources.some(s => sources.find(x => x.id === s)?.type === 'preprint') && ['A', 'B'].includes(c.grade) && c.sources.length === 1) fail(`Claim ${c.id}: a preprint alone cannot support grade ${c.grade}`);
}
for (const g of groups) {
  for (const s of g.anatomySources ?? []) { ref('source', s, `Group ${g.id}`); usedSources.add(s); }
}
for (const s of sources) if (!usedSources.has(s.id) && s.id !== 'gray-1918') warn(`Source ${s.id} is not used by any claim or anatomy reference`);

// Muscles.
for (const m of muscles) {
  ref('group', m.group, `Muscle ${m.id}`);
  for (const x of m.synergists ?? []) ref('muscle', x, `Muscle ${m.id}`);
  for (const x of m.claims ?? []) ref('claim', x, `Muscle ${m.id}`);
}

// Exercises: safety fields, references, foundation rule, emphasis language.
const foundationAllowed = new Set(['gluteus-maximus', 'gluteus-medius-minimus', 'quadriceps', 'erector-spinae', 'multifidus', 'hamstrings']);
const emphasisWords = /\b(targets?|best for|most effective|optimal|superior|maximi[sz]es?)\b/i;
for (const e of exercises) {
  const where = `Exercise ${e.id}`;
  ref('group', e.group, where);
  ref('pain', e.painRule, where);
  for (const x of [...e.primary, ...(e.secondary ?? [])]) ref('muscle', x, where);
  for (const x of e.claims ?? []) ref('claim', x, where);
  for (const x of e.alternatives ?? []) ref('exercise', x, where);
  for (const v of e.variations ?? []) if (v.claim) ref('claim', v.claim, `${where} variation "${v.name}"`);
  if (!e.contraindications?.length) fail(`${where}: no contraindications`);
  if (!e.regression) fail(`${where}: no regression`);
  if (e.level === 'foundation' && !e.primary.every(m => foundationAllowed.has(m) || m === 'multifidus')) fail(`${where}: foundation level is only for squat, glute and lower-back work`);
  if (emphasisWords.test(e.summary) && !(e.claims ?? []).length) fail(`${where}: emphasis wording in summary without a claim`);
  for (const v of e.variations ?? []) if (v.emphasis && emphasisWords.test(v.emphasis) && !v.claim) fail(`${where} variation "${v.name}": emphasis wording without a claim`);
}
for (const m of muscles) if (!exercises.some(e => e.primary.includes(m.id) || e.secondary?.includes(m.id))) warn(`Muscle ${m.id}: no exercise trains it`);

// Principles, cricket.
for (const p of principles) {
  for (const x of p.claims ?? []) ref('claim', x, `Principle ${p.id}`);
  for (const x of p.related ?? []) ref('principle', x, `Principle ${p.id}`);
  for (const r of p.rules ?? []) if (r.claim) ref('claim', r.claim, `Principle ${p.id} rule`);
}
for (const c of cricket) {
  for (const x of c.claims ?? []) ref('claim', x, `Cricket ${c.id}`);
  for (const x of c.exercises ?? []) ref('exercise', x, `Cricket ${c.id}`);
  if (!c.researched && (c.exercises ?? []).length) fail(`Cricket ${c.id}: an unresearched stub cannot prescribe exercises`);
}

// Programs: references, time budget and spinal-load spacing.
const exMap = new Map(exercises.map(e => [e.id, e]));
const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
for (const p of programs) {
  const where = `Program ${p.id}`;
  for (const x of p.principles ?? []) ref('principle', x, where);
  const dayById = new Map(p.days.map(d => [d.id, d]));
  if (dayById.size !== p.days.length) fail(`${where}: duplicate day ids`);
  for (const d of p.days) {
    for (const m of d.muscles) ref('muscle', m, `${where} day ${d.id}`);
    for (const rx of [...(d.primer ?? []), ...d.exercises]) ref('exercise', rx.exercise, `${where} day ${d.id}`);
    const minutes = estimateMinutes(d);
    if (minutes > p.sessionMinutes) fail(`${where} day ${d.id}: estimated ${minutes} min exceeds the ${p.sessionMinutes} min budget`);
  }
  const scheduled = p.week.filter(w => w.dayId);
  if (p.week.length !== 7) fail(`${where}: week must list 7 days`);
  p.week.forEach((w, i) => { if (w.day !== dayNames[i]) fail(`${where}: week entry ${i} should be ${dayNames[i]}`); if (w.dayId && !dayById.has(w.dayId)) fail(`${where}: week references unknown day ${w.dayId}`); });
  if (scheduled.length !== p.daysPerWeek) fail(`${where}: daysPerWeek is ${p.daysPerWeek} but ${scheduled.length} days are scheduled`);
  if (new Set(scheduled.map(w => w.dayId)).size !== p.days.length) fail(`${where}: every day must be scheduled exactly once`);

  const peaks = p.week.map(w => (w.dayId ? peakSpinalLoad(dayById.get(w.dayId), exMap) : 'none'));
  peaks.forEach((peak, i) => {
    const next = peaks[(i + 1) % 7];
    if (SPINAL_RANK[peak] === 3 && SPINAL_RANK[next] === 3) fail(`${where}: high spinal loading on consecutive days (${dayNames[i]} and ${dayNames[(i + 1) % 7]})`);
  });

  if (process.argv.includes('--report')) {
    const vol = weeklyVolume(p.week.map((w, i) => (w.dayId ? { dayIndex: i, day: dayById.get(w.dayId) } : null)).filter(Boolean), exMap);
    console.log(`\n${p.name}`);
    for (const d of p.days) console.log(`  ${d.id}: ${estimateMinutes(d)} min, peak spinal ${peakSpinalLoad(d, exMap)}`);
    for (const v of [...vol.values()].sort((a, b) => b.direct - a.direct)) {
      console.log(`  ${v.muscle.padEnd(26)} direct ${String(v.direct).padStart(2)}  indirect ${String(v.indirect).padStart(2)}  eff ${v.effective.toFixed(1).padStart(4)}  ${volumeStatus(v.direct, v.effective).padEnd(8)} days ${v.sessions.map(i => dayNames[i].slice(0, 3)).join('/')} gaps ${sessionGaps(v.sessions).join(',')}`);
    }
  }
}

// British spelling in our own text (source titles keep their original spelling).
const american = /\b(stabiliz\w*|optimiz\w*|recogniz\w*|emphasiz\w*|minimiz\w*|maximiz\w*|color\w*|behavior\w*|favor\w*|center\w*|fiber\w*|gray's)\b/gi;
const ownText = JSON.stringify([groups, claims, painRules, muscles, exercises, programs, glossary]) + principles.map(p => JSON.stringify(p)).join('') + cricket.map(c => JSON.stringify(c)).join('');
for (const hit of new Set(ownText.match(american) ?? [])) warn(`American spelling "${hit}"`);

for (const w of warnings) console.warn(`warning: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`error: ${e}`);
  console.error(`\n${errors.length} content error(s).`);
  process.exit(1);
}
console.log(`Content OK: ${muscles.length} muscles, ${exercises.length} exercises, ${claims.length} claims, ${sources.length} sources, ${programs.length} programs, ${principles.length} principles, ${cricket.length} cricket pages.`);
