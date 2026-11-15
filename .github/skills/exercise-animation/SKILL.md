---
name: exercise-animation
description: How visual exercise animations work on workouts.theroningamer.com today (the shared 3D stick-figure rig), what it cannot show, the owner's decision to extend it, and how a coach prepares an exercise for animation. Use when an exercise page needs a visual, when authoring pose data, or when asked for a GIF or video.
---

# Exercise animation

The site does not use GIFs or video. Exercises are shown as animated 3D figures drawn by one shared Three.js rig, driven by pose data in YAML. **Do not add GIFs, videos or third-party character models without the owner's approval** (directive D-001).

## What exists today

- `/core/` retains its eight legacy animations; all 68 strength exercise pages have references (side plank is a still hold). `/strength/animation-preview/` reuses the bench-press and squat illustrations as a non-linked preview. Getting-started, calisthenics and plyometrics are not animated yet.
- Data: `src/content/core/exercises.yml`, validated by the `coreExercises` schema in `src/content.config.ts`. Each exercise has `poses.start` and `poses.end`, `cycle` (seconds per rep), `glow` (`torso` and `hips` worked-region highlight) and optional `spineBend`.
- A core pose uses joint coordinates `[x, y]` or `[x, y, z]` in SVG-style units: origin top-left, y grows down, floor at y = 150, centre x = 150; missing z defaults to zero. Joints: `head, shoulder, elbow, wrist, hip, knee, ankle, toe`, plus optional far-side `farElbow, farWrist, farKnee, farAnkle, farToe` (default to the near side).
- Code: `src/scripts/core/` (`rig/figure.js`, `rig/pose.js`, `stage.js`, `main.js`). One shared WebGL context renders into per-card 2D canvases. Never create a renderer per card.
- The page renders the cards at build time and passes the data to the script as JSON. The canvas has an `aria-label`, pause and speed controls, arrow-key rotation, and a still working pose under `prefers-reduced-motion`.

## Strength illustration authoring

- `src/content/animations/{chest,legs,back,shoulders,arms,core}.yml` holds one configuration per exercise: matching `id`/`exercise`, explicit `order`, movement `description`, `family`, `variant`, `equipment`, four-part `tempo` (out, hold, return, rest), illustrative `range`, `incline`, `lean` and camera `yaw`. Optional `motion` defaults to `move`; side plank uses `hold` and stays still.
- `ExerciseAnimation.astro` renders the reference and safely passes JSON through a data attribute. `AnimationAssets.astro` and `AnimationControls.astro` share loading and toolbar controls; the controller supports one or several canvases with one Stage.
- `exercise-math.ts` uses fixed-length chains and exercise-family paths; `exercise-figure.ts` draws them and simple props. Shared enums define schema values. The content checker rejects unsupported combinations, invalid geometry/timing and missing illustrations for any strength exercise.
- Walking lunges show one advancing step followed by a reset; Nordic curls omit the hand catch/assistance; push-up plus shows only the small plus phase. Keep these limits in both visible descriptions and canvas alternatives.
- Bird dog and unilateral equipment movements show one side; suitcase carry shows one short step and reset. Deadlift's low start is schematic, cable crunch has a single torso segment and hanging leg raise omits a separate pelvic curl. Keep these limits visible. Finger positions, detailed shoulder rotation, scapula and spinal articulation remain limited.
- These are schematic references, not measured anatomy, outcome claims or validated technique. Core's legacy position-interpolated rig is unchanged.

## Limits of the legacy core rig

- Side-on only. It cannot show frontal-plane or rotational movement faithfully (lateral raises, rotations, side-to-side hops, single-leg asymmetry, a handstand, a lever).
- Poses blend by linearly interpolating joint positions. Limbs shorten mid-rep on large arcs, so big rotations look wrong.
- No joint-angle limits and no props beyond a kettlebell. No box, bar, bench, chair, wall or cable.
- Only a torso and hips glow, not individual muscles.

If an exercise needs something the rig cannot do, record the need. Under D-008, clearly labelled illustrative approximations are approved; do not present them as validated form or measured anatomy.

## Owner decision: extend our own rig

The owner approved extending the in-house rig (no Mixamo or other imported models), starting with hypertrophy. The visuals are reference illustrations: approximate angles, proportions and depth are acceptable, without waiting for exact range tables. Preserve recognisable movement, stable limb lengths and sensible contacts. The executive plans and delegates the engineering. Coaches do not edit `src/scripts/`.

References for joint conventions and limits, confirmed on Crossref on 2026-11-15: Wu et al. 2005, ISB recommendation on joint coordinate systems for the shoulder, elbow, wrist and hand (doi 10.1016/j.jbiomech.2004.05.042), and its Part I companion for the ankle, hip and spine (Wu et al. 2002, doi 10.1016/s0021-9290(01)00222-6). Soucie et al., "Range of motion measurements: reference values and a database for comparison studies" (doi 10.1111/j.1365-2516.2010.02399.x, Crossref year 2010) is intended as the normal-range source but its full text is paywalled and its abstract has no numbers, so **take no angle from it until someone reads its tables**. The 19 references used by the chest and legs specs are in `docs/animation-specs/README.md` section 4. See `docs/animation-plan.md`.

## Preparing an exercise for animation (coach task)

For a movement not yet supported by the extended rig, deliver a **movement spec** with the exercise, kept next to its data or in the report:

1. Plane(s) of movement (sagittal, frontal, transverse) and the camera angle that shows the key joint action.
2. Start and end positions as joint angles in plain degrees, for each joint that moves: hip, knee, ankle, spine, shoulder (flexion, abduction, rotation), elbow, wrist, scapula where it matters.
3. Joints that must stay fixed (for example a neutral spine, locked elbows).
4. Tempo: seconds down, hold, seconds up (matches `cycle`).
5. Props and their dimensions, and what each contacts (bar, bench, box, wall, floor).
6. Muscles that work, to drive the highlight (use the exercise's `primary` and `secondary`).
7. Common faults worth showing as a second, labelled "wrong" clip, if any.
8. Whether the exercise is bilateral or one-sided, and which side.

Label unsourced animation angles and proportions as illustrative engineering choices, not verified anatomical values. No exact range-of-motion research is required for the approved prototype. Keep the movement consistent with the exercise's text and contraindications.

## Standards for any animated exercise

- A text alternative for every canvas: the exercise name, the movement and how to rotate.
- Works with the keyboard, pause control and reduced motion.
- No colour literals: use tokens. Reuse the shared stage and one WebGL context.
- Animations are labelled draft until reviewed, like the text.
- Test the intended action and contacts, not just changing pixels. Inspect start and working poses with equipment and camera framing; an approximation still needs to depict the right movement.
- Add a Playwright check that a moving reference draws and animates; an isometric hold stays still and remains keyboard-rotatable.
