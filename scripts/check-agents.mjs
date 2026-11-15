// Validates the coaching-team setup: agents, skills, hooks and the docs they depend on. Run by `npm run check`.
// Fails on: agent files that would not load, a coach that can delegate, skills that are missing or unused,
// hook entries that point at missing scripts, and reporting docs that drifted from the agents.
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const root = new URL('../', import.meta.url).pathname;
const errors = [];
const fail = (file, msg) => errors.push(`${path.relative(root, file)}: ${msg}`);

const MAX_PROMPT_CHARS = 30000;
const EXECUTIVE = 'executive';
const REQUIRED_DOCS = ['README.md', 'protocols.md', 'directives.md', 'backlog.md'];

function split(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  // A colon inside an unquoted value breaks the frontmatter, so the file would silently fail to load.
  try {
    return { data: parse(match[1]) ?? {}, body: match[2] };
  } catch (error) {
    return { error: error.message.split('\n')[0], data: {}, body: match[2] };
  }
}

const toolList = tools => (Array.isArray(tools) ? tools : typeof tools === 'string' ? tools.split(',').map(tool => tool.trim()) : []);

/** Skill ids listed as "- `skill-id` ..." under the "## Skills" heading of an agent. */
function listedSkills(body) {
  const section = body.match(/^## Skills\n([\s\S]*?)(?=^## |$(?![\s\S]))/m);
  return section ? [...section[1].matchAll(/^- `([a-z0-9]+(?:-[a-z0-9]+)*)`/gm)].map(match => match[1]) : [];
}

const agentDir = path.join(root, '.github/agents');
const skillDir = path.join(root, '.github/skills');
const hookDir = path.join(root, '.github/hooks');

// Agents.
const agents = [];
for (const file of await readdir(agentDir)) {
  const full = path.join(agentDir, file);
  if (!file.endsWith('.agent.md')) {
    fail(full, 'only *.agent.md files belong in .github/agents (another .md may load as an agent)');
    continue;
  }
  const parsed = split(await readFile(full, 'utf8'));
  if (!parsed) { fail(full, 'missing YAML frontmatter'); continue; }
  if (parsed.error) { fail(full, `frontmatter does not parse: ${parsed.error}`); continue; }
  const stem = file.replace(/\.agent\.md$/, '');
  const { data, body } = parsed;
  if (data.name !== stem) fail(full, `name "${data.name}" must match the file name "${stem}"`);
  if (!data.description || data.description.length < 40) fail(full, 'needs a useful description');
  if (body.length > MAX_PROMPT_CHARS) fail(full, `prompt is ${body.length} characters; the limit is ${MAX_PROMPT_CHARS}`);
  const canDelegate = toolList(data.tools).some(tool => ['agent', 'custom-agent', 'task'].includes(tool.toLowerCase()));
  if (stem === EXECUTIVE && !canDelegate) fail(full, 'the executive needs the agent tool to delegate');
  if (stem !== EXECUTIVE && canDelegate) fail(full, 'a coach must not have the agent tool: coaches report to the executive and cannot delegate');
  if (!body.includes('docs/agents/protocols.md')) fail(full, 'must point at docs/agents/protocols.md');
  if (stem !== EXECUTIVE && !body.includes(`## Report: ${stem},`)) fail(full, `report format must start "## Report: ${stem},"`);
  agents.push({ stem, full, body, skills: listedSkills(body) });
}

const coaches = agents.filter(agent => agent.stem !== EXECUTIVE);
const executive = agents.find(agent => agent.stem === EXECUTIVE);
if (!executive) fail(agentDir, 'there is no executive agent');
else for (const coach of coaches) if (!executive.body.includes(`\`${coach.stem}\``)) fail(executive.full, `does not list the coach \`${coach.stem}\``);

// Skills.
const skillIds = [];
for (const entry of await readdir(skillDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const full = path.join(skillDir, entry.name, 'SKILL.md');
  if (!existsSync(full)) { fail(path.join(skillDir, entry.name), 'missing SKILL.md'); continue; }
  const parsed = split(await readFile(full, 'utf8'));
  if (!parsed) { fail(full, 'missing YAML frontmatter'); continue; }
  if (parsed.error) { fail(full, `frontmatter does not parse: ${parsed.error}`); continue; }
  if (parsed.data.name !== entry.name) fail(full, `name "${parsed.data.name}" must match the folder "${entry.name}"`);
  if (!parsed.data.description || parsed.data.description.length < 60) fail(full, 'the description must say what the skill does and when to use it');
  skillIds.push(entry.name);
}
const used = new Set(agents.flatMap(agent => agent.skills));
for (const agent of agents) {
  if (!agent.skills.length) fail(agent.full, 'lists no skills under "## Skills"');
  for (const skill of agent.skills) if (!skillIds.includes(skill)) fail(agent.full, `lists the skill \`${skill}\`, which does not exist`);
}
for (const skill of skillIds) if (!used.has(skill)) fail(path.join(skillDir, skill, 'SKILL.md'), 'no agent lists this skill');

// Hooks.
let hookEvents = 0;
for (const file of (await readdir(hookDir)).filter(name => name.endsWith('.json'))) {
  const full = path.join(hookDir, file);
  let config;
  try { config = JSON.parse(await readFile(full, 'utf8')); } catch (error) { fail(full, `invalid JSON: ${error.message}`); continue; }
  if (config.version !== 1) fail(full, 'version must be 1');
  for (const [event, entries] of Object.entries(config.hooks ?? {})) {
    if (!Array.isArray(entries)) { fail(full, `${event} must be a list`); continue; }
    for (const entry of entries) {
      hookEvents++;
      const command = entry.command ?? entry.bash ?? '';
      const script = command.match(/\bnode\s+(\S+)/)?.[1];
      if (script && !existsSync(path.join(root, script))) fail(full, `${event} runs ${script}, which does not exist`);
      if (!script && entry.type !== 'prompt' && entry.type !== 'http') fail(full, `${event} has an entry that runs no script`);
    }
  }
}

// Docs the agents depend on.
for (const doc of REQUIRED_DOCS) if (!existsSync(path.join(root, 'docs/agents', doc))) fail(path.join(root, 'docs/agents', doc), 'missing');
const directivesFile = path.join(root, 'docs/agents/directives.md');
if (existsSync(directivesFile)) {
  const ids = [...(await readFile(directivesFile, 'utf8')).matchAll(/^## (D-\d+)\b/gm)].map(match => match[1]);
  if (new Set(ids).size !== ids.length) fail(directivesFile, 'a directive id is used twice');
  if (!ids.length) fail(directivesFile, 'has no directives');
}

if (errors.length) {
  for (const error of errors) process.stderr.write(`error: ${error}\n`);
  process.stderr.write(`${errors.length} agent setup error(s)\n`);
  process.exit(1);
}
process.stdout.write(`Agents OK: ${agents.length} agents, ${skillIds.length} skills, ${hookEvents} hook entries.\n`);
