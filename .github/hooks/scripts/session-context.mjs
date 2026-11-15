// sessionStart hook: gives every session the team context. Writes one JSON object with `additionalContext`.
import { execFileSync } from 'node:child_process';

function git(args) {
  try {
    return execFileSync('git', args, { encoding: 'utf8', timeout: 3000, stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']) || 'unknown';
const changed = git(['status', '--porcelain']).split('\n').filter(Boolean).length;

const additionalContext = [
  'Workouts site team. The repository is public: never write personal, medical or identity details.',
  'Read CONTEXT.md and docs/agents/protocols.md. Standing directives are in docs/agents/directives.md.',
  'Agents: executive (manager, select it for multi-area or unclear work), strength-coach, plyometrics-coach, nutrition-coach, calisthenics-coach. Coaches report to the executive and cannot delegate.',
  `Git: branch ${branch}, ${changed} uncommitted change${changed === 1 ? '' : 's'}. Pushing main deploys production: ask the owner before committing or pushing.`,
].join('\n');

process.stdout.write(JSON.stringify({ additionalContext }));
