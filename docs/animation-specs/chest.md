# Movement specs: chest (12 exercises)

Status: **draft, not reviewed by a physiotherapist or coach.** Source data: [`src/content/exercises/chest.yml`](../../src/content/exercises/chest.yml). Conventions, sign rules, the basis codes `S`, `D` and `CA`, the reference list `R1` to `R18`, and shared props `P1` to `P11` are in [`README.md`](./README.md). Read that first.

All 12 exercises in `chest.yml` have a clear movement and are specified. None is skipped. Variations that change a joint path but have their own page entry are listed at the end of each spec as "Variations not specified"; they are not in round 1.

General education for healthy adults, not a personal prescription.

## C1. Shared press geometry (flat and incline presses, dumbbell and barbell)

These definitions are used by exercises 1 to 5.

- **Elbow flare (φ).** The angle between the upper arm and the torso as seen from the head end. `chest.yml` says "about 45 to 70 degrees". R9 tested 45, 70 and 90 degrees. **Default 60** (`CA`, the middle of the stated band). 90 is the labelled wrong clip.
- **Drop (a).** How far the elbow sits below the line of the shoulders, as an angle behind the frontal plane. Default **10 degrees** (`CA`): the lifter's elbows pass slightly below chest level, as the bench and the touch point allow. Dumbbells may reach 15; never past 20.
- **Forearm vertical.** In the world, the forearm is vertical at the bottom and stays vertical on the way up ("wrists stacked over the elbows"). The hand position is set by this rule.
- **Derived bottom values (`D`).** From the three rules above, worked out as a vector calculation in the trunk frame:

| Bench back angle | Flare 45 | Flare 60 | Flare 70 | Elbow flexion at the bottom | Shoulder E at lockout |
|---|---|---|---|---|---|
| 0 degrees (flat) | E 46, P -14 | E 61, P -12 | E 70, P -11 | 100 | 90 |
| 30 degrees | E 46, P -14 | E 61, P -12 | E 70, P -11 | 120 (flare 45), 113 (flare 60), 109 (flare 70) | 120 |

(E = shoulder elevation, P = shoulder plane; see README section 2.3.) The elbow angle at the bottom of a press is **a coaching approximation**: no source gives it. Reasoning: with the forearm vertical and the upper arm level with the torso (drop 0) the elbow is exactly 90 degrees; each degree the elbow sits below the shoulder line adds about one degree of flexion, so a 10 degree drop gives about 100. On an incline the vertical forearm tips toward the head relative to the chest, which adds about 13 to 20 degrees.
- **Bar or dumbbell position at the bottom (flat, `D`).** Toward the feet from the shoulder-joint line by `upper-arm length × cos φ × cos a`, about 0.09 of stature (16 cm for a 175 cm figure): the lower sternum.
- **Lockout.** Arms vertical in the world, hands over the shoulder joints, elbows 0 to 5 degrees (straight, not hyperextended).
- **Set shoulder blades (`CA`).** Scapular protraction -10 and elevation -5 (retracted and slightly depressed), held for the whole rep. R9 compared a retracted blade with a neutral one and a released one in a model and found retraction reduced posterior glenohumeral shear and rotator-cuff activity; it gives no angle for the retraction.
- **Supine set-up pose (flat bench, `CA`).** Head, upper back and buttocks on the pad; feet flat on the floor with the shins near vertical; hip flexion 5, knee flexion 95, ankle dorsiflexion 0 to 5 (the feet sit "under the knees", `chest.yml`); lumbar flexion -5 (natural arch, ribs not flared); thoracic flexion 0; neck flexion 0 with the head on the pad.

## 1. Barbell bench press (`barbell-bench-press`)

- **Camera:** side-on from the lifter's right (bar path, forearm vertical, elbow angle). Second view from the head end (elbow flare, bar level).
- **Body and props:** supine on P2; barbell P1, overhand grip, thumbs round the bar, hand spacing about **1.5 BAW** (the `chest.yml` setup; R9 tested 1, 1.5 and 2 BAW and found grips under 1.5 BAW lowered acromioclavicular compression in a model). Rack P5 shown only before the first rep.
- **Laterality:** bilateral, symmetric.
- **Muscles:** primary pectoralis-major; secondary deltoid, triceps-brachii.
- **Tempo (s):** down 2.5 (`chest.yml`: 2 to 3 seconds) · hold 0.5 at the chest (1.0 for the paused variation) · up 1.5 · rest 0.5 at lockout = **cycle 5**.

| Joint | Start (lockout) | End (bar on lower chest) | Basis |
|---|---|---|---|
| Shoulder elevation E | 90 | 61 (45 to 70 allowed) | `S R9` for the 45 to 70 band; value `D` (C1) |
| Shoulder plane P | 90 | -12 | `D` from drop 10 |
| Shoulder rotation R | 0 | 0 | `CA`: arm moves without twisting, forearm stays vertical |
| Elbow flexion | 0 to 5 | 100 | `D`; no source (C1) |
| Forearm pronation | pronated (overhand) | pronated | `CA` |
| Wrist extension | 10 | 10 | `CA`: bar sits on the heel of the palm, wrist stacked over the elbow |
| Scapula protraction / elevation | -10 / -5 | -10 / -5 | `CA` (C1) |

- **Held fixed:** the whole supine set-up pose in C1 (legs, lumbar arch, hips on the pad, head on the pad, wrists, shoulder blades).
- **Wrong clips:**
  1. *Elbows flared to 90 degrees* (`chest.yml` mistake): bottom E 90, P -10, elbow still about 100. R9 tested 90 degrees; in its model larger flare angles raised glenohumeral forces and lowered acromioclavicular forces, in short parts of the cycle only. It did not show injury, and `chest.yml` states the "loads the front of the shoulder" caution as the reason to show it as a fault.
  2. *Shoulder blades slide forward as the bar rises*: scapular protraction goes from -10 to +10 and elevation from -5 to +10 during the ascent.
  3. *Hips lift off the bench*: pelvis rises about 6 cm and lumbar flexion goes from -5 to -15 during the ascent.
  4. *Bounce*: bar compresses the chest about 2 cm and rebounds with no hold and an up phase of 0.8 s.
- **Limits:** the bar stops on the chest; do not let shoulder plane P go below -20 or elbow flexion above 110. For the contraindication "painful shoulder at the bottom" (`chest.yml`), show a **reduced-range clip**: stop with P = 0 and elbow 90 (bar about 8 to 10 cm above the chest, `D`, drop 0). R16 notes that bench pressing is a common cause of pectoralis major tendon tears, which is the reason to keep the lowering limit conservative and the tempo controlled.
- **Rig needs:** both hands rigidly attached to the bar; bar-to-chest contact at the bottom; bench contact for head, back and buttocks; independent scapula.
- **Variations not specified:** close grip (hand spacing about 1 BAW, wrists stay stacked), paused (hold 1.0).

## 2. Dumbbell bench press (`dumbbell-bench-press`)

- **Camera:** side-on from the right; second view from the head end (the dumbbell arc).
- **Body and props:** supine on P2 with the C1 set-up pose; two dumbbells P4. Grip "neutral or slightly turned in" (`chest.yml`): handles at about 45 degrees between pronated and neutral (`CA`), forearm pronation 45 (0 for the neutral-grip variation).
- **Laterality:** bilateral; both arms move independently but identically.
- **Muscles:** primary pectoralis-major; secondary deltoid, triceps-brachii.
- **Tempo (s):** down 2.5 · hold 0.5 · up 1.5 · rest 0.5 = **cycle 5**.

| Joint | Start (lockout) | End (stretch, dumbbells beside the chest) | Basis |
|---|---|---|---|
| Shoulder E | 90 (arms vertical; may lean in up to 5 degrees at the top) | 61 (45 to 70 allowed) | `S R9` band, value `D` |
| Shoulder P | 90 | -12 (dumbbells may reach -15) | `D`; `chest.yml`: stop when the upper arms are level with the torso |
| Shoulder R | 0 | 0 | `CA` |
| Elbow flexion | 0 to 5 | 100 | `D`, no source |
| Forearm pronation | 45 | 45 | `CA` |
| Wrist extension | 0 to 10 | 0 to 10 | `CA` |
| Scapula protraction / elevation | -10 / -5 | -10 / -5 | `CA` (C1) |

- **Path:** an arc. At the top the two dumbbell centres are about 1.0 BAW apart and **do not touch** (`chest.yml`: "press up and slightly together"); at the bottom they sit beside the lower chest. The hands are the contacts; solve the arms from them.
- **Held fixed:** as exercise 1.
- **Wrong clips:** *Lowering too deep* (`chest.yml`): P to -35, elbow to 115, scapular protraction to +10 and elevation to +10 (the shoulders roll forward).
- **Limits:** do not pass P -20 in the main clip. The `chest.yml` contraindication ("painful shoulder at the stretch position") maps to a reduced-range clip ending at P = 0, elbow 90.
- **Rig needs:** hand-to-dumbbell contact on the handle, dumbbell collision shapes so the heads never overlap.
- **Variations not specified:** neutral grip (pronation 0), slight incline (the 15 degree bench).

## 3. Incline barbell press (`incline-barbell-press`)

- **Camera:** side-on from the right (shows the bench at 30 degrees, bar path, forearm vertical).
- **Body and props:** supine reclined on P3 with the back at **30 degrees above horizontal** (`chest.yml`; R17 compared 0, 30 and 45 degrees by EMG only). Buttocks on the seat, feet flat, hips on the seat. Barbell P1, grip 1.5 BAW.
- **Laterality:** bilateral.
- **Muscles:** primary pectoralis-major; secondary deltoid, triceps-brachii.
- **Tempo (s):** down 2.5 · hold 0.5 · up 1.5 · rest 0.5 = **cycle 5** (`chest.yml` asks for a brief pause).

| Joint | Start (lockout) | End (bar just below the collarbone) | Basis |
|---|---|---|---|
| Shoulder E | 120 (arms vertical in the world) | 61 (45 to 70) | `D` (90 plus the 30 degree bench angle), flare `S R9` band |
| Shoulder P | 90 | -12 | `D` |
| Shoulder R | 0 | 0 | `CA` |
| Elbow flexion | 0 to 5 | 113 (flare 60) | `D`, no source |
| Wrist extension | 10 | 10 | `CA` |
| Scapula protraction / elevation | -10 / -5 | -10 / -5 | `CA` |
| Hip flexion | 35 | 35 | `D` (thighs roughly horizontal, trunk 30 degrees back) |
| Knee flexion | 95 | 95 | `CA` |
| Ankle dorsiflexion | 0 to 5 | 0 to 5 | `CA` |
| Lumbar flexion | 0 | 0 | `CA`: a natural curve; `chest.yml` says keep a natural arch without lifting the hips |

- **Bar position at the bottom (`D`):** about 3 cm toward the feet from the shoulder-joint line along the trunk, the collarbone line. The path is close to a vertical straight line (`chest.yml`: "straight line to arms-length").
- **Held fixed:** legs, hips on the seat, lumbar, wrists, shoulder blades.
- **Wrong clips:** (1) *Bench too steep* (`chest.yml`: 45 degrees or higher): back angle 50, so lockout E is 140 and the front of the shoulder does the visible work; (2) *Elbows flare and the bar drifts to the neck*: bottom hand position 8 cm toward the head, E 80, P -5.
- **Limits:** as exercise 1; also do not set the bench above 45 degrees in any clip except wrong clip 1.
- **Rig needs:** adjustable back angle on P3; the bench angle is a parameter of the clip.
- **Variations not specified:** 15 degree bench, 45 degree bench (EMG-only evidence on the page).

## 4. Incline dumbbell press (`incline-dumbbell-press`)

- **Camera:** side-on from the right; second view from the head end.
- **Body and props:** as exercise 3 on P3 at 30 degrees; two dumbbells P4, grip as exercise 2 (pronation 45).
- **Laterality:** bilateral.
- **Muscles:** primary pectoralis-major; secondary deltoid, triceps-brachii.
- **Tempo (s):** down 2.5 · hold 0.5 · up 1.5 · rest 0.5 = **cycle 5**.

| Joint | Start (lockout) | End (stretch) | Basis |
|---|---|---|---|
| Shoulder E | 120 | 61 (45 to 70) | `D` / `S R9` band |
| Shoulder P | 90 | -12 (to -15) | `D` |
| Shoulder R | 0 | 0 | `CA` |
| Elbow flexion | 0 to 5 | 113 | `D`, no source |
| Forearm pronation | 45 | 45 | `CA` |
| Wrist extension | 0 to 10 | 0 to 10 | `CA` (keep the dumbbell over the forearm) |
| Scapula protraction / elevation | -10 / -5 | -10 / -5 | `CA` |
| Hips, knees, ankle, lumbar | as exercise 3 | as exercise 3 | `D` / `CA` |

- **Held fixed:** as exercise 3.
- **Wrong clips:** (1) *Bench too steep* (back angle 50); (2) *Wrists rotate back so the weight drifts behind the elbow* (`chest.yml`): wrist extension 35, dumbbell centre about 5 cm behind the forearm line at the bottom.
- **Limits:** do not pass P -20; reduced-range clip ends at P = 0, elbow 100 for the shoulder-pain contraindication.
- **Rig needs:** as exercise 2 plus the adjustable bench.
- **Variations not specified:** none beyond the 30 degree reference.

## 5. Machine chest press (`machine-chest-press`)

- **Camera:** side-on from the right (shows the handle path and seat height); second view from the front.
- **Body and props:** seated on P7 with the back against a vertical pad (trunk inclination 0), feet flat on the floor. Seat height set so the handles are level with the **mid-chest** (`chest.yml`); the handles sit about 0.12 of stature below the shoulder joint (`CA`: mid-chest). Handles move horizontally forward by about 0.30 m. Neutral-grip handles (forearm pronation 0) as the default (`CA`).
- **Laterality:** bilateral. (A single-lever machine presses both handles together.)
- **Muscles:** primary pectoralis-major; secondary deltoid, triceps-brachii.
- **Tempo (s):** down (return) 2.5 · hold 0.5 at the stretch · up (press) 1.5 · rest 0.3 = **cycle 4.8**.

| Joint | Start (stretch) | End (press) | Basis |
|---|---|---|---|
| Shoulder E | 55 | 70 | `D` from the handle height rule: the elbow sits level with the handle, 0.12 of stature below the shoulder, so E is about 50 to 60; the press ends with the arm 20 degrees below horizontal |
| Shoulder P | -10 | 90 | `D`; stretch limit P >= -15 (`chest.yml`: no rolling forward) |
| Shoulder R | 0 | 0 | `CA` |
| Elbow flexion | 100 | 10 | `D` at the start (forearm horizontal); `chest.yml` says almost straight, not locked hard, so the end is 10, `CA` |
| Wrist extension | 0 | 0 | `CA`: neutral wrist, handle in line with the forearm |
| Scapula protraction / elevation | -10 / -5 | 0 / 0 | `CA`: blades stay against the pad at the start; a small natural protraction at the end; no shrug (`chest.yml`) |
| Hip flexion | 90 | 90 | `CA` |
| Knee flexion | 90 | 90 | `CA` |
| Ankle dorsiflexion | 0 | 0 | `CA` |

- **Held fixed:** trunk against the pad, lumbar 0, hips and legs, wrists, neck.
- **Wrong clips:** (1) *Seat too low*: handles at the shoulder line; E at the start 80, scapular elevation +10 at the end (the shrug); (2) *Elbows locked hard at the top*: elbow 0 with a visible stop.
- **Limits:** stretch end P no lower than -15; end elbow no lower than 5. Reduced-range clip for the `chest.yml` contraindication: start at P = 0, elbow 90.
- **Rig needs:** a constrained lever or handle path, seat and back pad; handle-to-hand contact. **Converging handles** variation: the handles travel inward so the hands end about 0.5 BAW apart (`CA`, no growth evidence per `chest.yml`).
- **Variations not specified:** converging handles.

## 6. Cable fly (`cable-fly`)

- **Camera:** front view (the arc of the arms in the frontal and transverse planes); second view from the side to show the trunk lean and the fixed elbow bend.
- **Body and props:** standing split stance on the floor, right foot forward as the reference (mirror for balance); two cable handles P6 at **shoulder height** for the reference (mid) version, one on each side; the cables run horizontally outward.
- **Laterality:** bilateral, symmetric arms.
- **Muscles:** primary pectoralis-major; secondary deltoid, serratus-anterior.
- **Tempo (s):** down (return to the stretch) 2.5 · hold 0.5 · up (sweep together) 1.5 · rest 0.5 = **cycle 5**.

| Joint | Start (stretch) | End (hands together) | Basis |
|---|---|---|---|
| Shoulder E | 90 | 90 | `CA`: mid pulleys at shoulder height keep the arm level |
| Shoulder P | 0 (limit: never behind -5) | 85 | `CA`; the stretch limit follows `chest.yml` ("shoulders do not roll forward") |
| Shoulder R | 0 | 0 | `CA` |
| Elbow flexion | 15 | 15 | `CA`: "soft bend", held fixed (`chest.yml`: keep the elbow bend fixed) |
| Wrist extension | 0 | 0 | `CA` |
| Scapula protraction / elevation | -5 / 0 | +5 / 0 | `CA`: a small natural spread at the finish; no shrug |
| Trunk inclination | 15 | 15 | `CA`: "slight forward lean" |
| Hip flexion (front / rear leg) | 25 / 0 | 25 / 0 | `D` from the 15 degree lean |
| Knee flexion (front / rear leg) | 20 / 10 | 20 / 10 | `CA` |

- **Held fixed:** trunk lean, stance, elbow bend, wrists, neck.
- **Wrong clips:** (1) *Fly turns into a press* (`chest.yml`): elbow flexion changes from 15 to 70 as the hands close; (2) *Over-stretch* (`chest.yml`: front of the shoulder aches): P goes to -30 and scapular protraction to +10 at the start.
- **Limits:** start P no lower than -5. Reduced-range clip: start at P = 40.
- **Variation rows (indicative, `CA`, no growth evidence per `chest.yml`):**

| Variation | Start E / P | End E / P | Pulleys |
|---|---|---|---|
| High to low | 110 / 10 | 45 / 85 | Above the shoulders; hands finish near the hips |
| Mid (reference) | 90 / 0 | 90 / 85 | At shoulder height |
| Low to high | 45 / 5 | 75 / 85 | At the floor; hands finish at upper-chest height |

- **Rig needs:** cable and handle prop with a line from pulley to hand; weight stack optional.

## 7. Pec deck fly (`pec-deck-fly`)

- **Camera:** front view (arm sweep); second view from the side (back against the pad).
- **Body and props:** seated on P7 with the back against a vertical pad; handles at chest height, about shoulder height, on two arms that swing in an arc; feet flat. `chest.yml`: seat set so the shoulders are not pulled back behind the body.
- **Laterality:** bilateral.
- **Muscles:** primary pectoralis-major; secondary deltoid.
- **Tempo (s):** down (open) 2.5 · hold 0.5 · up (close) 1.5 · rest 0.5 = **cycle 5**.

| Joint | Start (open, stretch) | End (closed) | Basis |
|---|---|---|---|
| Shoulder E | 90 | 90 | `CA` |
| Shoulder P | 0 (limit: never behind 0) | 85 | `CA`; `chest.yml`: stop before the arms go behind the body line |
| Shoulder R | 0 | 0 | `CA` |
| Elbow flexion | 20 | 20 | `CA` (handle version; if the machine has forearm pads, 90 held fixed) |
| Wrist extension | 0 | 0 | `CA` |
| Scapula protraction / elevation | -5 / 0 | 0 / 0 | `CA`: back stays against the pad; no shrug |
| Trunk inclination | 0 (back on pad) | 0 | `CA` |
| Hip / knee flexion | 90 / 90 | 90 / 90 | `CA` |

- **Held fixed:** trunk on the pad, legs, wrists, neck, scapular elevation.
- **Wrong clips:** (1) *Seat too low* (`chest.yml`): arm height 10 cm below the shoulder, E 70, scapular elevation +10 at the end; (2) *Over-stretching at the start*: P to -25.
- **Limits:** P at the start no lower than 0. Reduced-range clip: start at P = 30.
- **Rig needs:** pivoting arms driven by the hand contact; seat height as a parameter.

## 8. Dumbbell fly (`dumbbell-fly`)

- **Camera:** from the head end (the frontal-plane arc); second view from the side.
- **Body and props:** supine on P2 with the C1 set-up pose (`chest.yml` allows a slight incline; the reference is flat); two dumbbells P4, palms facing each other (forearm neutral).
- **Laterality:** bilateral.
- **Muscles:** primary pectoralis-major; secondary deltoid.
- **Tempo (s):** down (open) 2.5 · hold 0.5 · up (close) 1.5 · rest 0.5 = **cycle 5**.

| Joint | Start (over the chest) | End (stretch) | Basis |
|---|---|---|---|
| Shoulder E | 90 | 90 | `CA` |
| Shoulder P | 90 | 0 (limit -10) | `chest.yml`: "elbows about level with the torso" |
| Shoulder R | 0 | 0 | `CA` |
| Elbow flexion | 20 | 20 | `CA`: soft bend, held fixed |
| Forearm pronation | 0 (neutral) | 0 | `CA` |
| Wrist extension | 0 | 0 | `CA` |
| Scapula protraction / elevation | -10 / -5 | -10 / -5 | `CA` (set, held) |

- **Held fixed:** the supine set-up pose, the elbow bend, the shoulder blades.
- **Wrong clips:** (1) *Too deep* (`chest.yml`): P -30, scapular protraction +10, elevation +10 at the bottom; (2) *A press, not a fly*: the elbow bend changes from 20 to 80 at the bottom.
- **Limits:** do not pass P -10 in the main clip. R16 notes that eccentric overload of the pectoralis major is a common cause of tendon tears; hence the conservative lowering limit and the controlled tempo. Reduced-range clip for the anterior-instability contraindication: stop at P = 30.
- **Rig needs:** dumbbell-in-hand contact with an arc path that keeps the dumbbell over the elbow's plane.

## 9. Push-up (`push-up`)

- **Camera:** side-on from the right (body line, depth); second view from the front (hand width, elbow flare).
- **Body and props:** prone plank on P10. Hands flat on the floor, fingers forward, spaced about **1.3 BAW** (`chest.yml`: slightly wider than the shoulders, `CA`), directly under the shoulders at the top. Feet together or hip-width on the balls of the feet. The body is a **rigid straight line** from head to heels that pivots at the balls of the feet; at the top this line rises at about 25 degrees above the floor (`D`, arm length about 0.37 of stature over a body length of about 0.87).
- **Laterality:** bilateral.
- **Muscles:** primary pectoralis-major; secondary deltoid, triceps-brachii, serratus-anterior, rectus-abdominis.
- **Tempo (s):** down 2.0 · hold 0.3 · up 1.5 · rest 0.5 = **cycle 4.3**. Use 4.5 if the rig prefers a rounder number.

| Joint | Start (top, arms straight) | End (chest between the hands) | Basis |
|---|---|---|---|
| Elbow flexion | 0 to 5 | 120 (100 to 135 by the chest-to-floor gap) | `D` (arm lengths and the chest gap); see note |
| Shoulder E | 65 | 50 | `D` rough (relative to the tilted trunk); flare 45 degrees at the bottom (`chest.yml`) |
| Shoulder P | 90 | 10 | `D` rough |
| Shoulder R | 0 | 0 | `CA` |
| Wrist extension | 80 | 70 | `CA`: hand flat with the forearm near vertical. See limits |
| Scapula protraction | +10 | -5 | `CA`; `chest.yml`: finish with the blades spread. `R14` supports the direction of scapular posterior tilt rising as the elbows extend; no magnitudes |
| Hip flexion | 0 | 0 | `CA`: straight line |
| Lumbar flexion | 0 | 0 | `CA` |
| Knee flexion | 0 | 0 | `CA` |
| Ankle dorsiflexion | -45 | -45 | `CA`: heels up; the foot rests on the ball and toes. Set by the floor contact |
| Toe extension | 60 | 60 | `CA`: toes flat on the floor |

- **Note on the bottom elbow angle.** A chest 8 to 10 cm above the floor requires about 120 to 140 degrees of elbow flexion with typical arm lengths (`D`); "90 degrees" corresponds to a chest roughly 25 cm above the floor. Choose the gap, not the angle, and let the contact give the angle.
- **Held fixed:** the body line (hip 0, lumbar 0, knee 0), foot contact, hand contact.
- **Wrong clips:** (1) *Sagging hips* (`chest.yml`): hip flexion goes from 0 to -15 and lumbar flexion to -20 at the bottom (the lower back arches); (2) *Flaring the elbows to 90* (`chest.yml`): bottom flare 90 degrees, E 85, P 0. `R14` found that a push-up with the shoulders elevated to about 90 degrees might put the scapula in an impingement position.
- **Limits:** keep wrist extension at or below 85; this exercise sits near the end of many people's wrist range, and `chest.yml` lists wrist pain as a contraindication. Provide a **neutral-wrist clip** (fists or handles, wrist extension 0) for it. Reduced-range variant: hands on a raised surface (the `chest.yml` regression), a surface 0.6 m high steepens the body line to about 55 degrees (`D`).
- **Rig needs:** hand and foot contacts that never slide; the body-line constraint; a toe joint; a floor.
- **Variations not specified:** deficit (hands on raised handles, the chest drops 10 cm below hand level), feet elevated, weighted.

## 10. Chest dip (`chest-dip`)

- **Camera:** side-on from the right (trunk lean, upper-arm angle); second view from the front (elbow flare, bar width).
- **Body and props:** supported on straight arms between P8 bars, hands neutral (thumbs forward, palms facing in), body hanging with the feet off the floor. Trunk leaning forward **25 degrees** (`chest.yml`: 20 to 30, `CA`). Knees bent about 70 degrees with the ankles crossed behind (`chest.yml`). **Safety:** the bars must be shown as fixed and wide-based (D-002).
- **Laterality:** bilateral.
- **Muscles:** primary pectoralis-major; secondary triceps-brachii, deltoid.
- **Tempo (s):** down 2.5 · hold 0.3 · up 1.5 · rest 0.5 = **cycle 4.8**.

| Joint | Start (top) | End (lowest point) | Basis |
|---|---|---|---|
| Trunk inclination | 25 | 30 | `chest.yml` (20 to 30); `R11` notes the thorax leans forward to help depth |
| Shoulder E | 25 | 55 | `D`: the upper arm hangs 25 degrees ahead of the trunk axis, then moves 55 degrees behind it |
| Shoulder P | 90 | -80 | `D`: forward at the top, behind the body at the bottom; elbows point slightly out (`chest.yml`) |
| Shoulder R | 0 | 0 | `CA` |
| Elbow flexion | 0 to 5 | 90 | `D` rough (hands fixed on the bars); `CA` |
| Wrist extension | 10 | 10 | `CA`: hands neutral on the bars |
| Scapula elevation | -10 | -5 | `CA`; `chest.yml`: shoulders away from the ears |
| Scapula protraction | 0 | 0 | `CA` |
| Hip flexion | 25 | 25 | `D`: thighs hang near vertical under a 25 degree lean |
| Knee flexion | 70 | 70 | `CA` |
| Ankle dorsiflexion | -20 | -20 | `CA`: relaxed, ankles crossed |

- **How deep, and why short of parallel.** `chest.yml` says "about parallel". With a 30 degree lean, a shoulder extension of 55 puts the upper arm about 5 degrees below parallel, which is the lowest point shown. R11 found that bar dips reached about 88% of a person's measured maximal shoulder extension (about 78 degrees on average) in 13 experienced men, and the authors say that depth may still load the strained inferior glenohumeral ligament (the lower front shoulder capsule). **The limit is a shoulder extension of 60 degrees** (`CA`, conservative; no source sets a safe value).
- **Held fixed:** hand contacts on the bars, leg shape, scapular protraction, wrist.
- **Wrong clips:** (1) *Dropping too deep* (`chest.yml`): shoulder extension 80, scapular elevation +10 and protraction +10, so the shoulder rolls forward; (2) *Swinging or kipping*: trunk inclination oscillates 25 to 45 and the knees swing forward 20 degrees each rep.
- **Limits:** shoulder extension never above 60; elbow flexion no deeper than 100. Reduced-range clip (for any shoulder pain, `chest.yml`): shoulder extension 35 (the upper arm about 30 degrees below horizontal), elbow 110.
- **Rig needs:** hand-on-bar contacts with the body supported only by them; no floor contact; strongest need for the scapula joint and for a shoulder that can extend behind the trunk without the arm shortening.
- **Variations not specified:** upright torso (trunk 0 to 10 degrees, elbows close), which moves the work toward the triceps.

## 11. Push-up plus (`push-up-plus`)

- **Camera:** side-on from the right (the upper back and shoulder blade); second view from behind and above (the blades spreading).
- **Body and props:** the push-up top position (exercise 9) on P10. The rep shown is the plus phase from straight arms; for a full rep, play the exercise 9 descent and press first, then the plus.
- **Laterality:** bilateral.
- **Muscles:** primary serratus-anterior; secondary pectoralis-major, pectoralis-minor.
- **Tempo (s):** reach (plus) 1.5 · hold 1.0 (2.0 in the `chest.yml` progression) · return 1.5 · rest 0.5 = **cycle 4.5**.

| Joint | Start (straight-arm top) | End (plus: blades spread) | Basis |
|---|---|---|---|
| Elbow flexion | 0 to 5 | 0 to 5 | `chest.yml`: press to straight arms, then reach further |
| Shoulder E | 65 | 70 | `D` rough: the body rises slightly as the blades spread |
| Shoulder P | 90 | 90 | `CA` |
| Scapula protraction | +10 | +25 | `CA`: a visible further spread. `R14` supports the direction only (posterior tilt rises as the elbows extend) |
| Scapula elevation | -5 | -5 | `CA`: no shrug |
| Thoracic flexion | 0 | +8 | `CA`: `chest.yml` says the upper back rounds slightly |
| Hip flexion / lumbar flexion | 0 / 0 | 0 / 0 | `CA`: the lower back must not sag (`chest.yml`) |
| Wrist extension | 80 | 80 | `CA` |

- **Held fixed:** elbows (straight, not locked hard), the body line, the lower back, the hands and feet.
- **Wrong clips:** (1) *Lower back sags while reaching* (`chest.yml`): lumbar flexion goes to -20; (2) *No pause at the top*: no hold, the reach is a jerk.
- **Limits:** thoracic flexion no more than +10; wrist extension at or below 85 (see exercise 9). Regression clip: hands on a wall (`chest.yml`).
- **Rig needs:** a scapula that slides on the ribcage and a spine with at least two segments.
- **Variations not specified:** knee push-up plus, feet elevated.

## 12. Cable punch (`cable-punch`)

- **Camera:** side-on from the right (the reach and the trunk); second view from behind (the shoulder blade protraction and any trunk rotation).
- **Body and props:** standing in a split stance **facing away from the stack**, left foot forward, right arm working. Cable P6 at **chest height**, handle held at the right shoulder at the start. The cable pulls backward and horizontally.
- **Laterality:** **one-sided, right arm** (the left arm hangs relaxed, or the left hand rests on the left thigh). The `chest.yml` dose is per side; the engineer mirrors it.
- **Muscles:** primary serratus-anterior; secondary pectoralis-major, deltoid.
- **Tempo (s):** punch 1.0 · hold 1.0 at the end of the reach (longer in the progression) · return 2.0 (`chest.yml`: no snapping back) · rest 0.5 = **cycle 4.5**.

| Joint | Start (handle at the shoulder) | End (arm reached) | Basis |
|---|---|---|---|
| Shoulder E | 45 | 90 | `CA`: the arm rises to shoulder height at the end |
| Shoulder P | 75 | 90 | `CA` |
| Shoulder R | 0 | 0 | `CA` |
| Elbow flexion | 130 | 0 to 5 | `CA`: handle at the shoulder, then a straight arm (`chest.yml`) |
| Wrist extension | 0 | 0 | `CA` |
| Scapula protraction | 0 | +25 | `CA`; `chest.yml`: reach further by spreading the blade |
| Scapula elevation | 0 | 0 | `CA`: no shrug (`chest.yml` mistake) |
| Trunk inclination | 10 | 10 | `CA` (slight lean into the stance) |
| Trunk rotation | 0 | 0 (tolerance 5) | `CA`: the rotation comes from the arm and blade only |
| Hip flexion (front / rear) | 20 / 0 | 20 / 0 | `CA` |
| Knee flexion (front / rear) | 20 / 10 | 20 / 10 | `CA` |

- **Held fixed:** the stance, the trunk (no rotation), the neck, the left arm.
- **Wrong clips:** (1) *Trunk rotates to create the reach* (`chest.yml`): trunk rotation 25 degrees toward the working side by the end; (2) *Shoulder shrugs as the arm reaches*: scapular elevation +15.
- **Limits:** the end of the reach is at E 90 or below; do not raise the arm above shoulder height. Regression clip: lighter weight and a shorter reach (end protraction +12), or the push-up plus on a wall.
- **Rig needs:** a cable and handle prop; a trunk with a transverse-plane rotation degree of freedom (held at zero in the correct clip, used in the wrong clip); the scapula.
- **Variations not specified:** none.
