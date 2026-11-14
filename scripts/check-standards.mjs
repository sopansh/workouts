// Build-time check of the coding standards in CONTEXT.md section 11. No dependencies. Runs before `astro build`.
// Fails on: unsafe HTML injection, stray colour literals, missing alt/aria text, unbalanced CSS, theme tokens that are not
// in all three theme blocks, pages that bypass the shared layout, naming and whitespace conventions.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const errors = [];
const fail = (file, line, msg) => errors.push(`${path.relative(root, file)}${line ? `:${line}` : ''}: ${msg}`);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else out.push(full);
  }
  return out;
}

const files = [...await walk(path.join(root, 'src')), ...await walk(path.join(root, 'scripts')), ...await walk(path.join(root, 'tests'))];
const ext = f => path.extname(f);
const isCode = f => ['.astro', '.ts', '.js', '.mjs', '.css'].includes(ext(f));
const inSrc = f => f.startsWith(path.join(root, 'src') + path.sep);

// Files allowed to use set:html, each for a reviewed reason: the blocking theme script and the escaped JSON for the 3D rig.
const SET_HTML_ALLOWED = new Set(['src/layouts/Base.astro', 'src/pages/core/index.astro']);
// Pure white and black are allowed as literals (icon text, shadows, canvas fades); every other colour comes from tokens.css.
const COLOUR_LITERAL = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g;
const NEUTRAL_COLOUR = /^(#fff(fff)?|#000(000)?|rgba?\(\s*0[ ,]+0[ ,]+0\b.*|rgba?\(\s*255[ ,]+255[ ,]+255\b.*)$/i;

for (const file of files) {
  const rel = path.relative(root, file);
  const text = await readFile(file, 'utf8');
  const lines = text.split('\n');

  if (isCode(file)) {
    if (text.includes('\r')) fail(file, 0, 'uses CRLF line endings; use LF');
    if (!text.endsWith('\n')) fail(file, 0, 'does not end with a newline');
    lines.forEach((line, i) => { if (/[ \t]+$/.test(line)) fail(file, i + 1, 'trailing whitespace'); });
  }

  if (ext(file) === '.css') {
    const open = (text.match(/{/g) ?? []).length;
    const close = (text.match(/}/g) ?? []).length;
    if (open !== close) fail(file, 0, `unbalanced braces (${open} open, ${close} close)`);
  }

  if (!inSrc(file) || !isCode(file)) continue;

  lines.forEach((line, i) => {
    const n = i + 1;
    if (/\b(innerHTML|outerHTML|insertAdjacentHTML)\b|document\.write\(/.test(line)) fail(file, n, 'injects HTML; build DOM nodes or use an Astro template');
    if (/set:html/.test(line) && !SET_HTML_ALLOWED.has(rel)) fail(file, n, 'set:html is only allowed in reviewed files (see check-standards.mjs)');
    if (/\bconsole\.log\(/.test(line)) fail(file, n, 'console.log left in source');
    if (/:\s*any\b|\bas any\b|<any>/.test(line) && ext(file) !== '.css') fail(file, n, 'avoid `any`; use a real type or `unknown`');
    if (/['"`(]\/shared\/|['"`(]site\//.test(line)) fail(file, n, 'refers to the removed site/ or /shared/ folders');
    if (rel !== 'src/styles/tokens.css') {
      for (const [literal] of line.matchAll(COLOUR_LITERAL)) {
        if (!NEUTRAL_COLOUR.test(literal)) fail(file, n, `colour literal ${literal}; use a token from tokens.css`);
      }
    }
  });

  if (ext(file) === '.astro') {
    for (const [tag] of text.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(tag)) fail(file, 0, `<img> without alt: ${tag.slice(0, 60)}`);
    for (const [tag] of text.matchAll(/<canvas\b[^>]*>/g)) if (!/\baria-label=/.test(tag)) fail(file, 0, '<canvas> without aria-label');
    for (const [tag] of text.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) if (!/\brel=/.test(tag)) fail(file, 0, 'target="_blank" without rel');
    if (rel.startsWith('src/pages/') && !/<Base\b|<WeeklyPlan\b/.test(text)) fail(file, 0, 'page does not use the shared Base layout');
  }
}

// Naming: components and layouts are PascalCase; everything else under src is lowercase kebab-case ([param] folders allowed).
// content.config.ts is the one name Astro requires.
for (const file of files.filter(inSrc).filter(f => path.basename(f) !== 'content.config.ts')) {
  const rel = path.relative(path.join(root, 'src'), file);
  const base = path.basename(file, ext(file));
  const dirs = path.dirname(rel).split(path.sep);
  const pascal = dirs[0] === 'components' || dirs[0] === 'layouts';
  if (pascal ? !/^[A-Z][A-Za-z0-9]*$/.test(base) : !/^(\[[a-z]+\]|[a-z0-9]+(-[a-z0-9]+)*)$/.test(base)) fail(file, 0, `file name "${base}" breaks the naming convention`);
}

// Theme tokens: every colour defined in the light block must be defined in both dark blocks, and the dark blocks must match.
const tokens = await readFile(path.join(root, 'src/styles/tokens.css'), 'utf8');
const blockVars = body => new Set([...body.matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1]));
const light = tokens.match(/:root\s*{([^}]*)}/);
const mediaDark = tokens.match(/prefers-color-scheme:\s*dark\)\s*{\s*:root[^{]*{([^}]*)}/);
const attrDark = tokens.match(/:root\[data-theme='dark'\]\s*{([^}]*)}/);
if (!light || !mediaDark || !attrDark) fail(path.join(root, 'src/styles/tokens.css'), 0, 'expected a light block and two dark blocks');
else {
  const colourVars = new Set([...light[1].matchAll(/(--[\w-]+)\s*:\s*(#|rgb)/g)].map(m => m[1]));
  const media = blockVars(mediaDark[1]);
  const attr = blockVars(attrDark[1]);
  for (const name of colourVars) {
    if (!media.has(name)) fail(path.join(root, 'src/styles/tokens.css'), 0, `${name} is missing from the prefers-color-scheme dark block`);
    if (!attr.has(name)) fail(path.join(root, 'src/styles/tokens.css'), 0, `${name} is missing from the [data-theme='dark'] block`);
  }
  for (const name of media) if (!attr.has(name)) fail(path.join(root, 'src/styles/tokens.css'), 0, `${name} differs between the two dark blocks`);
  for (const name of attr) if (!media.has(name)) fail(path.join(root, 'src/styles/tokens.css'), 0, `${name} differs between the two dark blocks`);
}

if (errors.length) {
  for (const e of errors) console.error(`error: ${e}`);
  console.error(`\n${errors.length} standards error(s).`);
  process.exit(1);
}
console.log(`Standards OK: ${files.filter(f => inSrc(f) && isCode(f)).length} source files checked.`);
