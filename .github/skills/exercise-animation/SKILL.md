---
name: exercise-animation
description: How visual exercise animations work on workouts.theroningamer.com today (the shared 3D stick-figure rig), what it cannot show, the owner's decision to extend it, and how a coach prepares an exercise for animation. Use when an exercise page needs a visual, when authoring pose data, or when asked for a GIF or video.
---

# Exercise animation

The site does not use GIFs or video. Exercises are shown as animated 3D figures drawn by one shared Three.js rig, driven by pose data in YAML. **Do not add GIFs, videos or third-party character models without the owner's approval** (directive D-001).

## What exists today

- Only `/core/` has animations. Hypertrophy, getting-started, calisthenics and plyometrics have none yet.
- Data: `src/content/core/exercises.yml`, validated by the `coreExercises` schema in `src/content.config.ts`. Each exercise has `poses.start` and `poses.end`, `cycle` (seconds per rep), `glow` (`torso` and `hips` worked-region highlight) and optional `spineBend`.
- A pose is side-on, 2D joint coordinates in SVG-style units: origin top-left, y grows down, floor at y = 150, centre x = 150. Joints: `head, shoulder, elbow, wrist, hip, knee, ankle, toe`, plus optional far-side `farElbow, farWrist, farKnee, farAnkle, farToe` (default to the near side).
- Code: `src/scripts/core/` (`rig/figure.js`, `rig/pose.js`, `stage.js`, `main.js`). One shared WebGL context renders into per-card 2D canvases. Never create a renderer per card.
- The page renders the cards at build time and passes the data to the script as JSON. The canvas has an `aria-label`, pause and speed controls, arrow-key rotation, and a still working pose under `prefers-reduced-motion`.

## Limits of the current rig

- Side-on only. It cannot show frontal-plane or rotational movement faithfully (lateral raises, rotations, side-to-side hops, single-leg asymmetry, a handstand, a lever).
- Poses blend by linearly interpolating joint positions. Limbs shorten mid-rep on large arcs, so big rotations look wrong.
- No joint-angle limits and no props beyond a kettlebell. No box, bar, bench, chair, wall or cable.
- Only a torso and hips glow, not individual muscles.

If an exercise needs something the rig cannot do, **record the need and do not ship an approximation**: a wrong-looking movement teaches wrong form.

## Owner decision: extend our own rig

The owner chose to keep and extend the in-house rig (no Mixamo or other imported models), improving the joints and movements so they follow real human joint motion, starting with the hypertrophy section. The executive plans and delegates the engineering. Coaches do not edit `src/scripts/`.

Candidate references for joint limits and conventions, **found on Europe PMC and not yet verified on Crossref** (verify with `evidence-and-sources` before any page cites them): Soucie et al. 2011, "Range of motion measurements: reference values and a database for comparison studies" (doi 10.1111/j.1365-2516.2010.02399.x); Wu et al. 2005, ISB recommendation on joint coordinate systems for the shoulder, elbow, wrist and hand (doi 10.1016/j.jbiomech.2004.05.042).

## Preparing an exercise for animation (coach task)

Until the extended rig lands, deliver a **movement spec** with the exercise, kept next to its data or in the report:

1. Plane(s) of movement (sagittal, frontal, transverse) and the camera angle that shows the key joint action.
2. Start and end positions as joint angles in plain degrees, for each joint that moves: hip, knee, ankle, spine, shoulder (flexion, abduction, rotation), elbow, wrist, scapula where it matters.
3. Joints that must stay fixed (for example a neutral spine, locked elbows).
4. Tempo: seconds down, hold, seconds up (matches `cycle`).
5. Props and their dimensions, and what each contacts (bar, bench, box, wall, floor).
6. Muscles that work, to drive the highlight (use the exercise's `primary` and `secondary`).
7. Common faults worth showing as a second, labelled "wrong" clip, if any.
8. Whether the exercise is bilateral or one-sided, and which side.

Check every angle against a verified range-of-motion source before it is called correct, and keep the movement inside the exercise's contraindications.

## Standards for any animated exercise

- A text alternative for every canvas: the exercise name, the movement and how to rotate.
- Works with the keyboard, pause control and reduced motion.
- No colour literals: use tokens. Reuse the shared stage and one WebGL context.
- Animations are labelled draft until reviewed, like the text.
- Add a Playwright check that the figure draws and animates.
