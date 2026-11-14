# Strength / Hypertrophy: implementation and information-gathering plan

Status: **first build done (drafts).** The stack decision is made (Astro) and phases 1 to 3 are built in draft form, with the
weekly-plan and program pages from phase 7 and cricket stubs from phase 8. See "Build status" at the end of section 14 and
`CONTEXT.md` section 3a. Everything below is still the plan of record. Part 1 explains what we are building and how the site is
structured; Part 2 is the research plan (how we gather and verify the information); Part 3 is the build plan (phases,
deliverables, acceptance criteria); Part 4 is the cricket track; Part 5 lists risks and decisions I need from you.

Contents

1. [Goals, principles and safety stance](#1-goals-principles-and-safety-stance)
2. [Site architecture and URL map](#2-site-architecture-and-url-map)
3. [Content model (the modular part)](#3-content-model-the-modular-part)
4. [Muscle taxonomy (what gets a page)](#4-muscle-taxonomy-what-gets-a-page)
5. [Information gathering: method](#5-information-gathering-method)
6. [Research lenses: the five expert hats](#6-research-lenses-the-five-expert-hats)
7. [Per-page dossier templates](#7-per-page-dossier-templates)
8. [Worked example: the chest pilot](#8-worked-example-the-chest-pilot)
9. [Technology and architecture decisions](#9-technology-and-architecture-decisions)
10. [Visuals: muscle maps and exercise demos](#10-visuals-muscle-maps-and-exercise-demos)
11. [Implementation phases](#11-implementation-phases)
12. [Cricket-specific track](#12-cricket-specific-track)
13. [Quality gates and definition of done](#13-quality-gates-and-definition-of-done)
14. [Risks and open questions](#14-risks-and-open-questions)
15. [Appendix: seed sources (verify before citing)](#15-appendix-seed-sources-verify-before-citing)

---

## 1. Goals, principles and safety stance

**Goal.** A navigable, trustworthy reference on muscle growth and strength: how muscles grow, how each muscle is built, which
exercise variations bias which muscle, how to program it, and how it applies to cricket.

**Principles**

1. **One concept, one page, one source of truth.** A muscle is described once; every exercise and program links to it. No
   copy-pasted anatomy.
2. **Every non-trivial claim carries an evidence grade and a source.** "Incline press targets the upper chest" is a claim, not
   a fact, until graded (see section 5.2).
3. **Say what is unknown.** Where evidence is mixed (it often is for "which variation grows which part"), the page says so.
4. **Modular by default.** Muscles, exercises, programs, principles and cricket modules are separate content types that
   reference each other by ID. Adding a muscle or exercise means adding one file, not editing five pages.
5. **Safety is part of the content, not a footer.** Each exercise has contraindications, regressions and a pain rule. This
   matters here in particular: the current user is recovering from a lower-back strain, so "back-safe?" is a first-class
   filter.
6. **Honest provenance.** Every page shows status (Draft / Verified / Expert-reviewed), who reviewed it and when.

**Important limitation, stated plainly.** I can research, structure and draft this material, and I can verify citations
mechanically. I am not a physician, physiotherapist or certified strength coach, and AI-drafted health content can be wrong in
confident-sounding ways. The plan therefore puts **named qualified humans as reviewers** at the gates in section 13 and labels
unreviewed pages as drafts. Nothing should be presented as medical advice.

---

## 2. Site architecture and URL map

Existing, live: `/home/`, `/core/` (the back-safe core guide, linked from the Isometrics tile).

Proposed new sections. Each is a self-contained folder with the same internal shape, so a fourth or fifth section (e.g.
mobility) is a copy of the pattern.

```
/strength/                                   Strength / Hypertrophy hub
  principles/                                how muscles grow, programming variables
    mechanisms/  volume/  intensity/  frequency/  proximity-to-failure/
    rest-and-recovery/  tempo-and-rom/  progression/  deloads/  periodisation/  nutrition-for-growth/
  muscles/                                   interactive muscle map (front + back) and group index
    chest/                                   group page: overview, anatomy map, sub-muscle index, key exercises
      pectoralis-major/                      muscle page (heads/regions are sections of this page)
      pectoralis-minor/
      serratus-anterior/
    back/  shoulders/  arms/  legs/  core/  neck/        (same shape)
  exercises/                                 filterable index (muscle, equipment, level, back-safe, cricket)
    barbell-bench-press/                     exercise page, with a variations table
    incline-dumbbell-press/  cable-fly/  ...
  programs/                                  splits and templates
    push-pull-legs/  upper-lower/  full-body/
    push-pull-legs/push-day/                 "day" page: lists muscles trained, exercise order, sets/reps, rationale
    upper-lower/chest-and-back-day/
  cricket/                                   cricket strength and hypertrophy track (section 12)
    fast-bowlers/  spinners/  batters/  wicketkeepers/  fielders/
  glossary/    sources/                      shared reference pages
/plyometrics/                                same shape: principles/, exercises/, programs/, cricket/
/isometrics/                                 hub for isometric training; /core/ stays canonical for the core guide
  cricket/
/nutrition/                                  out of scope for this plan
```

**Notes**

- **"Chest day"** (your example) is `programs/<split>/chest-day/`. It does not describe the chest; it links to
  `muscles/chest/` and to each exercise, and explains the session design. Anatomy lives only in the muscle pages.
- **`/core/` stays where it is.** It is the existing, working isometrics core guide. A future `/isometrics/` hub would list it
  alongside other isometric content rather than move it, so existing links never break. If you prefer a single
  `/isometrics/core/`, we add a redirect. This is an open question in section 14.
- Section hubs are listed in `site/home/js/sections.js`; flipping a tile from `soon` to `live` is a one-line change.

---

## 3. Content model (the modular part)

Content is data, not hand-written HTML. Each entity is a file with structured front matter plus a Markdown body. Pages are
generated from these files by shared templates.

### 3.1 Entities

| Entity | One file per | Key fields | References |
|---|---|---|---|
| `MuscleGroup` | group (chest, back, ...) | name, summary, order, map region | contains `Muscle[]` |
| `Muscle` | muscle | names (common, Latin), group, regions/heads, origin, insertion, innervation, actions (per joint), fibre architecture, functional role, common injuries, red flags | `Exercise` (via claims), `Source` |
| `Exercise` | exercise | name, pattern (press, row, hinge...), equipment, level, setup, execution, cues, common errors, contraindications, regressions, progressions, back-safe flag, cricket relevance | `Muscle` (primary/secondary), `Variation[]` |
| `Variation` | variation of an exercise | what changes (angle, grip, stance, ROM, tempo, implement), intended emphasis | `EmphasisClaim` |
| `EmphasisClaim` | claim | variation, muscle/region, direction (more/less), evidence grade, summary, caveats | `Source[]` |
| `Principle` | topic | statement, practical rule, ranges with confidence, controversies | `Source[]` |
| `Program` / `Day` | split / session | goal, level, weekly structure; per day: muscles, ordered exercises, sets x reps x RIR, rationale | `Exercise`, `Muscle`, `Principle` |
| `CricketModule` | role or topic | demands, injury profile, priorities, prescriptions, season phase | everything above |
| `Source` | reference | type, authors, year, venue, DOI/URL, study design, population, verified flag | n/a |

### 3.2 Example (excerpt, chest)

```yaml
# content/muscles/pectoralis-major.yml
id: pectoralis-major
group: chest
names: { common: Pectoralis major, latin: Musculus pectoralis major }
regions:
  - { id: clavicular,    label: Clavicular head }
  - { id: sternocostal,  label: Sternocostal head }
  - { id: abdominal,     label: Abdominal fibres }
anatomy:
  origin: ...        # filled from anatomy references (sources: gray-anatomy, kendall)
  insertion: ...
  innervation: ...
  actions: [ shoulder horizontal adduction, shoulder internal rotation, clavicular head: flexion, sternocostal: extension from flexed ]
status: draft              # draft | verified | expert-reviewed
reviewed: { by: null, on: null }
```

```yaml
# content/claims/incline-press-clavicular.yml
id: incline-press-clavicular
variation: incline-dumbbell-press/incline-30
muscle: pectoralis-major
region: clavicular
direction: more
grade: C                   # see 5.2; to be graded during research, not pre-assigned
summary: "Hypothesis to verify: inclined pressing increases clavicular-head activation (EMG); hypertrophy outcome unclear."
sources: [ ]               # must be non-empty before status leaves draft
```

### 3.3 Validation (the safety net for modularity)

A script runs on every commit and fails the build if:

- an ID reference does not resolve (an exercise names a muscle that has no file);
- a claim has no sources, or a source is unverified (no DOI/URL, failed lookup, retracted);
- a `verified` or `expert-reviewed` page contains a claim graded below its threshold without a "mixed evidence" note;
- an exercise has no contraindications, regression or pain-rule field;
- a page asserts an emphasis ("targets", "best for", "most effective") in body text without citing a claim ID.

This is what keeps hundreds of pages consistent without manual proofreading.

---

## 4. Muscle taxonomy (what gets a page)

Granularity rule: **one page per muscle; heads and regions are sections inside it.** Splitting heads into pages (e.g.
"clavicular head") creates thin, duplicate pages; a heads/regions table with per-region exercise bias is more useful.

| Group | Muscle pages | Heads / regions worth a section |
|---|---|---|
| **Chest** | pectoralis major, pectoralis minor, serratus anterior | clavicular / sternocostal / abdominal fibres of pec major |
| **Back** | latissimus dorsi, trapezius, rhomboids, teres major, erector spinae, multifidus and deep spinal muscles, quadratus lumborum | upper / middle / lower trapezius; thoracic vs lumbar erectors |
| **Shoulders** | deltoid, supraspinatus, infraspinatus, teres minor, subscapularis | anterior / lateral / posterior deltoid; rotator cuff as a functional group |
| **Arms** | biceps brachii, brachialis, brachioradialis, triceps brachii, forearm flexors, forearm extensors | long / short biceps heads; long / lateral / medial triceps heads |
| **Legs** | quadriceps (rectus femoris + vasti), hamstrings, gluteus maximus, gluteus medius and minimus, adductors, hip flexors (iliopsoas), gastrocnemius, soleus, tibialis anterior | biceps femoris long/short head, semitendinosus, semimembranosus; rectus femoris vs vasti |
| **Core** | rectus abdominis, obliques, transversus abdominis, diaphragm and pelvic floor (brief) | cross-link to the existing `/core/` guide |
| **Neck** (optional) | cervical extensors/flexors, sternocleidomastoid | n/a |

That is roughly **40 muscle pages, 7 group pages**. Estimated total site for the strength section is on the order of
**250 to 300 pages** (muscles ~47, exercises ~120 to 180, programs/days ~15, principles ~12, cricket ~20, glossary and sources).
At that size a static-site generator with schema validation is the right tool (section 9).

---

## 5. Information gathering: method

### 5.1 Source hierarchy (what we trust, in order)

1. **Systematic reviews and meta-analyses** of resistance-training trials with hypertrophy or strength outcomes.
2. **Randomised controlled trials**, especially within-subject designs measuring muscle size (MRI, ultrasound, DXA).
3. **Position stands and guidelines** (ACSM, NSCA, ISSN, national cricket boards for workload).
4. **Biomechanics and EMG studies.** Useful for *activation* and mechanics; **not** proof of growth (EMG amplitude does not
   equal hypertrophy; this caveat appears wherever EMG is cited).
5. **Anatomy references** for structure: Gray's Anatomy, Netter, Kendall's *Muscles: Testing and Function*, Neumann's
   *Kinesiology of the Musculoskeletal System*, Kapandji's *Physiology of the Joints*.
6. **Practitioner knowledge** (expert S&C coaches, physiotherapists): valuable for cueing and programming craft, graded as
   consensus (D), never presented as proven.

Out: social-media claims, supplement-company content and uncited "bro-science" unless explicitly discussed and debunked.

### 5.2 Evidence grades (shown as badges on pages)

| Grade | Meaning | Example wording on page |
|---|---|---|
| **A** | Systematic review/meta-analysis, or several concordant RCTs, with growth/strength outcomes | "Established" |
| **B** | At least one good RCT on growth/strength outcomes, or strong convergent evidence | "Probable" |
| **C** | Mechanistic/EMG/biomechanical or observational evidence only | "Plausible, not proven to change growth" |
| **D** | Expert consensus or practice-based | "Practitioner consensus" |
| **Mixed** | Credible sources disagree | "Contested: here is each side" |

A claim's grade is assigned during research from its sources. It is **never pre-assigned to match a conclusion** we like.

### 5.3 Workflow for every claim

1. **Retrieve** candidates: PubMed, Europe PMC, Cochrane, SPORTDiscus, Google Scholar, SportRxiv (preprints, flagged as such).
   Search strings are logged in the dossier so searches are reproducible.
2. **Screen**: population (trained/untrained, sex, age), design, outcome measure, sample size, funding/conflicts.
3. **Extract** into the claim file: finding, effect size or direction, population, limits.
4. **Verify the source exists**: DOI resolves (Crossref), title/authors/year match, not retracted (Retraction Watch / journal
   page). **No citation is added from memory.** Any seed reference in the appendix is a lead until it passes this step.
5. **Grade** per 5.2. Record dissent where studies disagree.
6. **Draft** page text from the claim files only (text cites claim IDs).
7. **Review** per the gates in section 13.

### 5.4 Keeping it current

Each source and page has `lastReviewed`. A scheduled check flags pages older than 18 months and any source with a new
correction/retraction. Position stands and key meta-analyses are re-checked annually.

---

## 6. Research lenses: the five expert hats

For each muscle group dossier, the same questions are answered from five angles. This is what makes the content "expert
trainer + doctor + researcher + S&C coach + sports therapist" rather than a single-voice summary.

| Lens | Questions it must answer for a muscle / exercise | Typical sources |
|---|---|---|
| **Anatomist / physician** | Origin, insertion, innervation (root levels), actions per joint, fibre direction and architecture, neighbouring structures, common pathologies, **red flags that require medical review** (e.g. sudden tearing pain, numbness, loss of strength), contraindications | Gray's, Netter, Kendall, clinical guidelines |
| **Physiotherapist / sports therapist** | How is it injured (mechanism)? Prehab and mobility prerequisites? Return-to-training progression? Pain rule and regressions? Which variations are joint-friendlier? | Clinical literature, rehab protocols, McGill (spine), practitioner interviews |
| **Researcher** | What does the best evidence say about growth, strength, activation? Effect sizes and uncertainty? Populations studied vs the user? What is unresolved? | Meta-analyses, RCTs, critical commentary |
| **Trainer** | Setup, execution cues, common mistakes, equipment alternatives, how to choose between variations for a goal | Coaching texts, expert practitioners |
| **Strength and conditioning coach** | Where does this fit in a week? Volume, frequency, load and rep ranges, proximity to failure, progression and deload rules, exercise order, periodisation, session design | NSCA/ACSM, S&C literature, programming texts |

Cricket adds a sixth lens in section 12 (**cricket S&C / performance analyst**).

---

## 7. Per-page dossier templates

Researchers (or the AI-assisted drafting step) fill these in; the build consumes the structured parts.

### 7.1 Muscle dossier

1. Identity: names, group, regions/heads, status.
2. Anatomy: origin, insertion, innervation, blood supply (optional), architecture (fibre direction, pennation), joints crossed.
3. Function: actions per joint, role in common movements, length-tension notes, synergists/antagonists.
4. **Growth considerations**: evidence on regional hypertrophy, effect of muscle length during training, volume sensitivity,
   recovery time (each graded).
5. **Exercise-variation matrix**: rows = variations, columns = region emphasis, evidence grade, back-safe flag, notes.
6. Injury and health: mechanisms, prevention, red flags, contraindications, when to see a clinician.
7. Mobility and prerequisites.
8. Cricket relevance (links to the cricket track).
9. Common myths, with the evidence.
10. Sources and open questions.

### 7.2 Exercise dossier

Setup, execution, cues, common errors, primary and secondary muscles (linked, graded), variations table, regressions and
progressions, contraindications, back-safe assessment, equipment alternatives, typical programming ranges (with source),
demo asset, cricket relevance.

### 7.3 Program/day dossier

Goal and level, weekly structure, per-day exercise order with rationale, sets x reps x RIR, progression scheme, deload,
substitutions, back-safe version, links to every muscle and principle used. Each programming number links to a principle page
that carries the evidence and its confidence.

### 7.4 Principle dossier

Statement, practical rule, ranges with confidence and population, what changes the answer (training status, age, sex),
controversies, sources.

---

## 8. Worked example: the chest pilot

The chest is the first vertical slice because it is your example and covers every content type.

**Muscles (3 pages).** Pectoralis major (clavicular, sternocostal, abdominal fibres), pectoralis minor, serratus anterior.
Synergists are linked, not duplicated: anterior deltoid and triceps brachii.

**Exercise families to research (variation matrix rows).** These are *hypotheses to test against evidence*, not conclusions:

| Family | Variations to examine | Emphasis question to resolve |
|---|---|---|
| Barbell / dumbbell press | flat, incline (low vs moderate angle), decline, grip width, dumbbell vs barbell | Does incline shift growth toward the clavicular head? How much, and does hypertrophy data agree with EMG? |
| Machine / cable press | converging press, cable press at different heights | Constant tension and range of motion differences |
| Flyes | dumbbell fly, cable fly (high-to-low, mid, low-to-high), pec deck | Stretch-position loading; fibre-direction alignment; shoulder stress |
| Bodyweight | push-up variants (hands elevated, feet elevated, deficit), dips (forward lean) | Load scaling, shoulder and elbow stress |
| Serratus / scapular | push-up plus, cable punch | Scapular control relevance (including for throwing) |

**Programming questions.** How many weekly hard sets for chest? Frequency? Where in a push day? How does chest volume interact
with front-deltoid and triceps volume from the same sessions?

**Chest day page.** Built *last*: it links to the above, justifies the exercise order, and offers a back-safe variant (e.g.
supported/bench-based pressing instead of loaded standing patterns while the back is recovering).

**Cricket tie-in.** Pressing/pulling balance and shoulder health for throwing and bowling; core-to-limb force transfer in
batting. Treated as hypotheses until sourced (section 12).

**Pilot success test.** A reader can open `/strength/programs/push-pull-legs/push-day/`, tap "pectoralis major", see the
anatomy, tap a variation, see the evidence grade and caveats and a back-safe regression, and return, with every link
resolving and no unsourced emphasis claims. If that works for chest, the pattern scales.

---

## 9. Technology and architecture decisions

### 9.1 Where we are

The current site is hand-written static files with client-side rendering from JS data modules. That is excellent for 2 pages
and a 3D viewer. It does **not** scale to ~300 content pages because:

- content rendered by JS is weaker for search engines and for sharing links;
- there is no build-time validation of cross-references or claims;
- authoring long-form content in JS/HTML is error-prone.

### 9.2 Options

| Option | Pros | Cons |
|---|---|---|
| Keep hand-rolled, client-rendered | No build, already working | No validation, poor content authoring, SEO/perf limits at scale |
| **Astro (content collections + Zod schemas)** | Typed schemas = our validator; Markdown/YAML content; static output; can embed the existing 3D viewer as an interactive island; good Netlify support | Adds a Node build and a dependency tree |
| Eleventy (11ty) | Simple, flexible, static output | Schema validation is DIY |
| Custom Node generator | Total control | We maintain a framework |

**Recommendation: Astro**, with the existing `home/` and `core/` pages carried over unchanged (served as static files) so
nothing live breaks. **Decision gate in Phase 0**, needs your confirmation, because it changes Netlify settings (build command
`npm run build`, publish directory `dist`, which I will set in `netlify.toml`, so no dashboard changes beyond a redeploy).

### 9.3 Other building blocks

- **Search:** build-time index (e.g. Pagefind), no server.
- **Filtering** on the exercise index: by muscle, equipment, level, back-safe, cricket relevance.
- **Shared design system:** already extracted (`site/shared/`): tokens, chrome, theme, DOM helper. New sections reuse it.
- **No tracking/analytics** unless you ask for it. No accounts.
- **Accessibility:** target WCAG 2.2 AA (contrast, keyboard operation, reduced motion, text alternatives for every diagram).
- **Performance budget:** pages under ~100 KB excluding images; 3D only on pages that need it.

---

## 10. Visuals: muscle maps and exercise demos

### 10.1 Muscle map (new, important)

An interactive front/back **SVG anatomy figure** where each muscle is a clickable, highlightable region. Used on the strength
hub, every group page, and to show "muscles worked" on exercise pages.

- **Imagery licensing is a real constraint.** Most anatomy illustrations are copyrighted. Options: (a) draw our own SVG
  (recommended, consistent with the site style, no licence risk); (b) use openly licensed sources and record attribution and
  licence per file (e.g. Wikimedia Commons with per-file licence checks, BodyParts3D, Servier Medical Art); (c) commission an
  illustrator. Default plan is (a), with (b) as a reference for accuracy.
- Muscle IDs in the SVG match `Muscle.id`, so highlighting is data-driven.

### 10.2 Exercise demos: three tiers

| Tier | What | When |
|---|---|---|
| 1 | Text + muscle-map highlight + variations table | Every exercise (launch) |
| 2 | Looping 3D mannequin demo using the existing rig | Side-on (sagittal-plane) exercises: squat, deadlift, row, bench press, curls |
| 3 | Full-3D joints (add a depth value per joint) | Frontal-plane moves: lateral raise, fly, side lunge |

**Known limitation of the current rig:** poses are authored as side-view x/y coordinates with fixed depth offsets, so
exercises where the limbs move across the body or out to the side cannot be shown correctly. Tier 3 needs a rig extension.
Also, glow regions today are only `torso` and `hips`; per-muscle glow needs more regions (chest, lats, deltoids, arms,
quads, hamstrings, calves).

A small **pose-authoring page** (sliders per joint, live preview, export to the pose format) is part of Phase 5 so poses are
not hand-typed numbers.

---

## 11. Implementation phases

Effort is in "working sessions" (a focused block of a few hours). It assumes drafting is AI-assisted and verification and
review are human-gated.

| Phase | Deliverable | Acceptance criteria | Effort |
|---|---|---|---|
| **0. Decisions** | Stack decision (section 9), reviewer names, scope confirmation (section 14), repo and content conventions | You approve the open questions; `docs/` records the decisions | 1 |
| **1. Foundations** | Content schemas (section 3), validator, page templates (muscle, exercise, program, principle), shared nav/breadcrumbs, search skeleton, status/evidence badges, `/strength/` hub shell | A sample muscle, exercise and program render from data; validator catches a deliberately broken reference; Netlify build green | 3 to 4 |
| **2. Research tooling** | Source register, claims register, citation verifier (DOI/Crossref check, retraction check), dossier templates, evidence-grade rubric | Verifier flags a fake DOI and an unresolved ID; a claim cannot reach `verified` without sources | 2 |
| **3. Chest pilot** | Full vertical slice (section 8): 3 muscle pages, group page, ~12 exercise pages with variations, principles used, chest-day page, muscle-map SVG v1 | Pilot success test passes; every claim graded and cited; back-safe flags present; draft reviewed | 4 to 5 |
| **4. Review and retrospective** | Expert review of the pilot (physician/physio and S&C coach); fix list; template adjustments | Reviewer sign-off recorded on each page; template changes folded back | 1 to 2 |
| **5. Visual tooling** | Pose-authoring page; rig extension for per-muscle glow and (if needed) full-3D joints; demo assets for pilot exercises | Pilot exercises have Tier 1 and applicable Tier 2 demos | 3 |
| **6. Roll-out: muscle groups** | Back, shoulders, arms, legs, core, (neck), one group at a time using the same dossier flow | Each group passes the same gates; cumulative page count tracked | 3 to 4 per group |
| **7. Principles and programs** | ~12 principle pages; split pages and day pages built from existing muscle/exercise data | Every programming number links to a principle with an evidence grade | 4 |
| **8. Cricket track (strength)** | Section 12 for strength/hypertrophy | Passes cricket gates in section 12.4 | 4 to 5 |
| **9. Plyometrics and isometrics** | Same architecture for `/plyometrics/` and `/isometrics/` (including cricket sub-sections); `/core/` integrated | Hubs live; tiles flipped to `live` | 6 to 8 |
| **10. Quality, accessibility, SEO** | WCAG audit, performance budget, sitemap, link check, final copy edit | All gates in section 13 pass site-wide | 2 |

Phases 1 to 4 are the critical path: they prove the pattern on a small slice before hundreds of pages are written. If the
pilot reveals the templates are wrong, fixing them costs a few pages, not a few hundred.

---

## 12. Cricket-specific track

Requirement: **a separate cricket section inside each of Strength/Hypertrophy, Plyometrics and Isometrics.**

### 12.1 Structure

```
/strength/cricket/        /plyometrics/cricket/        /isometrics/cricket/
  overview/                 overview/                    overview/
  fast-bowlers/             fast-bowlers/                fast-bowlers/
  spin-bowlers/             spin-bowlers/                spin-bowlers/
  batters/                  batters/                     batters/
  wicketkeepers/            wicketkeepers/               wicketkeepers/
  fielders/                 fielders/                    fielders/
  injury-prevention/        injury-prevention/           injury-prevention/
  season-planning/          season-planning/             season-planning/
```

All three reuse one `CricketModule` content type. Role pages reference muscles, exercises and principles by ID; they do not
restate them. This keeps cricket advice consistent with the general content and cheap to maintain.

### 12.2 Information to gather (needs analysis)

| Topic | Questions |
|---|---|
| **Movement demands by role** | Fast bowling (run-up, delivery stride, trunk side-flexion and rotation, braking forces), spin bowling (rotation and finger/wrist demands, repeated effort), batting (rotational power, repeated sprints between wickets, stance posture over long periods), fielding (sprint, dive, long throws), wicketkeeping (repeated squat/recover, reactive agility) |
| **Format demands** | T20 vs ODI vs Test: intensity, duration, recovery, travel |
| **Injury epidemiology** | Common injuries by role (e.g. lumbar stress injuries and side strains in fast bowlers, shoulder, hamstring, groin, knee, hand/finger), incidence, risk factors. Source: national injury-surveillance reports and peer-reviewed studies |
| **Workload and load management** | Evidence on bowling workload and injury risk, the limits of acute:chronic workload ratios, practical monitoring (balls bowled, session RPE) |
| **Physical qualities that matter** | Strength, power, speed, rotational power, hip and thoracic mobility, shoulder resilience, trunk endurance, aerobic base. Evidence of association with performance and with injury reduction |
| **Youth considerations** | Adolescent fast bowlers (growth-related spine injury risk), long-term athletic development, supervision requirements |
| **Season periodisation** | Pre-season build, in-season maintenance (short sessions, fatigue management), off-season; how sessions sit around match days |
| **Practitioner input** | Interviews with S&C coaches and physios working with cricketers (anonymised notes, recorded as grade D) |

### 12.3 Output per cricket page

Role demands, injury profile, priority physical qualities (ranked, with evidence grade), recommended exercises (links to the
main exercise pages, with cricket-specific variants), programming guidance in season phases, red flags and when to stop,
and a back-safe path (important because lumbar load is the central cricket concern).

### 12.4 Cricket-specific gates

- Reviewer with cricket S&C or sports-physio experience signs off injury-prevention and workload pages.
- Bowling-workload content must state the evidence limits, not present a single ratio as a rule.
- Youth content carries an explicit "needs qualified supervision" note.
- Every prescription links to a general principle page; nothing is stated only in the cricket section.

---

## 13. Quality gates and definition of done

A page moves **Draft -> Verified -> Expert-reviewed**.

| Gate | Check | Who/what |
|---|---|---|
| Schema | Front matter valid; all references resolve | Automated |
| Sources | Every claim has sources; DOIs resolve; no retracted sources | Automated + researcher |
| Grading | Every emphasis/benefit claim has a grade; "Mixed" shows both sides | Researcher |
| Safety | Contraindications, regression, pain rule, red flags present; back-safe flag set deliberately | Physio / sports therapist |
| Medical | Anatomy and red-flag content reviewed | **Qualified physician or physiotherapist** |
| Programming | Volumes, frequencies, progression sensible and linked to principles | **Certified S&C coach (e.g. CSCS)** |
| Accessibility | Keyboard, contrast, text alternatives, reduced motion | Automated + manual |
| Copy | Plain language, consistent terminology, spelling variant consistent (the site uses British spelling) | Editor |

**Definition of done for a page:** passes all gates relevant to its type, shows its status and last-reviewed date, and appears
in search and in the relevant index.

---

## 14. Risks and open questions

### Risks

| Risk | Mitigation |
|---|---|
| Plausible but wrong health content | Source verification, evidence grades, named human reviewers, draft labelling |
| Hallucinated citations | No citation without a resolving DOI/URL; verifier blocks it |
| Over-claiming from EMG | Explicit grade C and caveat wherever EMG is the evidence |
| Scope explosion (~300 pages) | Chest pilot first; roll out group by group; defer plyometrics/isometrics until the pattern is proven |
| Image licensing | Draw our own SVGs; record licence/attribution for anything external |
| Rig limits for demos | Tiered demos; rig extension scheduled, not assumed |
| Site becomes stale | `lastReviewed` dates and a scheduled staleness check |

### Decisions I need from you

1. **Audience and purpose:** personal use, or a public site others will rely on? (This sets how strict the review gates must
   be, and whether a physician/physio reviewer is essential.)
2. **Reviewers:** can you name or arrange a physiotherapist/doctor and an S&C coach for the gates in section 13? If not, the
   site should stay clearly labelled as drafts.
3. **Stack:** approve moving the content sections to Astro (recommended), or stay hand-rolled for now?
4. **URL for isometrics:** keep `/core/` as is with a future `/isometrics/` hub that links to it (recommended), or move to
   `/isometrics/core/` with a redirect?
5. **Context to tailor to:** training age, equipment available (gym vs home; kettlebell, dumbbells, bands), time per session,
   and current back-recovery stage (so "back-safe" is set correctly).
6. **Cricket scope:** your role (batter, bowler type, all-rounder), level and format, and the age group, since youth and adult
   content differ.
7. **Visuals:** OK to draw our own SVG anatomy and demos (recommended), or do you want photos/videos of your own?
8. **Pilot choice:** start with chest as proposed?

### Decisions recorded (first build)

| Question | Decision |
|---|---|
| 3. Stack | Draft implemented in Astro 7; explicit approval of the build change was not recorded |
| 5. Personal context | 10+ years training. Gym access, days per week, session length and lower-back recovery remain unconfirmed assumptions |
| 6. Cricket | Stub pages for every role and topic; no prescriptions until researched |
| 8. Pilot | Chest and legs (including glutes and lower back) are the detailed groups |
| Level | No beginner-level programming. `foundation` exercises exist only for squat, glute and lower-back work |
| 1, 2, 4, 7 | Still open. Pages are labelled draft; own SVG muscle map used; `/core/` unchanged |

### Build status

| Phase | State |
|---|---|
| 1. Foundations | Done: Zod schemas, build-time validator, templates, nav and breadcrumbs, badges, hub. Search is not built (Pagefind later) |
| 2. Research tooling | Partly done: source register, claims register, Crossref verifier with retraction check, grade rubric. Dossier templates are the schemas |
| 3. Chest pilot | Built as a draft: 3 muscle pages, 12 chest exercises with variation tables, principles, muscle map v1 (schematic). Not reviewed |
| 4. Review | Not started: needs named reviewers |
| 5. Visual tooling | Not started (no 3D demos for strength yet) |
| 6. Roll-out | Muscle pages and exercises exist for every group; only chest and legs are at full detail |
| 7. Principles and programs | Built as drafts: 10 principles, six-day push/pull/legs, four-day upper/lower and five-day paired-muscle programs, each with a weekly plan |
| 8. Cricket (strength) | Stubs only |
| 9, 10 | Not started |

---

## 15. Appendix: seed sources (verify before citing)

These are **leads from memory, not verified citations.** Each must pass the verification step in section 5.3 (DOI resolves,
details match, not retracted) before it is used. Details such as year and volume are deliberately omitted where I am not
certain.

**Hypertrophy mechanisms and programming**
- Schoenfeld BJ. The mechanisms of muscle hypertrophy and their application to resistance training. *J Strength Cond Res.* 2010.
- Schoenfeld BJ, Ogborn D, Krieger JW. Dose-response relationship between weekly resistance training volume and increases in muscle mass: systematic review and meta-analysis. *J Sports Sci.* 2017.
- Schoenfeld BJ, Ogborn D, Krieger JW. Effects of resistance training frequency on measures of muscle hypertrophy: systematic review and meta-analysis. *Sports Med.* 2016.
- Schoenfeld BJ, Grgic J, Ogborn D, Krieger JW. Strength and hypertrophy adaptations between low- vs. high-load resistance training: systematic review and meta-analysis. *J Strength Cond Res.* 2017.
- ACSM position stand: Progression models in resistance training for healthy adults. *Med Sci Sports Exerc.* 2009 (check for a newer update).
- Morton RW et al. Protein supplementation and resistance-training gains: systematic review and meta-analysis. *Br J Sports Med.* 2018.

**Exercise variation and regional emphasis (examples to look up, not conclusions)**
- Maeo S et al. Overhead versus neutral arm position for elbow-extension training and triceps hypertrophy. *Eur J Sport Sci.*
- Wolf M et al. Partial vs full range of motion resistance training: systematic review and meta-analysis.
- Contreras B et al. Gluteus maximus, biceps femoris and vastus lateralis EMG in back squat vs barbell hip thrust. *J Appl Biomech.* 2015.
- Searches to run: "regional hypertrophy" pectoralis, "incline bench press" EMG, "muscle length" hypertrophy, "stretch-mediated hypertrophy".

**Spine, injury and rehabilitation**
- McGill S. *Low Back Disorders: Evidence-Based Prevention and Rehabilitation.* Human Kinetics.
- Gabbett TJ. The training-injury prevention paradox. *Br J Sports Med.* 2016.
- Impellizzeri FM et al. Acute:chronic workload ratio: conceptual issues and fundamental pitfalls. *Int J Sports Physiol Perform.* 2020.

**Cricket**
- Hulin BT et al. Spikes in acute workload and injury risk in elite cricket fast bowlers. *Br J Sports Med.* 2014.
- Orchard JW et al. Fast bowlers and the delayed relationship between high workloads and injury. *Am J Sports Med.* 2015.
- Dennis R et al. Bowling workload and the risk of injury in elite cricket fast bowlers. *J Sci Med Sport.* 2003.
- Foster D et al. Back injuries to fast bowlers in cricket: a prospective study. *Br J Sports Med.* 1989; Elliott B. Back injuries and the fast bowler in cricket. *J Sports Sci.* 2000.
- National injury surveillance reports (e.g. Cricket Australia, England and Wales Cricket Board): to locate and cite the current editions.

**Youth**
- Lloyd RS et al. Position statement on youth resistance training: the 2014 International Consensus. *Br J Sports Med.*
- Lloyd RS, Oliver JL. The Youth Physical Development model. *Strength Cond J.* 2012.

**Anatomy references**
- Standring S (ed.), *Gray's Anatomy*; Netter, *Atlas of Human Anatomy*; Kendall et al., *Muscles: Testing and Function with Posture and Pain*; Neumann, *Kinesiology of the Musculoskeletal System*; Kapandji, *The Physiology of the Joints*.

**Openly licensed imagery to evaluate (check licence per file)**
- Wikimedia Commons anatomy files; BodyParts3D; Servier Medical Art.
