// preToolUse guard for the coaching team. Reads the hook payload on stdin and writes at most one JSON decision.
// It fails open on unreadable input: a crashing preToolUse command hook would deny every tool call in the session.
import { readFileSync } from 'node:fs';

const SECRET_PATTERNS = [
  /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
  /\bghp_[A-Za-z0-9]{36}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{50,}\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bxox[abprs]-[A-Za-z0-9-]{10,}\b/,
];

// First match wins, so the force-push rule must come before the plain push rule.
// The group before `push` skips git options and their values, as in `git -C repo push`.
const SHELL_RULES = [
  [/\bgit\s+(?:-\S+\s+(?:[^-\s]\S*\s+)?)*push\b[^\n;&|]*(?:--force\b|\s-f\b)/, 'deny', 'Force-pushing is blocked.'],
  [/\bgit\s+(?:-\S+\s+(?:[^-\s]\S*\s+)?)*push\b/, 'ask', 'Pushing to main deploys the live site. Get the owner\'s explicit go-ahead first.'],
  [/\bgit\s+reset\s+--hard\b|\bgit\s+clean\s+-\S*f/, 'ask', 'This destroys uncommitted work. Confirm first.'],
  [/\brm\s+(?:-\S+\s+)+(?:\/|~|\$HOME)\/?\*?(?=\s|$)/, 'deny', 'Deleting a root or home directory is blocked.'],
  [/\bnetlify\s+(?:deploy|api)\b/, 'ask', 'This changes the live site. Get the owner\'s explicit go-ahead first.'],
];

const SHELL_TOOLS = new Set(['bash', 'powershell']);
const WRITE_TOOLS = new Set(['create', 'edit', 'str_replace_editor', 'apply_patch', 'write', 'multiedit']);
const GENERATED_PATH = /(^|\/)(dist|node_modules|\.astro)\//;
const HOOKS_PATH = /(^|\/)\.github\/hooks\//;

const decision = (permissionDecision, permissionDecisionReason) => ({ permissionDecision, permissionDecisionReason });

function parseArgs(raw) {
  if (typeof raw !== 'string') return raw ?? {};
  try {
    return JSON.parse(raw);
  } catch {
    return { command: raw };
  }
}

function checkShell(args) {
  const command = String(args.command ?? '');
  for (const [pattern, kind, reason] of SHELL_RULES) {
    if (pattern.test(command)) return decision(kind, reason);
  }
  return null;
}

function checkWrite(args) {
  const path = String(args.path ?? args.file_path ?? args.filePath ?? '').replaceAll('\\', '/');
  if (GENERATED_PATH.test(path)) return decision('deny', 'This is a generated folder. Change the source and rebuild.');
  if (HOOKS_PATH.test(path)) return decision('ask', 'This changes the guard hooks. Confirm with the owner.');
  const text = JSON.stringify(args);
  if (SECRET_PATTERNS.some(pattern => pattern.test(text))) {
    return decision('deny', 'The content looks like a secret or private key. The repository is public.');
  }
  return null;
}

function main() {
  const input = JSON.parse(readFileSync(0, 'utf8'));
  const tool = String(input.toolName ?? input.tool_name ?? '').toLowerCase();
  const args = parseArgs(input.toolArgs ?? input.tool_input);
  if (SHELL_TOOLS.has(tool)) return checkShell(args);
  if (WRITE_TOOLS.has(tool)) return checkWrite(args);
  return null;
}

try {
  const result = main();
  if (result) process.stdout.write(JSON.stringify(result));
} catch {
  // Unreadable payload: leave the normal permission flow in charge.
}
