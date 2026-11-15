# Coaching team

A manager and four coaches work on workouts.theroningamer.com. The setup lives in `.github/` (agents, skills, hooks) and these docs. It is public like the rest of the repo, so it holds no personal or medical details.

```
Site owner
  └── executive                (manager: plans, delegates, reviews, reports)
        ├── strength-coach     hypertrophy, strength, isometric and back-safe core, getting started at home
        ├── plyometrics-coach  jumps, sport power, core and rotation, sports-injury prevention
        ├── nutrition-coach    diet patterns, calories, Indian and Japanese food, vitamins and supplements
        └── calisthenics-coach bodyweight skills and progressions
```

Coaches cannot delegate to each other. Cross-area needs go back to the executive under "Requests".

## Use it

- **GitHub Copilot CLI:** run `/agent` and pick `executive`, or start with `copilot --agent executive`. Pick a coach directly for a focused task. The executive calls coaches itself.
- **VS Code:** choose the agent in the chat agent picker.
- Start with the executive for anything that spans areas, is unclear, or needs a status or release decision.

## What is where

| Path | What |
|---|---|
| `.github/agents/*.agent.md` | The five agents: role, remit, files owned, method, hard rules, skills, report format |
| `.github/skills/<name>/SKILL.md` | 17 skills the agents load when relevant. Four are shared by all coaches (`site-content-authoring`, `evidence-and-sources`, `safety-review`, `exercise-animation`) |
| `.github/hooks/team.json` + `scripts/` | Three hooks, see below |
| `docs/agents/protocols.md` | Ownership, delegation, report format, escalation, definition of done |
| `docs/agents/directives.md` | Standing instructions from the executive to the coaches |
| `docs/agents/backlog.md` | The prioritised work queue, each item with an owner |
| `scripts/check-agents.mjs` | Validates the whole setup. Part of `npm run check` |
| `tests/hooks.test.mjs` | Tests the hook scripts with sample payloads |

## Skills by agent

| Agent | Skills |
|---|---|
| executive | `task-delegation`, `release-readiness`, plus the four shared skills |
| strength-coach | `hypertrophy-programming`, `isometric-core-training`, `workout-plan-builder` |
| plyometrics-coach | `plyometric-programming`, `sport-power-profiles`, `sports-injury-prevention` |
| nutrition-coach | `diet-plan-design`, `food-databases-regional`, `micronutrients-supplements` |
| calisthenics-coach | `calisthenics-progressions`, `calisthenics-onboarding` |

## Hooks

| Event | Script | Effect |
|---|---|---|
| `sessionStart` | `session-context.mjs` | Adds the team context, branch and uncommitted-change count |
| `subagentStart` | `subagent-brief.mjs` | Adds the reporting protocol to every coach's first message; other agents get nothing |
| `preToolUse` | `guard-tool-use.mjs` | Asks before `git push`, destructive git commands and Netlify deploys; denies force-push, deleting root or home, writes into `dist/`, `node_modules/` or `.astro/`, and content that looks like a secret; asks before edits to `.github/hooks/` |

The guard fails open on unreadable input, because a crashing `preToolUse` command hook would deny every tool call.

## Rules the team works under

Evidence before claims (no citation from memory), safety before features, draft until human review, no personal details in the public repo, no commit or push without the owner. The full text is in each agent file and in `.github/copilot-instructions.md`.

## Personas are not credentials

The agents reason like senior practitioners, but nothing they write is signed off by a licensed professional. Everything on the site stays labelled draft until the physiotherapist and strength coach named in `CONTEXT.md` review it.

## Change the team

1. **Add a coach:** a new `.github/agents/<name>.agent.md` (copy a coach, no `agent` tool), its skills, a row in the executive's table, the ownership table in `protocols.md`, then `npm run check`.
2. **Change a rule for everyone:** add a directive in `directives.md` (and a skill edit if it is permanent).
3. **Change a hook:** edit the script, extend `tests/hooks.test.mjs`, run `npm run check`.

## Known limits

- The hooks are tested with sample payloads only. The exact field names the runtime sends may differ by version, so confirm in a real session that the guard asks before a `git push`.
- Coaches share one working tree. The executive keeps their file sets disjoint (see `protocols.md`).
- Visual animation is limited to the current side-on rig. See the `exercise-animation` skill and the backlog.
- Your `.github/copilot-instructions.md` ends with a block that asks for code-only, minimal output. Agent reports are a structured summary, so that block conflicts with them. It was left as you wrote it.
