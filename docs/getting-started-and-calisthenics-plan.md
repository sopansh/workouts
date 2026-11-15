# Getting started with strength, and beginner calisthenics: implementation and evidence plan

Status: **plan of record. Phase 1 (getting started) and phases 4 and 5 (calisthenics foundations and first skills) are built as drafts, and both home tiles are live.** Remaining work is review and the evidence gaps below.
Related: [`CONTEXT.md`](../CONTEXT.md), [`hypertrophy-plan.md`](./hypertrophy-plan.md) (the evidence rubric and quality gates here follow section 5 and 13 of that plan).

## 1. Scope and decisions

| Question | Decision (from the owner) |
|---|---|
| Two new home tiles | **Getting started with strength training** (at home, men and women, bodyweight, day-by-day and week-by-week) and **Calisthenics** (beginner section first) |
| Equipment | Both: a no-equipment path (floor, wall, sturdy chair, a step, a backpack) with optional upgrades (resistance band, a secure doorway bar) |
| Calisthenics reach | Foundations, **plus first skill steps** (L-sit, wall handstand work, planche lean, tuck front lever) |
| Tile state | Added now as "Coming soon". Flip `status` to `live` (and set an `href`) in `src/content/sections.yml` when a section is ready |
| Independence | Calisthenics is self-contained: it does not assume the person also does strength training, and it does not link into the strength programs as a prerequisite |
| Audience | General adults. Not the owner's personal plan (unlike plyometrics). It must be safe for strangers, so the safety stance is stricter |

## 2. Safety stance (stricter than the personal plans)

The repo is public and these pages are for people we cannot see. The rules:

1. Every exercise has **contraindications, a regression, a progression and a pain rule**. The build test fails without them.
2. **Screening first.** The hub points to the official PAR-Q+ (eparmedx.com) and repeats the NHS advice to speak to a GP first if you have not exercised for some time or have a medical condition or concern.
3. **Out of scope, said plainly:** under-18s, pregnancy and the postnatal period, frailty or older-adult programmes, people with a heart, lung, joint or neurological condition, and anyone with a current injury. They get a "see a clinician or a qualified exercise professional" note, not a programme.
4. **No outcome promises.** No "burns fat", "tones", or sex-targeted claims. Benefit claims carry a source and a grade.
5. **Draft until reviewed** by a physiotherapist and a certified strength coach (hypertrophy plan section 13).
6. **Equipment safety is content.** Anything load-bearing at home (table row, doorway bar) carries an explicit "only if" check, and has a no-equipment alternative.

## 3. Evidence gathered so far

Every entry below was found on Europe PMC or the publisher, its **abstract read**, and its **DOI checked on Crossref (title, year, no retraction notice) on 2026-11-15**. The grade follows the site rubric (A meta-analysis, B good trial, C observational or biomechanics, D guideline or practice, Mixed). Checking a DOI does not prove a claim fits our use, so each claim states its limits.

| Source | What it supports | Grade | Main limit |
|---|---|---|---|
| WHO 2020 guidelines (Bull et al., BJSM, doi:10.1136/bjsports-2020-102955) | Regular muscle-strengthening activity is recommended for all age groups | D (guideline) | Public-health guideline, not a training prescription |
| NHS, adults aged 19 to 64 (nhs.uk) and NHS strength exercises | Strengthening of all major muscle groups on at least 2 days a week; bodyweight exercises count; speak to a GP first if you have not exercised for some time | D (guideline) | A guideline for health, not for building a specific amount of muscle |
| Momma et al. 2022 (BJSM, doi:10.1136/bjsports-2021-105061) | Muscle-strengthening was associated with a 10 to 17% lower risk of all-cause mortality, CVD, total cancer and diabetes; greatest risk reduction at roughly 30 to 60 min a week | C (observational cohorts) | Association, not cause; higher volumes unclear (J-shaped) |
| Roberts et al. 2020 (JSCR, doi:10.1519/jsc.0000000000003521) | Young to middle-aged men and women gain similar hypertrophy and lower-body strength; women had a larger relative upper-body strength gain | A | Short studies, high heterogeneity (I2 about 72%) for upper-body strength |
| Refalo et al. 2025 (PeerJ, doi:10.7717/peerj.19042) | Relative increases in muscle size were similar between sexes; absolute upper-body size slightly favoured males | A | Healthy 18 to 45 year olds; experience did not change the result |
| Krieger 2009 (JSCR, doi:10.1519/jsc.0b013e3181b370be) | 2 to 3 sets per exercise gave about 46% greater strength gains than 1 set; no clear gain beyond 2 to 3 | A | Meta-regression of 14 studies; strength outcomes |
| Grgic et al. 2018 (Sports Med, doi:10.1007/s40279-018-0872-x) | Higher training frequency gave more strength, but this was driven by volume; volume-matched studies showed no frequency effect; mostly untrained participants | A | Frequency alone is unproven; mostly moderate-quality studies |
| ACSM position stand 2009 (MSSE, doi:10.1249/mss.0b013e3181915670) | Novices: 2 to 3 days a week, loads around 8 to 12 repetition maximum, raise load 2 to 10% once one or two extra reps are possible | D (position stand) | 2009; written for external loads, so bodyweight needs the progression ladders |
| Kikuchi 2017 (JESF, doi:10.1016/j.jesf.2017.06.003) | Push-ups scaled (for example kneeling) to match a 40% 1RM bench press gave comparable strength and muscle thickness over 8 weeks | B | 18 young men, twice a week |
| Calatayud et al. 2015 (JSCR, doi:10.1519/jsc.0000000000000589) | Band push-ups and bench press at comparable muscle activity gave similar strength gains over 5 weeks | B | 30 men with advanced experience, short |
| Kotarsky et al. 2018 (JSCR, doi:10.1519/jsc.0000000000002345) | Progressive push-up variations improved upper-body strength, comparable to bench press | B | 23 moderately trained men, 4 weeks; muscle thickness did not change |
| Suprak et al. 2011 (JSCR, doi:10.1519/jsc.0b013e3181bde2cf) | The share of body mass the arms support depends on body position and push-up variant; range of motion may need adjusting for beginners | C (biomechanics) | 28 highly trained men, static positions |
| Jenkins et al. 2016 and Dinyer et al. 2019 (JSCR, doi:10.1519/jsc.0000000000001308 and 10.1519/jsc.0000000000003194) | Light loads taken to failure built similar muscle (men, 4 weeks) and similar strength (women, 12 weeks) as heavy loads, though only heavy loads raised strength in the men | Mixed | Both trained **to failure**, while our beginner plan stops short of failure, so it does not apply directly |

**Reused from the strength register** (already verified there): Schoenfeld et al. 2017 on low versus high loads, and Refalo et al. 2023 on proximity to failure. Link to them rather than re-grade them.

### Gaps, stated honestly

- **No systematic review of calisthenics for beginners was found** (searched Europe PMC titles and abstracts). The calisthenics evidence is **extrapolated** from resistance-training trials and a few push-up trials, all in young men.
- **No trial of women doing home bodyweight training** to build strength was found. The sex-difference evidence is for resistance training in general.
- **Skill progressions (L-sit, handstand, planche, front lever) have no training-outcome evidence** in what we found. Handstand papers describe balance control, not how to train it. Skill steps are therefore **grade D coaching convention** and say so.
- **No injury-epidemiology source** for calisthenics (wrist, elbow, shoulder) has been verified yet. We will not state injury rates.
- A "Minute Calisthenics" trial protocol (Hollingsworth 2020) exists; a protocol is not a result, so it is not cited.
- Europe PMC mislinks one DOI to an unrelated paper (the Suprak DOI). Always confirm a DOI on Crossref **and** the title, never on Europe PMC alone.

## 4. Information still to gather

| Topic | Question | Where to look | Needed for |
|---|---|---|---|
| Beginner soreness and the repeated-bout effect | How to set the first week so soreness is manageable | Europe PMC, `repeated bout` and `delayed onset`, then Crossref | Week 1 guidance |
| Pull exercises at home | EMG or training evidence for inverted rows, band rows and scapular work | Europe PMC, `inverted row`, `elastic resistance` | Pull ladder grades |
| Plank, side plank and dead bug | Trunk muscle activity and any training outcome | Europe PMC, `side bridge`, `trunk muscle activity` | Core ladders |
| Squat and step-up for novices | Depth and knee guidance for untrained adults | Europe PMC, `squat depth` untrained | Squat ladder |
| Wrist and shoulder load in handstand-type positions | Any injury or loading data | Europe PMC, `wrist` and `gymnasts` | Calisthenics prep and handstand |
| Pull-up training for beginners | Trial or review on progressing to a first pull-up | Europe PMC, `pull-up` and `lat pulldown` | Calisthenics pull ladder |
| Adherence for beginners | What keeps beginners training | Europe PMC, `adherence` and `exercise` systematic review | Plan length and session size |
| Physiotherapist and coach review | Safety, contraindications, progressions | Named human reviewers | Moving past "draft" |

Search strings are logged here so searches are reproducible. For each new source: look it up, read the abstract, check the DOI on Crossref and the retraction notice, then write the claim, then grade it. **Never cite from memory.**

## 5. Architecture

### 5.1 Stack (decided)

**One stack: Astro, for every section.** The owner asked for uniform code, so the earlier plain-modules approach for plyometrics and getting-started was replaced: both are now Astro pages over content collections, and `/home/` and `/core/` were migrated too. See `CONTEXT.md` sections 3 to 4 and 11.

### 5.2 URL map

```
/getting-started/                  hub: who it is for, screening, equipment, men and women, what it does not cover
  weekly-plan/                     8-week plan: the week table and day-by-day sessions
  exercises/                       every exercise, grouped as ladders (easier to harder), no-equipment and optional equipment
  progression/                     placement test, how to move up, hold or step back, retest
  evidence/                        claims, grades and the source register

/calisthenics/                     hub: independent of strength training; readiness gates
  start-here/                      what to build first and why; the readiness checks
  foundations/                     phase 1: push, pull, squat, hinge, core, hollow body, wrist and shoulder prep
  first-skills/                    phase 2: L-sit, wall handstand, planche lean, tuck front lever (grade D, flagged)
  weekly-plan/                     weekly plans for each phase
  exercises/  progression/  evidence/
```

### 5.3 Content model (data, not markup)

Shared collections, used by every guide section (`CONTEXT.md` section 3a): `guideGroups` (a ladder or a set of exercises, with an explicit `order`), `guideExercises` (`group`, `level` for ladders, `equipment`, `muscles`, `setup`, `steps`, `cues`, `mistakes`, `contraindications`, `regression`, `progression`, `painRule`, and a `dose` or a weekly `schedule`) and `guidePlans` (sessions, the week layout, timing assumptions). Sources and claims join the one evidence registry with a `section` field. Pages are Astro files that lay the data out; shared components (`GuideExerciseCard`, `GuideSession`, `GuideWeek`, `ClaimList`, `SourceList`, `PainRule`, `Callout`) are reused across sections. Colours come from tokens only.

### 5.4 Validation (`scripts/check-content.mjs`)

One build-time validator covers the guides: every exercise has safety fields and a pain rule, ladders have consecutive levels from 1 and level 1 needs no optional equipment, plans reference real groups and exercises in their own section, every ladder is used in a session, sessions are never on consecutive days (Sunday to Monday included), time estimates stay within budget, jump schedules never go down, orders are unique, and a banned-phrase check blocks outcome promises ("burn fat", "tone", "guaranteed", "sculpt"). Every DOI source needs a Crossref `verifiedOn` stamp.

## 6. Getting started: programme design (draft, conventions flagged)

**Principles.** Full body, two to three days a week for a novice (ACSM, NHS), two to three sets per exercise (Krieger), a ladder for each pattern so the load comes from body position (Suprak, Kikuchi, Kotarsky), and a placement test instead of assuming a level. The sets, reps, rest, rep-in-reserve and week layout are **conventions (grade D)** and are labelled so.

**Structure.** Eight weeks. Weeks 1 and 2: two sessions a week. Weeks 3 to 8: three sessions, alternating Session A and Session B. Each session is a 5 minute warm-up plus about 25 to 35 minutes. Aerobic activity (WHO) is a separate recommendation and is stated on the hub, not scheduled here.

**Patterns and ladders** (a person starts on the easiest level where they can do 8 clean reps):

| Pattern | Levels (easier to harder) | Equipment |
|---|---|---|
| Squat | Sit-to-stand, box squat, bodyweight squat | Chair |
| Push | Wall, incline, knee, full push-up | Wall, counter, floor |
| Hip extension | Glute bridge, marching bridge, single-leg bridge | Floor |
| Hinge | Wall hip hinge, bodyweight hip hinge | Wall |
| Pull | Prone Y raise, one-arm backpack row, band row | Backpack, chair, optional band |
| Step | Low step-up | A stair or sturdy step |
| Trunk | Dead bug, bird dog, side plank from the knees | Floor |
| Calves | Calf raise | Optional wall |

**Progression rules.** Double progression within a range, then move up one level when all sets reach the top of the range with the planned reps in reserve. Hold if technique slips or soreness lingers. Step back after illness or a break. Retest the placement test in week 8.

**Men and women.** One plan. The evidence shows similar relative gains, so there is no separate programme, and no sex-targeted claims. The hub says so and cites Roberts 2020 and Refalo 2025 with limits.

## 7. Calisthenics: design (independent, beginner first)

**What to build first, in order** (a convention, grade D, to be reviewed):

1. **Readiness and prep.** Wrist and shoulder preparation, a hollow-body and plank base, and a hang if a secure bar exists. Pain-rule screening applies.
2. **Foundations.** Push (full push-up), pull (a progression to the first pull-up), squat and single-leg work, hinge or bridge, trunk (hollow body, side plank), and a straight-arm scapular base.
3. **First skills**, each with prerequisites that must be met first: L-sit (tuck then one-leg then full, from floor or parallettes), chest-to-wall handstand holds, planche lean, and tuck front lever. Every skill step is labelled **coaching convention, no training-outcome evidence found**.

**Plans.** Weekly plans for each phase, written independently of strength programmes: three days a week with a push, pull and legs-plus-trunk emphasis in the foundations phase, and short skill practice blocks in the first-skills phase. Day-by-day and week-by-week like Getting started.

**Gates before skills.** A skill step is shown only after objective prerequisites (for example 15 clean push-ups before planche lean work, a 30 second hollow hold, a 30 second plank) and a clear regression. Prerequisite numbers are conventions and flagged as such.

## 8. Phases and acceptance criteria

| Phase | Deliverable | Done when |
|---|---|---|
| 0 | This plan, two home tiles (Coming soon) | Done |
| 1 | **Getting started, first slice:** hub, weekly plan, exercises, progression, evidence (draft) | **Done:** all five pages load at 1280 and 390 px with no console errors or overflow, validator rules pass (and fail when the data is deliberately broken), every claim graded with limits, sources re-verified by `npm run verify:sources` |
| 2 | Getting started complete: soreness and adherence guidance, deeper exercise notes, remaining evidence from section 4 | New sources verified and graded |
| 3 | Put every section on one stack and shared components | **Done:** all sections are Astro; one layout, one evidence registry, shared guide components; 152 strength pages compared identical to the previous build |
| 4 | Calisthenics foundations | **Done (draft):** 8 pages under `/calisthenics/`, 8 ladders, 8-week plan, prep exercises, claims graded with limits, 8 new DOIs verified on Crossref |
| 5 | Calisthenics first skills | **Done (draft):** L-sit, wall handstand, planche lean and tuck front lever, each gated (validator needs `convention: true` and at least 2 gates), 8-week plan |
| 6 | Review | A physiotherapist and a strength coach have signed it off; status moves from draft |
| 7 | Flip the home tiles to live | **Done** at the owner's request, still labelled draft |

## 9. Risks and open questions

| Risk or question | Mitigation or decision needed |
|---|---|
| Unsafe self-prescription for strangers | Screening link, out-of-scope list, regressions and pain rules on every exercise, draft labelling |
| Calisthenics evidence is thin | Say so on every page; grade D; no promises |
| Equipment hazards at home (tables, doors) | "Only if" checks plus a no-equipment alternative |
| Sex-targeted or body-image claims | Not made; one plan for everyone |
| Pregnancy, postnatal, under-18, older adults | Explicitly out of scope with a clinician pointer |
| Stack | Decided: Astro everywhere (section 5.1) |
| Duplicate content between strength and getting-started beginner exercises | Possible later merge; flagged in `CONTEXT.md` section 9 |
| Reviewers | Owner to name a physiotherapist and a coach, or the pages stay draft |
| Units, language, spelling | British English; metric |
