// Build-time content validator. Runs before `astro build` and fails on broken references, unsourced or unverified claims,
// safety fields that are missing, and plan rules (session time, back-to-back heavy spinal loading).
// Run `npm run check:content -- --report` to print weekly volume per muscle for the main program.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';
import { estimateMinutes, guideSessionMinutes, peakSpinalLoad, SPINAL_RANK, sessionGaps, volumeStatus, weeklyVolume } from '../src/lib/plan.ts';
import { exercisePose, validateAnimation } from '../src/scripts/core/exercise-math.ts';

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
const sections = await yamlList('sections.yml');
const guideGroups = await yamlDir('guides/groups');
const guideExercises = await yamlDir('guides/exercises');
const guidePlans = await yamlDir('guides/plans');
const corePhases = await yamlList('core/phases.yml');
const coreExercises = await yamlList('core/exercises.yml');
const animations = await yamlDir('animations');

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
  section: idSet(sections), guideGroup: idSet(guideGroups), guideExercise: idSet(guideExercises), guidePlan: idSet(guidePlans),
  coreExercise: idSet(coreExercises), corePhase: idSet(corePhases),
};
const ref = (kind, value, where) => { if (!ids[kind].has(value)) fail(`${where}: unknown ${kind} "${value}"`); };
const animationIds = idSet(animations);
const animationOrders = new Set();
for (const a of animations) {
  ref('exercise', a.exercise, `Animation ${a.id}`);
  if (a.id !== a.exercise) fail(`Animation ${a.id}: id must match its exercise reference`);
  if (!Number.isInteger(a.order) || a.order < 1 || animationOrders.has(a.order)) fail(`Animation ${a.id}: needs a unique positive order`);
  animationOrders.add(a.order);
  if (typeof a.description !== 'string' || a.description.length < 20) fail(`Animation ${a.id}: needs a movement text alternative`);
  const exercise = exercises.find(e => e.id === a.exercise);
  try {
    validateAnimation(a);
    for (let frame = 0; frame <= 64; frame++) {
      const pose = exercisePose(a, frame / 64);
      const points = [pose.hip, pose.shoulder, pose.head, ...pose.arms.flatMap(l => [l.start, l.joint, l.end]), ...pose.legs.flatMap(l => [l.start, l.joint, l.end]), ...pose.feet, ...pose.props.flatMap(p => [p.start, p.end])];
      if (points.some(p => !p.every(Number.isFinite))) throw new RangeError('Non-finite pose geometry.');
    }
  } catch (error) { fail(`Animation ${a.id}: ${error.message}`); }
}
for (const e of exercises) {
  if (!animationIds.has(e.id)) fail(`Exercise ${e.id}: missing movement illustration`);
}

// Sources: DOI-backed entries must have been verified against Crossref.
for (const s of sources) {
  ref('section', s.section ?? 'strength', `Source ${s.id}`);
  if (s.doi && !s.verifiedOn) fail(`Source ${s.id}: DOI has not been verified (run npm run verify:sources -- --write)`);
  if (!s.doi && !s.url) fail(`Source ${s.id}: needs a DOI or a URL`);
}
const usedSources = new Set();

// Claims: must be sourced; EMG-only evidence is capped at grade C.
for (const c of claims) {
  ref('section', c.section ?? 'strength', `Claim ${c.id}`);
  if (!c.sources?.length) fail(`Claim ${c.id}: no sources`);
  for (const s of c.sources ?? []) { ref('source', s, `Claim ${c.id}`); usedSources.add(s); }
  if (c.emgOnly && !['C', 'D'].includes(c.grade)) fail(`Claim ${c.id}: EMG-only evidence cannot be graded above C`);
  if (c.grade === 'Mixed' && !/(whereas|while|but|found|however|argues|concluded?)/i.test(c.statement)) warn(`Claim ${c.id}: a Mixed grade should state both sides`);
  if (c.sources.some(s => sources.find(x => x.id === s)?.type === 'preprint') && ['A', 'B'].includes(c.grade) && c.sources.length === 1) fail(`Claim ${c.id}: a preprint alone cannot support grade ${c.grade}`);
}
for (const g of groups) {
  for (const s of g.anatomySources ?? []) { ref('source', s, `Group ${g.id}`); usedSources.add(s); }
}
// Textbooks and guidelines are cited in page text rather than by a graded claim.
for (const s of sources) if (!usedSources.has(s.id) && s.id !== 'gray-1918' && !['textbook', 'guideline'].includes(s.type)) warn(`Source ${s.id} is not used by any claim or anatomy reference`);

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
  for (const rule of e.alsoPainRules ?? []) {
    ref('pain', rule, where);
    if (rule === e.painRule) fail(`${where}: alsoPainRules repeats the main pain rule "${rule}"`);
  }
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


// Sections: the registry behind the home tiles, navigation and footers.
for (const sec of sections) {
  const where = `Section ${sec.id}`;
  if (sec.status === 'live' && !sec.href) fail(`${where}: a live section needs an href`);
  for (const link of [...(sec.nav ?? []), ...(sec.footer ?? [])]) if (!link.href.startsWith('/')) fail(`${where}: link "${link.label}" must be a site path`);
}

// Guides (getting started, plyometrics): groups, exercises and plans.
const groupById = new Map(guideGroups.map(g => [g.id, g]));
const guideExerciseById = new Map(guideExercises.map(e => [e.id, e]));
const outcomePromises = /\b(burn fat|burns fat|tone up|toned|spot[- ]reduce|lose weight|weight loss|guaranteed?|sculpt\w*)\b/i;
// Injury promises are checked in claim statements and exercise text only: a caveat may say "does not show that it prevents injury".
const injuryPromises = /\b(prevents|prevented|heals|cures|injury[- ]proof|bulletproof)\b/i;
const guideSections = [...new Set(guideGroups.map(g => g.section))];

for (const g of guideGroups) {
  ref('section', g.section, `Guide group ${g.id}`);
  if (g.ladder && !g.test) fail(`Guide group ${g.id}: a ladder needs a placement test`);
}
for (const e of guideExercises) {
  const where = `Guide exercise ${e.id}`;
  const group = groupById.get(e.group);
  ref('section', e.section, where);
  ref('guideGroup', e.group, where);
  ref('pain', e.painRule, where);
  for (const rule of e.alsoPainRules ?? []) {
    ref('pain', rule, where);
    if (rule === e.painRule) fail(`${where}: alsoPainRules repeats the main pain rule "${rule}"`);
  }
  for (const field of ['steps', 'mistakes', 'contraindications', 'equipment']) if (!e[field]?.length) fail(`${where}: no ${field}`);
  for (const field of ['setup', 'regression', 'progression', 'muscles']) if (!e[field]) fail(`${where}: no ${field}`);
  if (group && group.section !== e.section) fail(`${where}: belongs to section ${e.section} but its group is in ${group.section}`);
  if (group?.ladder && !e.level) fail(`${where}: an exercise in a ladder needs a level`);
  if (group && !group.ladder && e.level) fail(`${where}: only ladder exercises have a level`);
  if (group && !group.ladder && !e.dose && !e.schedule?.length) fail(`${where}: needs a dose or a weekly schedule`);
  if (e.schedule) {
    // Foot contacts per session must never fall from one block of weeks to the next.
    e.schedule.reduce((prev, step) => { if (step.sets * step.reps < prev) fail(`${where}: schedule goes down at ${step.weeks}`); return step.sets * step.reps; }, 0);
  }
  if (injuryPromises.test(JSON.stringify(e))) fail(`${where}: makes an injury promise (${JSON.stringify(e).match(injuryPromises)[0]})`);
  if (outcomePromises.test(JSON.stringify(e))) fail(`${where}: makes an outcome promise (${JSON.stringify(e).match(outcomePromises)[0]})`);
  if (emphasisWords.test(e.muscles)) fail(`${where}: emphasis wording in "muscles" without a claim`);
}
const sourceById = new Map(sources.map(x => [x.id, x]));
const GRADE_RANK = { A: 4, B: 3, C: 2, D: 1, Mixed: 0 };
for (const c of claims.filter(x => guideSections.includes(x.section))) {
  if (outcomePromises.test(`${c.statement} ${c.caveats}`) || injuryPromises.test(c.statement)) fail(`Claim ${c.id}: makes an outcome promise`);
  // Observational, cross-sectional and narrative-review sources cannot support a trial-level grade (A or B).
  const types = c.sources.map(id => sourceById.get(id)?.type);
  if (types.every(t => ['cohort', 'cross-sectional'].includes(t)) && GRADE_RANK[c.grade] > GRADE_RANK.C) fail(`Claim ${c.id}: grade ${c.grade} rests only on observational sources (cap is C)`);
  if (types.every(t => t === 'review') && GRADE_RANK[c.grade] > GRADE_RANK.C) fail(`Claim ${c.id}: grade ${c.grade} rests only on narrative reviews (cap is C)`);
}
for (const g of guideGroups.filter(x => x.ladder)) {
  const levels = guideExercises.filter(e => e.group === g.id).map(e => e.level).sort((a, b) => a - b);
  if (!levels.length) fail(`Guide group ${g.id}: empty ladder`);
  else if (levels.some((level, i) => level !== i + 1)) fail(`Guide group ${g.id}: levels must be 1, 2, 3... (found ${levels.join(', ')})`);
  const first = guideExercises.find(e => e.group === g.id && e.level === 1);
  if (first?.optional && !g.requires) fail(`Guide group ${g.id}: level 1 must not need optional equipment (or set "requires" on the group)`);
}
// First skills are coaching convention: they must say so and be gated behind objective prerequisites.
// Any later stage (not the base plan, not foundations) is a progression that must be gated and flagged: first skills, cricket, and so on.
const GATED_PHASE = g => g.phase && !['base', 'foundations'].includes(g.phase);
for (const g of guideGroups.filter(GATED_PHASE)) {
  if (!g.convention) fail(`Guide group ${g.id}: a group in phase "${g.phase}" must be flagged convention: true`);
  if ((g.gates ?? []).length < 2) fail(`Guide group ${g.id}: a group in phase "${g.phase}" needs at least 2 gates`);
}

// A phase set on a plan should exist on at least one group of the same section, so a typo cannot hide a plan's content.
for (const plan of guidePlans.filter(x => x.phase)) {
  if (!guideGroups.some(g => g.section === plan.section && g.phase === plan.phase)) fail(`Guide plan ${plan.id}: no group in section ${plan.section} has phase "${plan.phase}"`);
}

for (const [label, list] of [['Source', sources], ['Claim', claims]]) {
  for (const item of list.filter(x => x.phase)) {
    if (!guideGroups.some(g => g.section === item.section && g.phase === item.phase)) fail(`${label} ${item.id}: no guide group in section ${item.section ?? 'strength'} has phase "${item.phase}"`);
  }
}

for (const plan of guidePlans) {
  const where = `Guide plan ${plan.id}`;
  ref('section', plan.section, where);
  const sessionIds = new Set(plan.sessions.map(sn => sn.id));
  if (sessionIds.size !== plan.sessions.length) fail(`${where}: duplicate session ids`);
  const items = [...plan.warmup.items ?? [], ...plan.sessions.flatMap(sn => sn.items)];
  for (const item of items) {
    if (Boolean(item.group) === Boolean(item.exercise)) { fail(`${where}: each item needs exactly one of group or exercise`); continue; }
    if (item.group) { ref('guideGroup', item.group, where); if (groupById.get(item.group)?.section !== plan.section) fail(`${where}: group ${item.group} is in another section`); }
    if (item.exercise) { ref('guideExercise', item.exercise, where); if (guideExerciseById.get(item.exercise)?.section !== plan.section) fail(`${where}: exercise ${item.exercise} is in another section`); }
  }
  // Everything in the section must be reachable: every ladder group, and every exercise that is not part of a ladder.
  const usedGroups = new Set(items.filter(i => i.group).map(i => i.group));
  const usedExercises = new Set(items.filter(i => i.exercise).map(i => i.exercise));
  for (const g of guideGroups.filter(x => x.section === plan.section && x.phase === plan.phase && x.ladder)) if (!usedGroups.has(g.id)) fail(`${where}: ladder ${g.id} is not used in any session`);
  for (const e of guideExercises.filter(x => x.section === plan.section && groupById.get(x.group)?.phase === plan.phase && !groupById.get(x.group)?.ladder)) if (!usedExercises.has(e.id)) fail(`${where}: exercise ${e.id} is not used in the plan`);

  const scheduledSessions = new Set();
  for (const week of plan.weeks) {
    const days = Object.keys(week.days);
    for (const day of days) {
      if (!dayNames.includes(day)) fail(`${where} ${week.label}: unknown day "${day}"`);
      if (!sessionIds.has(week.days[day])) fail(`${where} ${week.label}: unknown session "${week.days[day]}"`);
      scheduledSessions.add(week.days[day]);
    }
    // Leave at least one rest day between sessions, including from Sunday to the next Monday.
    const gaps = sessionGaps(days.map(day => dayNames.indexOf(day)));
    if (gaps.some(gap => gap < 2)) fail(`${where} ${week.label}: sessions on consecutive days`);
    if (plan.timing && week.sets) {
      for (const sn of plan.sessions) {
        const minutes = guideSessionMinutes(plan.timing, sn.items.length, week.sets);
        if (minutes > plan.timing.maxMinutes) fail(`${where} ${week.label}: session ${sn.id} estimated ${minutes} min exceeds the ${plan.timing.maxMinutes} min budget`);
      }
    }
  }
  for (const id of sessionIds) if (!scheduledSessions.has(id)) fail(`${where}: session ${id} is never scheduled`);
}

// Page order is explicit because collection load order is not guaranteed: every order value must be unique within its page.
const uniqueOrders = (list, key, label) => {
  const seen = new Set();
  for (const item of list) {
    const k = `${key(item)}:${item.order}`;
    if (typeof item.order !== 'number') fail(`${label} ${item.id}: needs a numeric order`);
    else if (seen.has(k)) fail(`${label} ${item.id}: order ${item.order} is used twice`);
    seen.add(k);
  }
};
// Guide ids are shared by every section, so a repeated id would silently overwrite another entry.
for (const [label, list] of [['group', guideGroups], ['exercise', guideExercises], ['plan', guidePlans]]) {
  const seen = new Set();
  for (const item of list) { if (seen.has(item.id)) fail(`Guide ${label} id "${item.id}" is used twice`); seen.add(item.id); }
}
uniqueOrders(guideExercises, e => e.section, 'Guide exercise');
uniqueOrders(guideGroups, g => g.section, 'Guide group');
uniqueOrders(coreExercises, () => 'core', 'Core exercise');
uniqueOrders(sections, () => 'home', 'Section');

// Core guide: phases and the poses that drive the 3D figures.
const requiredJoints = ['head', 'shoulder', 'elbow', 'wrist', 'hip', 'knee', 'ankle', 'toe'];
const phaseNumbers = new Set(corePhases.map(p => p.number));
for (const e of coreExercises) {
  const where = `Core exercise ${e.id}`;
  if (!phaseNumbers.has(e.phase)) fail(`${where}: unknown phase ${e.phase}`);
  for (const pose of ['start', 'end']) for (const joint of requiredJoints) if (!e.poses?.[pose]?.[joint]) fail(`${where}: ${pose} pose is missing ${joint}`);
}
for (const p of corePhases) if (!coreExercises.some(e => e.phase === p.number)) warn(`Core phase ${p.id} has no exercises`);

// British spelling in our own text (source titles keep their original spelling).
const american = /\b(stabiliz\w*|optimiz\w*|recogniz\w*|emphasiz\w*|minimiz\w*|maximiz\w*|color\w*|behavior\w*|favor\w*|center\w*|fiber\w*|gray's)\b/gi;
const ownText = JSON.stringify([groups, claims, painRules, muscles, exercises, programs, glossary, sections, guideGroups, guideExercises, guidePlans, corePhases, coreExercises]) + principles.map(p => JSON.stringify(p)).join('') + cricket.map(c => JSON.stringify(c)).join('');
for (const hit of new Set(ownText.match(american) ?? [])) warn(`American spelling "${hit}"`);

for (const w of warnings) console.warn(`warning: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`error: ${e}`);
  console.error(`\n${errors.length} content error(s).`);
  process.exit(1);
}
console.log(`Content OK: ${muscles.length} muscles, ${exercises.length} exercises, ${claims.length} claims, ${sources.length} sources, ${programs.length} programs, ${principles.length} principles, ${cricket.length} cricket pages, ${guideExercises.length} guide exercises, ${coreExercises.length} core exercises, ${sections.length} sections.`);
