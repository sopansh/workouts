# Movement specs for the 3D rig: conventions, references and how to read a spec

Status: **draft, not reviewed by a physiotherapist or coach.** Written by `strength-coach` under directive D-001 for the executive's rig plan ([`../animation-plan.md`](../animation-plan.md)). Nothing here changes site content or code.

Round 1 covers the hypertrophy chest and legs exercises: [`chest.md`](./chest.md) (12 exercises) and [`legs.md`](./legs.md) (22 exercises). Back, shoulders, arms and core are a later round.

These specs are general education for healthy adults, not a personal prescription. They describe how a figure should move so the page teaches sound form. They are not advice for any individual.

## 1. How to read a spec

Every exercise has the same blocks, in the same order.

| Block | Meaning |
|---|---|
| Camera | The plane that shows the key joint action, and a second view to check the other plane |
| Body and props | Orientation of the body in the world, and the props it touches (dimensions in section 6) |
| Laterality | Bilateral (both sides identical), or one-sided with the side named |
| Muscles | The exercise's `primary` and `secondary` from the exercise YAML, to drive the highlight |
| Tempo | Seconds down, hold, up, rest, and their sum as `cycle` |
| Joint table | One row per moving joint: **Start**, **End**, **Basis** |
| Held fixed | Joints that must not move, with the value they hold |
| Wrong clips | The faults worth a second, labelled "wrong" clip, with the size of the fault |
| Limits | The end positions the figure must never pass, and range-limited variants for the contraindications |
| Rig needs | Anything the rig must support for this exercise that is not obvious |

**Start and End.** A rep runs Start, then End, then back to Start. Start is the position the lifter begins each rep from (the top of a press or squat, the stretched position of a curl). End is the turning point. Where a rep has a hold, it is at End unless the tempo line says otherwise.

**Tolerance.** Unless a row says otherwise, an angle is a target with a tolerance of 5 degrees. A range in a cell (for example `95 to 105`) means any value inside it is acceptable and the engineer may pick the one that makes the contacts work.

**Contacts beat angles.** Where a hand holds a bar or a foot stands on the floor, the contact is the rule and the angle follows from it (inverse kinematics). The angles are there to check the result. If an angle and a contact disagree, keep the contact and keep every joint inside the End values listed under Limits.

**Basis column (how far to trust a number).**

| Code | Meaning |
|---|---|
| `S` plus reference id (for example `S R5`) | The number is stated in a source I read (abstract, or open full text). The source's population and conditions are in section 4 |
| `D` | Derived: worked out from other numbers in the spec by simple geometry, using typical body proportions as a feasibility check. Not a measurement. Re-run it with the rig's own segment lengths |
| `CA` | Coaching approximation. No source gives this angle. The reasoning is in the row or the notes. Treat it as a defensible default, not a finding |

Where a source covers a different population or loading from the animation (an unloaded squat, a trial in young women), the row says so.

## 2. Conventions

### 2.1 Body frame, planes, units

- **Anatomical start position:** standing upright, feet hip-width, arms hanging with the palms facing forward. Every joint angle is 0 here, except where a row says otherwise.
- **Angles are in degrees.** Positive and negative are defined below in plain words and are the same for the left and right sides (the sign means "the named movement", never "clockwise").
- **Body axes** (for the figure, independent of the rig's screen axes): forward (the direction the face looks when standing), up (head), and lateral (out to the person's side). Lying exercises keep the body's own axes; the body is rotated in the world, not the axes.
- **Planes:** sagittal (the side view: bending forward and back), frontal (the front view: moving out to the side), transverse (the view from above: turning).
- **Rig mapping note.** The current rig draws side-on 2D points with y down, the floor at y = 150 and x = 150 centre. The extended rig uses angles, so these specs never use those coordinates. The one exception is a sanity check against the existing 2D poses (section 7).

### 2.2 Joint names and signs

| Joint | Name in specs | Zero | Positive is |
|---|---|---|---|
| Hip | hip flexion | Thigh in line with the trunk (standing) | Thigh lifts forward relative to the pelvis. Negative is extension (thigh behind the trunk) |
| Hip | hip abduction | Thigh straight down | Thigh moves away from the midline. Negative is adduction |
| Hip | hip rotation | Kneecap faces the same way as the toes of a neutral foot | External (kneecap turns outward). Negative is internal |
| Knee | knee flexion | Straight leg | Heel moves toward the buttock. Never negative in these specs |
| Ankle | ankle dorsiflexion | Foot at 90 degrees to the shin | Toes move toward the shin (shin leans forward over a flat foot). Negative is plantarflexion (toes pointing away) |
| Toe | toe extension | Toes flat in line with the foot | Toes bend up (as in a heel raise) |
| Pelvis | pelvic tilt | Neutral standing tilt | Anterior tilt (front of the pelvis tips down, small of the back arches). Negative is posterior tilt |
| Lumbar spine | lumbar flexion | The natural standing curve of the lower back | Rounding of the lower back (flexion). Negative is a deeper arch (extension) |
| Thoracic spine | thoracic flexion | Natural standing curve of the upper back | Rounding. Negative is straightening or arching |
| Trunk | trunk inclination | Trunk line (hip centre to shoulder centre) vertical | Trunk leans forward from vertical. Negative is leaning back. Used for standing and seated exercises. For lying exercises the body's orientation is stated in "Body and props" instead |
| Neck | neck flexion | Head level, eyes forward, in line with the trunk | Chin moves toward the chest |
| Scapula | scapular protraction | Neutral resting position | Shoulder blade slides forward round the ribcage (spread). Negative is retraction (pinched back) |
| Scapula | scapular elevation | Neutral resting position | Shrug up. Negative is depression (down) |
| Elbow | elbow flexion | Straight arm | Forearm moves toward the upper arm. "Straight" in a loaded lockout means 0 to 5, never hyperextended |
| Forearm | forearm pronation | Palm facing forward, arm hanging (anatomical) | Palm turns to face backward or down. Negative is supination. `neutral` means the thumb points up, palms face each other |
| Wrist | wrist extension | Hand in line with the forearm | Back of the hand moves toward the forearm. Negative is flexion |

### 2.3 The shoulder: three numbers, always relative to the trunk

A two-number "flexion plus abduction" description depends on the order in which the two are applied, so these specs use three numbers, all measured **relative to the trunk, not the world**:

1. **Elevation (E), 0 to 180.** The angle between the upper arm and the trunk's long axis. 0 is the arm hanging beside the trunk (pointing toward the hips). 90 is the arm pointing straight out from the trunk. 180 is the arm pointing along the trunk toward the head.
2. **Plane (P).** The direction the arm has been lifted in, seen from above the shoulder. 0 is straight out to the side (the frontal plane). 90 is straight forward (the sagittal plane). Negative is behind the side line (arm drawn back).
3. **Rotation (R).** Twist of the upper arm about its own long axis. 0 means the arm reached its position without twisting it. With the elbow bent to 90 degrees, R = 0 puts the forearm pointing forward when the arm hangs; positive is external (forearm swings outward).

Plain-word equivalents: *flexion* is E with P = 90, *abduction* is E with P = 0, *extension* is E with P = -90, *horizontal adduction* is P increasing from 0 toward 90 while E stays near 90.

When a spec says "forearm vertical" (a press), that is a world constraint on the forearm. Solve the arm from the hand contact and the forearm rule; the E, P and R values are the check.

This is the same family of idea as the ISB recommendation (a plane of elevation, an elevation, an axial rotation). I have read only the ISB abstracts, not the full text, so confirm the exact axis order against Wu et al. 2005 before implementing it (see section 4).

### 2.4 Lying and inclined bodies

- "Supine on a flat bench" means the trunk line is horizontal, the back against the pad, face up. The trunk-frame values above still apply: "arms pointing at the ceiling" is E = 90, P = 90 on a flat bench.
- "Bench at 30 degrees" means the back pad rises 30 degrees above horizontal toward the head. With the arms vertical in the world, the shoulder is at E = 120 relative to the trunk (derived: 90 + 30).

### 2.5 Tempo and cycle

`down / hold / up / rest`, in seconds, are **teaching tempos so the movement is readable**, not prescriptions and not evidence-based targets. `cycle` is their sum and matches the `cycle` field the rig already uses (4 to 5 seconds in `/core/`). Where the exercise YAML states a time (for example "2 to 3 seconds" lowering a bench press), the tempo uses it. Otherwise the tempo is `CA`.

### 2.6 Laterality, mirroring and the far side

Bilateral specs describe both sides identically. One-sided specs give the working side as "right"; the engineer mirrors it for the left. The rig needs independent left and right limbs (the plan already says so).

### 2.7 Conventions for contacts and the barbell

- A **grip** is a hand contact at a stated position on a prop. Hand spacing for barbell presses is given as a multiple of the biacromial width (shoulder-joint to shoulder-joint distance, "BAW").
- **Bar over mid-foot** (squats, deadlift patterns): the load's horizontal position should sit within about 5 cm of the middle of the foot for a 175 cm figure. This is a balance check on the keyframes, not a source-backed rule.
- A prop's **dimensions** are in section 6. They are typical commercial sizes, `CA`, and scale with the figure's stature where the spec says so.

## 3. What the specs deliberately do not do

- They give **no global joint-limit table.** A table of "normal range" clamps needs a readable source, and I could not read one (section 5). Each spec instead states the End values it needs and the values the figure must not pass in that exercise. The engineer should clamp each exercise at its own End value plus the tolerance, and add global limits when someone with access has read Soucie et al. (section 5).
- They give **no scapular or spinal numbers from a source**, because none was readable. Scapular and thoracic values are small, qualitative `CA` offsets whose job is to make the shoulder-blade and upper-back behaviour visible and correct in direction. Do not treat their magnitudes as measurements.
- They do not specify muscle-mesh shapes, props' textures, or camera yaw and elevation numbers. "Camera" names the view; the engineer sets the numbers.

## 4. Verified references

All DOIs below were confirmed on Crossref on 2026-11-15 (title, first authors, year and venue matched). Every one was found with Europe PMC. "Read" says what I actually read. R5, R6, R7, R8 and R17 are already in `src/content/sources.yml`; the others are not. Add the ones a page cites later (section `strength`), then run `npm run verify:sources -- --write`.

| Id | Reference | DOI (Crossref-confirmed) | Read | Supports in these specs | Does not support |
|---|---|---|---|---|---|
| R1 | Wu G, Siegler S, Allard P, et al. ISB recommendation on definitions of joint coordinate system of various joints for the reporting of human joint motion, part I: ankle, hip, and spine. J Biomech 2002;35:543-548 | 10.1016/s0021-9290(01)00222-6 | Abstract | Using clinical terms (flexion, abduction, rotation) for hip, ankle and spine joint angles, with a standard local axis per bone | Any angle value. The abstract gives none. A second Crossref record, doi 10.1016/s0021-9290(02)00336-6 (2003, same title), exists; I did not read it and did not cite it |
| R2 | Wu G, van der Helm FCT, Veeger HEJ, et al. ISB recommendation on definitions of joint coordinate systems of various joints for the reporting of human joint motion, part II: shoulder, elbow, wrist and hand. J Biomech 2005;38:981-992 | 10.1016/j.jbiomech.2004.05.042 | Abstract | Standardised local axes and clinical terms for shoulder, elbow and wrist | Any angle value, and the exact rotation order (full text not read) |
| R3 | Soucie JM, Wang C, Forsyth A, et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011;17:500-507 (Crossref dates the online version 2010) | 10.1111/j.1365-2516.2010.02399.x | Abstract only; the full text is paywalled and not in PMC | That normal passive range of motion varies with age and sex (674 healthy people aged 2 to 69, goniometer, elbow, shoulder flexion, hip, knee, ankle) | **Every number.** The abstract has no values. No angle in these specs is taken from it |
| R4 | Hemmerich A, Brown H, Smith S, et al. Hip, knee, and ankle kinematics of high range of motion activities of daily living. J Orthop Res 2006;24:770-781 | 10.1002/jor.20114 | Abstract | In 30 healthy Indian adults (mean age 48), unloaded deep squatting reached a mean knee flexion of 157 degrees (SD 6) with heels up, and a mean hip flexion of 95 degrees (SD 27, large spread) with heels flat. Used only as an upper bound that unloaded humans can reach | Loaded barbell depths. The hip value uses a floating-axis definition from a sacrum sensor and is not the trunk-block hip flexion used here |
| R5 | Bloomquist K, Langberg H, Karlsen S, et al. Effect of range of motion in heavy load squatting on muscle and tendon adaptations. Eur J Appl Physiol 2013;113:2133-2142 | 10.1007/s00421-013-2642-7 | Abstract | Heavy loaded squatting through 0 to 120 degrees of knee flexion ("deep") versus 0 to 60 ("shallow"), 0 = extended, in 17 young men for 12 weeks. Used as the sourced loaded squat depth: **knee flexion 120** | Hip, ankle or trunk angles |
| R6 | Pedrosa GF, Lima FV, Schoenfeld BJ, et al. Partial range of motion training elicits favorable improvements in muscular adaptations when carried out at long muscle lengths. Eur J Sport Sci 2022;22:1250-1260 (Crossref dates the online version 2021) | 10.1080/17461391.2021.1927199 | Abstract | Knee extension full range **100 to 30 degrees** of knee flexion, initial partial 100 to 65, final partial 65 to 30 (0 = extended knee), in 45 untrained women for 8 weeks | Whether to finish at 0 degrees; the trial stopped at 30 |
| R7 | Kassiano W, Costa B, Kunevaliki G, et al. Greater gastrocnemius muscle hypertrophy after partial range of motion training performed at long muscle lengths. J Strength Cond Res 2023;37:1746-1753 | 10.1519/jsc.0000000000004460 | Abstract | Calf-raise ankle range of **-25 to +25 degrees**, where 0 is the foot at 90 degrees to the shin; "initial" is -25 to 0 (the stretched half). 42 young women, 8 weeks, horizontal leg-press machine | The sign: the abstract does not say which direction is negative. I read -25 as dorsiflexion because "initial" is the long-muscle-length half. Confirm against the full text |
| R8 | Kinoshita M, Maeo S, Kobayashi Y, et al. Triceps surae muscle hypertrophy is greater after standing versus seated calf-raise training. Front Physiol 2023;14 | 10.3389/fphys.2023.1272106 | Abstract | Standing calf raise with the knee extended versus seated with the knee flexed to **90 degrees** | Ankle range |
| R9 | Noteboom L, Belli I, Hoozemans MJM, et al. Effects of bench press technique variations on musculoskeletal shoulder loads and potential injury risk. Front Physiol 2024;15 | 10.3389/fphys.2024.1393235 | Abstract and open full text | 10 experienced strength athletes pressed with grips of 1, 1.5 and 2 BAW, **elbow-flare ("shoulder abduction") angles of 45, 70 and 90 degrees** (goniometer-checked) and neutral, retracted or released shoulder blades. A model estimated that grips under 1.5 BAW lowered acromioclavicular compression, scapular retraction lowered posterior glenohumeral shear and rotator-cuff activity, 45 degrees raised glenohumeral superior shear compared with 70, and larger flare angles raised glenohumeral forces and lowered acromioclavicular forces, in short parts of the cycle | That one technique is "safe". Modelled forces, not injury outcomes; 10 athletes; a light load (16 kg) |
| R10 | Šarabon N, Marušič J, Marković G, Kozinc Ž. Kinematic and electromyographic analysis of variations in Nordic hamstring exercise. PLOS ONE 2019;14:e0223437 | 10.1371/journal.pone.0223437 | Abstract and open full text | 18 adults with resistance-training experience: the standard Nordic curl keeps the hips at **0 degrees of flexion** (neutral line); peak joint torque occurred at about **56 degrees (SD 9) of forward travel from the upright kneeling start** (0 = start), and a 20 or 40 degree sloped leg support let people travel further (75 and 88 degrees). Hip flexion instructions of 25 to 75 degrees raised torque but people could not hold 50 or 75 | How far a beginner can lower with control; trained adults; the "knee angle" is travel from the start, not knee flexion |
| R11 | McKenzie A, Crowley-McHattan Z, Meir R, et al. Bench, bar, and ring dips: do kinematics and muscle activity differ? Int J Environ Res Public Health 2022;19:13211 | 10.3390/ijerph192013211 | Abstract and open full text | 13 experienced men: average **maximal shoulder extension in a dip test about 89 degrees** (the text writes "88.72%" with a degree SD of 9.38, which I read as degrees; the ring-dip figures below reconcile with it). Bar-dip peak extension was **88% of that maximum (about 78 degrees)**, ring dip **61.7 degrees**, bench dip about 101%. The authors say that depth may still load the inferior glenohumeral ligament (lower front shoulder capsule) | Elbow, trunk and scapular angles (they are in a figure I could not read). Not an injury-rate study |
| R12 | Escamilla RF, Fleisig GS, Zheng N, et al. Effects of technique variations on knee biomechanics during the squat and leg press. Med Sci Sports Exerc 2001;33:1552-1566 | 10.1097/00005768-200109000-00020 | Abstract | In 10 experienced men, knee compressive and cruciate-ligament forces generally rose with knee flexion in the squat and leg press; the authors note that training within a 0 to 50 degree knee range may suit people who want to minimise knee forces | An individual's knee-pain advice. Used only to justify an optional "reduced-range" clip |
| R13 | Farrokhi S, Pollard CD, Souza RB, et al. Trunk position influences the kinematics, kinetics, and muscle activity of the lead lower extremity during the forward lunge exercise. J Orthop Sports Phys Ther 2008;38:403-409 | 10.2519/jospt.2008.2634 | Abstract | In 10 healthy adults a forward-leaning trunk raised peak hip flexion and hip-extensor demand; an extended trunk raised peak ankle dorsiflexion and lowered peak hip flexion (direction of effect only; no values in the abstract) | The size of any lunge angle |
| R14 | Suprak DN, Bohannon KA, Morales B, et al. Scapular kinematics and shoulder elevation in a traditional push-up. J Athl Train 2013;48:826-835 | 10.4085/1062-6050-48.5.08 | Abstract | In 16 healthy people the scapula's posterior tilt rises as the elbows extend, and a push-up with the shoulders elevated to about 90 degrees may put the scapula in an impingement position (direction of effect; no values in the abstract) | Scapular magnitudes |
| R15 | Walsh JC, Quinlan JF, Stapleton R, et al. Three-dimensional motion analysis of the lumbar spine during "free squat" weight lift training. Am J Sports Med 2007;35:927-932 | 10.1177/0363546506298276 | Abstract | In 48 athletes squatting at 40, 60 and 80% of maximum, mean lumbar flexion from the calibrated zero ranged from 24.7 degrees (40% group) to 6.8 degrees (80% group), and mean extension from -1.5 (40%) to -20.3 degrees (80%): at heavy loads athletes moved toward lumbar extension. These are the magnitudes used for the labelled "wrong" squat clips | Any claim that these magnitudes injure the spine; the paper does not say so |
| R16 | Magone K, Ben-Ari E, Gyftopoulos S, et al. Pectoralis major tendon tear: a critical analysis review. JBJS Rev 2021;9 | 10.2106/jbjs.rvw.20.00224 | Abstract | Pectoralis major tendon tears are mostly seen in young men and bench pressing and eccentric overload are the two most common causes. Used to justify conservative lowering limits for presses and flies | A mechanism-by-joint-angle |
| R17 | Lauver JD, Cayot TE, Scheuermann BW. Influence of bench angle on upper extremity muscular activation during bench press exercise. Eur J Sport Sci 2016;16:309-316 (Crossref dates the online version 2015) | 10.1080/17461391.2015.1022605 | Abstract (already a site source and claim `bench-angle-emg`) | Bench angles of -15, 0, 30 and 45 degrees were compared (EMG only) | Any joint angle at the bottom |
| R18 | Bergmann F, Schmidt M, Jaitner T. Kinematic and electromyographic effects of different execution modalities during the Nordic Hamstring Exercise. Sports Biomech 2026 | 10.1080/14763141.2026.2657898 | Abstract | 42 participants, three execution set-ups, reported mean break-point angles of 56 to 75 degrees, and a training device with rigid heel fixation plus controlled kneeling height gave the most extended knee positions | The angle definition differs from R10 (smaller = more extended); no number used |

Maeo et al. 2021 (seated versus prone leg curl, doi 10.1249/mss.0000000000002523) and Kubo et al. 2019 (full versus half squat, doi 10.1007/s00421-019-04181-y) are existing site sources; their abstracts name the positions but give no joint angles, so no angle is taken from them.

**Search log (Europe PMC REST, `curl`).** Candidate DOIs by `DOI:"..."`; squat kinematics with `TITLE:"squat" AND (TITLE:"kinematics" OR ...)`; bench press with `TITLE:"bench press" AND (TITLE:"kinematics" OR TITLE:"shoulder" OR TITLE:"grip width")`; push-up with `TITLE:"push-up" AND (TITLE:"kinematics" OR TITLE:"scapular" ...)`; dips with `TITLE:"dips" AND (TITLE:"kinematics" OR ...)`; Nordic with `TITLE:"Nordic" AND TITLE:"kinematic" AND TITLE:"hamstring"`; normal ROM with `TITLE:"range of motion" AND TITLE:"reference" ...` and `TITLE:"Normal range of motion"`. Open full text was read through Europe PMC for R9, R10 and R11.

## 5. What is sourced and what is not

**Sourced (`S`):**
- Loaded squat depth: knee flexion 120 (R5).
- Knee-extension range: 100 down to 30 degrees of knee flexion (R6).
- Calf-raise ankle range: about 25 degrees either side of a right-angle foot (R7), and the knee-extended versus knee at 90 degrees positions (R8).
- Bench-press elbow flare: 45 to 90 degrees studied, with 45 to 70 as the default band (R9).
- Nordic curl: hips at 0 degrees; forward travel to about 56 degrees (R10).
- Dip depth: peak shoulder extension of bar dips is about 88% of a person's maximum, which is why the spec stops short (R11).
- Lumbar excursion magnitudes used for the wrong squat clips (R15).

**Derived (`D`):** hip flexion in squats, the elbow angle at the bottom of presses, hip and knee angles in the hip thrust and bridge. Each follows from stated trunk, thigh and shin positions, so they are only as good as those inputs.

**Coaching approximations (`CA`):** everything else, including the scapular offsets, wrist and forearm positions, most standing hip hinge angles, all machine geometries and every tempo. Each carries its reasoning in its spec.

**Not sourced and why it matters:**
1. **General normal-ROM ceilings** (shoulder, elbow, hip, knee, ankle). Soucie et al. (R3) is the right source and is confirmed, but the full text is paywalled and the abstract has no numbers. The executive's plan (section 6) assumes it "gives the limits"; it cannot be used for that until someone with access has read its tables. Until then, "never exceed normal range with a loaded end position" is met by keeping every End value conservative and each exercise's own limit stated, not by checking a table.
2. **Shoulder normal range** (flexion, abduction, rotation, extension) and **scapular and spinal ranges**. Soucie reports shoulder flexion only. No other source was found that I could read.
3. **Bench-press elbow angle at the bottom.** No source. The value (about 100 degrees on a flat bench) is derived from the "forearm vertical" cue and the bar touching the chest; see `chest.md`.
4. **Anthropometric proportions.** The feasibility checks used typical segment proportions from memory. The plan names de Leva and Plagenhoef as candidates; neither has been read or verified. Re-run the `D` rows with the rig's own table.
5. **Prop dimensions** (section 6) are typical equipment sizes, not a standard I verified.

## 6. Shared props (typical sizes, `CA`)

Sizes are for a figure about 1.75 m tall; scale with stature where noted. Machines are generic and unbranded: the rig needs one adjustable seat, one back pad and a lever or sled, not a model of any make.

| Id | Prop | Dimensions | Contacts |
|---|---|---|---|
| P1 | Olympic barbell | 2.20 m long, shaft diameter 28 mm, sleeves 50 mm diameter and about 0.40 m long, plates 0.45 m diameter | Hands (pressing and RDL), upper back (back squat), front of the shoulders (front squat), hips (thrust) |
| P2 | Flat bench | Top 0.43 m high, 0.30 m wide, 1.2 m long, pad about 0.07 m thick | Head, upper back, buttocks (press); one foot (split squat); upper back (thrust) |
| P3 | Adjustable bench | Back pad 0.70 m long and 0.28 m wide, hinge at 0.43 m height, back angle set per spec (30 degrees in this round), seat pad 0.30 m deep | Back, buttocks, feet on floor |
| P4 | Dumbbell | Handle 35 mm diameter and 0.13 m long, hexagonal heads about 0.10 m across and 0.07 m thick each end | Hands. Rests on the thighs when sitting down to a bench |
| P5 | Rack | Two uprights 1.0 m apart (inner), hooks adjustable, optional safety arms | Barbell rests at unrack; the figure does not touch it during the rep |
| P6 | Cable stack | Pulley height adjustable from 0.15 m to 2.0 m; D-handle 0.12 m wide, or rope | Hands |
| P7 | Plate-loaded or pin-loaded machine | Adjustable seat; back pad; handles or lever pad. Geometry given per exercise | Back, buttocks, feet or hands, pads |
| P8 | Dip bars | Two parallel bars, 0.55 m apart (inner), 35 to 40 mm diameter, top surface at 1.1 to 1.2 m | Hands; nothing else touches |
| P9 | Box | Top 0.30 to 0.50 m high (set from the figure, see `legs.md`), 0.45 m wide, 0.35 m deep, wide stable base | Buttocks lightly at the bottom |
| P10 | Floor mat | 0.01 m thick, 1.8 m long | Hands, feet, back, knees |
| P11 | Wall | Vertical plane | Back (tibialis raise) |

Load-bearing props (box, dip bars, bench, rack) are rendered with a wide, obviously stable base. This follows directive D-002: the pages carry the "only if" checks; the figure must not show an unstable set-up as normal.

## 7. Findings and open items from writing these specs

1. **Dip depth wording.** `chest.yml` tells the reader to lower "until the upper arms are about parallel to the floor". R11 found bar dips reached about 88% of a person's maximum shoulder extension, and the authors say that depth may still load the strained inferior glenohumeral ligament. The dip spec stops a little above parallel. Suggest the page says "stop at or just above parallel, and stop sooner if the front of the shoulder aches". Not changed (docs only).
2. **Existing `/core/` goblet squat pose.** The current 2D end pose puts the knee about 32 units ahead of the ankle with a shin of about 37 units, which is a shin lean of roughly 60 degrees. The spec uses 30 to 35 degrees (a `CA` value, the same as the back squat `D` check). Worth correcting when the core guide migrates to the angle rig.
3. **Glute bridge hold.** `legs.yml` says "pause for a second" at the top; the `/core/` guide says hold 2 seconds. Directive D-003 asks for the same cue everywhere. The spec uses 1 second and notes the difference.
4. **Load-bearing props without an "only if" check.** The box squat and chest dip setup text in the YAML has no "only if" check for the box or the dip bars (D-002). Not changed (docs only).
5. **Executive plan, section 6.** The plan lists Soucie as the source of limits. The abstract has no values and the full text could not be read (finding in section 5).
6. **Plan data example.** The plan's `shoulder: { flexion, abduction }` form is order-dependent. These specs use elevation, plane and rotation (section 2.3). Suggest the data model does the same.
