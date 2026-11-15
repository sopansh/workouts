---
name: calisthenics-progressions
description: How the calisthenics section is built and extended on workouts.theroningamer.com, covering ladder design, objective gates for first skills, wrist, shoulder and tendon preparation, plan structure, and the validator rules. Use when adding or changing calisthenics exercises, ladders, skills, gates or plans.
---

# Calisthenics progressions

## What exists

`/calisthenics/` has eight pages and two eight-week plans (`cal-foundations`, `cal-first-skills` in `guides/plans/calisthenics.yml`). Groups, exercises and plans use the `cal-` prefix because guide ids are global.

- **Foundations (phase `foundations`):** wrist and shoulder preparation (wrist rocks, scapular push-up, wall slide), then ladders for push (incline to pike push-up), pull (prone Y raise, backpack row, then inverted row, active hang, slow lowering and pull-up that need a table or bar), squat and single-leg, hip extension, hollow body, plank and side plank.
- **First skills (phase `first-skills`):** L-sit, wall handstand, planche lean and tuck front lever. All flagged `convention: true`, each with at least two `gates`.

The honest evidence position is on `/calisthenics/evidence/`: no calisthenics systematic review, no training-outcome evidence for the four skills, no injury-rate data, only the push-up trial, one women's pull-up study, muscle-activity studies and a wrist case series. Keep it honest.

## Ladder design rules

1. A ladder is levels 1 to N, consecutive, easier to harder. Level 1 needs no optional equipment unless the group sets `requires`.
2. The group has a `test`: the check that places a person at a level, with reps in reserve or a clean-hold time.
3. Every exercise has setup, steps, cues, mistakes, contraindications, a regression (the level below or a lighter option), a progression (what moves up) and a pain rule.
4. Progress by changing one variable: body angle or leverage, then range, then tempo or pause, then a one-sided version.
5. Equipment that carries load (table, doorway bar) is marked `optional: true`, has an "only if" check in its setup and a no-equipment alternative.
6. A ladder that depends on equipment the person may not have must say what to do without it (the pull ladder stops at level 2).

## Gates for skills

A skill opens only when **all** of its gates are met. Gates are objective and testable, for example clean reps of a foundations level, a timed plank or hollow hold, a wrist-rock check without pain, and a plain health note where relevant (inverted positions: eye, blood-pressure and neck cautions, and a doctor if unsure). Each gate is a coaching convention, and the page says so. The validator requires `convention: true` and at least two gates on every first-skills group.

Skills stay in small steps, with wall or floor support and a way to bail out safely. The guide teaches no kick-ups, no freestanding handstand and no full planche or front lever. Anything past the last level goes to a qualified coach.

## Joint and tendon preparation

Wrists, elbows and shoulders adapt more slowly than muscle feels. Prepare before loading: wrist rocks and straight-arm shoulder work, short holds, more frequent exposure over time, and holding a level when joints ache. Use the shared `wrist` pain rule for hand-bearing work and `shoulder` for hanging and pressing. Evidence available: a case series linking back-of-wrist pain on extended-wrist loading to findings on imaging (grade C, patients only), pull-up shoulder-blade kinematics in a small group, and muscle-activity studies. Do not present these as proof of what prevents injury.

## Plan structure

Two eight-week plans, three sessions a week on non-consecutive days: push and legs, pull and trunk, then a mixed session. Weeks stay short of failure in the first weeks, build sets, hit a hardest week in week seven and ease in week eight, then retest. Skills sessions are short practice blocks, only for skills whose gates are met, never to failure. The time estimate comes from the plan's `timing` and must stay inside `maxMinutes`.

## Validator rules to remember

- Level numbers consecutive from 1; ladders need a `test`; level 1 needs no optional equipment (or set `requires`).
- Every ladder (in the plan's `phase`) is used in a session; sessions are not on consecutive days; time estimates stay in budget.
- First-skills groups: `convention: true` and at least two `gates`.
- Guide ids are unique across sections; outcome-promise words are blocked.

## Research queue (verify each before use)

Soreness and the first weeks, pull-up and row progressions for beginners, wrist and shoulder loading in hand-balancing, adherence in beginners at home, trunk muscle activity in holds, and any calisthenics trial in women or in beginners.

## Visuals

Holds, inversions and levers are 3D. Follow `exercise-animation`: a movement spec now, an animation when the extended rig supports it.
