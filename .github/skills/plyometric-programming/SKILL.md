---
name: plyometric-programming
description: How to design safe, progressive plyometric and jump programmes for workouts.theroningamer.com, from landing mechanics to jumps, with foot-contact budgets, readiness gates, session structure and the rules the validator enforces. Use when adding or changing plyometric exercises, plans or progression content.
---

# Plyometric programming

## What exists

The plyometrics section (`/plyometrics/`) has a two-session week (`two-session-week` in `guides/plans/plyometrics.yml`, phase `base`): session A for vertical power and session B for lateral control, with shared ankle, calf and balance work. Exercises are in `guides/exercises/plyometrics.yml`. Jump exercises carry a weekly `schedule` of `weeks`, `sets`, `reps`. The page also explains tendons and connective tissue, with graded claims in `claims/plyometrics.yml` (the "fascia" topic is connective tissue and tendon, not a single structure; the Achilles review ranks plyometrics and isometrics differently for size and stiffness).

## Progression continuum

Move through these only when the previous stage is quiet, controlled and pain-free for both sessions and the days after:

1. **Preparation:** ankle mobility, calf raises (straight and bent knee), single-leg balance, squat to calf raise. No impact.
2. **Landing:** stick a landing from a small step or from a small jump, quiet and balanced. Teach landing before any repeated jumping.
3. **Low-amplitude hops:** ankle hops, pogos. Short ground contact, small range.
4. **Single jumps with a stick:** vertical jump and stick, then lateral hop and stick.
5. **Rebounds and repeated jumps:** continuous low hops, then higher.
6. **Box work:** step-up and step-down first, then jump up to a box, always stepping down, never jumping down, until a coach teaches it.

Floor before box. Low contacts before high. Vertical before multi-directional. Bilateral before single-leg. A person who cannot land softly does not move up. Any impact work needs a sound strength base for squat, calf and hip: use the gates on each exercise.

## Foot-contact budget

- A foot contact is one landing. A session's contacts are sets times reps summed across its jumps. Warm-up and calf or balance work are not counted.
- Contacts per session never fall from one block of weeks to the next (the validator checks every `schedule`). A deload is written as a repeat of the previous row, not a cut.
- Keep the budget conservative and state that it is a planning convention, not a validated prescription.
- Do not change the dose by more than one variable at a time (sets, reps, height or speed).

## Session structure

Warm-up (about 8 minutes) → the main jumps, fresh → strength and calf work → balance. Rest long enough that landings stay quiet (roughly one to two minutes between jump sets, longer if landings get noisy). Stop a set when landings get loud, uncontrolled or painful.

## Safety

- Use `jumping` and `ankle-foot` pain rules. Stop for back, hip, knee, ankle, foot or Achilles pain that is sharp, pinching or catching.
- Surface and footwear are part of the exercise page. A hard or slippery surface is a reason not to jump. Check the floor, the room height and that the landing zone is clear.
- Equipment constraints are stated generically ("a single box of fixed height"), and the plan never asks for more than the equipment allows. A box is stepped down from, not jumped down from.
- Plyometrics are not for under-18s, pregnancy, current lower-limb or back injury, or anyone not cleared to exercise. Say so.
- Personal circumstances never appear in the repo.

## Evidence

Verified so far: Ma 2025 (plyometrics and countermovement jump, grade A, in athletes) and Fu 2026 (tendon size and stiffness, grade B). Gaps to research and verify before claiming anything: landing-mechanics training, injury risk and dose, progression rates for adult recreational trainees, surface effects. No outcome promises such as a jump height.

## Visuals

Jumps and landings are frontal-plane and 3D. Follow `exercise-animation`: write a movement spec and do not ship an approximation.
