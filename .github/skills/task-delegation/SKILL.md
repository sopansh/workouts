---
name: task-delegation
description: How the executive agent briefs, routes, monitors and reviews the coaches. Includes the routing table, the delegation brief template, file-ownership and parallelism rules, status requests, integration review and the report to the owner. Use whenever work is split across agents.
---

# Task delegation (executive)

## Route the request

| Request is about | Owner | Also involves |
|---|---|---|
| Hypertrophy, programmes, variations, muscle content, isometric or back-safe core, getting started at home | `strength-coach` | `nutrition-coach` for body-fat or weight goals |
| Jumps, power, rotation, sport-specific training, injury prevention and strengthening | `plyometrics-coach` | `strength-coach` for gym-side cricket and general strength base |
| Diet, calories, weight goals, Indian or Japanese food, vitamins, minerals, supplements | `nutrition-coach` | `strength-coach` or `plyometrics-coach` for the training side |
| Bodyweight skills, progressive ladders, beginners or experienced lifters in calisthenics | `calisthenics-coach` | `strength-coach` for the shared beginner exercises |
| Animations, layout, validators, build, hooks, deploy | Executive (platform work) | built-in `general-purpose` or `task` agents do the engineering |
| Cross-section consistency, safety policy, release decisions | Executive | all coaches |

## The brief

Every delegation contains all of this. The coach starts with no memory of the conversation.

```
Objective: <one sentence outcome>
Why: <the owner's goal and who the reader is>
Read first: CONTEXT.md, docs/agents/protocols.md, docs/agents/directives.md, <specific files>
Scope: <files you may change>   Out of scope: <what not to touch>
Constraints: <evidence, safety, public repo, sections, deadlines>
Deliverables: <data, pages, tests, docs>
Acceptance: <commands that must pass, behaviours to verify>
Report: the standard report from protocols.md; unresolved items under Open and Requests
```

## Parallelism and ownership

- Run tasks in parallel only when their file sets are disjoint. `sources.yml`, `pain-rules.yml`, `sections.yml`, `claims/*.yml` of other sections, `app.css`, `Base.astro` and `content.config.ts` are shared hotspots. Two coaches touching the same hotspot run one after the other, or one coach appends only its own entries and the executive merges.
- The coaches share one working tree. Tell them which files are theirs. Never ask two coaches to edit one file at once.
- Use background mode for independent long tasks, do your own independent work meanwhile, and read the result once when notified. Do not poll.

## Monitoring

- Ask for status through the agent tools when a task is long or blocked. Ask three things: what is done, what is blocked, what is next.
- One distinct retry for a stuck coach, with a narrower brief. Then report it blocked with the best evidence.
- Do not re-do a coach's work yourself unless the owner asks. Send a precise correction instead.

## Integration review

For each report:

1. Read the diff, not just the report.
2. Run `npm run check` yourself. Run `npm run build` and `npm run test:e2e` when pages changed.
3. Apply `safety-review` and the sourcing rules in `evidence-and-sources`.
4. Check consistency across sections: the same exercise (push-up, glute bridge, bird dog, squat) must have the same cues, mistakes and cautions wherever it appears. Fix by directive or by a correction brief.
5. Look for duplicated content that should link instead.
6. Confirm the report honestly lists gaps and unverified items.

## Directives

When a lesson or owner decision affects more than one coach, add a numbered entry to `docs/agents/directives.md` (date, audience, rule, reason). Coaches cite the ids they applied.

## Report to the owner

Use the format in the executive agent. Lead with status. Name what was verified and what was not. Ask for decisions, do not bury them.
