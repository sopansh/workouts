---
name: hypertrophy-programming
description: How to design and change hypertrophy and strength programmes, exercise variations and muscle-emphasis content on workouts.theroningamer.com, with volume tracking, progression and the evidence rules. Use when adding or editing programmes, exercises, variations, muscles or principles, or explaining how a movement loads a muscle.
---

# Hypertrophy programming

Programmes, exercises and principles are data. The evidence already on the site is the source of truth: read `src/content/principles/*.md` and `src/content/claims/{emphasis,programming}.yml` before writing, and link to them. Do not restate numbers from memory.

## Existing programmes

Three programmes in `src/content/programs.yml`: six-day push-pull-legs, four-day upper-lower and the five-day paired-muscle split (back and biceps, quad legs, chest and triceps, shoulders and abs, hip legs). Each has `days` (with `exercises` as prescriptions of `exercise`, `sets`, `reps`, `rir`, `rest` seconds, `note`), a `week` layout, a `block` of weeks and `principles`. `npm run check:content -- --report` prints weekly sets per muscle: run it after any programme change and make sure every major muscle group has working sets.

## Choosing and building a programme

1. Days per week and session minutes decide the split, not preference. Fewer days favour full-body or upper-lower, more days allow body-part or paired splits. Keep at least one rest day between sessions that train the same muscles hard.
2. Each major muscle gets enough weekly working sets to be inside the range the volume principle documents. Read that principle for the numbers and their limits.
3. Order: the demanding multi-joint lift first, isolation later. Put the priority muscle early in the session.
4. Rep range, rest and proximity to failure follow the principles pages and their grades. State them as conventions where the evidence is thin.
5. Progression is double progression: add reps within the range, then add load, with a deload or repeat-the-week rule in the `block`.
6. Every day names substitutions for missing equipment and for pain, using the exercise's `regression` and `alternatives`.

## Exercises and variations

- An exercise lists `primary` and `secondary` muscles from `src/content/muscles/`, `pattern`, `equipment`, `level`, `spinalLoad`, and the safety fields (contraindications, regression, progression, `painRule`).
- A variation records what changes (`change`) and, only if a study supports it, `emphasis` plus a `claim` id. A variation without growth evidence is shown as "No growth evidence", a hypothesis not a finding.
- Words such as "targets", "best for" and "most effective" need a claim. Muscle activity (EMG) does not show growth: set `emgOnly: true` and say so.
- `foundation`-level exercises exist only for squat, glute and lower-back work.

## Muscle content

Each muscle page covers origin, insertion, innervation, actions, role, synergists, growth notes, injuries, red flags and prerequisites. Anatomy sources are the 1918 Gray plus modern OpenStax regional references. Check anatomy against both.

## Levels of lifter

- **Beginner:** the getting-started section and the `foundation` exercises. Technique first, low volume, full body.
- **Intermediate:** the three programmes.
- **Advanced and sports people:** same programmes with a sport overlay. Hand sport-specific power, rotation and injury work to the executive for `plyometrics-coach`; keep the gym strength base here.

## Research queue (verify each before use)

Search Europe PMC titles and abstracts for: weekly set volume and hypertrophy meta-analyses, training frequency, proximity to failure, range of motion and muscle length, exercise-order effects, and regional hypertrophy for the muscles still thin on content (back, shoulders, arms, core).
