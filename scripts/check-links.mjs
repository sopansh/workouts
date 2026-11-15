// Crawls the built site (dist/) and checks every internal link, asset and #anchor resolves. Run after `npm run build`.
// Dependency-free: it reads the HTML with regular expressions, which is enough for the markup Astro emits here.
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const errors = [];
const pages = new Map(); // url path -> Set of ids on the page

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else out.push(full);
  }
  return out;
}

try {
  await stat(dist);
} catch {
  console.error('dist/ does not exist: run `npm run build` first.');
  process.exit(1);
}

const files = await walk(dist);
const htmlFiles = files.filter(file => file.endsWith('.html'));
const staticFiles = new Set(files.map(file => '/' + path.relative(dist, file).split(path.sep).join('/')));

const urlOf = file => {
  const rel = '/' + path.relative(dist, file).split(path.sep).join('/');
  return rel.replace(/index\.html$/, '');
};

const htmlByUrl = new Map();
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  htmlByUrl.set(urlOf(file), html);
  pages.set(urlOf(file), new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1])));
}

const isRedirect = html => html.includes('http-equiv="refresh"');
let checked = 0;

for (const [url, html] of htmlByUrl) {
  if (isRedirect(html)) continue;
  const refs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map(match => match[1]);
  for (const raw of refs) {
    if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(raw) || raw.startsWith('//')) continue;
    const [pathPart, hash] = raw.replace(/&amp;/g, '&').split('#');
    const clean = pathPart.split('?')[0];
    const target = clean === '' ? url : new URL(clean, `http://x${url}`).pathname;
    checked++;
    const isPage = pages.has(target) || pages.has(target.endsWith('/') ? target : `${target}/`);
    const pageUrl = pages.has(target) ? target : `${target}/`;
    if (!isPage && !staticFiles.has(target)) {
      errors.push(`${url}: broken link ${raw}`);
      continue;
    }
    if (hash && isPage && !pages.get(pageUrl).has(decodeURIComponent(hash))) errors.push(`${url}: missing anchor ${raw}`);
  }
}

if (errors.length) {
  for (const error of [...new Set(errors)].slice(0, 60)) console.error(`error: ${error}`);
  console.error(`\n${new Set(errors).size} link error(s) across ${htmlByUrl.size} pages.`);
  process.exit(1);
}
console.log(`Links OK: ${htmlByUrl.size} pages, ${checked} internal links, assets and anchors.`);
