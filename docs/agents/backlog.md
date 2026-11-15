# Backlog

The executive owns the order. Each item names its owner. The long-term plans are in `CONTEXT.md` section 10 and `docs/`.

| # | Item | Owner | Notes |
|---|---|---|---|
| 1 | **Extend the 3D rig** (plan written: `docs/animation-plan.md`; chest and legs specs written: `docs/animation-specs/`; awaiting owner approval and a Soucie full-text read) for faithful joint motion (3D skeleton, joint-angle limits, props), then animate hypertrophy exercises | Executive (engineering via `general-purpose`), `strength-coach` (movement specs) | Owner decision D-001. Verify range-of-motion and joint-coordinate references on Crossref first (see `exercise-animation`). Write `docs/animation-plan.md` before building. |
| 2 | **Nutrition:** plan written (`docs/nutrition-plan.md`), awaiting approval. Blocked on NIN permission for IFCT food data; needs `database` source type and validator rules N1 to N13 before pages | `nutrition-coach` | D-004. Tile is "Coming soon". Needs owner approval before pages. |
| 3 | **Sport power and injury-prevention pages:** plan written (`docs/sport-power-plan.md`). Football first, then cricket, badminton, squash. Needs the loader `phase` option (done) and a `phase` set on the existing plyometrics groups and plan before sport groups are added | `plyometrics-coach` | Propose routes first. Cricket links to the strength cricket pages. |
| 4 | **Human review** of all draft content by a physiotherapist and a strength coach | Owner | Nothing moves past draft without it. |
| 5 | **Deepen strength groups** (back, shoulders, arms, core) to the chest and legs standard | `strength-coach` | Hypertrophy plan section 12 for cricket research. |
| 6 | **Calisthenics next pass:** experienced-lifter entry page, adherence guidance, more wrist and handstand evidence | `calisthenics-coach` | Gate numbers need a coach's review. |
| 7 | **Merge duplicated beginner exercises** across strength and getting-started (D-003) | `strength-coach` with the executive | Decide which page is the source of truth. |
| 8 | ~~Split guide groups and plans per section~~ **Done 2026-11-15**: `guides/groups/` and `guides/plans/`, one file per section | Executive (platform) | Sources and pain rules are still single files. |
| 9 | **CI** running `npm run check` and `npm run test:e2e` on every push, and a link check | Executive (platform) | Netlify auto-deploys `main` today and tests do not gate it. |
| 10 | **Search** (Pagefind) | Executive (platform) | Optional. |
