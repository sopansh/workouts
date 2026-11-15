# Team protocols

Read by every coach at the start of a task, and applied by the executive when reviewing.

## 1. File ownership

| Area | Owner | Files |
|---|---|---|
| Strength and hypertrophy | `strength-coach` | `src/content/{exercises,muscles,principles,cricket}/`, `programs.yml`, `groups.yml`, `src/pages/strength/**`, `claims/{emphasis,programming,cricket}.yml` |
| Back-safe core guide | `strength-coach` | `src/content/core/**`, `src/pages/core/**` (3D rig code is platform) |
| Getting started | `strength-coach` | `src/pages/getting-started/**`, `claims/getting-started.yml`, unprefixed guide ids |
| Calisthenics | `calisthenics-coach` | `src/pages/calisthenics/**`, `cal-` guide ids, `claims/calisthenics.yml`, the `wrist` pain rule |
| Plyometrics, sport power, injury prevention | `plyometrics-coach` | `src/pages/plyometrics/**`, `plyo-` guide groups with their exercises and the `two-session-week` plan, `claims/plyometrics.yml`, `ankle-foot` and `jumping` pain rules |
| Nutrition | `nutrition-coach` | `docs/nutrition-plan.md`, future `src/pages/nutrition/**`, `claims/nutrition.yml` |
| Platform | executive | `src/layouts/`, `src/scripts/`, `src/styles/`, `scripts/`, `src/content.config.ts`, `tests/`, `.github/`, `docs/agents/`, build and deploy config |

**Shared hotspots:** `sources.yml`, `pain-rules.yml`, `sections.yml`, `guides/groups.yml`, `guides/plans.yml`, `src/styles/app.css`. A coach appends or edits only its own entries. Two coaches never edit the same hotspot at the same time, so the executive sequences them. The cricket pages are strength's; power, rotation and injury-prevention drills for cricket are plyometrics'. They link to each other.

## 2. Delegation brief

```
Objective / Why / Read first / Scope / Out of scope / Constraints / Deliverables / Acceptance / Report
```

The executive writes all nine, in full. The template with guidance is in `.github/skills/task-delegation/SKILL.md`.

## 3. Report format (every coach, every task)

```
## Report: <agent>, <task>
Status: done | partial | blocked
Directives applied: <ids or none>
Changed: <paths>
Checks: <commands and results>
Evidence: <sources added, claims graded, gaps>
Safety: <fields present, scope notes>
Open: <questions for the executive or owner>
Requests: <work needed from another coach, for the executive to route>
```

Be brief. State what you did **not** verify. Do not claim a check passed without running it.

## 4. Escalation

- A cross-area need, a safety doubt, an unclear scope or a rule conflict goes under "Open" or "Requests". Stop at that point if it blocks the work.
- A coach never edits another coach's files. If a shared file needs another entry, say which.
- If a source cannot be verified, the claim is not written. Say so.
- The executive escalates to the owner for: scope or safety changes, a new dependency, going live, deleting content, anything touching the public face in a way not agreed.

## 5. Definition of done

1. Data edited, not rendered markup.
2. `npm run check` passes with no unread warnings.
3. `npm run build` passes when pages changed; Playwright covers any new page or behaviour.
4. Every claim has a verified source, a grade and caveats. Gaps stated.
5. Every exercise passes `safety-review`.
6. Draft labels in place. No personal or medical details anywhere.
7. Report delivered in the format above.

## 6. Release

No coach commits or pushes. The executive runs `release-readiness` and recommends. The owner commits and pushes. Pushing `main` deploys production.

## 7. Directives

`directives.md` is the executive's standing instructions. A coach reads it first, applies every entry that covers its area, and cites the ids in its report.
