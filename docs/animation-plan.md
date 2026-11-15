# Extending the 3D exercise rig: engineering plan

Status: **owner approved the illustrative extension on 2026-11-15; references integrated into all 68 strength exercise pages.** Guide sections and human review remain pending. Side plank uses a still hold rather than invented repetitions.
Related: [`CONTEXT.md`](../CONTEXT.md) (section 4 and the core rig notes), [`agents/directives.md`](./agents/directives.md) (D-001), `.github/skills/exercise-animation/SKILL.md`, `docs/animation-specs/` (movement specs, written by `strength-coach`).

## 1. Decision and goal

The owner chose to extend the in-house Three.js rig (no GIFs, video or imported models such as Mixamo), starting with **hypertrophy**, then getting-started, calisthenics and plyometrics. These are approximate visual references, not anatomically exact simulations or clinical form checks. D-008 supersedes the precision prerequisites below: exact joint depth, anthropometry and passive-range tables are not blockers. Start with bench press and squat; retain stable limb lengths, recognisable motion, sensible contacts, accessibility and draft labels.

## 2. Existing core rig

| Part | Fact |
|---|---|
| Data | `src/content/core/exercises.yml`: `poses.start` and `poses.end`, side-on 2D joint points `[x, y]` (an optional `z` is supported), `cycle`, `glow`, `spineBend` |
| Joints | head, shoulder, elbow, wrist, hip, knee, ankle, toe, plus far-side elbow, wrist, knee, ankle, toe. One shoulder and one hip point serve both sides |
| Motion | Linear blend of joint **positions** between two poses, eased (`cycleWeight`) |
| Drawing | Spheres and tapered cylinders built from joint positions. The spine is a quadratic curve from shoulder to hip |
| Stage | One shared WebGL renderer, copied into per-card 2D canvases (browsers cap WebGL contexts) |
| Props | A kettlebell only |
| Highlight | `torso` and `hips` regions only |

## 3. Why that cannot show real joint motion

1. **Positions, not angles.** Blending positions shortens limbs mid-rep on any arc, and nothing stops a joint bending past its anatomical limit. Real motion is rotation about a joint.
2. **Side-on only.** Shoulder abduction (lateral raise), rotation (face pull, external rotation), single-leg asymmetry and anything frontal are impossible to author faithfully.
3. **One shoulder and one hip point** means no scapula, no pelvis tilt and no left-right difference.
4. **No props** (bench, bar, machine, box, wall, bar), so exercises look like mime.
5. **No muscle-level highlight**, even though every exercise already lists primary and secondary muscles.

## 4. Approach: a skeleton driven by joint angles

Keep the look, the single shared `Stage`, the data-driven YAML and the playback controls. Replace the pose model.

1. **Skeleton.** Bones of fixed illustrative length, with only the joint rotations needed for each prototype. More detailed pelvis, spine, scapula and wrist motion can follow when an exercise needs it; an anthropometric table is not a prerequisite.
2. **Poses as angles.** An exercise's keyframes are joint angles in degrees, plus where the body is anchored (hands on a bar, feet on the floor, back on a bench). Forward kinematics places every bone, so limb length never changes.
3. **Input checks.** Reject non-finite angles, invalid timing and impossible contact geometry. Illustrative engineering bounds are not normal human ranges; do not claim clinical validation.
4. **Contacts.** Anchors keep a hand on a bar or a foot on the floor, and a validator checks the contact points stay put (no sliding feet in a squat). Start with simple two-bone inverse kinematics for limbs holding a fixed point.
5. **Keyframes and timing.** More than two poses per rep (start, bottom, top), with per-segment easing for tempo (seconds down, hold, up).
6. **Props.** Parametric simple shapes with real dimensions: barbell and plates, dumbbell, bench (flat, incline), box, wall, machine pad, cable and handle, pull-up bar, chair. Built once, shared across figures.
7. **Camera.** Per-exercise default angle from the spec, with the existing drag and keyboard rotation kept.
8. **Muscle highlight.** Optional meshes for the major muscle regions, tinted from the exercise's `primary` and `secondary` (already in the data) using the existing glow idea, so the glow matches the muscle pages.
9. **Wrong-form clips.** An optional second, labelled clip per exercise for a common fault, off by default.

Back-compatibility: the eight `/core/` exercises keep working through an adapter that converts their 2D joint positions, so the page does not regress while hypertrophy is built. Migrate `/core/` to angles last, if at all.

### Phase 1 implementation

The non-linked, `noindex` prototype is at `/strength/animation-preview/`. It draws bench press and back squat using `prototype-math.js` (fixed-length, two-bone contact geometry) and `prototype-figure.js` (simple figure, bench and bar), with `animation-preview.ts` connecting the existing `Stage`, playback and rotation controls. No new renderer or dependency was added. The legacy `/core/` pose maths and renderer are unchanged; no adapter or core migration was needed.

These movement configurations are illustrative engineering values, not a medical range table.

### Chest and legs integration

`src/content/animations/{chest,legs}.yml` contains the first 34 configurations referencing the existing exercises. The exercise template inserts `ExerciseAnimation.astro` after the written instructions without changing setup, safety, progression or evidence text. `AnimationAssets.astro`, `AnimationControls.astro` and the shared controller also serve the preview page. Pages with no illustration do not load its Three.js assets or initialise the illustration controller.

`exercise-math.ts` defines fixed-length contact chains and movement-family paths; `exercise-figure.ts` reuses the prototype figure and shared Stage. Geometry, equipment and timing are engineering conventions, not clinical ranges. Walking lunge is a single advancing step with a reset, Nordic omits the catch and assistance, and push-up plus shows only the plus phase; these limits are stated next to each canvas.

### Remaining strength integration

`src/content/animations/{back,shoulders,arms,core}.yml` adds 12 back, 7 shoulder, 10 arm and 5 trunk references, ordered 35–68.
Pulls, rows, overhead presses, raises, curls, extensions and trunk work use exercise-family paths and simple equipment on the
same shared Stage. Every strength exercise now needs a matching configuration; adding an exercise without one fails validation.
The original eight `/core/` illustrations and the unanimated guide sections are unchanged.

Bird dog, one-arm row, cable lateral raise, external rotation and suitcase carry show one side; the carry is one short step and
reset, not a complete walking distance. Side plank is explicitly `motion: hold` and stays still while the view can rotate.
The deadlift has a low schematic start rather than a validated floor setup. Cable crunch uses a single torso segment and
hanging leg raise omits a separate pelvic curl. Forearms and hands are simplified; finger positions and detailed scapula,
spine and shoulder rotation are not represented. Descriptions beside the canvases state relevant limits.

## 5. Implemented data model

```yaml
# Entry in src/content/animations/chest.yml
id: barbell-bench-press
exercise: barbell-bench-press
order: 1
description: The bar lowers towards the chest and presses back up; the back rests on a flat bench and the feet stay planted.
family: press
variant: flat
equipment: barbell
tempo: [2.5, 0.5, 1.5, 0.5]     # out, hold, return, rest in seconds
range: [5, 100]                 # illustrative family values, not a measured joint range
incline: 0
lean: 0
yaw: 0.35
```

The `animations` collection has a Zod schema in `content.config.ts`, reusing the movement module's family, variant, equipment
and motion enums. `check-content.mjs` additionally validates family/equipment combinations, timing, geometry, exercise
references and complete strength coverage. `motion` defaults to `move`; the side-plank reference uses `hold`, preserving the
same pose throughout the cycle. `ExerciseAnimation` renders the canvas and text alternative; toolbar controls are shared.
Exercise pages look up the animation by matching exercise id.

Per-muscle meshes, wrong-form clips, arbitrary angle keyframes and a pose-authoring editor remain future work; the implemented data should not imply those features exist.

## 6. Verifying that motion is "real"

The approved prototype uses explicit illustrative values, not measured human ranges. The references below remain optional research for later refinement; their inaccessible tables do not block implementation:

| Reference | Verified on Crossref 2026-11-15 | Use |
|---|---|---|
| Soucie et al., "Range of motion measurements: reference values and a database for comparison studies", *Haemophilia*, doi 10.1111/j.1365-2516.2010.02399.x | Yes (Crossref year 2010) | **Intended** as the source of normal passive range for elbow, shoulder flexion, hip, knee and ankle. **Not usable yet:** the full text is paywalled and the abstract has no numbers, so no angle is taken from it until someone with access reads its tables |
| Wu et al. 2005, "ISB recommendation on definitions of joint coordinate systems of various joints for the reporting of human joint motion, Part II: shoulder, elbow, wrist and hand", *J Biomech*, doi 10.1016/j.jbiomech.2004.05.042 | Yes | Axis and sign **conventions** for shoulder, elbow, wrist |

Gaps: Soucie covers elbow, shoulder flexion, hip, knee and ankle only, **not** scapula, spine, shoulder rotation or abduction range. Wu 2005 (Part II) covers the upper limb only. Its companion, Part I (ankle, hip and spine), is on Crossref as Wu et al. 2002, doi 10.1016/s0021-9290(01)00222-6, with a second record from 2003 (doi 10.1016/s0021-9290(02)00336-6) that may be a correction; the abstract of Part I **has not been read** and the 2003 record's type is unchecked. Any angle without a source is labelled a coaching approximation in its spec (as `strength-coach` has been told to do). Anthropometric segment proportions (for bone lengths) need their own verified source: de Leva 1996 and Plagenhoef 1983 are cited by a web page I read, but **I have not yet read or verified either**.

Two further checks, neither a citation:
1. **Engineering:** finite input, fixed segment length, contact and timing tests (through the executive); no claim that these certify human form. Verify the exercise's intended joint action and stationary equipment, not merely that a pose or image changes. Holds must remain still. Inspect start and working poses, including desktop and mobile framing.
2. **Human:** a physiotherapist or strength coach reviews each animation next to its page, because a wrong-looking squat teaches wrong form. All animations stay labelled draft.

Plus the existing standards: text alternative for every canvas (exercise, movement, how to rotate), keyboard control, pause, reduced motion shows a still working pose, tokens for colour, one WebGL context.

## 7. Phases

| Phase | Deliverable | Done when |
|---|---|---|
| 0 | This plan and the movement specs for chest and legs (`docs/animation-specs/`) | Approved 2026-11-15 for illustrative references; unsourced values labelled approximate |
| 1 | **Spike:** fixed-length motion and simple props, rendering barbell bench press and back squat on a non-linked prototype page | Recognisable motion, fixed limb lengths, sensible contacts, no console errors, keyboard/pause/reduced motion verified |
| 2 | Animation collection, schema, validator rules, `<ExerciseAnimation>`, Playwright spec | `npm run check` and `test:e2e` pass; invalid animation inputs fail explicitly |
| 3 | Chest and legs exercises animated and linked from their pages | Implemented: 34 references; draft pending human review |
| 4 | Back, shoulders, arms, core | Implemented: 34 further references, including the still side-plank hold; draft pending human review |
| 5 | Getting started, calisthenics (inversions, levers and holds need the frontal plane and balance), plyometrics (jumps need flight and landing) | Specs first, per section |
| 6 | Reviewer sign-off, then remove draft labels | Named human reviewers |

## 8. Risks and open decisions

| Risk or question | Mitigation or decision needed |
|---|---|
| Effort: strength's 68 references are implemented; guide coverage remains a separate wave | Reuse strength movements for getting-started before adding calisthenics balance or plyometric flight/landing |
| Approximate form looks authoritative | Prominent draft/reference-only labels, text instructions and human review before claiming correctness |
| Performance with many canvases on one page | Keep the single shared `Stage` and render only visible cards (as `/core/` does) |
| Inverse kinematics complexity | Start with two-bone IK only for fixed contacts, keyframe everything else |
| Muscle meshes could imply precision we lack | Highlight regions, not individual muscle shapes, and label as indicative |
| **Owner decision:** Mixamo was declined. Reconsider only if the spike shows hand-authoring cost is too high | Revisit after phase 1 |
| **Owner decision:** build phase 1 now | Approved as illustrative; no wait for exact angles or joint depth |

## 9. Findings from the movement specs (round one, precision prerequisites superseded by D-008)

`strength-coach` wrote 34 specs (12 chest, 22 legs) in `docs/animation-specs/`. Facts that change this plan:

- **No global range table.** Because Soucie's numbers are unreadable, each spec states its own end value and a "never beyond" limit, and the build-time joint-limit check needs a per-exercise limit field until the tables are read.
- **Sourced versus approximate.** 19 references were confirmed on Crossref. A few angles are sourced (back-squat knee flexion, knee-extension range, calf-raise ankle range, bench elbow flare studied, Nordic curl, dip shoulder extension). Scapula, spine, wrist, machine geometry and all tempos are coaching approximations. Hip flexion in squats and the bench-bottom elbow angle are derived from segment proportions that were **recalled, not verified**.
- **Anthropometric table deferred.** Under D-008, prototype segment proportions are illustrative engineering choices, not measured anatomical values.
- **Shoulder convention.** Specs use elevation, plane and rotation. The data model in section 5 must use the same, not `flexion` plus `abduction`, because the order of application changes the pose.
- **Rig needs listed by the specs:** scapula joint, multi-segment spine, pelvis tilt and obliquity, forearm pronation, toe joint, foot and hand contact constraints with inverse kinematics, a moving figure for lunges, and bench, bar, box, dip-bar and machine props.

## 10. Housekeeping found while writing this

- The `exercise-animation` skill gives Soucie as 2011. Crossref records the paper as 2010 (the issue is dated 2011). Correct the skill when the plan is approved.
- Neither reference above is in `sources.yml` yet. Add them (section `strength`, with `verifiedOn`) once a page cites them.
