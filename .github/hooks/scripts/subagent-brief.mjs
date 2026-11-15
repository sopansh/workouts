// subagentStart hook: prepends the reporting protocol to every coach's first message.
// Other agents (explore, task, general-purpose and so on) get nothing. Writes at most one JSON object.
import { readFileSync } from 'node:fs';

const COACH = /\b(strength|plyometrics|nutrition|calisthenics)[- ]coach\b/i;

const BRIEF = [
  'You report to the executive agent.',
  'Before you start, read docs/agents/protocols.md and docs/agents/directives.md and apply every directive that covers your area.',
  'Stay inside the files your brief gives you and the ownership table in protocols.md. Needs from another coach go under "Requests" in your report, not into your work.',
  'Do not commit or push. The repository is public: no personal, medical or identity details.',
  'Finish with the standard report from protocols.md, and state honestly what you did not verify.',
].join(' ');

try {
  const input = JSON.parse(readFileSync(0, 'utf8'));
  const name = `${input.agentName ?? input.agent_name ?? ''} ${input.agentDisplayName ?? ''}`;
  if (COACH.test(name)) process.stdout.write(JSON.stringify({ additionalContext: BRIEF }));
} catch {
  // Unreadable payload: add nothing.
}
