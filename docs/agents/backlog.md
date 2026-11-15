# Backlog

The executive owns the order. Each item names its owner. The long-term plans are in `CONTEXT.md` section 10 and `docs/`.

| # | Item | Owner | Notes |
|---|---|---|---|
| 1 | **Extend the 3D rig** for faithful joint motion (3D skeleton, joint-angle limits, props), then animate hypertrophy exercises | Executive (engineering via `general-purpose`), `strength-coach` (movement specs) | Owner decision D-001. Verify range-of-motion and joint-coordinate references on Crossref first (see `exercise-animation`). Write `docs/animation-plan.md` before building. |
| 2 | **Nutrition plan document** (`docs/nutrition-plan.md`), then the section | `nutrition-coach` | D-004. Tile is "Coming soon". Needs owner approval before pages. |
| 3 | **Sport power and injury-prevention pages** for cricket, badminton, squash, football | `plyometrics-coach` | Propose routes first. Cricket links to the strength cricket pages. |
| 4 | **Human review** of all draft content by a physiotherapist and a strength coach | Owner | Nothing moves past draft without it. |
| 5 | **Deepen strength groups** (back, shoulders, arms, core) to the chest and legs standard | `strength-coach` | Hypertrophy plan section 12 for cricket research. |
| 6 | **Calisthenics next pass:** experienced-lifter entry page, adherence guidance, more wrist and handstand evidence | `calisthenics-coach` | Gate numbers need a coach's review. |
| 7 | **Merge duplicated beginner exercises** across strength and getting-started (D-003) | `strength-coach` with the executive | Decide which page is the source of truth. |
| 8 | **Split `guides/groups.yml` and `plans.yml` per section** so coaches can work in parallel without conflicts | Executive (platform) | Switch the loaders to a directory loader like `exercises`. |
| 9 | **CI** running `npm run check` and `npm run test:e2e` on every push, and a link check | Executive (platform) | Netlify auto-deploys `main` today and tests do not gate it. |
| 10 | **Search** (Pagefind) | Executive (platform) | Optional. |
