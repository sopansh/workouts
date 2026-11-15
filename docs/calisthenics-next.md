# Calisthenics, next pass: proposal and research note

Status: **proposal for the owner's approval (directive D-004). Nothing here is built.** This file is the only change in this task: no pages, no data, no `sources.yml`, no pain-rule edits.
Written by: `calisthenics-coach` (a way of working, not a credential). Everything stays `draft` until the named human reviewers sign off.
Date of searches and DOI checks: 2026-11-15.
Related: [`getting-started-and-calisthenics-plan.md`](./getting-started-and-calisthenics-plan.md) (section 4 is the research queue answered here), [`agents/directives.md`](./agents/directives.md) (D-001 to D-004), [`../CONTEXT.md`](../CONTEXT.md) section 10.

## 0. Summary and the decisions needed

The first calisthenics build is live as a draft: 8 pages, 12 ladders, 41 exercises, two eight-week plans, 8 graded claims. The owner wants it to serve complete beginners **and** people who already lift, and wants the evidence gaps closed where evidence exists.

| Part | What this note proposes | Decision needed from the owner |
|---|---|---|
| 1 | An "I already lift" entry page: placement table (conventions, grade D), what lifters find hard, a fast-start week, what not to skip | Approve the page and its data shape (section 7.4 asks for a small platform change) |
| 2 | A "first weeks and sticking with it" page: a plan for when and where, a minimum session, a copyable tracker, missed-session and repeat-the-week rules | Approve; choose between one shared adherence text with getting-started or two (section 3.5) |
| 3 | Research on the four remaining queue topics, plus two extras (tendon timing, push-up and pull-up transfer for lifters) | Approve adding 21 sources and 15 claims (sections 4.7 and 4.8) |
| 4 | A check of every gate number and pain rule: all gate numbers are conventions, six inconsistencies, and gaps in how the pain rules map to exercises | Approve the proposed edits to my own files (section 5.3) |
| 5 | A table of duplicated exercises across calisthenics, getting-started, strength and the core guide, with a single source of truth per directive D-003 | Route the getting-started and strength differences to `strength-coach` |
| 6 | Five phases with acceptance criteria | Approve the order |

**What the research found, in four lines.**

1. **Wrist and handstand:** there is now adult data (a survey of 321 handstand practitioners: 56.7% reported chronic wrist pain, not linked to training hours, warm-ups or braces) and lab data that a neutral wrist spreads load differently. There is still **no training study, no prevention trial and no validated readiness screen** for beginner handstand work. The gates stay conventions.
2. **Pull-up progression:** no trial of a progression to a first pull-up for beginners, and nothing on assisted or slow-lowering methods. Two small randomised trials in young men and one correlation study give indirect help only.
3. **Trunk:** more muscle-activity (EMG) data for plank and dead bug progressions. Nothing at all was found for the hollow-body hold, the L-sit or the hanging knee raise.
4. **Adherence:** two general meta-analyses (the intention-behaviour gap, and when-and-where planning) apply to physical activity in general. **No adherence study of home bodyweight training in healthy beginners was found**, so plan length and session size remain conventions.

**One correction to the live pages.** "Tendons adapt more slowly than muscle" (progression page, and my skills) is only partly supported, and only for the knee and Achilles in adolescent and elite athletes. Nothing was found for the wrist, elbow or shoulder tendons of adult beginners. The advice (prepare first, move up slowly) is sensible, but it should be worded as a convention (section 5.2).

## 1. Scope, stance and constraints

- General education for healthy adults, independent of the strength section (plan section 1). Out of scope as before: under-18s, pregnancy and the postnatal period, frailty, people with a heart, lung, joint or neurological condition, current injury. PAR-Q+ and "speak to a GP first" appear on every new page through `BeginnerSafety`.
- Experienced lifters are **not exempt** from screening or gates (`calisthenics-onboarding`). A heavy barbell squat does not satisfy a hollow-body or wrist gate.
- No outcome promises, no body-image or sex-targeted claims, no individual medical advice, no personal details. All example numbers below are generic starting points.
- Still true after this pass: **no kick-ups, no freestanding handstand, no full planche or front lever.** Anything past the last level goes to a qualified coach.
- Method: nothing cited from memory. Each source below was found on Europe PMC, its abstract read, and its DOI confirmed on Crossref with `curl https://api.crossref.org/works/<doi>` (section 4.7 gives the method and its limits).

## 2. Design A: the "I already lift" entry page

### 2.1 Purpose and URL

`/calisthenics/already-lift/` ("If you already lift"), linked from the hub's "How to begin" list, from Start here ("Are you ready for the foundations?") and from the progression page. Components: `Breadcrumbs`, `BeginnerSafety`, `SkillSafety`, `StatusBadge` (draft), plus a gap box that uses the same style as the evidence page.

Sections, in order:

1. **Who this is for.** Adults who have trained with weights or another sport regularly and want to start the ladders above level 1. Defined by tests, not by years. If any scope answer is "unsure": GP first and PAR-Q+.
2. **What carries over and what does not** (2.2).
3. **Placement table** (2.3), with the rule "the test overrides the table".
4. **What lifters usually find hard** (2.4).
5. **Fast-start week** (2.5).
6. **What not to skip** (2.6).
7. **Gaps and limits**, in the same wording style as the evidence page.

### 2.2 What carries over: only two links have data

| Link | Source | Result | Limit |
|---|---|---|---|
| Bench press to push-up | van den Tillaar et al. 2025 (JSCR, 10.1519/jsc.0000000000005160) | In 11 resistance-trained men, the maximum load in a push-up (with a weight vest) and the bench press maximum were very strongly associated (r = 0.92) | Men only, trained, n = 11. The abstract does not say how the push-up load was defined |
| Lat pulldown to pull-up | Johnson et al. 2009 (JSCR, 10.1519/jsc.0b013e3181a2d7f5) | In 35 men and 23 women, the maximum pull-up load was higher relative to body mass than the maximum lat pull (men 1.16 v 0.93, women 0.73 v 0.55 times body mass). Correlation between the two: r = 0.78 in men (p < 0.01), r = 0.44 in women (p > 0.05) | College students. A weak, non-significant link in women. So a pulldown number is only a rough guide |

Nothing was found that links any lifting number to the **hollow-body hold, plank, side plank, wrist loading, the hang, or any of the four skills**. For those, the page says "test it" and gives no number.

### 2.3 Placement table (conventions, grade D)

Every number in this table is a **coaching convention that I could not source** and is labelled so on the page. It says where to *try* first. The placement test on the progression page still decides. A person below these numbers is not "behind": they take the test. Numbers are relative to body mass so the table is the same for everyone.

| Ladder | If you can already do this | Try first (levels from `groups.yml`) | Basis |
|---|---|---|---|
| Wrists and shoulders (`cal-prep`) | Anything | **Everyone does all three prep exercises from the first session** | Convention. Strength does not place you here (2.6) |
| Push (`cal-push`: 1 incline, 2 push-up, 3 pause, 4 pike) | 8 slow floor push-ups with 2 or 3 reps left | Test at level 2, then level 3 | This is the placement test itself |
| | Bench press for 8 clean reps with about your body mass or more | Test at level 3 (pause push-up) first | Convention, with the bench-to-push-up link above |
| | Any overhead pressing number | **No shortcut.** Pass level 3, then test level 4 | No evidence found for overhead press to pike push-up |
| Pull (`cal-pull`: 1 Y raise, 2 row, 3 inverted row, 4 hang, 5 slow lowering, 6 pull-up) | Lat pulldown for 8 clean reps with about your body mass or more, or already doing strict pull-ups | Test at level 4 (active hang for 30 s), then level 5, then level 6. Needs a secure bar (D-002) | Convention, informed by Johnson 2009. A pulldown at body mass is above the average maximum in that study, but the link is weak in women |
| | Barbell or dumbbell rows | Test at level 3 (inverted row). Needs a heavy table or a rack bar (D-002) | Convention |
| | No bar or table | Stop at level 2 (the pull ladder rule stays) | Existing rule |
| Squat (`cal-squat`: 1 squat, 2 split, 3 rear-foot-elevated, 4 single-leg box) | Back, front or goblet squat for 5 or more reps with about body mass or more | Skip level 1. Test at level 2, then level 3. **Level 4 only by passing the test at level 3** | Convention. Single-leg depth is a balance and knee-tolerance task a barbell squat does not test |
| Hip extension (`cal-bridge`: 1 bridge, 2 single-leg, 3 feet on chair) | Deadlift or hip thrust at any load | Test at level 2, then level 3 | Convention |
| Hollow body (`cal-hollow`) | **No lifting number places you** | Take the test at level 3. If the lower back lifts off the floor, drop one level | Convention. Holding the lower back flat with the legs lifted is not the same task as bracing under a bar |
| Plank, side plank | No lifting number places you | Take the tests | Convention. Ekstrom 2007 (already cited) found the prone plank and the bridges below 45% of maximum activity |
| Skills (L-sit, wall handstand, planche lean, tuck front lever) | **No number opens a skill** | Every gate in `groups.yml`, no exceptions | Existing rule: experienced lifters are not exempt |

**Page rules.** The table is shown with the flag "coaching convention, grade D, no source" and a link to the gap box. It never says "you are ready" or "you will be able to". It carries a one-line sex-neutral note that the two studies behind it were mostly in men, so a person who does not match the numbers should simply take the test.

### 2.4 What lifters usually find hard

These are **expectations from coaching practice (convention). I found no study that measured them.** Each line says what, if anything, supports the caution.

1. **Straight-arm weight on the hands.** Barbells, dumbbells and machines rarely load an extended wrist. Support: the wrist rule's evidence (Nance 2017, already cited); new lab work on how load passes through an extended wrist (Majima 2008, Polovinets 2018, section 4.3).
2. **The hollow shape.** Holding the lower back flat while the legs are lifted is a different task from bracing under a load. No source; the test is the check.
3. **Hanging and grip.** Hang time and pulling are limited by the grip and the shoulder blades before the back muscles. Weak support: in 30 inactive young men, adding forearm training to a pull-up routine gave the largest gain (Sepehri Rahnama 2025, section 4.4; small, 10 per group).
4. **Single-leg balance and knee control** at depth. No source.
5. **Isometric holds and slow tempo.** There is no number on the bar. Progress comes from leverage, then range, then tempo (`calisthenics-progressions`). No source.
6. **New slow-lowering and pause work can cause soreness even in people who lift.** The repeated-bout effect protects against repeats of a movement already done (McHugh 2003, already cited as `cal-soreness`); it does not protect against a movement or hold that is new. This is a reasoned inference, not a tested result in lifters.
7. **Shoulder range overhead for the wall handstand.** No test predicted handstand quality or injury in the two studies found (section 4.3), so the page offers no mobility "pass mark". The existing gates (pike push-ups without shoulder pain, and the eye, blood-pressure and neck check) stay as the checks.
8. **Skipping gates** because strength is high. This is the main safety reason for the page.

### 2.5 Fast-start week

Replaces week 1 of `cal-foundations` for a person who has done the placement tests; from week 2 they follow the foundations plan at their placed levels. Same rules as the plan: sessions on non-consecutive days, short of failure, an 8-minute preparation first every time.

| Day | What | Notes |
|---|---|---|
| Monday | **Placement day.** 8-minute preparation, then **one set of each test, once**, stopping with 2 or 3 reps left. Record the level for each ladder | Planning estimate 30 to 40 minutes. It is a test, not a workout: do not repeat sets to "improve" a result. Pain at any level means drop that ladder and use its pain rule |
| Tuesday | Rest | A walk is fine |
| Wednesday | **Session A** at the placed levels, 2 sets, 3 or more reps left | Same as foundations week 1 |
| Thursday | Rest | |
| Friday | **Session B** at the placed levels, 2 sets, 3 or more reps left | Same as foundations week 1. No bar? Pull stays at level 2 |
| Weekend | Rest | |

Three rules go on the page:

- **Start joint preparation at its base level whatever your strength**, every session, all eight weeks.
- If you keep lifting elsewhere, this guide does not schedule it. As a convention, keep a rest day between any two sessions that load the same joints, and do not stack the fast-start week on top of a heavy pressing or pulling day. Combining the two is for the strength section (see Open question 2).
- If a gate is not met, repeat the foundations and retest. That is a normal result.

**Data shape.** Preferably a third plan appended after the existing two in `plans.yml` (`cal-lifter-start`, `phase: lifter-start`), so the validator checks session spacing and the time estimate. `loadGuide` takes the **first** plan in a section as the hub's plan, so the new plan must come last. A draft is in section 7.3.

### 2.6 What not to skip

| Do not skip | Why | Honest evidence position |
|---|---|---|
| **Wrist rocks, scapular push-ups and wall slides** before every session | Hand-bearing and straight-arm positions are new to most lifters | Convention. The one survey of adult handstand practitioners found no link between chronic wrist pain and **warm-up routines**, weekly hours, braces or grip devices (Martonovich 2025). So we do not say preparation prevents wrist pain. We say it is a gradual first exposure |
| **Gradual exposure and the 8-week block** | Different tissues adapt over different times | Partly supported: a narrative review says muscle and tendon differ in the time course of adaptation (Mersmann 2017), but in knee and Achilles tendons of young athletes. Elite adult jumpers showed matched muscle and tendon adaptation (Epro 2019). Nothing for adult wrist, elbow or shoulder tendons. Treat as convention |
| **The pain rules** (`wrist`, `shoulder`) | Dorsal wrist pain on weight-bearing is a reason to see a clinician | Nance 2017, grade C, patients only |
| **Gates** | A heavy lift does not test straight-arm wrists, a hollow body or hanging tolerance | Convention (section 5) |
| **The no-kick-up rule** | A fall or a loaded neck is the risk | Convention; case report of an eye injury after a short handstand (Miyaki 2020, one 15-year-old) supports why the eye and blood-pressure gate exists, nothing more |
| **Rest days between sessions** | Joints load on more days than the muscles feel | Convention |

## 3. Design B: the first weeks and adherence guide

### 3.1 Purpose and URL

`/calisthenics/first-weeks/` ("The first weeks, and sticking with it"), linked from the hub, Start here and the weekly-plan page. It replaces the short "first weeks and soreness" section on Start here with a link, and keeps the soreness claim `cal-soreness` as its first block.

### 3.2 What the evidence supports, and what it does not

| Idea | Evidence | Population and limit | Page wording |
|---|---|---|---|
| Intending to exercise is not enough | Feil 2023, meta-analysis: 25 samples, 29,600 people; 33.0% were intenders who did not act, an overall intention-behaviour gap of 47.6% | Physical activity in general, not strength training; says nothing about how to close the gap | "Many people who mean to train do not. That is common, and it is why the plan sets the days for you" |
| Say when and where | Silva 2018, meta-analysis of 13 randomised trials (adults 18 to 76): pooled effect 0.25 (95% CI 0.05 to 0.45) where the strategy was reinforced | Mixed groups, several with a condition; the abstract does not say what the reinforcement was; physical activity, not strength | A fill-in "If it is [day] after [cue], I will do Session [A/B/C] at [place]". Labelled "small effect, general physical activity" |
| Shorter sessions lose fewer people | Reljic 2019, meta-analysis of 55 studies (1,318 people) of **interval training** in sedentary adults: dropout 17.6%; longer sessions and more weekly time predicted more dropout | Interval aerobic training in trials, not strength; dropout in a trial is not real-world adherence | Cite as indirect support only (grade Mixed). **Do not** use it to justify a particular session length |
| Plan length, session size, the minimum session, the tracker, the missed-session rules | **None found** | The only calisthenics adherence item is a trial protocol with no results (Hollingsworth 2020), which is not cited | All are labelled "coaching convention, no evidence found" |

Found and **not** used: an overview of adherence in physiotherapy patients (Ley and Putz 2024, low certainty, patients), a meta-analysis of self-monitoring on step counts (Vetrovsky 2022, walking, with counselling), and dropout reviews in osteoarthritis, fibromyalgia, depression, anxiety, HIV and sarcopenia. Reasons are in section 4.2.

### 3.3 Page sections

1. **What to expect** (the soreness claim, with the repeated-bout caution: the first two weeks stay at 2 sets, 3 or more reps left; the size of the reduction is a convention).
2. **Fix the days** (the when-and-where fill-in, with the Silva 2018 claim and its limits).
3. **The minimum session** (a convention): on a day with little time, do the 8-minute preparation plus **one push exercise and one hollow-body hold** at your level, then stop. A short session counts as a session. This is page text, not plan data (see 3.4).
4. **Weekly tracker** (a plain table anyone can copy; no JavaScript and no stored data, so nothing personal is collected). Columns: week, day, session, level used, sets and reps or seconds, reps left, soreness, pain (none or which rule), notes.
5. **If you miss a session** (all conventions; the first two already exist in the plan pages):
   - Miss one: carry on with the next session, do not double up.
   - Miss two or more in a week: repeat the week.
   - A break of two weeks or more: step back one level (existing progression rule).
   - A break of about four weeks or more: restart from week 1 and the placement test. *(New convention.)*
   - After illness: return when you feel well, at a lower level, and speak to a clinician if unsure.
6. **Repeat-the-week and easy weeks.** Week 8 is already an easy week. After the plan, repeat at the new levels and put an easy week in about every sixth to eighth week. *(Convention, no source.)*
7. **When training hurts instead of tires**: the general pain rule, and the red flags (sudden weakness, numbness, night pain, pain that is not improving in two to three weeks).
8. **Gaps**: no adherence study of home bodyweight training in healthy beginners; the numbers on this page are conventions.

**Never on this page:** "21 days to a habit" and similar (not sourced), streak or guilt language, motivation or body-image claims, promises that anyone will stick with anything.

### 3.4 Data and validator notes

- The minimum session cannot be a plan session: the validator fails a session that is **never scheduled** and requires every session on a `days` entry. Keep it as page text unless the owner wants a fourth session in the plan data.
- The tracker is page markup (a table with empty cells), which breaks the "data not markup" rule only in the sense that it is a blank form. If preferred, the executive can hold the column list in data. Request in section 9.
- Claims needed: `cal-intention-gap`, `cal-implementation-intentions`, `cal-session-length-dropout` (section 4.8). Sources `feil-2023`, `silva-2018`, `reljic-2019` (section 4.7).

### 3.5 Overlap with getting-started

`CONTEXT.md` section 10 item 3 also plans "soreness and adherence guidance" for getting-started (`strength-coach`). The evidence is the same. Recommendation: **add the sources and claims once** (section `calisthenics`, as in 4.5) and let getting-started reuse them by id, as the calisthenics evidence page already does with `sharedIds`. Page text and the tracker should also exist once. Three options for the owner:

| Option | Cost | Risk |
|---|---|---|
| A. One adherence page in getting-started, linked from calisthenics | Lowest | Calisthenics is meant to be independent (plan section 1) |
| B. Two separate pages | Two texts to keep in step | Divergence, which is what D-003 exists to prevent |
| **C. One shared data file and component, each section adds its own examples** | A small platform change | None found; **recommended** |

## 4. Research done

### 4.1 Queue status (plan section 4)

| Queue item | Status |
|---|---|
| Beginner soreness and the repeated-bout effect | Already done (McHugh 2003). Not repeated. Limits restated in 3.3 |
| Pull exercises at home (inverted row, band rows) | Not searched further here. Searches P8 and P9 (below) found nothing new. The existing Youdas 2016 and Dickie 2017 remain the only EMG sources |
| Plank, side plank, dead bug | **Done** (4.5) |
| Squat and step-up for novices | **Not done.** It belongs to getting-started; not in this brief |
| Wrist and shoulder load in handstand-type positions | **Done** (4.3) |
| Pull-up training for beginners | **Done** (4.4) |
| Adherence for beginners | **Done** (4.2) |
| Physiotherapist and coach review | Needs named humans |

All strings are Europe PMC syntax, run through the REST API (`resultType=lite` to list, `resultType=core` to read abstracts). Hit counts are as seen on 2026-11-15 and can drift. "Read" means the abstract was read in full; **no full texts were read**.

### 4.2 Adherence

| ID | Search string | Hits | Outcome |
|---|---|---|---|
| A1 | `TITLE_ABS:"adherence" AND TITLE_ABS:"home-based exercise" AND TITLE:"systematic review"` | 24 | All 24 titles were clinical groups (cancer, kidney disease, pulmonary hypertension, older women, pregnancy, multiple sclerosis). Nothing on healthy beginners |
| A2 | `TITLE:"adherence" AND TITLE:"resistance training" AND (TITLE:"systematic review" OR TITLE:"meta-analysis")` | 0 | Nothing |
| A3 | `TITLE:"dropout" AND TITLE:"exercise" AND (TITLE:"systematic review" OR TITLE:"meta-analysis") AND TITLE_ABS:"adults"` | 4 | Knee or hip osteoarthritis, fibromyalgia, anxiety, depression. Out of population; not read |
| A4 | `TITLE:"adherence" AND TITLE:"strength training" AND (TITLE:"systematic review" OR TITLE:"meta-analysis")` | 1 | Contact-sport injury review where adherence is the exposure. Not read; not relevant |
| A5 | `TITLE_ABS:"adherence" AND TITLE_ABS:"unsupervised" AND TITLE_ABS:"resistance training" AND TITLE_ABS:"systematic review"` | 1 | Older adults. Not used |
| A6 | `TITLE_ABS:"dropout" AND TITLE_ABS:"exercise" AND TITLE_ABS:"healthy adults" AND (TITLE:"systematic review" OR TITLE:"meta-analysis")` | 1 | **Reljic 2019. Read.** Adopted with limits |
| A7 | `TITLE:"dropout rate*" AND TITLE_ABS:"exercise" AND TITLE_ABS:"sedentary"` | 0 | Nothing |
| A8 | `TITLE:"adherence" AND TITLE_ABS:"behaviour change techniques" AND TITLE_ABS:"exercise" AND TITLE:"meta-analysis"` | 2 | Sarcopenia in older adults (not used); **Ley and Putz 2024, read**: an overview of 19 reviews (205 trials) in physiotherapy patients, certainty low, small pooled effect (SMD 0.24). Patients, so **not adopted** |
| A9 | `TITLE_ABS:"resistance training" AND TITLE_ABS:"dropout" AND TITLE_ABS:"adherence" AND (TITLE:"review" OR TITLE:"meta-analysis")` | 2 | Sarcopenic obesity; HIV. Not used |
| A10 | `TITLE:"self-monitoring" AND TITLE:"physical activity" AND TITLE:"meta-analysis"` | 5 | **Vetrovsky 2022 read** (step counts; goals and counselling helped). Walking, not strength. Not adopted. Others are condition-specific |
| A11 | `TITLE:"implementation intentions" AND TITLE_ABS:"physical activity" AND TITLE:"meta-analysis"` | 1 | **Silva 2018. Read.** Adopted with limits |
| A12 | `TITLE:"supervised" AND TITLE:"unsupervised" AND TITLE_ABS:"resistance training" AND (TITLE:"meta-analysis" OR TITLE:"systematic review")` | 1 | Older adults. Not used |
| A13 | `TITLE:"self-determination" AND TITLE_ABS:"exercise" AND TITLE_ABS:"meta-analysis" AND TITLE_ABS:"adherence"` | 2 | A review of reviews and a cardiovascular-disease review. Not used |
| A14 | `TITLE:"enjoyment" AND TITLE_ABS:"exercise" AND TITLE_ABS:"adherence" AND (TITLE:"review" OR TITLE:"meta-analysis")` | 3 | Affect during interval training and older-adult gamification. Not used |
| A15 | `TITLE_ABS:"resistance training" AND TITLE_ABS:"adherence" AND TITLE_ABS:"untrained" AND TITLE_ABS:"home"` | 0 | Nothing |
| A16 | `TITLE:"adherence" AND TITLE:"resistance exercise" AND TITLE_ABS:"healthy"` | 0 | Nothing |
| A17 | `(TITLE_ABS:"calisthenics" OR TITLE_ABS:"bodyweight training" OR TITLE_ABS:"body-weight training") AND TITLE_ABS:"adherence"` | 13 | Nothing usable: COVID-era home programmes, lymphoedema self-care, obesity trials, and the **Minute Calisthenics protocol (Hollingsworth 2020), a protocol with no results** |
| A18 | `TITLE:"calisthenic*" AND (TITLE:"systematic review" OR TITLE:"meta-analysis" OR TITLE:"scoping review")` | 0 | **No calisthenics review exists in the index** (the plan's gap stands) |
| A19 | `TITLE_ABS:"home-based" AND TITLE_ABS:"bodyweight" AND TITLE_ABS:"adherence" AND TITLE_ABS:"healthy adults"` | 0 | Nothing |
| A20 | `TITLE:"intention" AND TITLE:"behaviour" AND TITLE_ABS:"physical activity" AND TITLE:"meta-analysis"` | 3 | **Feil 2023. Read.** Adopted. Rhodes and de Bruijn 2013 and Vasiljevic 2016 not read (Feil 2023 supersedes the first) |
| A21 | `TITLE_ABS:"Minute Calisthenics"` | 1 | The protocol only. Not cited |

**Result:** two general meta-analyses (grade A, physical activity in general) and one indirect interval-training meta-analysis. **Nothing found** on adherence to home bodyweight or calisthenics training in healthy beginners, and nothing on what session size or plan length keeps them training.

### 4.3 Handstand and wrist loading

| ID | Search string | Hits | Outcome |
|---|---|---|---|
| W1 | `TITLE:"wrist" AND (TITLE:"gymnast*" OR TITLE_ABS:"gymnastics") AND (TITLE:"review" OR TITLE:"injur*" OR TITLE:"pain")` | 14 | Kox 2015 and Benjamin 2017 read; case reports and a brace study not used (a single-athlete brace study is not relevant to a guide that does not teach gymnastics) |
| W2 | `TITLE:"handstand"` | 57 | Read: Martonovich 2025, MacDonald 2025, Malíř 2024, Miyaki 2020. Titles only for the rest (balance control, spine kinematics, airway resistance, walking in experienced gymnasts); none is about training a beginner |
| W3 | `TITLE_ABS:"wrist" AND TITLE_ABS:"weight-bearing" AND (TITLE_ABS:"push-up" OR TITLE_ABS:"extended wrist" OR TITLE_ABS:"quadruped") AND TITLE_ABS:"load"` | 2 | One CT study of ligament injury, one primate paper. Not used |
| W4 | `TITLE_ABS:"wrist" AND TITLE_ABS:"push-up" AND (TITLE_ABS:"extension" OR TITLE_ABS:"range of motion") AND (TITLE_ABS:"hand position" OR TITLE_ABS:"kinematics" OR TITLE_ABS:"load")` | 3 | **Polovinets 2018 and Majima 2008, read.** Adopted |
| W5 | `TITLE:"wrist" AND TITLE_ABS:"prevention" AND (TITLE:"gymnast*" OR TITLE_ABS:"gymnast*") AND (TITLE_ABS:"intervention" OR TITLE_ABS:"program")` | 1 | Only Benjamin 2017: **no prevention trial found** |
| W6 | `TITLE_ABS:"wrist" AND TITLE_ABS:"gymnast*" AND (TITLE_ABS:"forces" OR TITLE_ABS:"loads" OR TITLE_ABS:"loading") AND TITLE_ABS:"upper extremity"` | 4 | **Heck 2021, read.** Others are case reports or a return-to-play narrative |
| W7 | `TITLE:"push-up" AND (TITLE_ABS:"wrist" AND TITLE_ABS:"force*")` | 3 | **Polovinets 2026, read.** 1990 and 1995 force-plate papers not read |
| W8 | `(TITLE:"handstand" OR TITLE:"hand balancing") AND (TITLE_ABS:"training" OR TITLE_ABS:"learning" OR TITLE_ABS:"intervention" OR TITLE_ABS:"practice") AND (TITLE_ABS:"novice*" OR TITLE_ABS:"beginner*" OR TITLE_ABS:"untrained")` | 0 | **Nothing on how a beginner should train the handstand** |

**Sources read, with limits (all abstract only):**

| Source | What the abstract says | Grade and limits |
|---|---|---|
| Martonovich 2025 (J Funct Morphol Kinesiol, 10.3390/jfmk10040372) | Online survey of 321 adults who handstand at least weekly (54% male, mostly 25 to 34; yoga, capoeira and "movement" most common): 56.7% reported chronic wrist pain. Younger age was linked to more pain (p = 0.042). **No link** with weekly hours, warm-up routines, brace use or grip devices. Authors suggest risk may relate more to intensity and biomechanics than to volume | **C.** Cross-sectional, self-selected through social media, self-designed questionnaire, self-reported pain, no imaging. Cannot give a risk for beginners |
| Kox 2015 (BJSM, 10.1136/bjsports-2014-094492) | Systematic review in athletes under 18, mostly gymnasts: wrist pain prevalence 32 to 73%, overuse wrist injury 10 to 28%. Risk factors: age 10 to 14 (OR 11.5), training intensity (OR 1.2), earlier start (OR 1.97) | **C.** Young athletes, not our audience (under-18s are out of scope). Only one study gave risk factors. Context only |
| Polovinets 2018 (J Hand Ther, 10.1016/j.jht.2017.04.005) | 14 volunteers did push-ups on a hyperextended and a neutral wrist. Forces travelled more dorsally, over a wider area and more towards the little-finger side in hyperextension. Authors say neutral-wrist push-ups are likely safer for ligaments | **C**, biomechanics. Lab, n = 14, no injury outcomes. "Likely safer" is the authors' inference |
| Polovinets 2026 (Handchir Mikrochir Plast Chir, 10.1055/a-2862-1658) | 14 healthy right-handed men: with a neutral wrist the **shoulder** was loaded more and the **elbow** less | **C.** Same limits. It matters because the wrist rule's neutral-wrist advice moves load to the shoulder |
| Majima 2008 (J Hand Surg, 10.1016/j.jhsa.2007.10.018) | CT and a 3D model of 7 normal wrists: force through the scaphoid fossa rose from 52% (neutral) to 62% (maximum extension) | **C**, a model. Seven wrists, a theoretical analysis |
| Heck 2021 (Orthop J Sports Med, 10.1177/2325967120977090) | 15 female NCAA gymnasts over four seasons: 12 overuse upper-limb injuries (10 shoulder, 2 wrist or forearm). Preseason range of motion and strength **did not differ** between injured and uninjured | **C.** Tiny, elite. A null result for those tests |
| Malíř 2024 (PLOS ONE, 10.1371/journal.pone.0302922) | 111 novice college athletes: shoulder stability and mobility test scores **did not predict** handstand quality | **C.** Handstand quality, not injury. Novices could not yet handstand well |
| Miyaki 2020 (BMC Ophthalmol, 10.1186/s12886-020-01638-z) | Case report: a 15-year-old with a vitreous haemorrhage after about 10 seconds in a handstand, probably from straining | **C**, one case, so it gives no risk. It explains why the eye and blood-pressure gate exists |
| Benjamin 2017 (Curr Sports Med Rep, 10.1249/jsr.0000000000000398) | Narrative review: little is known about effective sport-specific wrist injury prevention. General guidelines (limit loading, keep joint flexibility, technique, wrist and core strengthening) "seem beneficial" | **D**, expert review. Honest statement of the gap |
| Rosaci 2025 (JSCR, 10.1519/jsc.0000000000005074) | 7 high-level ring gymnasts: five preconditioning exercises differed from the support scale (the planche) in trapezius, pectoral and biceps activity and in two coactivation ratios | **C**, EMG only. The abstract does not name the five exercises. It suggests prep exercises do not copy the skill, which is why the planche lean is labelled a convention |
| MacDonald 2025 (Front Sports Act Living, 10.3389/fspor.2025.1694648) | Systematic review of 21 handstand biomechanics studies: gymnasts balance with a "wrist strategy"; eyes closed lowers stability; neck flexion impairs performance; stronger gymnasts balance better | **C.** Elite gymnasts, free handstands. **Optional**: add only if a page discusses balance |

**Nothing found:** a trial or review on how beginners should train handstand work; a prevention trial for wrist pain in adults; a screening test that predicts handstand readiness or injury; any source on the L-sit or tuck front lever; wrist loading data for the planche lean. Extra searches were run on the planche and front lever (`TITLE_ABS:"front lever" OR TITLE_ABS:"planche" OR TITLE_ABS:"straight-arm strength"`, 35 hits, mostly unrelated). The only relevant papers were Rosaci 2025 above and a simulation by Wang and Shan 2023 (10.3390/bioengineering10070761), **not adopted**: it is a nine-segment model with conclusions about body type and ethnicity that the model cannot support.

### 4.4 Pull-up progression

| ID | Search string | Hits | Outcome |
|---|---|---|---|
| P1 | `TITLE:"pull-up" AND (TITLE_ABS:"training" OR TITLE_ABS:"program*" OR TITLE_ABS:"intervention") AND (TITLE_ABS:"randomi*" OR TITLE_ABS:"trial" OR TITLE_ABS:"review")` | 3 | Swimming performance (not read); two surgical papers. Nothing |
| P2 | `(TITLE:"lat pulldown" OR TITLE:"pulldown") AND (TITLE:"pull-up" OR TITLE:"chin-up")` | 0 | Nothing |
| P3 | `(TITLE_ABS:"assisted pull-up" OR TITLE_ABS:"band-assisted" OR TITLE_ABS:"eccentric pull-up" OR TITLE_ABS:"negative pull-up")` | 57 | **None relevant** (endoscopy and surgery papers). No trial of assisted or slow-lowering pull-up training |
| P4 | `TITLE:"pull-up" AND (TITLE_ABS:"body mass" OR TITLE_ABS:"body composition" OR TITLE_ABS:"relative strength") AND TITLE_ABS:"performance"` | 5 | **Johnson 2009 read.** Others are trained athletes or velocity studies. Not adopted |
| P5 | `TITLE_ABS:"pull-up*" AND (TITLE_ABS:"recruits" OR TITLE_ABS:"cadets" OR TITLE_ABS:"military" OR TITLE_ABS:"students") AND (TITLE_ABS:"training program" OR TITLE_ABS:"intervention" OR TITLE_ABS:"trained")` | 15 | **Sepehri Rahnama 2025 and Li 2025 read.** Two Marine Corps injury papers (McNeal 2026, Arnold 2026) read, **not adopted** (see below) |
| P6 | `TITLE_ABS:"pull-up*" AND TITLE_ABS:"women" AND (TITLE_ABS:"training" OR TITLE_ABS:"strength")` | 26 | Nothing new for women. Flanagan 2003 (already cited) remains the only pull-up study in women |
| P7 | `TITLE_ABS:"eccentric" AND TITLE_ABS:"pull-up*" AND (TITLE_ABS:"training" OR TITLE_ABS:"strength")` | 4 | Climbers' pull-up power; Dickie 2017 (already cited). Nothing on slow lowering |
| P8 | `(TITLE_ABS:"suspension training" OR TITLE_ABS:"inverted row") AND TITLE_ABS:"randomi*" AND TITLE_ABS:"strength"` | 0 | Nothing |
| P9 | `TITLE_ABS:"elastic" AND (TITLE_ABS:"row" OR TITLE_ABS:"pulling") AND TITLE_ABS:"strength" AND TITLE_ABS:"untrained"` | 0 | Nothing |

| Source | What the abstract says | Grade and limits |
|---|---|---|
| Sepehri Rahnama 2025 (Sports, 10.3390/sports13120433) | 30 physically inactive male students (about 21), three groups of 10, eight weeks. All did pull-up routines; the supplement differed (interval, forearm or core work). All improved on maximum pull-ups, grip and dead-hang time. Forearm group gained most (maximum reps +222.5%, hang time +55.3%) | **B, provisional.** Small, men only, no comparison group without supplements, the pull-up routine and the starting reps are not in the abstract. A percentage gain from a very low start is easy to overstate |
| Li 2025 (Eur J Sport Sci, 10.1002/ejsc.12243) | 34 recreationally active male students, eight weeks of lat pulldown, stable or on an unstable setup: pull-up endurance rose in both; the unstable group did 45.5% more reps | **B.** Men, needs a cable machine, an unstable-load study. Shows pulldown training can raise pull-up reps; does not tell a home beginner how to progress |
| Johnson 2009 (JSCR, 10.1519/jsc.0b013e3181a2d7f5) | See 2.2 | **C.** College students, cross-sectional |

Marines (McNeal 2026, doi 10.1093/milmed/usag464; Arnold 2026, doi 10.1093/milmed/usaf621): after the pull-up became part of a fitness test, a previously falling upper-limb injury rate in men stopped falling (the authors call it a plateau, with rising rates in Marines under 20), and in women the rate kept falling with no immediate change at the policy date. **Not adopted:** population-level policy analyses of service members, open to confounding by many other changes, with outcomes that mix subgroups. They are the only injury-rate sources found for pulling work, and they do not apply to beginners at home.

**Result:** no trial or review of a progression to a first pull-up for beginners, and none on assisted, band or slow-lowering methods. The pull ladder (rows, hang, slow lowering, pull-up) remains **coaching convention** with graded EMG support for rows and pull-ups (Youdas 2016, Dickie 2017) and one shoulder-kinematics study (Prinold 2016).

### 4.5 Trunk exercises

| ID | Search string | Hits | Outcome |
|---|---|---|---|
| T1 | `(TITLE:"plank*" OR TITLE:"side bridge") AND (TITLE_ABS:"electromyograph*" OR TITLE_ABS:"muscle activ*")` | 0 | Nothing (Ekstrom 2007 is indexed under other words) |
| T2 | `TITLE:"plank*" AND (TITLE:"meta-analysis" OR TITLE:"systematic review" OR TITLE:"randomi*" OR TITLE:"trial")` | 4 | **Blasimann 2018 read**, not adopted (below). Others: blood pressure, scoliosis comment |
| T3 | `TITLE_ABS:"dead bug"` | 13 | **Kim 2016 read.** Others: low back pain, ultrasound or normalisation papers; not used |
| T4 | `(TITLE_ABS:"hollow body" OR TITLE_ABS:"hollow hold" OR TITLE_ABS:"hollow position") AND (TITLE_ABS:"muscle" OR TITLE_ABS:"EMG" OR TITLE_ABS:"activation")` | 23 | **None relevant** (patents and unrelated). No study of the hollow-body hold |
| T5 | `TITLE_ABS:"L-sit" OR TITLE_ABS:"L sit"` | 4 | **None relevant.** No study of the L-sit |
| T6 | `TITLE_ABS:"plank" AND TITLE_ABS:"electromyograph*" AND TITLE_ABS:"abdominal"` | 0 | Nothing |
| T7 | `TITLE:"abdominal" AND TITLE_ABS:"muscle activity" AND (TITLE_ABS:"plank" OR TITLE_ABS:"bridge") AND TITLE:"exercises"` | 2 | A bridge study and a Swiss-ball study. Not used |
| T8 | `TITLE:"core" AND (TITLE:"stability training" OR TITLE:"strength training") AND TITLE:"meta-analysis" AND TITLE_ABS:"healthy"` | 0 | Nothing |
| T9 | `TITLE_ABS:"plank" AND (TITLE_ABS:"variation*" OR TITLE_ABS:"progression*") AND TITLE_ABS:"muscle" AND (TITLE_ABS:"rectus abdominis" OR TITLE_ABS:"external oblique")` | 4 | **Calatayud 2017 and Moreno-Navarro 2024, read.** Adopted |
| K2 | `TITLE_ABS:"hanging leg raise" AND TITLE_ABS:"electromyograph*"` | 0 | **No study of the hanging knee raise** (an earlier run of this string failed on a quoting error and was repeated) |

| Source | What the abstract says | Grade and limits |
|---|---|---|
| Calatayud 2017 (Am J Phys Med Rehabil, 10.1097/phm.0000000000000713) | 20 university students did 8 plank variants. Suspended prone and roll-out planks gave the most abdominal activity; stable and suspended lateral planks the most lumbar erector spinae activity. Authors: activity can be progressed by changing the exercise | **C, EMG only.** One session, students, mostly suspended-strap variants we do not use |
| Moreno-Navarro 2024 (J Back Musculoskelet Rehabil, 10.3233/bmr-230209) | 24 young adults doing recreational gymnastics: raising the feet on wall bars gave more rectus abdominis and oblique activity than a flat plank, and more variability as the body tilted | **C, EMG only.** The tested direction is **harder** (feet up). Our regression (hands up on a wall or counter) is the opposite direction, so this supports the idea of changing body angle, not our specific regression |
| Kim 2016 (PM&R, 10.1016/j.pmrj.2016.05.017) | 10 healthy men did four stabilisation exercises (including the dead bug) at five graded levels: activity rose with level overall; the abstract gives details only for the curl-up and bird dog | **C, EMG only. Optional.** The dead bug result is not given separately |
| Blasimann 2018 (Sportverletz Sportschaden, 10.1055/a-0575-2324) | Review of 7 studies (2,491 male soccer players) of programmes that included plank and side plank: some lowered injury rates, some did not; core work was never trained alone; the question "cannot definitively be answered" | **Not adopted.** Inconclusive and in a different sport. Note that its Crossref title is German, so a source entry would need the German title |

Ekstrom 2007 (already cited) remains the base: the side bridge gave the highest gluteus medius and external oblique activity, and other bridges stayed below 45% of maximum.

**Result:** EMG support exists for changing body position to change plank demand and for graded dead-bug-type work. **No study of the hollow-body hold, L-sit or hanging knee raise was found; those ladder steps stay conventions.** No source links trunk training to injury prevention in our population.

### 4.6 Two extras, because the brief concerns lifters and tendons

| ID | Search string | Hits | Outcome |
|---|---|---|---|
| L1 | `TITLE:"push-up*" AND (TITLE_ABS:"body mass" OR TITLE_ABS:"body weight" OR TITLE_ABS:"force plate") AND (TITLE_ABS:"kinetic" OR TITLE_ABS:"load" OR TITLE_ABS:"percentage")` | 15 | **van den Tillaar 2025 read**; the 2019 EMG companion paper read (no difference in activity between push-ups and bench press at matched loads in 20 trained men; not adopted, the 2025 paper is the stronger fit) |
| L2 | `TITLE_ABS:"push-up*" AND TITLE_ABS:"bench press" AND (TITLE_ABS:"correlat*" OR TITLE_ABS:"relationship" OR TITLE_ABS:"predict*") AND TITLE_ABS:"1RM"` | 6 | Same paper; others unrelated |
| L3 | `TITLE_ABS:"tendon" AND TITLE_ABS:"adaptation" AND (TITLE_ABS:"muscle" OR TITLE_ABS:"strength") AND (TITLE:"systematic review" OR TITLE:"meta-analysis" OR TITLE:"review") AND TITLE_ABS:"time course"` | 1 | **Mersmann 2017 read** |
| L4 | `TITLE:"tendon" AND (TITLE:"adaptation" OR TITLE:"adapt*") AND (TITLE_ABS:"slower" OR TITLE_ABS:"time course" OR TITLE_ABS:"disparity" OR TITLE_ABS:"muscle-tendon")` | 15 | **Epro 2019, Mersmann 2014 and Waugh 2021 read.** All are lower-limb tendons. Waugh 2021 (Achilles stiffness) and Mersmann 2014 not adopted |

| Source | What the abstract says | Grade and limits |
|---|---|---|
| van den Tillaar 2025 | See 2.2 | **C** |
| Mersmann 2017 (Front Physiol, 10.3389/fphys.2017.00987) | Narrative review: muscle and tendon differ in time course of adaptation and in which stimuli they respond to; imbalance may relate to tendon overload injuries in adolescents | **Mixed** with Epro. Youth, knee and Achilles |
| Epro 2019 (Front Physiol, 10.3389/fphys.2019.00574) | 67 elite jumpers: muscle strength and tendon stiffness adapted in line (triceps surae) | Elite adults, lower limb, cross-sectional |

**Result:** the claim "tendons lag muscle" is supported in adolescents' knee tendons and **contradicted** in elite adults' calf tendons. **Nothing was found for adult wrist, elbow or shoulder tendons.**

### 4.7 Proposed sources, ready to append (not added)

All DOIs below returned a record on Crossref on 2026-11-15 whose title and year matched, with **no retraction notice** (checked with the same `updates:` filter that `scripts/verify-sources.mjs` uses; the same filter returned a retraction for a known retracted paper, used as a control). `verifiedOn` is not set here: `npm run verify:sources -- --write` stamps it when the entries are added. Appending to `sources.yml` is a shared-hotspot edit and the executive sequences it. A source with no claim triggers a validator warning, so each source below has a claim in 4.8 (marked "optional" where it may be dropped).

| Proposed id | Type | Authors | Year | Crossref title | Venue | DOI |
|---|---|---|---|---|---|---|
| `feil-2023` | meta-analysis | Feil K, Fritsch J, Rhodes RE | 2023 | The intention-behaviour gap in physical activity: a systematic review and meta-analysis of the action control framework | British Journal of Sports Medicine | 10.1136/bjsports-2022-106640 |
| `silva-2018` | meta-analysis | Silva MAVD, São-João TM, Brizon VC, Franco DH, Mialhe FL | 2018 | Impact of implementation intentions on physical activity practice in adults: A systematic review and meta-analysis of randomized clinical trials | PLOS ONE | 10.1371/journal.pone.0206294 |
| `reljic-2019` | meta-analysis | Reljic D, Lampe D, Wolf F, Zopf Y, Herrmann HJ, Fischer J | 2019 | Prevalence and predictors of dropout from high-intensity interval training in sedentary individuals: A meta-analysis | Scandinavian Journal of Medicine and Science in Sports | 10.1111/sms.13452 |
| `martonovich-2025` | cohort | Martonovich N, Maman D, Mahamid A, Alfandari L, Behrbalk E | 2025 | The Wrist as a Weightbearing Joint in Adult Handstand Practitioners: A Cross-Sectional Survey of Chronic Pain and Training-Related Factors | Journal of Functional Morphology and Kinesiology | 10.3390/jfmk10040372 |
| `kox-2015` | systematic-review | Kox LS, Kuijer PP, Kerkhoffs GM, Maas M, Frings-Dresen MH | 2015 | Prevalence, incidence and risk factors for overuse injuries of the wrist in young athletes: a systematic review | British Journal of Sports Medicine | 10.1136/bjsports-2014-094492 |
| `polovinets-2018` | biomechanics | Polovinets O, Wolf A, Wollstein R | 2018 | Force transmission through the wrist during performance of push-ups on a hyperextended and a neutral wrist | Journal of Hand Therapy | 10.1016/j.jht.2017.04.005 |
| `polovinets-2026` | biomechanics | Polovinets O, Wolf A, Friedlander S, Wollstein R | 2026 | Push-Up Techniques Affect Elbows and Shoulders: How Should They Be Used? | Handchirurgie Mikrochirurgie Plastische Chirurgie | 10.1055/a-2862-1658 |
| `majima-2008` | biomechanics | Majima M, Horii E, Matsuki H, Hirata H, Genda E | 2008 | Load Transmission Through the Wrist in the Extended Position | Journal of Hand Surgery | 10.1016/j.jhsa.2007.10.018 |
| `heck-2021` | cohort | Heck K, Zeppieri G, Bruner M, Moser M, Farmer KW, Pozzi F | 2021 | Preseason Upper Extremity Range of Motion and Strength in Relation to In-Season Injuries in NCAA Division I Gymnasts | Orthopaedic Journal of Sports Medicine | 10.1177/2325967120977090 |
| `malir-2024` | cohort | Malíř R, Chrudimský J, Provazník A, Třebický V | 2024 | Are the shoulder joint function, stability, and mobility tests predictive of handstand execution? | PLOS ONE | 10.1371/journal.pone.0302922 |
| `miyaki-2020` | cohort | Miyaki T, Kida T, Oosuka S, Fukumoto M, Sato T, Nakajima M, Ikeda T | 2020 | Valsalva retinopathy induced by handstand: a case report | BMC Ophthalmology | 10.1186/s12886-020-01638-z |
| `benjamin-2017` | review | Benjamin HJ, Engel SC, Chudzik D | 2017 | Wrist Pain in Gymnasts: A Review of Common Overuse Wrist Pathology in the Gymnastics Athlete | Current Sports Medicine Reports | 10.1249/jsr.0000000000000398 |
| `rosaci-2025` | biomechanics | Rosaci G, Nigro F, Cortesi M, Ciacci S, Bartolomei S, Fantozzi S | 2025 | Electromyographic Analysis of the Support Scale in Gymnastics and Its Related Preconditioning Strengthening Exercises | Journal of Strength and Conditioning Research | 10.1519/jsc.0000000000005074 |
| `sepehri-rahnama-2025` | rct | Sepehri Rahnama H, Ganji S, Vadasz K, Prokai J | 2025 | Comparative Effects of Core Versus Forearm Training on Pull-Up Repetition Performance in Physically Inactive Males | Sports | 10.3390/sports13120433 |
| `li-lat-pulldown-2025` | rct | Li Q, Yan J, Qiao M, Quan J, Chen Y, Gong M, Niu W, Wang L | 2025 (Crossref 2024) | Eight-week lat pull-down resistance training with joint instability leads to superior pull-up endurance performance and reduced antagonist coactivation in recreationally active male college students | European Journal of Sport Science | 10.1002/ejsc.12243 |
| `johnson-2009` | cohort | Johnson D, Lynch J, Nash K, Cygan J, Mayhew JL | 2009 | Relationship of Lat-Pull Repetitions and Pull-Ups to Maximal Lat-Pull and Pull-Up Strength in Men and Women | Journal of Strength and Conditioning Research | 10.1519/jsc.0b013e3181a2d7f5 |
| `calatayud-2017` | biomechanics | Calatayud J, Casaña J, Martín F, Jakobsen MD, Colado JC, Andersen LL | 2017 | Progression of Core Stability Exercises Based on the Extent of Muscle Activity | American Journal of Physical Medicine and Rehabilitation | 10.1097/phm.0000000000000713 |
| `moreno-navarro-2024` | biomechanics | Moreno-Navarro P, Sabido R, Barbado D, Prat-Luri A, Vera-Garcia FJ | 2024 | Trunk muscle activation in prone plank exercises with different body tilts | Journal of Back and Musculoskeletal Rehabilitation | 10.3233/bmr-230209 |
| `mersmann-2017` | review | Mersmann F, Bohm S, Arampatzis A | 2017 | Imbalances in the Development of Muscle and Tendon as Risk Factor for Tendinopathies in Youth Athletes: A Review of Current Evidence and Concepts of Prevention | Frontiers in Physiology | 10.3389/fphys.2017.00987 |
| `epro-2019` | biomechanics | Epro G, Hunter S, König M, Schade F, Karamanidis K | 2019 | Evidence of a Uniform Muscle-Tendon Unit Adaptation in Healthy Elite Track and Field Jumpers: A Cross Sectional Investigation | Frontiers in Physiology | 10.3389/fphys.2019.00574 |
| `van-den-tillaar-2025` | biomechanics | van den Tillaar R, Falch HN, Larsen S | 2025 | A Comparison of Maximal Push-Up and Bench Press Performance and Their Prediction Based on Load-Velocity Relationships | Journal of Strength and Conditioning Research | 10.1519/jsc.0000000000005160 |

Optional (only if a page uses them): `macdonald-2025` (10.3389/fspor.2025.1694648, Frontiers in Sports and Active Living, 2025) and `kim-2016` (10.1016/j.pmrj.2016.05.017, PM&R, 2016). Also confirmed on Crossref but **not proposed**: Ley and Putz 2024 (10.1186/s13643-024-02538-9), Vetrovsky 2022 (10.1136/bjsports-2021-105198), Blasimann 2018 (10.1055/a-0575-2324), McNeal 2026 and Arnold 2026 (above), Wang and Shan 2023 (above), and Li and Huang 2026 (10.1002/ccd.70361, a 12-week calisthenics trial in adults with obesity: it is out of population, its outcomes are body composition claims we do not make, its Crossref record is in a cardiology journal and carries a correction notice).

Crossref notes: Rosaci's Crossref title says "Support Scale" where the Europe PMC abstract says "planche"; the Crossref title is the one to use. Li 2025 is dated 2024 on Crossref and 2025 on Europe PMC (within the verifier's one-year tolerance). The Suprak DOI lookup in Europe PMC again returned an unrelated paper first, which confirms the plan's warning to check the title on Crossref.

### 4.8 Proposed claims (paraphrased from the abstracts; not added)

Each needs `section: calisthenics`, a source, a grade, caveats and (for EMG) `emgOnly: true`. Where the statement says "the abstract does not say", the full text should be read before the claim goes live.

| Claim id | Kind | Statement (draft) | Grade | Sources | Caveats |
|---|---|---|---|---|---|
| `cal-intention-gap` | programming | A meta-analysis of 25 samples (29,600 people) found that about half of people who intended to be physically active were not (an intention-behaviour gap of 47.6%) | A | feil-2023 | Physical activity in general, not strength training. It shows the gap exists, not how to close it |
| `cal-implementation-intentions` | programming | In 13 randomised trials in adults aged 18 to 76, plans that stated when and where to act, with reinforcement, raised physical activity more than control (pooled effect 0.25, 95% CI 0.05 to 0.45) | A | silva-2018 | Mixed groups, several with a condition. The abstract does not say what the reinforcement was. Physical activity, not strength training. Small effect |
| `cal-session-length-dropout` | programming | In 55 studies of interval training in sedentary healthy adults (1,318 people), about 18% dropped out; longer sessions and more weekly time predicted more dropout; intensity did not | Mixed | reljic-2019 | Interval aerobic training in trials, not strength. Dropout in a trial is not adherence in daily life. It does not set a session length for this guide |
| `cal-wrist-pain-prevalence` | safety | Of 321 adults who handstand at least weekly and answered an online survey, 56.7% reported chronic wrist pain, not linked to weekly hours, warm-ups, braces or grip devices. In under-18 athletes, mainly gymnasts, a systematic review found wrist pain in 32 to 73% | C | martonovich-2025, kox-2015 | Self-selected survey, self-reported, no imaging. The youth review is outside our audience and only one study gave risk factors. Neither gives a risk for beginners |
| `cal-wrist-neutral` | mechanism | In 14 volunteers, push-ups on a hyperextended wrist sent force more dorsally and towards the little-finger side than push-ups on a neutral wrist, and the authors judge the neutral wrist likely safer for ligaments. In 14 healthy men the neutral wrist loaded the shoulder more and the elbow less. A model of 7 wrists put more force through the scaphoid fossa in maximum extension (62%) than in neutral (52%) | C | polovinets-2018, polovinets-2026, majima-2008 | Laboratory, small, no injury outcomes. It supports the wrist rule's neutral-wrist options and explains why the shoulder rule still applies |
| `cal-wrist-prevention-gap` | safety | A review of wrist overuse injury in gymnasts says little is known about effective sport-specific prevention; general advice (limit excessive loading, keep flexibility, technique, wrist and core strengthening) "seems beneficial" | D | benjamin-2017 | Narrative expert review in gymnasts. Not a trial. Use it to state the gap, not to promise prevention |
| `cal-handstand-screening` | safety | In 111 novice college athletes, shoulder stability and mobility test scores did not predict handstand quality. In 15 elite gymnasts, preseason range of motion and strength did not differ between those who were later injured and those who were not | C | malir-2024, heck-2021 | Small, different populations, one outcome each. It means no validated screen was found, so our gates are conventions |
| `cal-handstand-eye` | safety | A case report describes bleeding in the eye of a 15-year-old after about 10 seconds in a handstand, probably caused by straining | C | miyaki-2020 | One case. It cannot give a risk. It explains why the existing health gate asks about eye and blood-pressure conditions |
| `cal-planche-prep` | mechanism | In 7 high-level ring gymnasts, five preconditioning exercises differed from the support scale (planche) in trapezius, pectoral and biceps activity and in two coactivation ratios | C | rosaci-2025 | EMG only, elite, n = 7. The abstract does not name the exercises. It means a prep step may not copy the skill |
| `cal-pull-up-inactive` | programming | In 30 inactive young men, eight weeks of pull-up routines with extra forearm, core or interval work improved maximum pull-ups, grip and hang time; the forearm group gained most | B | sepehri-rahnama-2025 | Provisional until full text. n = 10 per group, men only, no group without extras, routine not described in the abstract |
| `cal-lat-pulldown-training` | programming | In 34 recreationally active men, eight weeks of lat pulldown training raised pull-up endurance; training on an unstable setup raised it 45.5% more than a stable one | B | li-lat-pulldown-2025 | Men, cable machine, an unstable condition. Not a home-bodyweight result |
| `cal-pulldown-pullup-strength` | programming | In 35 men and 23 women, maximum pull-up load was higher relative to body mass than maximum lat pull, and the two were correlated in men (r = 0.78) but not significantly in women (r = 0.44) | C | johnson-2009 | College students; used only for rough placement of lifters |
| `cal-plank-body-position` | mechanism | In 24 young adults, raising the feet raised rectus abdominis and oblique activity compared with a flat plank. In 20 students, stable and suspended lateral planks gave the most lumbar erector spinae activity | C | moreno-navarro-2024, calatayud-2017 | EMG only. The tested direction (feet up) is harder; it does not test our hands-up regression |
| `cal-tendon-timing` | mechanism | A narrative review says muscle and tendon adapt on different time courses, with imbalance in adolescents; a study of 67 elite jumpers found calf muscle strength and tendon stiffness adapted in line | Mixed | mersmann-2017, epro-2019 | Knee and Achilles tendons, adolescents and elite adults. Nothing for adult wrist, elbow or shoulder |
| `cal-pushup-bench-link` | programming | In 11 resistance-trained men, the maximum load in a weighted push-up and the maximum bench press were very strongly associated (r = 0.92) | C | van-den-tillaar-2025 | Men, trained, n = 11. Push-up load definition not given in the abstract. Used only for rough placement of lifters |

**Evidence-page gap text to change** (these are mine to edit in the next pass): the adherence line should name the two general meta-analyses and keep "no study of home bodyweight training in beginners"; add "no validated readiness screen for handstand work"; keep "no injury-rate data" but add that adult wrist data come from one self-selected survey of handstand practitioners.

## 5. Check of the existing gate numbers and pain rules

### 5.1 Every gate number is a convention

I searched for evidence on each skill (4.3 to 4.5). **No source supports any gate number**, and the two screening studies found (Malíř 2024, Heck 2021) found that common range-of-motion and strength tests do not predict handstand quality or injury, so there is no validated alternative to swap in.

| Where | Current text | Status |
|---|---|---|
| Placement tests (all ladders) | 8 reps with 2 or 3 left; holds of 15 to 20 s | Convention, shared with getting-started. Loosely related to the ACSM novice range (position stand, already cited); the bodyweight translation is ours |
| Plan sets and reps in reserve | 2 sets then 3, 3 or more reps left in weeks 1 and 2, hardest week 7 | Convention. Sets of 2 to 3 are supported for strength by Krieger 2009 (already cited); not tested for bodyweight ladders. The first-week reduction is flagged in `cal-soreness` |
| Holds | 15 to 30 s; plank 20 to 40 s | Convention. Ekstrom 2007 (already cited) shows most plank-type holds are below 45% of maximum activity, so holds for time fit an endurance emphasis |
| L-sit gates | 30 s plank (level 2 or higher), 20 s hollow (level 3), 8 push-ups | Convention |
| Wall handstand gates | 10 push-ups, 8 pike push-ups or a 30 s pike hold, 30 s straight-arm plank, 20 s hollow, eye, blood-pressure and neck check | Convention. The health gate is reasonable (Miyaki 2020 is one case) |
| Planche lean gates | 10 push-ups, 30 s straight-arm plank, 8 scapular push-ups, 10 wrist rocks | Convention. Rosaci 2025 suggests prep steps may not copy the skill |
| Tuck front lever gates | 30 s active hang, 3 pull-ups with controlled lowering, 20 s hollow, no shoulder or elbow pain | Convention. No source found for the lever or the hanging knee raise |
| "Take a full eight weeks on a block before you move up" | Progression page | Convention |
| "Wrists, tendons and shoulders adapt more slowly than muscles feel" | Progression page and my skills | **Partly supported only** (4.6). Reword as a convention |

### 5.2 Inconsistencies found in the live data and pages

1. **Push-up count.** L-sit needs 8 clean push-ups; handstand and planche need 10; the push ladder placement test is 8 and its move-up cue is 12. *Proposed:* one number, 10, and say "convention" once.
2. **Handstand pike gate.** "8 slow pike push-ups, or a 30 second pike hold with straight legs (push, level 4)". The pike **hold** is not an exercise anywhere in the ladder. *Proposed:* drop the "or" and use the 8 slow pike push-ups, which is the ladder's own test.
3. **L-sit has no straight-arm wrist gate.** Handstand and planche require a 30 s straight-arm plank without wrist pain; the L-sit loads the wrists in extension (fingers forward, hands beside the hips) but is gated only by push-ups, a forearm-or-knee plank and a hollow hold. *Proposed:* add the straight-arm plank gate (plank level 3).
4. **Front lever thresholds disagree.** The ladder's own test says 15 s or 5 slow reps; the step text says "8 slow reps with no swinging" for the knee raise and "5 seconds with a steady line" for the partial-to-full lever; the gate says 3 pull-ups while the pull ladder's own test is 8 and the slow lowering moves up at 5. *Proposed:* make each step's move-up text the single source, and have the group `test` say "see each step".
5. **Wrist gate is unequal.** Planche asks for 10 slow wrist rocks; the others only ask for "no wrist pain". Tiny, but one rule is easier to explain.
6. **Plank times.** The plank ladder test is 20 s, but the move-up and the gates use 30 s. This is fine (placement versus move-up) but the pages should say so.

### 5.3 Proposed text for my own files (needs approval; not applied)

```yaml
# groups.yml, cal-l-sit gates (add the wrist gate; align the push-up count)
gates:
  - A 30 second plank held comfortably (plank, level 2 or higher).
  - A 30 second straight-arm plank with no wrist pain (plank, level 3).
  - A 20 second hollow-body hold with the lower back flat (hollow body, level 3).
  - 10 clean push-ups with no wrist pain (push, level 2).

# groups.yml, cal-handstand gates (drop the pike-hold alternative)
  - 8 slow pike push-ups with no shoulder pain (push, level 4).
```

The `cal-push-up` progression and the progression page should then agree on "10 clean" for gates and "12 clean" for moving up, and say that both are conventions.

### 5.4 Pain rules

| Rule | What it says now | Finding |
|---|---|---|
| `general` (shared) | 2/10, no worse next morning; red flags | Convention, standard practice. No source. Shared by every rule |
| `wrist` (mine) | 2/10 and no worse next morning; raise the hands, use fists or parallettes to keep the wrist straight, shorten, or skip; see a clinician for recurrent dorsal pain, numbness, swelling or pain beyond 2 to 3 weeks | **Supported in part:** the neutral-wrist advice has lab support (Polovinets 2018, Majima 2008); the clinician advice has Nance 2017 (patients). Two things to add: (a) a neutral wrist moves load towards the shoulder and away from the elbow (Polovinets 2026), so the shoulder rule still applies; (b) say plainly that warm-ups, braces and grip devices were **not** linked to less chronic wrist pain in the one adult survey (Martonovich 2025) |
| `shoulder`, `lower-back`, `knee` | Used on most ladders | `lower-back` suggests "chest-supported, machine or bodyweight" swaps and "cut the load, not the form", which is gym wording and does not fit bodyweight holds. Not mine to edit |
| `elbow` | Never used by any calisthenics exercise | Hangs, slow lowerings and pull-ups load the elbow, and every one lists elbow in its contraindications, but each exercise can point at **one** rule. The `elbow` text is gym wording ("cambered bar or cable") |
| `neck` | Never used | The handstand and pike ladders list neck in their contraindications |

**Structural gap.** Each exercise has a single `painRule` (schema: one `reference('painRules')`). So the push-up family points at `shoulder` although its contraindications name the wrist; hangs and pull-ups point at `shoulder` although they name the elbow; handstand steps point at `wrist` although they name the neck. Request to the executive: allow a second, optional rule (`alsoPainRules`, rendered under the first). See section 9.

**D-002 check.** Equipment that carries load is well covered for the inverted row, the active hang and the pull-up (an "only if" check and a no-equipment route). The **incline push-up** only says "Check that the support cannot slide" and is not marked `optional`; the getting-started version says "Use a surface that cannot move... Lean on it to check before you start". *Proposed:* use the stronger wording (section 6).

## 6. Duplicated exercises and a single source of truth (D-003)

Where an exercise appears in more than one section its cues, mistakes and cautions must match or link to one page. I compared the live data. Strength has its own entries for the push-up, glute bridge, bird dog, side plank and a barbell box squat, and the core guide has its own side plank, bird dog, glute bridge, dead bug and goblet squat, so the real set is wider than "calisthenics versus getting-started".

| Exercise | Entries | Differences found | Safety weight |
|---|---|---|---|
| **Push-up** | getting-started `push-up` (level 4); calisthenics `cal-push-up` (level 2); strength `push-up` | **Depth:** "lower to the floor" (getting-started), "a hand-width from the floor" (calisthenics), not stated (strength). **Contraindications:** "shoulder, elbow or wrist pain that is not yet assessed" (gs); "a current shoulder, elbow or wrist injury" and "pain on the back of the wrist" (cal); "wrist pain in the extended position" and "painful shoulder at the bottom" (strength). **Cues and mistakes:** only getting-started and strength name "head dropping forwards"; only strength says to finish with the shoulder blades spread; only calisthenics has "piking". **Pain rule:** all `shoulder`, none points at `wrist`. **Ladder:** getting-started has wall, incline, knee and full; calisthenics goes incline to push-up and mentions knees only in the regression | Medium. Wrist wording and depth differ |
| **Incline push-up** | gs level 2; cal level 1 | gs: "Use a surface that cannot move... Lean on it to check". cal: "Check that the support cannot slide", not marked `optional`. gs lists "a fixed counter, heavy table or sturdy bench" | **Higher (D-002)** |
| **Glute bridge** | gs; cal; strength `glute-bridge`; core guide | **Foot position:** no distance given (gs), "25 to 30 cm from your hips" (cal), "about hip width" (strength), "feet too far away" listed as a mistake (core). **Pause:** 1 s (gs, cal, strength), 2 s (core). **Cramp fix:** "move your feet closer" only in strength and core; cal lists "acute hamstring pain"; gs lists "repeated hamstring cramping (shorten the range)". **Regression:** cal says "pause for less time" (a shorter pause is easier but not a regression of range). **Progression:** gs goes to a marching bridge; cal skips it | Low to medium |
| **Single-leg bridge** | gs level 3; cal level 2 | Same sequence differs (gs has the marching step, cal does not); setup wording differs ("leg held up with the knee bent over the hip" versus "straighten one leg or hold the knee towards the chest") | Low |
| **Squat** (bodyweight) | gs `bodyweight-squat` (level 3); cal `cal-bodyweight-squat` (level 1) | **Depth wording:** "to a depth you can control" and "going deeper than you can control" listed as a mistake (gs) versus "as far as you can with your heels down and your back flat" (cal). **Cues:** "whole foot on the floor" versus "chest tall; knees in line with the toes". **Pause:** none versus 1 s. **Entry:** calisthenics has no sit-to-stand or box step; its regression is a chair squat. Strength `box-squat` is a **barbell** exercise with the same name as getting-started's chair `box-squat` | **Medium:** "as far as you can" invites depth-chasing |
| **Plank** | calisthenics only (`cal-knee-plank`, `cal-forearm-plank`, `cal-straight-arm-plank`) | No duplicate | none |
| **Side plank** | gs `side-plank-knees`; cal `cal-side-plank-knees` and `cal-side-plank-full`; strength `side-plank`; core guide `side-plank` | **Pain rule:** `shoulder` (gs) versus `lower-back` (cal, strength). **Progression thresholds:** build to 30 s (gs), move up at 20 s (cal), "20 to 45 s each side" (strength dose), 20 s plus 5 s a week (core). **Cues:** "ribs stacked, hips up" versus "hips forward; shoulder stays above the elbow". **Contraindications:** gs "shoulder or back pain that is not yet assessed"; cal "a current shoulder injury" and "pain in the lower back" | **Medium.** A knees-down side plank loads the shoulder and trunk; the pain-rule choice differs |
| **Dead bug** | gs `dead-bug`; cal `cal-dead-bug` (level 1 of the hollow ladder); core guide `dead-bug` | **Back cue:** "keeping your lower back comfortable on the floor" (gs) versus "press your lower back lightly into the floor"/"back stays flat" (cal, core). **Regression:** "move only the legs, tapping a heel" (gs) versus "move only the legs, with the arms held up" (cal). **Contraindications:** gs "back pain that is not yet assessed"; cal "back pain when lying on your back" and "a current abdominal or hip injury". **Progression:** extend further or slow to 5 s (gs) versus move to the hollow tuck at 20 s (cal) | **Medium.** "Comfortable" and "flat" are different instructions for someone with back pain. The flat-back cue is a skill requirement for the hollow body |
| **Bird dog** | gs; strength `bird-dog`; core guide `bird-dog`. **Not in calisthenics** | gs lists "wrist or knee pain on hands and knees"; strength lists only "acute low-back pain"; hold 2 to 5 s (gs), "a few seconds" (strength), 5 s (core). Cue: "glass of water" (gs, core) | Low |
| **Prone Y raise**, **backpack row** | gs level 1 and 2; cal level 1 and 2 | Setup: gs "chair pushed against a wall", cal "knee on a chair seat, check it cannot slide". Contraindications differ in wording ("back pain that the hinge position aggravates" versus "pain when bending forwards over a chair") | Low to medium (chair stability) |
| **Pull-up** | strength `pull-up`; cal `cal-pull-up` | Strength lists "biceps tendon or elbow tendon pain" and allows neutral and chin-up grips; cal teaches only shoulder-width palms away (Prinold 2016) and a slow lowering first. Different aims: acceptable, but cross-links are missing | Low |

### Recommendation: one source of truth, in two steps

**Rule of thumb for the merge:** where two wordings differ, take the **stricter caution** and the **clearer instruction**, then record why.

**Step 1: no platform change.** Calisthenics aligns its own entries to the shared wording; getting-started and strength decide theirs. Proposed single source per exercise:

| Exercise | Source of truth | Others |
|---|---|---|
| Push-up family (wall, incline, knee, full), prone Y raise, backpack row, sit-to-stand, box squat, bodyweight squat, glute, marching and single-leg bridge, bird dog | **getting-started entries** (they are the beginner definitions and carry the "check before you rely on it" wording) | Calisthenics keeps its own ladder text only where the *aim* differs (for example the 1 s pause, the depth cue, the straight-leg progression) and says so; it adds the wrist contraindication |
| Dead bug, side plank (knees) | One agreed text, with the back cue written once ("press the lower back lightly towards the floor; if that hurts, keep it comfortable and reduce the range"). Decided by `strength-coach` and me | Core guide stays a separate, slower, back-safe plan, and links to it |
| Plank, hollow body, L-sit, wall handstand, planche lean, front lever, hanging work | **Calisthenics** (no duplicates) | |
| Strength-section push-up and pull-up | `strength-coach` decides | Add a link to the beginner ladder |

**Step 2: a platform feature (recommended).** An optional `canonical: <exercise id>` or `variantOf` field on `guideExercises`, and a validator rule: if set, `cues`, `mistakes`, `contraindications` and `painRule` must match the canonical entry, or the exercise must state a reason in a new `differsBecause` field. This makes D-003 checkable rather than a reminder. Ids are global and an exercise belongs to one ladder, so a calisthenics ladder cannot simply list a getting-started exercise; `canonical` keeps both pages and one text.

## 7. Proposed groups, exercises and plan

### 7.1 No new beginner exercises

Everything the lifter page and the first-weeks page need already exists. I propose **no new foundations exercises**. Specifically not proposed: wrist-strengthening drills (no evidence; the one adult survey found warm-ups unrelated to pain), a band-assisted pull-up (a snapping band under tension is a hazard and there is no evidence), and a knee push-up level (it would renumber the push ladder and break the "push, level 2" text in every gate; use the single-source link in section 6 instead).

### 7.2 Optional equipment phase: parallettes (design only, later)

`CONTEXT.md` lists "optional parallettes or rings" for this pass. **Rings are excluded**: they hang from an anchor and fall under D-002 with no safe way to check an anchor at a stranger's home. **Parallettes** keep the wrist straight (supported by the neutral-wrist lab data above, which are not training data). A draft for the owner to approve before any page work. It uses the existing L-sit gates plus a passed floor L-sit support hold.

```yaml
# groups.yml (draft)
- id: cal-parallette-l-sit
  section: calisthenics
  phase: first-skills
  order: 13
  title: L-sit on parallettes
  summary: The same steps as the floor L-sit, with the hands on two low, stable parallettes so the wrists stay straight. Optional. The floor ladder still works with no equipment.
  ladder: true
  requires: Two parallettes or sturdy handles with non-slip bases, set on a flat floor. Press on them hard before use. Do not use a homemade pair, a chair back or any support that can tip or slide.
  test: Start at level 1. Move up only when you can hold the current level for 15 seconds with straight arms and no wrist or shoulder pain.
  gates:
    - Every gate for the floor L-sit (all four).
    - Seated support hold on the floor for 15 seconds with straight arms and no wrist pain (L-sit, level 1).
    - The parallettes pass the press test in the equipment note.
  convention: true
```

Exercises (each needs the full safety fields; one shown, two named): `cal-parallette-support-hold` (level 1), `cal-parallette-tuck-l-sit` (level 2), `cal-parallette-one-leg-l-sit` (level 3).

```yaml
- id: cal-parallette-support-hold
  order: 42
  section: calisthenics
  group: cal-parallette-l-sit
  level: 1
  name: Parallette support hold
  equipment:
    - parallettes or sturdy handles
  optional: true
  muscles: Shoulders, triceps, trunk
  setup: Only if the parallettes pass the press test on a flat floor (lean on them with your full weight before you rely on them). Without them, use the floor seated support hold. Sit between the bars with your hands on the grips, palms facing in, and your knees bent with your feet flat.
  steps:
    - Press down through straight arms and lift your hips a few centimetres, keeping your feet down.
    - Push your shoulders down away from your ears and hold, then lower slowly.
  cues:
    - Push the floor away
    - Shoulders away from the ears
  mistakes:
    - bending the elbows
    - shrugging
    - a bar that moves under the hands
  contraindications:
    - a current wrist, shoulder or elbow injury
    - parallettes that have not passed the press test
  regression: Go back to the floor seated support hold.
  progression: Move on to the tuck L-sit on parallettes when you can hold 15 seconds with straight arms and no wrist or shoulder pain.
  painRule: wrist
  status: draft
```

Not enough evidence exists to claim a benefit: the only support is the neutral-wrist lab data (grade C, no training outcome) and the existing wrist rule. The ladder would have to be used in a `cal-first-skills` session and fit the 45 minute budget, so it needs a plan edit too.

### 7.3 Draft third plan: the fast-start week (data shape for 2.5)

```yaml
# plans.yml, appended AFTER cal-first-skills (loadGuide takes the first plan as the hub plan)
- id: cal-lifter-start
  section: calisthenics
  phase: lifter-start
  name: Fast-start week for people who already lift
  warmup:
    text: "About 8 minutes: the same three preparation exercises as the foundations plan, every session. If anything hurts during the warm-up, do not continue."
    items:
      - exercise: cal-wrist-rocks
        reps: 8-10 each way
      - exercise: cal-scapular-push-up
        reps: 8-10
      - exercise: cal-wall-slide
        reps: 8-10
  sessions:
    - id: T
      title: "Placement day"
      intro: One set of each placement test, once. A test, not a workout.
      items:   # sketch: one entry per ladder, reps as in the foundations plan
        - group: cal-push
        - group: cal-pull
        - group: cal-squat
        - group: cal-bridge
        - group: cal-hollow
        - group: cal-plank
        - group: cal-side-plank
    - id: A
      title: "Session A: push, legs and trunk"   # copy of foundations A
    - id: B
      title: "Session B: pull and trunk"          # copy of foundations B
  weeks:
    - label: Fast-start week
      sets: 2
      rir: 3 or more
      days: { Monday: T, Wednesday: A, Friday: B }
  timing: { secondsPerSet: 40, restSeconds: 75, secondsBetweenExercises: 30, warmUpMinutes: 8, maxMinutes: 45 }
  status: draft
```

The validator checks that no group in `lifter-start` is unused (there are none) and the weekly-plan page loops over a fixed `phases` array, so showing this plan is a small page edit of mine.

### 7.4 Placement data shape (platform request)

The table in 2.3 is data in spirit. Option 1 (recommended): an optional `liftersStart` array on `guideGroups`: `{ ability: string, tryLevel: number, basis: string }`, with a validator rule that `tryLevel` is within the ladder and that `basis` states "convention" when no claim is cited. Option 2: a small `guides/placement.yml`. Either needs the executive. Without it the table would sit in page markup.

## 8. Phases and acceptance criteria

| Phase | Deliverable | Owner | Done when |
|---|---|---|---|
| **0** | This note approved (D-004) and the questions in section 9 answered | Owner | Decisions recorded |
| **1** | **Evidence and consistency, data only.** Append the sources in 4.7 and claims in 4.8; reword the evidence page gaps and the "tendons" sentence; apply the gate edits in 5.3; align my own entries with the shared wording from section 6 (depth, wrist contraindication, incline push-up check) | `calisthenics-coach`, with the executive sequencing `sources.yml`, `groups.yml` and `pain-rules.yml` | `npm run check` passes with no unread warnings; `npm run verify:sources -- --write` stamps every new DOI; every claim has a grade, a source and caveats; no claim appears without a source read; `safety-review` result `pass` or `pass with notes` on every changed exercise; evidence page states every gap in 4; the existing Playwright calisthenics tests pass |
| **2** | **"I already lift" page and the placement data** | `calisthenics-coach`; platform for 7.4 and any new test | The page loads at 1280 and 390 px with no console errors or overflow; the table is flagged grade D and has no "you will" promise; every gate is listed unchanged; BeginnerSafety and SkillSafety present; linked from the hub, Start here and progression; a Playwright check covers the page and the flag; the fast-start plan (7.3) passes the validator and the time budget; `npm run build` passes |
| **3** | **First weeks and adherence page**, with the shared-text decision from 3.5 | `calisthenics-coach`; `strength-coach` if option C | The three adherence claims are live with limits; the page contains no unsourced habit claim and no streak or outcome language (banned-phrase check clean); the tracker is a plain table with no stored data; missed-session and repeat-the-week rules match the plan pages; the page labels each convention |
| **4** | **Second pain rule and elbow and neck coverage** (platform) and the **single source of truth** (section 6, step 2) | Executive, `strength-coach`, me | Schema and validator changes tested, and fail when deliberately broken; every cal exercise lists the extra rules named in its contraindications; the D-003 divergences in section 6 are resolved or have a written reason |
| **5** | **Optional equipment** (parallettes) and **movement specs** (D-001) | Me, then the executive for the rig | Owner approves 7.2 first; any new exercise passes `safety-review` with an "only if" check and a no-equipment route; no animation is shipped until the rig can show it faithfully |
| **6** | **Review** | Named human reviewers | A physiotherapist and a strength coach sign off; only then does `draft` change |

**Visuals (D-001).** The rig is side-on, has one shoulder point and no props, so it cannot show the wall handstand, planche lean, L-sit, tuck front lever, inverted row (needs a bar), active hang (scapular movement) or the scapular push-up and wall slide (scapular motion). Movement specs in `docs/animation-specs/` would be needed for each; that directory is not mine, so the specs are a request (section 9), not an approximation.

## 9. Open questions and requests

**Open (owner or executive)**

1. Approve the sources and claims in 4.7 and 4.8 in whole, or tell me which to drop. The Marines papers, Blasimann 2018, Ley and Putz 2024 and the Li and Huang trial are my recommendation to leave out.
2. Should the "I already lift" page say how to combine this guide with continuing a gym programme, or stay silent (the plan says calisthenics does not assume the person also trains)? Combining would be a request to `strength-coach`.
3. Adherence text: option A, B or C (3.5)?
4. Gate numbers: approve the single push-up number of 10 and the added L-sit wrist gate, or leave the current numbers and only fix the inconsistencies' wording?
5. Reviewers: no physiotherapist or strength coach is named yet; the pages stay draft until they are.

**Requests, for the executive to route**

| To | Request |
|---|---|
| `strength-coach` | Review the getting-started and strength columns in section 6 and decide the shared wording for the push-up family, the squat depth cue, the side plank pain rule (`shoulder` versus `lower-back`), the dead-bug back cue and bird dog. Reuse the new adherence claims by id instead of re-adding them. Note: the core guide's side plank step ends "(the easier version, which suits you now)", which reads as addressed to one person; it is the owner's file, so only the owner or executive should decide whether to reword it |
| Executive (platform) | (a) an optional second pain rule (`alsoPainRules`); (b) an optional `canonical` and `differsBecause` field with a D-003 validator rule; (c) a placement data shape (7.4); (d) Playwright coverage for the two new pages and any third plan; (e) if option C in 3.5, a shared adherence data file and component; (f) where the calisthenics movement specs should live |
| Executive (hotspots) | Sequence appends to `sources.yml`, `groups.yml`, `plans.yml` and, for the `wrist` rule text in 5.4, `pain-rules.yml`. The `elbow` and `lower-back` rule wording is gym-oriented; it is not mine to edit, so the owner of those entries should decide on bodyweight wording |
| Named reviewers | The gates and placement numbers are the first thing to review; they are conventions with no source |

## 10. What I did not verify

- **Abstracts only.** No full text was read. My first display of some abstracts dropped text after a comparison sign; I re-read the affected ones in full (Johnson 2009, Kox 2015, Majima 2008, Martonovich 2025, Sepehri Rahnama 2025 and both Marines papers) before using them. Several claims need the full text before they go live: the content of the "reinforcement" in Silva 2018, the push-up load definition in van den Tillaar 2025, the pull-up routine in Sepehri Rahnama 2025, and which exercises Rosaci 2025 tested.
- **Titles only** for most of the 57 handstand and 26 pull-up and women hits, and the Rhodes and de Bruijn, Vasiljevic and several dropout reviews. They may contain something I did not see.
- **Crossref confirms** that a DOI resolves, that the title and year match and that no retraction notice points at it. It does not confirm that a claim fits our use. The retraction filter was tested once against a known retracted paper.
- **Search coverage.** Europe PMC titles and abstracts only, on one day, in English phrasing. I did not search other databases or the grey literature, and hit counts will change.
- **Not run:** `npm run build`, the Playwright suite, `npm run verify:sources` (no source was added), and any browser check, because no page changed. I read the Astro pages as source, not as rendered output.
- **Conventions, not facts:** every number in the placement table, the fast-start week, the minimum session, the missed-session rules and the "what lifters find hard" list. I could source none of them.
- **Not reviewed** by a physiotherapist or a strength coach.
