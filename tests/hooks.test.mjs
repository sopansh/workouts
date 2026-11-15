import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const root = new URL('../', import.meta.url).pathname;
const script = name => `.github/hooks/scripts/${name}.mjs`;

function run(name, payload) {
  const input = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const result = spawnSync('node', [script(name)], { cwd: root, input, encoding: 'utf8' });
  assert.equal(result.status, 0, `${name} exited ${result.status}: ${result.stderr}`);
  return result.stdout.trim() ? JSON.parse(result.stdout) : null;
}

const shell = command => ({ toolName: 'bash', toolArgs: { command } });
const write = (path, text = 'ok') => ({ toolName: 'create', toolArgs: { path, file_text: text } });

test('the guard asks before a push and denies a force-push', () => {
  assert.equal(run('guard-tool-use', shell('git push origin main')).permissionDecision, 'ask');
  assert.equal(run('guard-tool-use', shell('git push --force origin main')).permissionDecision, 'deny');
  assert.equal(run('guard-tool-use', shell('git -C repo push -f')).permissionDecision, 'deny');
  assert.equal(run('guard-tool-use', shell('git --no-pager push')).permissionDecision, 'ask');
  assert.equal(run('guard-tool-use', shell('git commit -m "fix push bug"')), null);
});

test('the guard asks before destructive git and deploys', () => {
  assert.equal(run('guard-tool-use', shell('git reset --hard HEAD~1')).permissionDecision, 'ask');
  assert.equal(run('guard-tool-use', shell('netlify deploy --prod')).permissionDecision, 'ask');
});

test('the guard denies deleting root or home but allows ordinary deletes', () => {
  assert.equal(run('guard-tool-use', shell('rm -rf /')).permissionDecision, 'deny');
  assert.equal(run('guard-tool-use', shell('rm -rf ~')).permissionDecision, 'deny');
  assert.equal(run('guard-tool-use', shell('rm -rf /tmp/scratch')), null);
  assert.equal(run('guard-tool-use', shell('rm -rf dist')), null);
});

test('the guard leaves ordinary commands alone', () => {
  assert.equal(run('guard-tool-use', shell('npm run check')), null);
  assert.equal(run('guard-tool-use', shell('git status && git diff --stat')), null);
  assert.equal(run('guard-tool-use', { toolName: 'view', toolArgs: { path: 'CONTEXT.md' } }), null);
});

test('the guard blocks secrets and generated folders, and asks about hook edits', () => {
  const fakeToken = `ghp_${'a'.repeat(36)}`;
  assert.equal(run('guard-tool-use', write('docs/notes.md', `token ${fakeToken}`)).permissionDecision, 'deny');
  assert.equal(run('guard-tool-use', write('dist/index.html')).permissionDecision, 'deny');
  assert.equal(run('guard-tool-use', write('.github/hooks/team.json')).permissionDecision, 'ask');
  assert.equal(run('guard-tool-use', write('src/content/sections.yml')), null);
});

test('the guard reads the VS Code payload shape and tolerates a bad payload', () => {
  assert.equal(run('guard-tool-use', { tool_name: 'bash', tool_input: { command: 'git push' } }).permissionDecision, 'ask');
  assert.equal(run('guard-tool-use', { toolName: 'bash', toolArgs: JSON.stringify({ command: 'git push' }) }).permissionDecision, 'ask');
  assert.equal(run('guard-tool-use', 'not json'), null);
});

test('session context names the team and reminds about pushing', () => {
  const { additionalContext } = run('session-context', { sessionId: 's', source: 'new' });
  assert.match(additionalContext, /executive/);
  assert.match(additionalContext, /ask the owner before committing or pushing/);
});

test('only coaches get the reporting protocol', () => {
  for (const agentName of ['strength-coach', 'plyometrics-coach', 'nutrition-coach', 'calisthenics-coach']) {
    assert.match(run('subagent-brief', { agentName }).additionalContext, /report to the executive/);
  }
  assert.equal(run('subagent-brief', { agentName: 'explore' }), null);
  assert.equal(run('subagent-brief', { agentName: 'executive' }), null);
});
