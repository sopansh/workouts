---
name: calisthenics-onboarding
description: Places a person into the calisthenics section by test, for complete beginners and for experienced lifters, and sets out the entry paths, the first eight weeks and the handoffs. Use when asked for a calisthenics plan for a specific profile or to design onboarding pages.
---

# Calisthenics onboarding

Never assume a level. Place each person by the section's placement tests, and send out-of-scope people to a clinician.

## Check scope first

Adult, no current injury, no condition that affects exercise, not pregnant or postnatal. If any answer is "unsure", the plan is "speak to a GP first" plus the PAR-Q+. Wrist, shoulder, elbow or back symptoms mean stop and see a clinician. Do not write a plan for a named real person into the public repo.

## Two entry paths

| Profile | Path |
|---|---|
| **No strength-training experience** | Foundations from level 1 of each ladder, placed by test. Weeks 1 and 2 stay well short of failure. The getting-started section (owned by `strength-coach`) is an alternative gentler start for someone who has never trained. |
| **Prior strength training (lifting or other sport)** | Take the placement tests on day one. Start each ladder at the level the test gives, not at level 1. Expect strong legs and a stronger push than pull; expect wrists, shoulders and straight-arm positions to be the weak link. Start joint preparation at the base level whatever the strength: tendons and wrists do not catch up quickly. Still begin with the easy first weeks. |

Experienced lifters are not exempt from gates. A heavy barbell squat does not satisfy a hollow-body or wrist gate.

## First eight weeks (foundations)

Three sessions a week on non-consecutive days (see the `cal-foundations` plan). Each session: the 8-minute preparation, then ladders at the person's level. Two sets in the first weeks and a third later, reps in reserve shown for the week, move up one level only when the top of the range is reached on every set with clean form. Retest in week eight.

## When to open skills

After the foundations and all of a skill's gates. If a gate is not met, repeat the foundations and retest. This is a normal result, not a failure. First-skills work is short, in small steps, with the wall or floor as support.

## Handoffs (through the executive)

- Body weight, body fat or fuelling questions: `nutrition-coach`.
- Heavier loaded work, hypertrophy or a gym plan: `strength-coach`.
- Jumping, power or sport: `plyometrics-coach`.
- A person who wants a skill beyond the last level: a qualified coach.

## Page ideas for the section (propose to the executive)

An "I already lift" entry page with the placement table and a fast-start path, a weekly-tracker template people can copy, and a deload or repeat-the-week guide. Each follows `site-content-authoring`, with sources through `evidence-and-sources` and a gap statement where evidence is missing.

## Output for a profile (chat use)

```
Scope check: <passed | referred>
Entry path: <no experience | experienced>
Placement: <level per ladder from the tests, and why>
Week 1: <days and sessions>
Weeks 2 to 8: <progression rule>
Gates: <which skills are open, which are not yet and what is missing>
Safety: <pain rules and red flags>
Evidence: <what rests on a graded source and what is convention>
```
