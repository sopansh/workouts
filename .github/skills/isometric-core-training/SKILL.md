---
name: isometric-core-training
description: Isometric, anti-movement and back-safe core training for workouts.theroningamer.com, including how the existing /core/ guide is structured, how to programme holds and how to progress and regress trunk work safely. Use when adding or changing core, trunk-stability or isometric exercises or the /core/ phases.
---

# Isometric and back-safe core training

## What exists

The `/core/` guide has phases (`src/content/core/phases.yml`) and eight exercises (`exercises.yml`) with 3D figures: McGill curl-up, side plank, bird dog, glute bridge, cat-cow, dead bug, goblet squat and kettlebell swing. Phase text says when to move on. It is general education for a back-safe approach, not rehabilitation.

## Classify trunk work

| Demand | Meaning | Examples |
|---|---|---|
| Anti-extension | Resist the lower back arching | Dead bug, plank, ab wheel rollout |
| Anti-lateral flexion | Resist side bending | Side plank, suitcase carry |
| Anti-rotation | Resist twisting | Pallof press |
| Hip extension without spinal load | Glutes work, spine stays neutral | Glute bridge, hip thrust |
| Spine and hip control on hands and knees | Limb movement with a still trunk | Bird dog |

Every trunk exercise page names the demand it trains.

## Programming holds

- Start with short holds repeated (several seconds, repeated reps) rather than one long hold. Stop a hold when form or breathing breaks, not at a number.
- Breathe normally. Bracing is a gentle abdominal brace, not breath-holding.
- Progress one variable at a time: hold time, then lever length, then load, then instability. Keep a regression on every page.
- Stated dose is a convention unless a graded claim supports it. Read `claims/` before writing any dose rationale.
- The pain rule for the lower back applies to everything here (`lower-back`). A back ache that builds, or pain into the buttock or leg, means stop and use the regression.

## Back-safe principles to keep consistent

- Follow the stance the `/core/` page already takes (McGill's curl-up, side plank and bird dog; Oranchuk et al. 2019 on isometric training). Do not introduce a new stance on spinal position or loading without a verified, graded source.
- Hip hinge and glute work carry load so the lumbar spine does not.
- Red flags to list wherever back pain is mentioned: leg weakness or foot drop, numbness around the saddle area, bladder or bowel change (urgent), night pain, pain below the knee, pain that does not improve in two to three weeks. Link the NHS back pain source already in the registry.

## Content rules

- New exercises appear in the strength `core.yml` data, and in `/core/` only when they suit a back-safe phase. `/core/` entries also need `poses`: see `exercise-animation` for the rig's limits. Do not add a pose the rig cannot show.
- Evidence for core claims is mostly muscle-activity studies: set `emgOnly: true`, grade C, and say activity is not training benefit.
- Do not call any programme "rehab" or "fixes back pain".
