# Movement specs: legs (22 exercises)

Status: **draft, not reviewed by a physiotherapist or coach.** Source data: [`src/content/exercises/legs.yml`](../../src/content/exercises/legs.yml). Conventions, sign rules, the basis codes `S`, `D` and `CA`, the reference list `R1` to `R18`, and shared props `P1` to `P11` are in [`README.md`](./README.md). Read that first.

All 22 exercises in `legs.yml` have a clear movement and are specified. None is skipped. The walking lunge needs foot placement and travel across the floor, which the current rig cannot do; it is specified as one step cycle and flagged. Variations that have their own entry in the YAML but change only a foot position or a load are listed as "Variations not specified"; they are not in round 1.

General education for healthy adults, not a personal prescription.

**Phase names.** Where Start is the top of the movement (squats, hinges, thrusts), the phases are named down and up. Where Start is the stretched position (curls, extensions, calf raises), the phases are named Start to End and End to Start, and "hold" is at End unless stated.

## L1. Shared sagittal geometry for squats and lunges

Three numbers fix the side view of a squat: the **shin lean** `s` (equal to ankle dorsiflexion with a flat foot), the **thigh angle** `t` from vertical (90 means the thigh is horizontal) and the **trunk inclination** `θ`. Then:

- knee flexion = `t + s`
- hip flexion = `t + θ` (trunk and pelvis moving as one block, spine neutral)
- the thigh is below parallel when `t` is above 90.

I used these relations, with typical segment proportions of stature (thigh 0.245, shank 0.246, hip-to-shoulder 0.288, which I recalled and did not verify), to check each `D` row, including that the bar sits near the middle of the foot (README section 2.7). Re-run them with the rig's own proportions.

| Squat (bottom) | s (ankle DF) | t | θ (trunk) | Knee flexion | Hip flexion | Bar relative to mid-foot (175 cm figure) |
|---|---|---|---|---|---|---|
| High-bar back squat, thighs parallel | 30 | 90 | 35 | 120 | 125 | 3 cm behind |
| Front squat | 30 | 90 | 20 | 120 | 110 | 4 cm behind |
| Goblet squat | 30 | 95 | 20 | 125 | 115 | load in front of the chest, about on the mid-foot |
| Box squat (box top about 0.28 of stature) | 8 | 80 | 45 | 88 | 125 | 11 cm behind (the box supports the lifter) |

The values 30 degrees of shin lean and 35 degrees of trunk lean are `CA`: no source gives a typical shin lean. Knee flexion 120 in the back squat is `S R5` (the "deep" loaded squat in that trial). The unloaded deep-squat means in R4 (knee 157 with heels up) are not used for any loaded end position.

**Frontal view of a squat (`D`).** Feet about shoulder width (ankle centres about 1 BAW apart), toes turned out about 20 degrees (`legs.yml`: 10 to 30; `CA`). The knees follow the toes: hip abduction about 5 at the start rising to about 18 at the bottom, with hip external rotation about 20, which keeps the kneecap over the second toe. "Knees collapse inwards" is a wrong clip.

**Spine in squats.** Lumbar flexion 0 and pelvic tilt 0 at the start. The correct clip allows a posterior pelvic tilt of up to -5 and lumbar flexion within plus or minus 5 at the bottom (`CA`). R15 measured, in 48 athletes, mean lumbar flexion from a calibrated zero of 24.7 degrees (light load) down to 6.8 (heavy load) and mean extension to -20.3 degrees at heavy loads. Those magnitudes size the labelled wrong clips; R15 does not say they are harmful.

## 1. Barbell back squat (`back-squat`)

- **Camera:** side-on from the right (depth, trunk lean, bar over the mid-foot); second view from the front (knees tracking the toes).
- **Body and props:** standing with feet shoulder-width (L1). Barbell P1 on the upper trapezius (high bar; `legs.yml`), bar centre just below the base of the neck, hands about 1.6 BAW apart (`CA`), elbows pointing down and slightly back. Rack P5 shown before the first rep only.
- **Laterality:** bilateral.
- **Muscles:** primary quadriceps, gluteus-maximus; secondary adductors, erector-spinae, hamstrings.
- **Tempo (s):** down 3.0 · hold 0.5 (1.5 for the paused variation) · up 1.5 · rest 0.5 = **cycle 5.5**.

| Joint | Start (standing) | End (thighs parallel) | Basis |
|---|---|---|---|
| Trunk inclination | 0 | 35 | `CA` (L1) |
| Hip flexion | 0 | 125 | `D` (thigh 90 plus trunk 35) |
| Hip abduction / rotation | 5 / 20 | 18 / 20 | `D` / `CA` (L1, frontal) |
| Knee flexion | 0 to 5 | 120 | `S R5` (deep squat 0 to 120) |
| Ankle dorsiflexion | 0 | 30 | `CA` (L1) |
| Pelvic tilt | 0 | -5 | `CA` |
| Lumbar flexion | 0 | 0 (plus or minus 5) | `CA`; magnitudes for faults from `S R15` |
| Thoracic flexion / neck | 0 / 0 | 0 / 0 | `CA` |
| Shoulder, elbow, wrist (holding the bar) | E 60, P 0, R set by the hands; elbow 110; wrist extension 20 | same (held fixed relative to the trunk) | `CA`; set by the hand contact on the bar |
| Scapula protraction / elevation | -10 / 0 | -10 / 0 | `CA`: blades set to make a shelf |

- **Held fixed:** the arms and bar relative to the trunk, the neck, the foot contact (no sliding, no heel lift).
- **Wrong clips:** (1) *Lower back rounds at the bottom* (`legs.yml` "butt wink"): over the last 20 degrees of knee flexion, pelvic tilt goes from -5 to -25 and lumbar flexion from 0 to +25 (the size is the light-load mean in `S R15`); (2) *Knees collapse inwards*: hip abduction goes from 18 to -5 and hip rotation from +20 to -15 on the way up; (3) *Heels lift* (`legs.yml`): the heel rises 3 cm, ankle dorsiflexion falls from 30 to 15 and the shin leans further; (4) *Squat turns into a good morning* (`legs.yml`): on the way up the hips rise first, trunk inclination goes from 35 to 65 while knee flexion stays above 90.
- **Limits:** knee flexion never above 120 in the loaded clip; hip flexion never above 125; ankle dorsiflexion never above 35; lumbar within plus or minus 5 in the correct clip. Range-limited clip for knee pain at depth or hip impingement symptoms (`legs.yml`): knee flexion 90, or the shallow range in `S R5` (knee flexion 60). `R12` found knee and ligament forces generally rose with knee flexion in the squat, which is why a reduced-range clip is offered; it is not advice for any individual.
- **Rig needs:** bar rigidly attached to the upper back and both hands; foot contacts that never slide; knee that bends only in its plane; a pelvis and a spine with at least two segments so the wrong clips can show pelvic tilt and lumbar flexion.
- **Variations not specified:** pause squat (hold 1.5), low-bar squat (trunk about 45 degrees, bar lower), full depth (the reference here).

## 2. Front squat (`front-squat`)

- **Camera:** side-on from the right (elbow height, trunk, bar over the mid-foot).
- **Body and props:** standing with feet shoulder-width (L1). Barbell P1 on the front of the shoulders, fingertips under the bar in a clean grip. **Safety:** `legs.yml` lists wrist, shoulder or elbow pain in the rack position; the crossed-arm clip below is the alternative.
- **Laterality:** bilateral.
- **Muscles:** primary quadriceps, gluteus-maximus; secondary adductors, erector-spinae.
- **Tempo (s):** down 3.0 · hold 0.5 · up 1.5 · rest 0.5 = **cycle 5.5**.

| Joint | Start | End (thighs parallel) | Basis |
|---|---|---|---|
| Trunk inclination | 0 | 20 | `CA` (L1) |
| Hip flexion | 0 | 110 | `D` |
| Hip abduction / rotation | 5 / 20 | 18 / 20 | `D` / `CA` |
| Knee flexion | 0 to 5 | 120 | `S R5` depth |
| Ankle dorsiflexion | 0 | 30 | `CA` |
| Lumbar / thoracic flexion | 0 / 0 | 0 / 0 | `CA` |
| Shoulder E / P | 85 / 90 | 85 / 90 | `CA`: upper arms about horizontal, elbows high (`legs.yml`) |
| Elbow flexion | 130 | 130 | `CA`: held fixed |
| Wrist extension | 40 | 40 | `CA`: clean grip. Crossed-arm clip: wrist 0, elbow 110 |
| Scapula protraction / elevation | +10 / +5 | +10 / +5 | `CA`: a shelf for the bar |

- **Held fixed:** the rack position (arms, bar, scapulae), neck, foot contact.
- **Wrong clips:** (1) *Elbows drop* (`legs.yml`): shoulder E falls from 85 to 45 during the descent and trunk inclination rises to 45, so the bar rolls forward; (2) *Upper back rounds*: thoracic flexion rises to +25.
- **Limits:** as exercise 1. Knee-pain clip: knee flexion 90.
- **Rig needs:** a bar contact on the front deltoids that tolerates the elbow position; both hands under the bar.
- **Variations not specified:** crossed-arm rack position.

## 3. Goblet squat (`goblet-squat`)

- **Camera:** side-on from the right; second view from the front.
- **Body and props:** standing with feet shoulder-width, toes out about 20 degrees (L1). One dumbbell P4 held vertically at the chest by one end, or a kettlebell by the horns; elbows pointing down and staying inside the knees (`legs.yml`).
- **Laterality:** bilateral.
- **Muscles:** primary quadriceps, gluteus-maximus; secondary adductors, erector-spinae.
- **Tempo (s):** down 3.0 (the `/core/` goblet squat uses 3 seconds down) · hold 0.5 · up 1.0 · rest 0.5 = **cycle 5**, the same as the `/core/` card.

| Joint | Start | End | Basis |
|---|---|---|---|
| Trunk inclination | 0 | 20 | `CA` |
| Hip flexion | 0 | 115 | `D` (L1) |
| Hip abduction / rotation | 5 / 20 | 18 / 20 | `D` / `CA` |
| Knee flexion | 0 to 5 | 125 | `D` (L1); a light load, so the depth is set by control, not by `S R5` |
| Ankle dorsiflexion | 0 | 30 | `CA` |
| Lumbar flexion | 0 | 0 (plus or minus 5) | `CA` |
| Shoulder E / P | 35 / 75 | 35 / 75 | `CA`: elbows in front of the ribs, pointing down |
| Elbow flexion | 120 | 120 | `CA`: hands at the sternum, held fixed |
| Wrist extension | 20 | 20 | `CA` |

- **Held fixed:** the load against the chest, elbows between the knees, neck.
- **Wrong clips:** (1) *Trunk falls forward* (`legs.yml`): trunk inclination to 45 and the load drifts about 10 cm forward of the mid-foot; (2) *Heels lift*: as exercise 1.
- **Limits:** knee flexion no more than 130, ankle dorsiflexion no more than 35. Regression clip (squat to a box): as exercise 4.
- **Rig needs:** a dumbbell or kettlebell prop held in two hands at the chest.
- **Note (D-003 and the `/core/` card).** The existing `/core/` goblet-squat end pose implies a shin lean of about 60 degrees; this spec uses 30. See README section 7.
- **Variations not specified:** heels elevated (heels on a small plate, shin lean about 5 degrees less).

## 4. Box squat (`box-squat`)

- **Camera:** side-on from the right (hips travelling back, shins near vertical).
- **Body and props:** as the back squat (barbell P1, high bar). Box P9 behind the lifter, top about 0.28 of stature high (about 50 cm for a 175 cm figure), set so the thighs finish about 10 degrees above horizontal. **Safety (D-002):** the box is shown wide-based and stable. `legs.yml` has no "only if" check for the box; see README section 7.
- **Laterality:** bilateral.
- **Muscles:** primary quadriceps, gluteus-maximus; secondary adductors, hamstrings, erector-spinae.
- **Tempo (s):** down 3.0 · hold 0.5 on the box (touch, trunk stays braced) · up 1.5 · rest 0.5 = **cycle 5.5**.

| Joint | Start | End (touching the box) | Basis |
|---|---|---|---|
| Trunk inclination | 0 | 45 | `CA` |
| Hip flexion | 0 | 125 | `D` (L1) |
| Hip abduction / rotation | 5 / 20 | 18 / 20 | `D` / `CA` |
| Knee flexion | 0 to 5 | 88 | `D` (L1) |
| Ankle dorsiflexion | 0 | 8 | `CA`: `legs.yml` says shins close to vertical |
| Pelvic tilt / lumbar flexion | 0 / 0 | -5 / 0 | `CA` |
| Arms, bar, scapulae | as exercise 1 | as exercise 1 | `CA` |

- **Held fixed:** the trunk braced on the box; the arms and bar; the foot contact.
- **Wrong clips:** (1) *Dropping onto the box and rocking back* (`legs.yml`): a 0.8 second descent, trunk inclination to 20 on contact; (2) *Relaxing on the box and losing neutral spine*: lumbar flexion to +20 on contact.
- **Limits:** knee flexion never above 95. Reduced-range clip (knee pain at the box height): the box 10 cm higher, knee flexion 70.
- **Rig needs:** a box prop whose top the buttocks touch lightly; no weight transfer is needed.
- **Variations not specified:** none.

## 5. Hack squat (`hack-squat`)

- **Camera:** side-on from the right (the pad, the sled and the thigh angle).
- **Body and props:** machine P7: a sled on rails and a back pad parallel to them, both about 50 degrees above horizontal (`CA`, typical; real machines vary from about 30 to 60). Shoulder pads on the shoulders, back and hips against the pad, feet on the platform about shoulder width apart and slightly forward (`legs.yml`). Trunk inclination about -40 (leaning back against the pad).
- **Laterality:** bilateral.
- **Muscles:** primary quadriceps; secondary gluteus-maximus, adductors.
- **Tempo (s):** down 3.0 · hold 0.5 · up 1.5 · rest 0.5 = **cycle 5.5**.

| Joint | Start (top) | End (bottom) | Basis |
|---|---|---|---|
| Trunk inclination | -40 | -40 | `CA`: fixed against the pad |
| Hip flexion | 5 | 100 | `CA`; the legs start in line with the trunk, as when leaning on a slanted wall |
| Knee flexion | 5 (not locked hard, `legs.yml`) | 115 | `CA`, held inside `S R5` (120 for a free squat) |
| Ankle dorsiflexion | 0 | 25 | `CA`; the platform is perpendicular to the rails |
| Pelvic tilt / lumbar flexion | 0 / 0 | 0 / 0 | `CA`: the hips stay on the pad |
| Arms | hands on the handles, elbow about 110 | same | `CA` |

- **Held fixed:** back, hips and shoulders on the pad; feet on the platform; hands on the handles.
- **Wrong clips:** (1) *Hips come off the pad at the bottom* (`legs.yml`): the pelvis lifts 6 cm and lumbar flexion goes to +20; (2) *Knees collapse in*: as exercise 1.
- **Limits:** knee flexion no more than 120; reduced-range clip: knee flexion 90 (`R12`).
- **Rig needs:** a constrained sled mechanism with back-pad and foot-platform contacts; solve the legs by inverse kinematics to the foot contact.
- **Variations not specified:** feet low and narrow, feet high and wide (no growth evidence on the page).

## 6. Leg press (`leg-press`)

- **Camera:** side-on from the right.
- **Body and props:** machine P7: seat with the back pad about 40 degrees above horizontal, sled on rails about 45 degrees above horizontal, feet shoulder-width on the platform, toes slightly out (`legs.yml`). Pelvis and back flat on the pad.
- **Laterality:** bilateral.
- **Muscles:** primary quadriceps; secondary gluteus-maximus, adductors, hamstrings.
- **Tempo (s):** down 3.0 · hold 0.5 · up 1.5 · rest 0.5 = **cycle 5.5**.

| Joint | Start (top) | End (bottom) | Basis |
|---|---|---|---|
| Hip flexion | 85 | 110 | `D`: geometry of a 40 degree pad and a 45 degree sled |
| Knee flexion | 8 (not locked hard) | 100 | `CA`: `legs.yml` says about 90 or deeper, as far as the pelvis stays flat |
| Ankle dorsiflexion | 0 | 20 | `CA` |
| Pelvic tilt / lumbar flexion | 0 / 0 | 0 / 0 (limit: pelvic tilt -5) | `CA` |
| Hands / arms | on the side handles, elbow 90 | same | `CA` |

- **Held fixed:** pelvis and back on the pad, feet on the platform, hands.
- **Wrong clips:** (1) *Pelvis curls off the pad* (`legs.yml`): knee flexion to 125, pelvic tilt to -20 and lumbar flexion to +15 at the bottom; (2) *Knees collapse inwards*: as exercise 1.
- **Limits:** the bottom is where the pelvis would start to tilt; knee flexion never above 110 in the correct clip. `R12` found knee forces rose with knee flexion in the leg press as in the squat. Reduced-range clip: knee flexion 70.
- **Rig needs:** as exercise 5.
- **Variations not specified:** feet high, feet low, single leg.

## 7. Bulgarian split squat (`bulgarian-split-squat`)

- **Camera:** side-on from the right (front shin, rear leg); second view from the front (pelvis level).
- **Body and props:** the right leg works at the front. The left (rear) foot rests on flat bench P2 (0.43 m), laces down. Dumbbells P4 hang at the sides, arms straight. Stance long enough that the front shin is near vertical at the bottom (`legs.yml`): about 0.43 of stature between the ankles along the floor (`D`).
- **Laterality:** **one-sided**, right leg forward as the reference; mirror for the left. `legs.yml` doses "each side".
- **Muscles:** primary quadriceps, gluteus-maximus; secondary adductors, gluteus-medius-minimus, hamstrings.
- **Tempo (s):** down 2.5 · hold 0.3 · up 1.5 · rest 0.5 = **cycle 4.8**.

| Joint | Start (standing on both feet) | End (bottom) | Basis |
|---|---|---|---|
| Trunk inclination | 0 | 10 | `CA` (upright variation: 0 to 10; forward-lean variation: 25) |
| Front hip flexion | 20 | 100 | `D` (thigh 90 plus trunk 10) |
| Front knee flexion | 20 | 95 | `D` (thigh 90 plus shin lean 5) |
| Front ankle dorsiflexion | 5 | 5 | `CA`: near-vertical shin (`legs.yml`) |
| Rear hip flexion | -10 | -25 | `D`: rear thigh extends behind the trunk |
| Rear knee flexion | 40 | 120 (range 100 to 130) | `D`: set by the rear foot on the bench; the rear knee approaches the floor |
| Rear ankle dorsiflexion | -45 | -45 | `CA`: foot on the bench, toes pointing away |
| Pelvic tilt / pelvic obliquity | 0 / 0 | 0 / 0 (tolerance 3) | `CA`: pelvis level (`legs.yml`) |
| Arms | shoulder E 5, elbow 0 to 5 | same | `CA`: dumbbells at the sides |

- **Held fixed:** pelvis level, both feet, trunk, arms.
- **Wrong clips:** (1) *Stance too short* (`legs.yml`): front shin lean 30 and knee flexion 120, so the knee travels far over the toes; (2) *Trunk leans and twists*: trunk rotation 20 and lateral flexion 10.
- **Limits:** rear hip extension no more than 25 in the main clip (`CA`, `legs.yml` lists hip-flexor pain in the stretched position of the back leg); front knee flexion no more than 110. Regression clip: the rear foot on the floor.
- **Rig needs:** one foot on a raised prop and one on the floor, independent left and right legs and a pelvis that can show obliquity; foot contacts that never slide.
- **Variations not specified:** forward lean (trunk 25, more hip flexion), upright trunk (trunk 0).

## 8. Walking lunge (`walking-lunge`)

- **Camera:** side-on from the right, tracking the figure as it steps.
- **Specified as one step cycle.** The rig cannot yet move a figure across the floor or plant a foot at a new place, so this spec describes a single lunge from standing with feet together, to the bottom, and back to standing. A walking lunge is this cycle repeated with the other leg leading and the figure advancing by the stride at each step. The engineer needs translation and a foot-plant constraint; **this is flagged as a rig gap**.
- **Body and props:** dumbbells P4 at the sides, floor. Step length so the front shin is about vertical at the bottom (`legs.yml`): about 0.5 of stature between the ankles at the bottom (`D`).
- **Laterality:** alternating; the spec shows the right leg stepping forward.
- **Muscles:** primary quadriceps, gluteus-maximus; secondary adductors, gluteus-medius-minimus, hamstrings.
- **Tempo (s):** step 0.8 · descend 1.5 · hold 0.3 · drive up 1.2 · bring the rear leg to the start 0.7 · rest 0.3 = **cycle 4.8**.

| Joint | Start (standing, feet together) | End (bottom, right foot forward) | Basis |
|---|---|---|---|
| Trunk inclination | 0 | 5 | `CA`: erect (`R13` found a forward-leaning trunk raises peak hip flexion and hip-extensor demand, and an extended trunk raises ankle dorsiflexion; no values) |
| Front hip flexion | 0 | 97 | `D` (thigh 92 plus trunk 5) |
| Front knee flexion | 0 | 97 | `D` (thigh 92 plus shin lean 5) |
| Front ankle dorsiflexion | 0 | 5 to 10 | `CA` |
| Rear hip flexion | 0 | -10 | `D` |
| Rear knee flexion | 0 | 100 | `D`: the rear knee about 5 cm above the floor |
| Rear ankle dorsiflexion / toe extension | 0 / 0 | -45 / 60 | `CA`: heel up, ball of the foot on the floor |
| Pelvic tilt / lumbar flexion | 0 / 0 | 0 / 0 | `CA` |
| Arms | shoulder E 5, elbow 0 to 5 | same | `CA` |

- **Held fixed:** trunk upright, arms at the sides, the front foot flat after it lands.
- **Wrong clips:** (1) *Short step* (`legs.yml`): stride 0.35 of stature, front shin lean 35 and the knee well past the toes; (2) *Trunk twists*: rotation 20.
- **Limits:** front knee flexion no more than 110; no knee contact with the floor. Regression clip: a static split squat with no weight. The `legs.yml` variation "reverse lunge" is the same cycle with the step backward and the contacts swapped.
- **Rig needs:** foot placement, a moving figure, ground contact that holds a planted foot still, dumbbells at the sides.
- **Variations not specified:** reverse lunge.

## 9. Leg extension (`leg-extension`)

- **Camera:** side-on from the right (knee axis against the machine axis).
- **Body and props:** machine P7: seat back reclined about 10 degrees, thigh supported on the seat, knee aligned with the machine axis, pad on the lower shin just above the ankle (`legs.yml`).
- **Laterality:** bilateral (both legs together). A one-leg clip is the same with one leg.
- **Muscles:** primary quadriceps; secondary none.
- **Tempo (s):** Start to End 1.5 · hold 1.0 at End (`legs.yml`: pause briefly at the top) · End to Start 2.5 · rest 0 = **cycle 5**.

| Joint | Start (stretched) | End (legs straight) | Basis |
|---|---|---|---|
| Knee flexion | 100 | 0 to 5 | `S R6` for 100 down to 30 degrees (the full range in that trial); the end at 0 to 5 follows `legs.yml` ("until the legs are straight") and is `CA` |
| Hip flexion | 85 | 85 | `CA`: seated, back reclined 10 |
| Trunk inclination | -10 | -10 | `CA`: against the pad |
| Ankle dorsiflexion | 0 | 0 | `CA`: relaxed, pad on the shin |
| Hands | on the side handles, elbow 90 | same | `CA` |

- **Held fixed:** hips on the seat (no lifting), trunk on the pad, the hip angle, the ankle.
- **Wrong clips:** (1) *Hips lift off the seat* (`legs.yml`): pelvis rises 4 cm and the trunk inclination goes to +10 at the top; (2) *Swinging the weight*: Start to End in 0.5 s with no hold.
- **Limits:** the sourced range is 100 down to 30 degrees of knee flexion (`R6`, untrained young women, 8 weeks); finishing at 0 to 5 is not covered by it. Range-limited clips: the **initial range** 100 to 65 (`S R6`, the `legs.yml` variation) and a clip that ends at 30. The `legs.yml` contraindications (anterior knee pain with the knees extended under load, recent ACL reconstruction) are why the 100 to 30 clip is offered; this is not individual advice.
- **Rig needs:** a lever pad that follows the shin; an adjustable seat.
- **Variations not specified:** none beyond the initial range.

## 10. Romanian deadlift (`romanian-deadlift`)

- **Camera:** side-on from the right (hip setback, bar close to the legs, neutral back).
- **Body and props:** standing, feet hip-width. Barbell P1 held overhand with straight arms; the bar rests on the thighs at the start and slides down the thighs and shins close to the legs. (A dumbbell version is the same with a dumbbell in each hand.)
- **Laterality:** bilateral.
- **Muscles:** primary hamstrings, gluteus-maximus; secondary erector-spinae, adductors.
- **Tempo (s):** down 3.0 · hold 0.5 · up 1.5 · rest 0.5 = **cycle 5.5**.

| Joint | Start (standing, bar at the thighs) | End (hamstring stretch) | Basis |
|---|---|---|---|
| Trunk inclination | 0 | 55 (individual range 45 to 65) | `CA`: `legs.yml` says go down until the hamstrings stretch or the back would round |
| Hip flexion | 0 to 5 | 75 | `D` (thigh 20 plus trunk 55) |
| Knee flexion | 15 | 20 | `CA`: "soften the knees" (`legs.yml`), held about fixed |
| Ankle dorsiflexion | 0 | 0 to 5 | `CA`: shins near vertical (`legs.yml`) |
| Pelvic tilt | 0 | +40 (anterior, moves with the trunk) | `D`: pelvis and trunk are one block while the lumbar spine stays neutral |
| Lumbar flexion | 0 | 0 (plus or minus 5) | `CA` |
| Shoulder E / P | 0 / 90 | 40 / 90 | `D`: arms hang about 16 degrees behind vertical so the bar stays close to the legs |
| Elbow flexion | 0 to 5 | 0 to 5 | `CA` |
| Scapula protraction / elevation | -10 / -5 | -10 / -5 | `CA`: blades set (`legs.yml`) |
| Wrist extension | 10 | 10 | `CA` |

- **Bar position at the bottom (`D`).** Just below the knee, about 0.34 of stature above the floor. The hips travel back about 0.08 of stature (about 15 cm) behind the ankles. The arm length caps how low the bar can go with the trunk at 55 degrees; a lower bar needs more trunk lean and is not required (`legs.yml` stops at the hamstring stretch).
- **Held fixed:** lumbar spine neutral, bar close to the legs, scapulae, shins near vertical.
- **Wrong clips:** (1) *Lower back rounds to reach further* (`legs.yml`): trunk 70 and lumbar flexion +25 at the bottom (the light-load mean in `S R15`); (2) *Squatting the movement*: knee flexion goes from 20 to 60, the hips drop and the bar gets further from the legs; (3) *Over-extending at the top*: lumbar extension to -15 and the trunk leans back 10 degrees.
- **Limits:** the bottom is trunk 55 in the default clip; never rounder than plus 5 lumbar flexion in the correct clip. Reduced-range clip (hinge drill with a dowel): trunk 35 (see exercise 14).
- **Rig needs:** a bar that follows the hands; a pelvis and spine that can tilt as a block; contact between the bar and the legs for a believable path.
- **Variations not specified:** dumbbell RDL, single-leg RDL.

## 11. Glute bridge (`glute-bridge`)

- **Camera:** side-on from the right (hips and trunk line).
- **Body and props:** supine on mat P10, knees bent, feet flat about hip width (about 0.8 BAW), heels about 0.2 to 0.25 of stature from the sit bones (`CA`), arms on the floor beside the body, palms down. Ribs down, gentle brace (`legs.yml`).
- **Laterality:** bilateral.
- **Muscles:** primary gluteus-maximus; secondary hamstrings, erector-spinae.
- **Tempo (s):** up 1.0 · hold 1.0 at the top (`legs.yml`: pause for a second) · down 1.5 · rest 0.5 = **cycle 4**, the same as the `/core/` card. Note: the `/core/` guide holds for 2 seconds (README section 7).

| Joint | Start (hips on the floor) | End (top of the bridge) | Basis |
|---|---|---|---|
| Hip flexion | 60 | 0 (line from shoulders to knees; limit -5, no hyperextension) | `D`: thigh rises about 58 degrees at the start; the top line is the `legs.yml` cue |
| Knee flexion | 120 | 115 | `D`: shin near vertical at the top |
| Ankle dorsiflexion | -10 to 0 | 0 | `D`: set by the foot contact |
| Pelvic tilt | 0 | -10 (slight posterior, "ribs down") | `CA` |
| Lumbar flexion | 0 | 0 (plus or minus 5) | `CA`: `legs.yml` says do not arch the lower back |
| Neck / thoracic | 0 / 0 | 0 / 0 | `CA`: head on the mat |
| Shoulder E / elbow | 15 / 0 | 15 / 0 | `CA`: arms rest beside the body |

- **Held fixed:** feet (no sliding), shoulders and head on the mat, arms.
- **Wrong clips:** (1) *Arching the lower back to get higher* (`legs.yml`): lumbar extension to -25 and hip flexion to -20 (hyperextension) at the top; (2) *Pushing through the toes*: the heels rise 2 cm and the ankle goes to -30 while the knee flexion is 90.
- **Limits:** hip flexion no less than -5 at the top; lumbar extension no more than -5. Reduced-range clip (`legs.yml` regression): hips lifted only to hip flexion 25.
- **Rig needs:** a lying body with a pelvis that rises on the arc around the shoulders; mat contact for head, shoulders and feet.
- **Variations not specified:** banded (a mini-band above the knees, hip abduction about 5 against the band), single-leg bridge, barbell across the hips.

## 12. Barbell hip thrust (`hip-thrust`)

- **Camera:** side-on from the right.
- **Body and props:** the lower tips of the shoulder blades rest on the edge of flat bench P2 (0.43 m high); barbell P1 across the hips with a pad; feet flat about hip width, placed so the shins are vertical at the top (`D`); hands rest on the bar or hang by the sides. **Safety:** the bench is shown fixed and wide-based (D-002).
- **Laterality:** bilateral.
- **Muscles:** primary gluteus-maximus; secondary hamstrings, adductors.
- **Tempo (s):** up 1.2 · hold 1.0 at the top (`legs.yml`) · down 2.0 · rest 0.5 = **cycle 4.7**.

| Joint | Start (hips low) | End (top, thighs parallel) | Basis |
|---|---|---|---|
| Hip flexion | 80 | 0 (thighs parallel to the floor, trunk in line) | `D` (L1-style geometry: shoulders fixed on the bench, hips on an arc) |
| Knee flexion | 105 | 90 | `D`: shins vertical at the top (`legs.yml`) |
| Ankle dorsiflexion | -15 to -30 | 0 | `D`: set by the foot contact |
| Trunk orientation | slopes about 36 degrees down from the shoulders to the hips | horizontal | `D` |
| Pelvic tilt | 0 | -10 (slight posterior, ribs down) | `CA` |
| Lumbar flexion | 0 | 0 (plus or minus 5) | `CA`: `legs.yml` says do not arch the lower back |
| Neck flexion | 15 | 15 | `CA`: chin tucked, eyes toward the knees (`legs.yml`) |
| Scapula | set on the bench, protraction -10 | same | `CA` |
| Arms | shoulder E 20, elbow 0 to 5 | same | `CA` |

- **Held fixed:** shoulders on the bench, feet (no sliding), neck, lumbar neutral.
- **Wrong clips:** (1) *Arching the lower back at the top* (`legs.yml`): lumbar extension to -25 and hip flexion to -15; (2) *Feet too far forward or back* (`legs.yml`): feet 15 cm too far forward gives knee flexion 60 at the top (hamstring-dominated); 15 cm too far back gives knee flexion 120 (quadriceps-dominated). These are the visual cues; the page makes no claim about which muscle then works harder.
- **Limits:** hip flexion no less than -5 at the top; do not display lumbar extension beyond -5 in the correct clip. Reduced-range clip: glute bridge (exercise 11).
- **Rig needs:** a bench contact at the shoulder-blade line; a bar prop on the pelvis whose position follows the hips; foot contacts.
- **Variations not specified:** banded, single-leg, paused.

## 13. Cable pull-through (`cable-pull-through`)

- **Camera:** side-on from the right (hinge, cable path between the legs).
- **Body and props:** standing, facing away from a low pulley P6 (about 0.15 m high) about 1.0 m behind, rope between the legs, stance slightly wider than hip width (`legs.yml`). Hands hold the rope's ends in front of the thighs.
- **Laterality:** bilateral.
- **Muscles:** primary gluteus-maximus, hamstrings; secondary erector-spinae.
- **Tempo (s):** down 2.5 · hold 0.3 · up 1.5 · squeeze 0.5 at the top = **cycle 4.8**.

| Joint | Start (top) | End (bottom) | Basis |
|---|---|---|---|
| Trunk inclination | 0 | 60 | `CA` |
| Hip flexion | 0 to 5 (limit: no hyperextension beyond 5) | 80 | `D` (thigh 20 plus trunk 60) |
| Knee flexion | 20 | 25 | `CA`: held about fixed, "squatting instead of hinging" is the fault (`legs.yml`) |
| Ankle dorsiflexion | 0 | 0 to 5 | `CA` |
| Lumbar flexion | 0 | 0 (plus or minus 5) | `CA` |
| Shoulder E / P | 0 / 90 | 40 / 90 | `D`: arms hang down from the shoulders toward the cable |
| Elbow flexion | 0 to 5 | 0 to 5 | `CA` |
| Scapula protraction / elevation | -5 / 0 | -5 / 0 | `CA` |

- **Held fixed:** neutral spine, arms straight, the shin angle.
- **Wrong clips:** (1) *Squatting instead of hinging* (`legs.yml`): knee flexion 20 to 70 and the hips drop; (2) *Over-extending at the top*: lumbar extension to -15 and the trunk leans back 10.
- **Limits:** hip flexion at least 0 at the top; lumbar within plus or minus 5. Regression clip: the dowel hinge (exercise 14).
- **Rig needs:** a cable with a line from the pulley between the legs to the hands; a spine and pelvis that tilt as a block.
- **Variations not specified:** none.

## 14. Dowel hip hinge (`hip-hinge-dowel`)

- **Camera:** side-on from the right (the three contact points on the dowel).
- **Body and props:** standing, feet hip-width. A rigid dowel (1.2 m long, 25 mm diameter, `CA`) lies along the spine touching the back of the head, the upper back and the tailbone (`legs.yml`). The right hand holds the top end at the neck, the left hand holds the lower end behind the lower back.
- **Laterality:** bilateral.
- **Muscles:** primary gluteus-maximus, hamstrings; secondary erector-spinae.
- **Tempo (s):** down 2.5 · hold 0.5 · up 1.5 · rest 0.5 = **cycle 5**.

| Joint | Start (standing) | End (hamstring stretch) | Basis |
|---|---|---|---|
| Trunk inclination | 0 | 45 | `CA`: a conservative foundation-level range (`legs.yml`: foundation) |
| Hip flexion | 0 | 65 | `D` (thigh 20 plus trunk 45) |
| Knee flexion | 15 | 20 | `CA`: soft knees, held about fixed |
| Ankle dorsiflexion | 0 | 0 to 5 | `CA` |
| Pelvic tilt | 0 | +30 (anterior, with the trunk) | `D` |
| Lumbar / thoracic flexion | 0 / 0 | 0 / 0 | `CA`: three contacts must hold |
| Neck | 0 | 0 | `CA`: head against the dowel |
| Right arm | shoulder E 110, P 20, elbow 130 | same | `CA`: hand on the dowel behind the neck; held fixed |
| Left arm | shoulder E 30, P -40, elbow 90 | same | `CA`: hand on the dowel at the lower back; held fixed |

- **Held fixed:** the dowel against all three points, the arms, the knees.
- **Wrong clips:** (1) *Loses tailbone contact* (`legs.yml`): lumbar flexion to +20 so a gap of about 3 cm opens at the lower back; (2) *Loses head contact*: the neck extends or flexes by 20 degrees; (3) *Squatting rather than hinging*: knee flexion to 60 and the hips drop.
- **Limits:** stop the movement at the first lost contact; trunk never above 45 in the default clip. Reduced-range clip (`legs.yml` regression): hands on a wall, trunk 30.
- **Rig needs:** a dowel prop and a contact check that the three points stay on the dowel.
- **Variations not specified:** none.

## 15. Seated leg curl (`seated-leg-curl`)

- **Camera:** side-on from the right.
- **Body and props:** machine P7: seat back reclined about 20 degrees, thigh pad firm on the thighs, leg pad above the heels (`legs.yml`), knees at the lever axis. Hands on the side handles.
- **Laterality:** bilateral.
- **Muscles:** primary hamstrings; secondary gastrocnemius.
- **Tempo (s):** Start to End 1.5 · hold 0.5 at End · End to Start 2.5 · rest 0.5 = **cycle 5**.

| Joint | Start (stretched) | End (curled) | Basis |
|---|---|---|---|
| Knee flexion | 5 | 100 | `CA`: the machine lever ends the range; `legs.yml` says "fully flexed". Hold inside 110 |
| Hip flexion | 100 | 100 | `CA`: a seated hip position. The existing site claim `hamstring-seated-curl` (Maeo 2021) compares seated with prone, but its abstract gives no hip angle |
| Trunk inclination | -20 | -20 | `CA`: against the pad |
| Ankle dorsiflexion | 0 | 0 | `CA`: foot relaxed on the pad |
| Hands | on the handles, elbow 100 | same | `CA` |

- **Held fixed:** hips and thighs (no lifting), trunk on the pad, ankles.
- **Wrong clips:** (1) *Leans back or lifts the hips* (`legs.yml`): trunk inclination -20 to -40 and the pelvis rises 4 cm at the end; (2) *Swinging the weight*: Start to End in 0.5 s.
- **Limits:** knee flexion never above 110 (`CA`). Reduced-range clip: Start 5, End 70 (`legs.yml`: lighter load and a smaller range).
- **Rig needs:** a lever pad following the lower leg.
- **Variations not specified:** seated versus lying. The existing site claim (`hamstring-seated-curl`) is about the seated position's lengthened hamstrings; the lying clip is exercise 16.

## 16. Lying leg curl (`lying-leg-curl`)

- **Camera:** side-on from the right.
- **Body and props:** machine P7: a bench with a slight hip bend, prone, the knees just past the pad edge, the leg pad above the heels (`legs.yml`).
- **Laterality:** bilateral.
- **Muscles:** primary hamstrings; secondary gastrocnemius.
- **Tempo (s):** Start to End 1.5 · hold 0.5 · End to Start 2.5 · rest 0.5 = **cycle 5**.

| Joint | Start (stretched) | End (curled) | Basis |
|---|---|---|---|
| Knee flexion | 5 | 105 | `CA` |
| Hip flexion | 10 | 10 | `CA`: a slight hip bend, held fixed |
| Ankle dorsiflexion | 0 | 0 | `CA` |
| Lumbar flexion | 0 | 0 (plus or minus 5) | `CA` |
| Arms | elbows 90 on the handles | same | `CA` |

- **Held fixed:** hips on the bench, trunk, ankles.
- **Wrong clips:** (1) *Hips lift off the bench* (`legs.yml`): hip flexion goes from 10 to 40 and lumbar extension to -20 at the end; (2) *Momentum*: Start to End in 0.5 s.
- **Limits:** knee flexion never above 110. Reduced-range clip: End 70.
- **Rig needs:** a lever pad and a prone bench contact.
- **Variations not specified:** none.

## 17. Nordic hamstring curl (`nordic-curl`)

- **Camera:** side-on from the right.
- **Body and props:** kneeling on pad P10 (0.08 m thick) with the ankles anchored under a fixed bar or held by a partner; trunk, hips and thighs in one straight line from the knees to the head (`legs.yml`). **Safety:** the anchor is shown fixed, and the page keeps its note to introduce the exercise gradually (see the caveat on claim `nordic-hamstring-injury`).
- **Laterality:** bilateral.
- **Muscles:** primary hamstrings; secondary gastrocnemius, gluteus-maximus.
- **Tempo (s):** lower to the controlled end point 4.0 · fall to the hands 0.6 · push back up 2.0 · rest 0.5 = **cycle 7**.

| Joint | Start (upright kneeling) | End (lowest controlled point) | Catch (hands on the floor) | Basis |
|---|---|---|---|---|
| Trunk inclination (= forward travel) | 0 | 50 | 80 | `S R10`: peak joint torque at about 56 degrees (SD 9) of travel in trained adults new to the exercise; the End uses 50 to stay inside it |
| Knee flexion | 90 | 40 | 10 | `D`: 90 minus the travel |
| Hip flexion | 0 | 0 (tolerance 5) | 0 | `S R10`: the standard version has a hip flexion of 0 |
| Ankle dorsiflexion | -50 | -50 | -50 | `CA`: feet anchored, toes down |
| Shoulder E / P | 20 / 90 | 40 / 90 | 90 / 90 | `CA`: hands come forward to catch |
| Elbow flexion | 90 | 90 | 90, then press to 5 | `CA` |
| Lumbar flexion | 0 | 0 | 0 | `CA` |

- **Held fixed:** the straight line from knees to head (hip 0), the anchored feet.
- **Wrong clips:** (1) *Folding at the hips* (`legs.yml`): hip flexion rises to 40 by 40 degrees of travel (`R10` instructed hip flexion of 25 to 75 as variations and noted participants could not hold 50 or 75); (2) *Dropping uncontrolled from the start*: the lowering takes 1.0 s with no eccentric control.
- **Limits:** the End never above 56 degrees of travel in the correct clip. `R10` found a sloped leg support of 20 or 40 degrees allowed 75 and 88 degrees of travel: that is the assisted-version clip (regression: a shorter range or an incline-assisted version, `legs.yml`). A band-assisted clip has the same keyframes with an assisted return.
- **How far to lower is not settled.** Another study (R18, Bergmann, Schmidt and Jaitner 2026) reported mean break-point angles of 56 to 75 degrees across three execution set-ups, but in that paper a smaller value means a more extended knee, the opposite direction to R10's "travel from the start", so I could not reconcile the two. I read only its abstract and used no number from it. Together the studies say only that the controlled range varies widely between people and set-ups.
- **Rig needs:** a kneeling pad and an anchor for the ankles; a spine that stays straight while the whole body rotates about the knees; hands that reach the floor.
- **Variations not specified:** none.

## 18. Hip abduction machine (`hip-abduction-machine`)

- **Camera:** front view (frontal plane); second view from the side.
- **Body and props:** machine P7: seated upright with the back supported, thigh pads on the outside of the knees (`legs.yml`), feet on the platform.
- **Laterality:** bilateral, symmetric. The abduction is per side.
- **Muscles:** primary gluteus-medius-minimus; secondary gluteus-maximus.
- **Tempo (s):** Start to End (push apart) 1.5 · hold 0.5 · End to Start (return) 2.5 · rest 0.5 = **cycle 5**.

| Joint | Start (knees together) | End (knees apart) | Basis |
|---|---|---|---|
| Hip abduction (each side) | 5 | 30 | `CA`: `legs.yml` says "a comfortable end range"; limit 40 |
| Hip flexion | 95 | 95 | `CA`: seated, held fixed |
| Hip rotation | 0 | 0 | `CA`: no swinging in rotation |
| Knee flexion | 95 | 95 | `CA`: held fixed |
| Ankle dorsiflexion | 0 | 0 | `CA` |
| Trunk inclination | 0 to -5 | 0 to -5 | `CA`: upright, back supported |
| Hands | on the handles, elbow 100 | same | `CA` |

- **Held fixed:** pelvis on the seat (no lifting), trunk, knees and ankles.
- **Wrong clips:** (1) *Swinging with the trunk* (`legs.yml`): trunk inclination oscillates -5 to +10 and rotates 10 on each rep; (2) *A range that causes pinching in the hip* (`legs.yml`): abduction to 45 with the pelvis rolling up on that side by 5 degrees.
- **Limits:** abduction never above 40 in the main clip. Reduced-range clip (`legs.yml`: pinching or pain at the front or side of the hip): End 15.
- **Rig needs:** two thigh pads that move with the thighs; a frontal view with independent left and right hips.
- **Variations not specified:** leaning forward (trunk about 25; no growth evidence).

## 19. Standing calf raise (`standing-calf-raise`)

- **Camera:** side-on from the right (the ankle and the heel); second view from the front.
- **Body and props:** machine P7: standing with the shoulders under the pads, balls of the feet on a platform edge, knees straight (`legs.yml`; `S R8` compared a knee-extended standing raise with a seated raise at a 90 degree knee). Hands on the handles.
- **Laterality:** bilateral.
- **Muscles:** primary gastrocnemius; secondary soleus.
- **Tempo (s):** Start to End (rise) 1.0 · hold 1.0 at the top · End to Start (lower) 2.5 · hold 0.5 at the stretch = **cycle 5**.

| Joint | Start (heels low, full stretch) | End (heels high) | Basis |
|---|---|---|---|
| Ankle dorsiflexion | 25 | -35 | Start `S R7` (a calf raise of 25 degrees either side of a right-angle foot; the sign is my reading); End `CA` (the trial used only 25 degrees of plantarflexion; `legs.yml` says "as high as possible"); limit -40 |
| Knee flexion | 0 to 5 | 0 to 5 | `S R8` (knee extended) and `legs.yml` |
| Hip flexion / trunk inclination | 0 / 0 | 0 / 0 | `CA` |
| Toe extension | 0 | 0 | `CA`: the toes stay flat on the platform; the heel rises on the ball of the foot |
| Hands | on the handles, elbow 90 | same | `CA` |

- **Held fixed:** knees straight, trunk upright, hips.
- **Wrong clips:** (1) *Bouncing out of the bottom* (`legs.yml`): no hold at the stretch, Start to End immediately; (2) *Bending the knees to cheat*: knee flexion 25 at the start of each rise.
- **Limits:** ankle dorsiflexion never above 25 at the stretch (`S R7`'s range), plantarflexion never above 40 (`CA`). `legs.yml` lists Achilles tendon pain as a contraindication; the reduced-range clip is the initial range only (25 to 0, the `S R7` "initial" portion, which is also the `legs.yml` stretched-position emphasis variation).
- **Rig needs:** a platform edge under the ball of the foot with the heel free to drop; shoulder pads.
- **Variations not specified:** stretched-position emphasis (initial range only), single-leg.

## 20. Seated calf raise (`seated-calf-raise`)

- **Camera:** side-on from the right.
- **Body and props:** machine P7: seated with the knees at 90 degrees (`S R8`) and the pads on the thighs, balls of the feet on the platform (`legs.yml`).
- **Laterality:** bilateral.
- **Muscles:** primary soleus; secondary gastrocnemius.
- **Tempo (s):** as exercise 19 = **cycle 5**.

| Joint | Start (heels low) | End (heels high) | Basis |
|---|---|---|---|
| Ankle dorsiflexion | 25 | -35 | as exercise 19 (`S R7` / `CA`) |
| Knee flexion | 90 | 90 | `S R8`; held fixed |
| Hip flexion | 90 | 90 | `CA` |
| Trunk inclination | 0 | 0 | `CA` |
| Hands | on the thighs or the pad | same | `CA` |

- **Held fixed:** the knee at 90, the hip, the trunk.
- **Wrong clips:** (1) *Bouncing* (`legs.yml`): as exercise 19; (2) *Cutting the range short*: the ankle moves only from 5 to -10.
- **Limits:** as exercise 19. Achilles pain contraindication (`legs.yml`): the initial-range clip.
- **Rig needs:** as exercise 19, with a thigh pad contact.
- **Variations not specified:** none.

## 21. Adductor machine (`adductor-machine`)

- **Camera:** front view; second view from the side.
- **Body and props:** machine P7: seated upright with the back supported, pads against the inner knees (`legs.yml`).
- **Laterality:** bilateral, symmetric. Angles are per side.
- **Muscles:** primary adductors; secondary none.
- **Tempo (s):** Start to End (squeeze) 1.5 · hold 0.5 · End to Start (open) 2.5 (`legs.yml`: open slowly) · rest 0.5 = **cycle 5**.

| Joint | Start (pads apart, stretch) | End (knees together) | Basis |
|---|---|---|---|
| Hip abduction (each side) | 30 | 3 | `CA`: the start follows the `legs.yml` warning against a very wide stretch with a heavy stack; the end stops short of pads touching |
| Hip flexion / knee flexion | 95 / 95 | 95 / 95 | `CA`: held fixed |
| Hip rotation | 0 | 0 | `CA` |
| Trunk inclination | 0 to -5 | 0 to -5 | `CA` |
| Ankle dorsiflexion | 0 | 0 | `CA` |

- **Held fixed:** pelvis on the seat, trunk, knees and ankles.
- **Wrong clips:** (1) *Starting from a very wide stretch with a heavy stack* (`legs.yml`): abduction 45 at the start, pelvis tilt 5 and a sudden close; (2) *Jerking the weight*: Start to End in 0.4 s.
- **Limits:** the start never above 30 degrees per side in the main clip; reduced-range clip (groin pain, `legs.yml`): Start 15.
- **Rig needs:** as exercise 18.
- **Variations not specified:** none.

## 22. Tibialis raise (`tibialis-raise`)

- **Camera:** side-on from the right (the ankle).
- **Body and props:** standing with the back against wall P11, feet about one step ahead of the body (about 0.2 of stature), heels on the floor, legs straight (`legs.yml`). The body leans back against the wall, so the whole body line is tilted back about 15 degrees from vertical (`CA`). Nothing else touches the figure. **Safety:** a wall is a fixed, load-free prop; the page's "only if" note does not apply to the wall itself.
- **Laterality:** bilateral.
- **Muscles:** primary tibialis-anterior; secondary none.
- **Tempo (s):** Start to End (toes up) 1.0 · hold 0.5 · End to Start (lower) 2.0 · rest 0.3 = **cycle 4**.

| Joint | Start (toes down, foot flat) | End (toes up) | Basis |
|---|---|---|---|
| Ankle dorsiflexion | -15 | 20 | `CA`: with the body leaned back, the shin tilts back so the flat foot starts about 15 degrees plantarflexed; the end is moderate, inside the 25 degrees used in `S R7`'s calf-raise range |
| Knee flexion | 0 to 5 | 0 to 5 | `CA` |
| Hip flexion | 0 | 0 | `CA`: body in one line |
| Trunk inclination | -15 | -15 | `CA`: against the wall |
| Toe extension | 0 | 0 | `CA` |
| Arms | shoulder E 10, elbow 0 | same | `CA`: relaxed |

- **Held fixed:** the heels on the floor, the back on the wall, the legs.
- **Wrong clips:** (1) *Stance too close to the wall* (`legs.yml`): feet 0.1 of stature from the wall and the range shrinks to 10; (2) *Rushing the lowering*: End to Start in 0.4 s.
- **Limits:** dorsiflexion never above 25. Reduced-range clip (shin pain, `legs.yml`): seated toe raises, same ankle range, knee 90, hip 90.
- **Rig needs:** a wall plane; the toe joint (the toes stay flat) and independent ankles.
- **Variations not specified:** none.
