// Verifies DOIs in src/content/sources.yml against Crossref: the DOI resolves, the title and year match, and no
// retraction notice points at it. Run `npm run verify:sources` to check entries without a `verifiedOn` stamp, add `-- --write`
// to stamp them, and `-- --all` to recheck every DOI (for example before a release).
import { readFile, writeFile } from 'node:fs/promises';
import { parseDocument } from 'yaml';

const FILE = new URL('../src/content/sources.yml', import.meta.url);
const write = process.argv.includes('--write');
const checkAll = process.argv.includes('--all');
const today = new Date().toISOString().slice(0, 10);
const headers = { 'User-Agent': 'workouts-site-source-verifier (https://github.com/sopansh/workouts)' };

const norm = s => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/[^a-z0-9]+/g, ' ').trim();
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const MAX_ATTEMPTS = 6;

// Crossref rate-limits bursts (HTTP 429). Back off and retry instead of failing the whole run.
const getJson = async url => {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, { headers, signal: AbortSignal.timeout(30000) });
      if (res.status === 404) return null;
      if (res.ok) { await sleep(250); return await res.json(); }
      const retryAfter = Number(res.headers.get('retry-after'));
      await sleep(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : attempt * 2000);
    } catch {
      await sleep(attempt * 2000);
    }
  }
  throw new Error(`Could not reach ${url} after ${MAX_ATTEMPTS} attempts`);
};

const doc = parseDocument(await readFile(FILE, 'utf8'));
let failures = 0;

for (const item of doc.contents.items) {
  const id = item.get('id');
  const doi = item.get('doi');
  if (!doi) continue;
  if (!checkAll && item.get('verifiedOn')) continue;

  const work = await getJson(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
  if (!work) { console.error(`FAIL ${id}: DOI ${doi} does not resolve on Crossref`); failures++; continue; }

  const m = work.message;
  const crossrefTitle = norm(m.title?.[0] ?? '');
  const ourTitle = norm(item.get('title'));
  const year = (m.issued ?? m['published-print'] ?? m['published-online'])?.['date-parts']?.[0]?.[0];
  const titleOk = crossrefTitle.startsWith(ourTitle.slice(0, 40)) || ourTitle.startsWith(crossrefTitle.slice(0, 40));
  const yearOk = year && Math.abs(year - item.get('year')) <= 1;

  const updates = await getJson(`https://api.crossref.org/works?filter=updates:${encodeURIComponent(doi)}&rows=20`);
  const retracted = (updates?.message?.items ?? []).some(u => (u['update-to'] ?? []).some(t => /retract/i.test(t.type)));

  const problems = [];
  if (!titleOk) problems.push(`title mismatch (Crossref: "${m.title?.[0]}")`);
  if (!yearOk) problems.push(`year mismatch (Crossref: ${year}, ours: ${item.get('year')})`);
  if (retracted) problems.push('a retraction notice exists');

  if (problems.length) { console.error(`FAIL ${id}: ${problems.join('; ')}`); failures++; continue; }
  console.log(`ok   ${id}`);
  if (write) item.set('verifiedOn', today);
}

if (write && !failures) await writeFile(FILE, String(doc));
if (failures) { console.error(`\n${failures} source(s) failed verification.`); process.exit(1); }
console.log(write ? `\nAll checked DOIs verified and stamped ${today}.` : '\nAll checked DOIs verified.');
