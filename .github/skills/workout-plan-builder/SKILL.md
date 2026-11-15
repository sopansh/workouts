---
name: workout-plan-builder
description: Turns a person's stated need (experience, days per week, session length, equipment, goal, sport, body-weight or body-fat goal) into a safe, structured training plan from beginner through intermediate to sports person, using the programmes and guides already on workouts.theroningamer.com. Use when asked to suggest or curate a workout plan for a specific person or profile.
---

# Workout plan builder

## 1. Needs analysis (ask, do not assume)

Collect these. Ask with `ask_user` when any is missing and it changes the plan.

| Question | Why |
|---|---|
| Adult? Any medical condition, current injury, pregnancy or postnatal? | Out-of-scope people get a clinician pointer, not a plan |
| Training age: never trained, under a year, years of consistent lifting | Picks the entry point |
| Days per week and minutes per session | Picks the split |
| Equipment: none, bands, dumbbells, full gym | Picks the exercises |
| Goal: muscle, strength, general fitness, a sport | Picks emphasis |
| Body weight and body-fat goal | Handled as a nutrition and training pair (see below) |
| Sport and season, if any | Adds a sport overlay |
| Preferences and exercises to avoid | Adherence |

## 2. Choose the entry point

| Profile | Start from |
|---|---|
| Never trained, or returning after a long break | Getting-started section: bodyweight ladders, eight weeks |
| Wants bodyweight skills | Calisthenics (route through the executive to `calisthenics-coach`) |
| Trained consistently, 3 to 4 days | Upper-lower programme |
| Trained consistently, 5 to 6 days | Paired-muscle split or push-pull-legs |
| Sports person | A strength programme plus a sport overlay (route through the executive to `plyometrics-coach`) |
| Low back sensitivity | The `/core/` guide first, then foundation-level squat, glute and lower-back work |

Use an existing programme and adapt it. Build a new one as a `programs.yml` entry only when no existing programme fits, and then run `npm run check:content -- --report`.

## 3. Weight and body-fat goals

Training does not set the calorie target. Give the training side (resistance training, a sensible weekly volume, daily activity) and send the nutrition side to the executive for `nutrition-coach`. Never promise a body-fat result or a timeline, never claim spot reduction, and never advise a crash approach. Progress is tracked by performance and measurements the person chooses, not by a fixed number.

## 4. Output: a plan card

```
Profile: <training age, days, minutes, equipment, goal>
Programme: <existing programme id or new>
Week: <day-by-day layout with rest days>
Sessions: <exercises with sets, reps, reps in reserve, rest>
Progression: <double progression rule, deload or repeat-the-week rule>
Substitutions: <for equipment and for pain>
Safety: <contraindications, pain rule, scope exclusions>
Evidence: <claims and grades the choices rest on, and conventions flagged>
Handoffs: <nutrition, sport overlay, review>
```

## 5. Checks

- Sessions are not on consecutive days for the same muscles.
- Weekly sets per muscle sit inside the range the volume principle documents, and training frequency matches the programme chosen (run the `--report` check).
- The plan fits the stated minutes (the guide plans use a time estimate formula; reuse it).
- `safety-review` passes, and the plan is labelled draft and not a personal prescription.
