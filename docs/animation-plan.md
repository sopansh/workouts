# Extending the 3D exercise rig: engineering plan

Status: **proposal, awaiting owner approval. No rig code has been changed.**
Related: [`CONTEXT.md`](../CONTEXT.md) (section 4 and the core rig notes), [`agents/directives.md`](./agents/directives.md) (D-001), `.github/skills/exercise-animation/SKILL.md`, `docs/animation-specs/` (movement specs, written by `strength-coach`).

## 1. Decision and goal

The owner chose to extend the in-house Three.js rig (no GIFs, video or imported models such as Mixamo) so joints and movement follow real human joint motion, starting with the **hypertrophy** exercises, then getting-started, calisthenics and plyometrics.

## 2. What the rig does today

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

1. **Skeleton.** Bones of fixed length (proportions from a stated anthropometric table), joints with named degrees of freedom: pelvis (tilt, rotation), spine (a few segments, flexion, lateral flexion, rotation), scapula (elevation, protraction), shoulder (flexion, abduction, rotation), elbow (flexion), wrist (flexion, deviation), hip (flexion, abduction, rotation), knee (flexion), ankle (dorsiflexion, inversion). Left and right are independent.
2. **Poses as angles.** An exercise's keyframes are joint angles in degrees, plus where the body is anchored (hands on a bar, feet on the floor, back on a bench). Forward kinematics places every bone, so limb length never changes.
3. **Joint limits.** Each degree of freedom has a normal range. A build-time check fails any keyframe outside its range, with an explicit per-exercise override only where a source supports it.
4. **Contacts.** Anchors keep a hand on a bar or a foot on the floor, and a validator checks the contact points stay put (no sliding feet in a squat). Start with simple two-bone inverse kinematics for limbs holding a fixed point.
5. **Keyframes and timing.** More than two poses per rep (start, bottom, top), with per-segment easing for tempo (seconds down, hold, up).
6. **Props.** Parametric simple shapes with real dimensions: barbell and plates, dumbbell, bench (flat, incline), box, wall, machine pad, cable and handle, pull-up bar, chair. Built once, shared across figures.
7. **Camera.** Per-exercise default angle from the spec, with the existing drag and keyboard rotation kept.
8. **Muscle highlight.** Optional meshes for the major muscle regions, tinted from the exercise's `primary` and `secondary` (already in the data) using the existing glow idea, so the glow matches the muscle pages.
9. **Wrong-form clips.** An optional second, labelled clip per exercise for a common fault, off by default.

Back-compatibility: the eight `/core/` exercises keep working through an adapter that converts their 2D joint positions, so the page does not regress while hypertrophy is built. Migrate `/core/` to angles last, if at all.

## 5. Data model (sketch, to confirm before build)

```yaml
# src/content/animations/<exercise id>.yml, one file per exercise, id matches the exercise
id: barbell-bench-press
camera: { yaw: 0.6, elevation: 12 }
cycle: 4                       # seconds per rep
props: [{ type: bench, angle: 0 }, { type: barbell, load: 60 }]
anchors: { feet: floor, back: bench, hands: barbell }
keyframes:
  - at: 0.0                    # fraction of the cycle
    pose: { shoulder: { flexion: 90, abduction: 45 }, elbow: { flexion: 0 }, ... }
  - at: 0.4
    pose: { ... }
highlight: { primary: [pectoralis-major], secondary: [anterior-deltoid, triceps-brachii] }
```

A new `animations` collection, a Zod schema in `content.config.ts` (platform file, executive only), and a `<ExerciseAnimation>` component that renders the canvas, text alternative and controls. Exercise pages link to their animation by id. Where there is no animation, the page shows nothing extra.

## 6. Verifying that motion is "real"

Authoring from guesswork would defeat the purpose, so angles trace to references:

| Reference | Verified on Crossref 2026-11-15 | Use |
|---|---|---|
| Soucie et al., "Range of motion measurements: reference values and a database for comparison studies", *Haemophilia*, doi 10.1111/j.1365-2516.2010.02399.x | Yes (Crossref year 2010) | **Intended** as the source of normal passive range for elbow, shoulder flexion, hip, knee and ankle. **Not usable yet:** the full text is paywalled and the abstract has no numbers, so no angle is taken from it until someone with access reads its tables |
| Wu et al. 2005, "ISB recommendation on definitions of joint coordinate systems of various joints for the reporting of human joint motion, Part II: shoulder, elbow, wrist and hand", *J Biomech*, doi 10.1016/j.jbiomech.2004.05.042 | Yes | Axis and sign **conventions** for shoulder, elbow, wrist |

Gaps: Soucie covers elbow, shoulder flexion, hip, knee and ankle only, **not** scapula, spine, shoulder rotation or abduction range. Wu 2005 (Part II) covers the upper limb only. Its companion, Part I (ankle, hip and spine), is on Crossref as Wu et al. 2002, doi 10.1016/s0021-9290(01)00222-6, with a second record from 2003 (doi 10.1016/s0021-9290(02)00336-6) that may be a correction; the abstract of Part I **has not been read** and the 2003 record's type is unchecked. Any angle without a source is labelled a coaching approximation in its spec (as `strength-coach` has been told to do). Anthropometric segment proportions (for bone lengths) need their own verified source: de Leva 1996 and Plagenhoef 1983 are cited by a web page I read, but **I have not yet read or verified either**.

Two further checks, neither a citation:
1. **Build-time:** joint-limit and contact checks in `check-content.mjs` (through the executive).
2. **Human:** a physiotherapist or strength coach reviews each animation next to its page, because a wrong-looking squat teaches wrong form. All animations stay labelled draft.

Plus the existing standards: text alternative for every canvas (exercise, movement, how to rotate), keyboard control, pause, reduced motion shows a still working pose, tokens for colour, one WebGL context.

## 7. Phases

| Phase | Deliverable | Done when |
|---|---|---|
| 0 | This plan and the movement specs for chest and legs (`docs/animation-specs/`) | Owner approves; every angle in the specs is sourced or flagged |
| 1 | **Spike:** skeleton, forward kinematics, joint limits and a prop or two, rendering one lift (barbell bench press) and one leg lift (back squat), behind a non-linked page | Both look correct to a trained eye, limbs never change length, feet and bar stay anchored, no console errors |
| 2 | Animation collection, schema, validator rules, `<ExerciseAnimation>`, Playwright spec | `npm run check` and `test:e2e` pass; a deliberately out-of-range angle fails the build |
| 3 | Chest and legs exercises animated and linked from their pages | Every animated exercise matches its spec; reduced motion and keyboard verified |
| 4 | Back, shoulders, arms, core | Same checks |
| 5 | Getting started, calisthenics (inversions, levers and holds need the frontal plane and balance), plyometrics (jumps need flight and landing) | Specs first, per section |
| 6 | Reviewer sign-off, then remove draft labels | Named human reviewers |

## 8. Risks and open decisions

| Risk or question | Mitigation or decision needed |
|---|---|
| Effort: about 70 hypertrophy exercises, 69 guide exercises, 8 core. This is large | Do chest and legs first and judge the cost per exercise before committing to the rest |
| Wrong form shown looks authoritative | Draft labels, sourced angles, human review, and no animation shipped without a spec |
| Performance with many canvases on one page | Keep the single shared `Stage` and render only visible cards (as `/core/` does) |
| Inverse kinematics complexity | Start with two-bone IK only for fixed contacts, keyframe everything else |
| Muscle meshes could imply precision we lack | Highlight regions, not individual muscle shapes, and label as indicative |
| **Owner decision:** Mixamo was declined. Reconsider only if the spike shows hand-authoring cost is too high | Revisit after phase 1 |
| **Owner decision:** approve building the phase 1 spike now, or wait for the specs | Recommended: wait for the specs so the spike uses real angles |

## 9. Findings from the movement specs (round one)

`strength-coach` wrote 34 specs (12 chest, 22 legs) in `docs/animation-specs/`. Facts that change this plan:

- **No global range table.** Because Soucie's numbers are unreadable, each spec states its own end value and a "never beyond" limit, and the build-time joint-limit check needs a per-exercise limit field until the tables are read.
- **Sourced versus approximate.** 19 references were confirmed on Crossref. A few angles are sourced (back-squat knee flexion, knee-extension range, calf-raise ankle range, bench elbow flare studied, Nordic curl, dip shoulder extension). Scapula, spine, wrist, machine geometry and all tempos are coaching approximations. Hip flexion in squats and the bench-bottom elbow angle are derived from segment proportions that were **recalled, not verified**.
- **Anthropometric table still needed.** Pick and verify one source for segment proportions before any pose is authored.
- **Shoulder convention.** Specs use elevation, plane and rotation. The data model in section 5 must use the same, not `flexion` plus `abduction`, because the order of application changes the pose.
- **Rig needs listed by the specs:** scapula joint, multi-segment spine, pelvis tilt and obliquity, forearm pronation, toe joint, foot and hand contact constraints with inverse kinematics, a moving figure for lunges, and bench, bar, box, dip-bar and machine props.

## 10. Housekeeping found while writing this

- The `exercise-animation` skill gives Soucie as 2011. Crossref records the paper as 2010 (the issue is dated 2011). Correct the skill when the plan is approved.
- Neither reference above is in `sources.yml` yet. Add them (section `strength`, with `verifiedOn`) once a page cites them.
