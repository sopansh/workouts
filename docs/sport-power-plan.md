# Sport power, core and rotation, and sports-injury prevention education: implementation and evidence plan

Status: **draft plan for the owner to approve (directive D-004). The cricket part was built as a draft on 2026-11-15 (see the scope note below); everything about badminton, squash and football is not built.** Every source below that is not in the cricket build list in section 4.4a is still a *proposed* addition to the registry, and every group, exercise and route for the deferred sports is a *proposal*.
Written: 2026-11-15, by `plyometrics-coach`.
Related: [`CONTEXT.md`](../CONTEXT.md), [`getting-started-and-calisthenics-plan.md`](./getting-started-and-calisthenics-plan.md) (structure and evidence rubric followed here), [`hypertrophy-plan.md`](./hypertrophy-plan.md) (section 12 first sketched cricket tracks), [`agents/protocols.md`](./agents/protocols.md), [`agents/directives.md`](./agents/directives.md). The gym-side cricket pages are in [`src/content/cricket/`](../src/content/cricket/) and belong to `strength-coach`.

> **Scope note, 2026-11-15 (owner decision).** The owner approved this plan **scoped to cricket only** and decided to **skip badminton, squash and football for now**. Adults only (recreational and club players, 18 and over). This note supersedes the four-sport scope in the rest of this document.
>
> - **Built as a draft:** five pages under `/plyometrics/sports/cricket/` (hub, `power/`, `rotation-and-core/`, `injury-prevention/`, `evidence/`), four cricket ladders (landing, hops, slowing down and stopping, hip-led rotation and throws, ids `cricket-*`, phase `cricket`) and one plan, `cricket-two-session-week`. Data is in `groups/plyometrics.yml`, `plans/plyometrics.yml`, `exercises/plyometrics-cricket.yml`, `claims/plyometrics-cricket.yml`, with 17 sources and two new pain rules (`trunk-rotation`, `overhead-throwing`). The only link to the pages is a "Cricket" entry in the plyometrics navigation; the home tile is unchanged.
> - **Route:** `/plyometrics/sports/cricket/`, as proposed in section 6.1. Because only one sport is built, there is no `/plyometrics/sports/` hub, no shared `landing-and-decelerating/` page and no cross-sport `injury-prevention/` page. Those return if another sport is approved.
> - **Platform changes that exist:** the optional `phase` on groups, plans, claims and sources, `loadGuide(section, { phase })` and `alsoPainRules` (R10 and the shared-loader decision in section 6.3, option A).
> - **Deferred, research kept unchanged:** badminton (3.2, 4.5, 7.3), squash (3.3, 4.6, 7.4) and football (3.4, 4.3, 7.5), with phases 2, 4 and 5 in section 8. Nothing there was deleted, so the sources, tables and search log are ready if the owner reopens those sports. The cross-sport sources E1 to E10 are used by the cricket build only where section 4.4a says so.
> - **Not done and still open:** named reviewers (a physiotherapist, a strength and conditioning coach, a cricket-experienced reviewer), animations (D-001), and the strength-side links back to the cricket pages (a request to `strength-coach`).

This is education drafted by an AI coach. It has **not** been reviewed by a physiotherapist or a strength and conditioning coach. Nothing here is a diagnosis, a treatment, a rehabilitation plan or a return-to-play decision.

## 1. Scope and decisions

The owner's request: sport-based power, core and rotational training, and injury-prevention and strengthening content, for cricket, badminton, squash and football. Everything not stated by the owner is marked **proposed** and appears again in section 9 for the owner to confirm or change.

| Question | Decision | Source of decision |
|---|---|---|
| Sports | Cricket, badminton, squash, football (association football) | Owner |
| Content types | Sport power, core and rotation, and sports-injury prevention and strengthening education | Owner |
| Where it lives | A sports sub-area of the existing plyometrics section. Pages stay unlinked from nav and the tile copy stays as it is until the owner agrees (D-004) | Owner (section), directive D-004 |
| Cricket | Power, rotation and injury-prevention drills are ours; gym-side cricket pages stay with `strength-coach`. The two sets of pages link to each other and do not repeat each other | Protocols section 1 |
| Audience | **Proposed:** healthy adults (18 and over) who play recreationally or at club level. Not elite (point to a qualified coach). Not under-18s (see below) | Proposed |
| Evidence stance | Every sport statement is a hypothesis until a source is found, read and graded. Hypotheses are labelled on the page. Where no source exists the content is grade D, labelled "coaching convention", as the calisthenics skills are | Skills, and the calisthenics model |
| Injury content | Education only: what is commonly injured, what training is associated with lower risk (graded, population stated), warm-up and load management, red flags, when to see a clinician. No diagnosis, no individual rehabilitation, no return-to-play | Skills, `safety-review` |
| Stacking | **Proposed:** sport pages are an *alternative selection* for the same two weekly impact slots as the existing `two-session-week` plan, not extra sessions. Impact work never stacks on top of the plan already published | Proposed |
| Impact | Landing before jumping, floor before box, low contacts before high, a stated readiness gate before every step up. Foot contacts never fall from one block of weeks to the next (existing validator rule) | `plyometric-programming`, existing rule |
| Visuals | Text, cues and movement specs first. Frontal-plane and rotation visuals need the rig to be extended, so no approximations are shipped (D-001). See risks | Directive D-001 |
| Draft state | Every new page, exercise and claim is `draft` until a named physiotherapist and a strength and conditioning coach sign off | Protocols section 5 |

**Why not under-18s.** Several of the cricket sources studied adolescents (for example Foster 1989, Forrest 2020a and 2020b below), and youth fast bowlers are the group in which most cricket back-injury evidence sits. That evidence is used to *describe* the risk. The pages do not programme impact, rotational power or bowling load for under-18s. They point to qualified supervision and to the existing youth consensus statement (`lloyd-2014-youth`).

**Directives applied.** D-001 (visuals use the in-house rig, so movement specs only), D-002 (anything load-bearing at home, such as a wall for ball throws, a step or a box, carries an "only if" check and a no-equipment alternative, and boxes are stepped down from), D-004 (this document comes before any page). D-003 is addressed to strength and calisthenics, but the same rule is followed here: core exercises that already exist elsewhere on the site (dead bug, bird dog, side plank, Nordic hamstring curl) must not get a second, different set of cautions. See section 6.

## 2. Safety stance and referral rules

The pages reach strangers we cannot see. Impact, rotation under speed, and injury content carry the highest risk on the site, so the stance is the strictest.

### 2.1 Rules

1. **Education, not treatment.** Pages say what is commonly injured, what training is associated with lower risk, how to build load sensibly, and when to see someone. They never say what a reader has, and never plan rehabilitation or a return to play. A reader who describes an injury gets a clinician pointer and general education, nothing more.
2. **Every exercise** has contraindications ("do not do this if" naming real conditions), a regression, a progression and a pain rule that points at a shared rule in `pain-rules.yml`. The build already fails without these.
3. **Gates before impact and before rotation under speed.** Each ladder shows objective readiness checks. Gate numbers are coaching conventions (grade D) and say so. A person who cannot land softly and quietly does not move up.
4. **Equipment and surface are content.** Surface, footwear, a clear landing zone and room height are on every jump page. A wall used for ball throws, a step or a box has an "only if it is solid" check and a no-equipment alternative (D-002). A hard or slippery floor is a reason not to jump.
5. **Out of scope, said plainly, with a clinician pointer:** under-18s, pregnancy and the postnatal period, frailty or older-adult programmes, people with a heart, lung, joint or neurological condition, anyone with a current injury or recent surgery, and anyone not cleared to exercise. The PAR-Q+ link and the "speak to a GP first" note appear on the hub, as on the beginner pages.
6. **Language.** "Is associated with" and "was studied in", never "prevents", "fixes", "heals" or "cures". No outcome promises (no jump heights, speeds or "injury-proof"). State who was studied: a result in professional men does not apply to a recreational player, and a result in adolescents does not apply to an adult.
7. **Season rule (convention, source to research).** In-season, power work is short, early in the week, and never the day before a match. Sessions are never on consecutive days.
8. **No personal details.** A personal plan is written as a generic constraint (for example "a single box of fixed height"). Nothing about a real person's health or history appears anywhere in the repo.
9. **Reviewers.** Content stays `draft` until a physiotherapist (anatomy, contraindications, pain rules, red flags) and a strength and conditioning coach (programmes, gates) are named by the owner and sign off. A cricket-experienced reviewer is needed for the bowling pages.

### 2.2 Referral tiers (used on every sport page and the cross-sport page)

| Tier | Signs | What the page says |
|---|---|---|
| Urgent (emergency services or same day) | Any head injury symptom after a knock (confusion, vomiting, worsening headache, drowsiness); chest pain, fainting or unusual breathlessness during exercise; a blow to the eye with pain, blood or any change in vision; back pain with leg weakness, numbness in the saddle area, or new bladder or bowel changes; a visibly deformed limb or a suspected broken bone | Stop. Get help now. Do not train. Do not "see how it feels" |
| Prompt (see a clinician within days) | A sudden pop, snap or tearing sensation; being unable to bear weight or use the limb; swelling that does not settle; numbness or tingling; sudden loss of strength; a joint that gives way; pain at night | Stop the activity and see a clinician before returning to training |
| Routine | Pain that is not improving after 2 to 3 weeks; pain that returns every time a movement is repeated; pain that is worse the next morning on repeated sessions | Use the regression, rest the area, and see a physiotherapist if it persists |

These tiers extend the wording already in the shared pain rules (`jumping`, `ankle-foot`, and the strength rules) rather than replacing it. Return to play after any of these is clinician-led and the pages say so.

### 2.3 Sport-specific red flags (education, not diagnosis)

| Sport | Flag | Why it is included |
|---|---|---|
| All | Chest pain or fainting during effort | Always urgent. The squash review below also notes cardiovascular strain and hyperthermia (E34) |
| Cricket | Back pain that persists or keeps returning in a fast bowler, especially a young one: see a clinician early rather than train through it | Vertebral stress injuries occur in bowlers (E18, E19, `foster-1989-back`). Whether the pain "means" a stress injury is a clinical judgement the page does not make |
| Cricket | A blow to the head or face from the ball, or a collision with the boundary fence | Fence collisions are named in an injury survey (E18). Head-injury sources are **to research** |
| Badminton, squash | Any shuttle, ball or racket strike to the eye | Eye injuries are rare but serious and mostly happen without eyewear (E33, E38) |
| Badminton | Shoulder pain that disturbs sleep, builds gradually, or stops you training | Shoulder pain is common in players at all levels and affected sleep and training in the questionnaire studies (E28, E29). The pages do not guess a cause |
| Football | A knee that gives way or swells after a landing or a twist; a sudden sharp pull in the back of the thigh while sprinting | Knee ligament and hamstring injuries are common (E13, E12). The pages do not name a diagnosis |
| Squash | Heat illness symptoms (dizziness, confusion, cramps with nausea) on a hot court | The review notes hyperthermia risk (E34); the evidence is thin, so this stays a general heat-safety note |

## 3. Demand analysis (hypotheses until sourced)

Each cell is either **H** (hypothesis, no source yet, not to be written as fact) or a source tag such as **[E20]** pointing to the evidence table in section 4. A tag means the source supports that specific point only, in the population given there, not the whole row. These tables are the starting point for page content, and the content rules are: write only what is tagged, label the rest as hypothesis or leave it out.

### 3.1 Cricket

| Demand | Working hypothesis and what is sourced | Status |
|---|---|---|
| Movement patterns | Fast bowling: run-up sprint, delivery stride, braking on the front leg. Batting: short sprints, turns and calls between wickets. Fielding: sprint, dive, throw. Run-up speed correlated with ball release speed (r = 0.50) and front-knee angle at release moderately so (r = 0.40) in a review of correlational studies [E20]. A cricket-batting study used a 5-0-5 m turn and 5 m sprint inside a simulated innings as its test of intermittent running [E22], which is a test design, not a measurement of match demand | Partly sourced; batting and fielding movement demand is H |
| Power expression | Release speed correlated with physical characteristics overall (r = 0.65), with shoulder strength (r = 0.58) and arm length (r = 0.65) [E20]. In 17 sub-elite men, throw velocity was related to medicine-ball rotation-throw velocity (r = 0.73), medicine-ball chest-pass distance (r = 0.67) and lateral-to-medial jump distance (r = 0.71), but not to 1RM squat or bench press [E21]. Correlations, not training effects | Partly sourced (correlational) |
| Rotation and trunk | Shoulder counter-rotation and lateral trunk flexion in the delivery stride are linked to back injury (`cricket-back-injuries`, `elliott-2000-back`). An 8-week exercise programme changed both angles slightly in adolescent pace bowlers [E24]. Which side dominates, and where rotation starts for batting and throwing, is H | Partly sourced; adult club level is H |
| Load and volume | Peak 7-day match workload above 234 deliveries carried 11-fold higher odds of lumbar stress fracture than below 197 in professional county bowlers [E19]. More than 20 match overs in the week before a match carried a risk ratio of 1.91 for a bowling injury in first-class cricketers [E18]. Spikes and very low workloads are both associated with injury (`cricket-workload-spikes`, `cricket-workload-low-and-high`), but workload ratios are contested (`acwr-contested`). Surface, season calendar for club cricket: H | Sourced for professional men; club level is H |
| Common injury sites | First-class cricket: hamstring strains, side strains, groin injuries, wrist and hand injuries, lumbar soft-tissue injuries [E18]. Lumbar stress fracture in fast bowlers: 2.46 per 100 bowlers a year in English professionals [E19]; 11% of 82 young high-performance bowlers in a season (`cricket-back-injuries`). Fielding: collision with the boundary fence [E18]. Shoulder, knee: H | Sourced for elite or young bowlers; recreational rates are not known |
| Level | All cricket sources found are professional, first-class, sub-elite or adolescent. **No recreational or club adult evidence found.** Entry gate: recreational and club only, with the gym-side base on the strength pages | Gap |

### 3.2 Badminton (deferred, 2026-11-15: not part of the cricket-only scope)

| Demand | Working hypothesis and what is sourced | Status |
|---|---|---|
| Movement patterns | Repeated lunges and split-stance recovery, quick direction changes, jumps for smashes, overhead striking. A 2025 injury review describes badminton as a high-intensity intermittent sport with short repeated accelerations, decelerations and changes of direction [E26]. A scoping review of 20 laboratory studies covered lunge biomechanics: elite players showed more impact attenuation and higher medial plantar load than amateurs [E30]. Jump-smash demands: H | Partly sourced |
| Power expression | Lunge push-off and recovery, jump for the smash, fast overhead arm action: H. In adolescent players aged 10 to 19, core strength training was associated with better explosive power and court skills in a meta-analysis whose effect sizes look inconsistent in the abstract [E31] | H, one weak source |
| Rotation and trunk | Trunk and shoulder rotation for the overhead stroke, rapid wrist and forearm work: H. No source gathered on rotation in the stroke itself | H |
| Load and volume | Mean injury incidence about 1 to 4 injuries per 1,000 hours, higher in elite-only studies; 25 to 74% overuse injuries; mostly mild or moderate [E26]. Court surface and footwear: H | Sourced (heterogeneous) |
| Common injury sites | Lower body 41 to 92% of injuries (strains 11 to 64%, sprains 10 to 61%, tendinopathy 6 to 14%, stress fractures 5 to 11%) [E26]. Lower limb 52% of injuries in 28 studies of players aged 18 and over, ankle most common [E27]. Dominant-shoulder pain, previous or present, in 52% of 188 world-class players and 52% of 99 recreational players [E28, E29]. Eye injuries, mostly from the shuttlecock, in doubles, and without eye protection [E33]. Knee, Achilles: H | Sourced |
| Level | Injury risk rose with level of play and with a history of injury [E26], cautiously stated by the authors. Training studies are mostly adolescents or elite, **no recreational adult trial found** | Gap |

### 3.3 Squash (deferred, 2026-11-15: not part of the cricket-only scope)

| Demand | Working hypothesis and what is sourced | Status |
|---|---|---|
| Movement patterns | Deep repeated lunges, rapid change of direction in a small court, low stance, rotation to strike on both sides: H. In elite men's matches, short rallies were played more from the middle and front of the court, with less time to return shots, and the authors proposed "ghosting" patterns to train this [E36]. Change-of-direction speed separated higher- from lower-ranked elite players [E37] | Partly sourced (elite) |
| Power expression | Explosive lunge push-off and recovery: H. Repeated-sprint ability and change-of-direction speed correlated with a squash-specific fitness test in 31 elite players [E37] | Partly sourced |
| Rotation and trunk | Trunk rotation and a low stance for both forehand and backhand: H. No source gathered | H |
| Load and volume | Seven elite players: mean rally 18.6 s, about 70% effective playing time, 86% of peak oxygen uptake and 92% of peak heart rate on average [E35]. Matches are mostly high-intensity aerobic work with large anaerobic contribution (authors' conclusion, E35). Heat on court: H beyond E34 | Sourced (7 elite players) |
| Common injury sites | Lower-limb soft-tissue injuries were the most common in a 12-study review, with regional variation [E34]. The pooled rate (2.01 per 1,000 athlete-days) has 99.65% heterogeneity and is not a usable number [E34]. Eye injuries (the ball can deform into a lensless guard) [E38]. Knee, ankle, groin and hip, lower back: H | Sourced but weak |
| Level | Evidence is elite or unspecified. **No recreational or older-adult evidence found.** The review also notes cardiovascular strain, which is why the heat and chest-pain notes matter [E34] | Gap |

### 3.4 Football (deferred, 2026-11-15: not part of the cricket-only scope)

| Demand | Working hypothesis and what is sourced | Status |
|---|---|---|
| Movement patterns | Sprinting, deceleration, changes of direction, kicking, jumping and landing, contact. **No movement-demand source gathered yet** (to research, section 5). Injuries in professional men are frequently linked to traumatic incidents, which includes contact [E13] | H for demands; contact partly sourced |
| Power expression | Acceleration, sprint, jump, kick: H. Lower-body plyometric training in healthy adults (recreational or athletes) was associated with small-to-moderate gains in jumping, sprinting and strength [E7]; not football-specific | General evidence only |
| Rotation and trunk | Kicking, trunk-pelvis control, groin and hip adductor load: H. Groin-specific programmes are tested (E14, E15) but kicking mechanics are not sourced | H |
| Load and volume | In professional men, match injury incidence (36 per 1,000 hours) was almost ten times training incidence (3.7) [E13]. In women's football overall incidence was 3.4 per 1,000 hours across studies [E12]. Fixture congestion and surface: H | Sourced (professional men; mostly adolescent women's teams) |
| Common injury sites | Lower extremity highest (6.8 per 1,000 hours in professional men), muscle and tendon injuries most common, minor injuries most common [E13]. In women's football, ankle injuries most common [E12]. Hamstring, groin, ankle and knee ligament injuries: prevention evidence below | Sourced |
| Level | Prevention trials cover recreational and sub-elite players [E11], semi-professional men [E14], amateur players aged 14 to 46 [E16], and mostly adolescent female teams [E12]. **No source for adult recreational women or for players over about 40** | Gap |

## 4. Evidence gathered

### 4.1 How this was gathered and checked

- **Found** with the Europe PMC REST API (`curl`), searching titles and abstracts, preferring systematic reviews and then trials, sorted by citation count. Search strings are logged in the appendix. Only the first 5 to 12 results of each search were screened, so the searches are **not exhaustive**.
- **Abstract read** for every entry (`resultType=core`). Claims below paraphrase the abstract. **No full text was read.** Anything that depends on exercise content, doses or risk of bias beyond the abstract is marked "full text needed".
- **DOI, title and year confirmed on Crossref** (`https://api.crossref.org/works/<doi>`) on 2026-11-15, and each was checked for retraction or correction notices with the `updates` filter that `npm run verify:sources` uses. None were found. Titles on Crossref matched the Europe PMC titles in every case.
- **Years.** The registry year is the Crossref `issued` year, because that is what `verify:sources` compares. For eleven sources it differs from the journal's print year by one (López-Valenciano 2019/2020, Harøy 2018/2019, Hölmich 2009/2010, Doherty 2016/2017, Prieske 2015/2016, Hoskin 2022/2023, Mazarelo 2023/2024, Fahlström 2005/2006 and 2006/2007, Lindblom 2022/2023) and for Ramachandran by three (online 2021, print 2024, so the registry must hold 2021 or the verifier will fail it).
- **Not yet done:** none of these entries is in `sources.yml`, so `npm run verify:sources` has not been run on them. The Crossref check above was done by hand with the same rules. Entries must go through the real verifier when added.
- **Grades** follow the site rubric: A meta-analysis or systematic review of trials, B a well-conducted trial, C observational, biomechanics or a plausible mechanism (and any review whose outcome is a surrogate), D guideline, narrative review or coaching convention, Mixed where studies disagree or apply in part.

### 4.2 Cross-sport training and prevention evidence

| ID | Source (proposed registry id) | Population studied | Supports | Grade | Limit |
|---|---|---|---|---|---|
| E1 | Lauersen et al. 2018, Br J Sports Med, doi:10.1136/bjsports-2018-099078 (`lauersen-2018-strength`) | 7,738 participants aged 12 to 40 in 6 randomised trials (5 interventions), 5 from Europe | Strength-training programmes were associated with fewer sports injuries (relative risk 0.34, 95% CI 0.24 to 0.48) across acute and overuse outcomes; the authors report high strength of evidence | A | Only six trials and five distinct interventions, of different kinds. The authors' own wording ("superior", "dose-dependent") is stronger than we will use; the volume meta-regression is post hoc. Not specific to any of our four sports |
| E2 | Al Attar et al. 2022, J Physiother, doi:10.1016/j.jphys.2022.09.001 (`alattar-2022-acl-plyo`) | 14,394 sport participants of any age, sex or level in 9 cluster-randomised trials | Programmes that included plyometric exercises were associated with a 60% lower ACL injury rate than usual warm-ups (IRR 0.40, 95% CI 0.26 to 0.63); stronger in non-contact ACL injuries; subgroup estimates by sex are imprecise | A | The programmes were multi-component, so the effect cannot be put down to plyometrics alone. ACL injuries are rare, so event numbers are small. The abstract does not give the sports, ages or sexes of the pooled trials: full text needed |
| E3 | Bathe et al. 2023, BMJ Open Sport Exerc Med, doi:10.1136/bmjsem-2022-001508 (`bathe-2023-landing`) | 974 adult athletes in 31 studies, with amateur-sport practicality in mind | Technique training (instruction and feedback) and dynamic strengthening increased knee flexion angle on landing (g = 0.77, 95% CI 0.33 to 1.21); even one session of "land softly" instruction was studied | C | The outcome is a biomechanical risk factor, not injuries, and studies were mixed in design, so it is graded C. Supports teaching landing first; does not show injuries fall |
| E4 | Doherty et al. 2016, Br J Sports Med, doi:10.1136/bjsports-2016-096178 (`doherty-2016-ankle`) | People with an acute ankle sprain or chronic ankle instability, 46 systematic reviews | Strong evidence for bracing and moderate evidence for neuromuscular training in preventing recurrence of an ankle sprain; exercise therapy and bracing supported in preventing chronic instability | A | An overview of reviews of mean quality 6.5 out of 11. About **recurrence** after a sprain, not first sprains, so it is not advice for the uninjured reader and must never become rehabilitation advice. Clinician-led |
| E5 | Prieske et al. 2015, Sports Med, doi:10.1007/s40279-015-0426-4 (`prieske-2015-trunk`) | Healthy trained individuals aged 16 to 44 | Core strength training raised trunk strength a lot (SMD 1.07) but had only small-to-medium effects on fitness and athletic performance versus no or regular training; trunk strength itself correlated only weakly with performance | A | Low study quality (median PEDro 4). A caution: it supports **not overselling core training** as a power fix |
| E6 | Asadi et al. 2016, Int J Sports Physiol Perform, doi:10.1123/ijspp.2015-0694 (`asadi-2016-cod`) | 24 studies of plyometric training, mostly athletes (participants with good fitness gained more; basketball players most) | Plyometric training was associated with better change-of-direction performance; the authors suggest about 7 weeks, 2 sessions a week and about 100 jumps a session as a trend | A | The "100 jumps" figure is an average of the studies' designs in athletes, **not a safe dose**. Our contact budgets stay lower conventions. Sports and levels vary |
| E7 | Oxfeldt et al. 2019, Scand J Med Sci Sports, doi:10.1111/sms.13487 (`oxfeldt-2019-plyo-adults`) | Healthy adults aged 18 and over, recreational or athletes, 25 studies of at least 4 weeks | Lower-body plyometric training was associated with small-to-moderate improvements in jump height (SMD 0.45), sprint time (-0.59) and strength (0.33) | A | Heterogeneity in the sprint and strength results; says nothing about injury or sport-specific skills |
| E8 | Raeder et al. 2015, J Strength Cond Res, doi:10.1519/jsc.0000000000000847 (`raeder-2015-medball`) | 28 competitive female handball players, 6 weeks, randomised to medicine-ball training or control | A sport-specific medicine-ball programme raised throwing velocity (14% versus 3.7%) and dominant shoulder internal-rotation strength versus control | B | One small trial in an overhead throwing sport in women. Both groups also did a band shoulder programme. Short. The closest tested analogue we found for cricket throwing and badminton overhead work: **transfer is a hypothesis** |
| E9 | Wright et al. 2021, Phys Ther Sport, doi:10.1016/j.ptsp.2021.09.004 (`wright-2021-shoulder`) | Overhead athletes, 7 randomised or prospective studies | Two studies reported lower shoulder injury odds after strengthening and flexibility exercises, one after posterior-capsule stretching; the reviewers conclude no firm conclusion can be drawn | Mixed | Only three studies were favourable and only one at low risk of bias. Supports a **limited-evidence** statement, not a recommendation |
| E10 | van der Vlist et al. 2019, Br J Sports Med, doi:10.1136/bjsports-2018-099991 (`vandervlist-2019-achilles`) | 10 cohort studies, all at high risk of bias | Limited evidence for nine risk factors for Achilles tendinopathy, including lower plantar-flexor strength; 26 other putative factors (for example being overweight, activity level) were not associated | C | High risk of bias throughout; some factors concern unrelated conditions. Supports "calf strength is a modifiable factor with limited evidence", no more |

### 4.3 Football (deferred; none of these sources is in the registry)

| ID | Source (proposed registry id) | Population studied | Supports | Grade | Limit |
|---|---|---|---|---|---|
| E11 | Thorborg et al. 2017, Br J Sports Med, doi:10.1136/bjsports-2016-097066 (`thorborg-2017-fifa`) | 6 cluster-randomised trials in recreational and sub-elite football | FIFA 11+ (4 trials) was associated with 39% fewer injuries (IRR 0.61, 95% CI 0.48 to 0.77). FIFA 11 (2 trials) showed no documented effect. Pooled both: risk ratio 0.75 | A | Six trials. The abstract does not give ages, sexes or compliance: full text needed. Warm-up programme as a whole, not one exercise |
| E12 | Crossley et al. 2020, Br J Sports Med, doi:10.1136/bjsports-2019-101587 (`crossley-2020-women`) | 11,773 female football players in 12 trials, 9 of adolescent teams (under 18), all soccer | Multicomponent exercise programmes were associated with fewer injuries overall (IRR 0.73, 95% CI 0.59 to 0.91) and fewer ACL injuries (IRR 0.55, 95% CI 0.32 to 0.92); exercise-based strategies reduced hamstring injuries (IRR 0.40, 95% CI 0.17 to 0.95). Overall incidence 3.4 per 1,000 hours; ankle most common | A, with low-level evidence stated | All but one study had high risk of bias. Mostly adolescents. Wide intervals |
| E13 | López-Valenciano et al. 2019, Br J Sports Med, doi:10.1136/bjsports-2018-099577 (`lopezvalenciano-2019-epi`) | 44 studies of professional male football | Overall 8.1 injuries per 1,000 hours; match 36 versus training 3.7; lower extremity 6.8; muscle and tendon injuries most common, often after traumatic incidents; most injuries minor (1 to 3 days lost) | C | Observational; professional men only. Says nothing about recreational or women's football |
| E14 | Harøy et al. 2018, Br J Sports Med, doi:10.1136/bjsports-2017-098937 (`haroy-2018-adductor`) | 652 players in 35 semi-professional Norwegian male teams, one season | A one-exercise adductor strengthening programme (Copenhagen adduction, three progression levels, three times a week pre-season then weekly) was associated with 41% lower self-reported groin problems (OR 0.59, 95% CI 0.40 to 0.86) | B | One season, self-reported prevalence, semi-professional men. Exercise doses beyond the abstract: full text needed |
| E15 | Hölmich et al. 2009, Scand J Med Sci Sports, doi:10.1111/j.1600-0838.2009.00998.x (`holmich-2009-groin`) | 977 players in 44 football clubs, cluster-randomised | A six-exercise groin programme (strength, coordination, core) did **not** significantly reduce groin injury (HR 0.69, 95% CI 0.40 to 1.19). A previous groin injury almost doubled the risk and a higher playing level almost tripled it | B (null result) | The honest counterweight to E14: the interval does not rule out a benefit or no effect. Includes prior injury as a risk factor, which we will report as education only |
| E16 | Lindblom et al. 2022, Br J Sports Med, doi:10.1136/bjsports-2022-105890 (`lindblom-2022-kneecontrol`) | 502 amateur male and female players aged 14 to 46, 46 teams, one 7-month season | Extended Knee Control was associated with 29% lower hamstring, knee and ankle injury incidence than a self-selected prevention programme (IRR 0.71, 95% CI 0.52 to 0.98), and similar incidence to an adductor programme | B | The comparison group was not randomised. Registry title must drop the HTML italics that Crossref returns. Programme content beyond the abstract: full text needed |
| E17 | van Dyk et al. 2019, Br J Sports Med, doi:10.1136/bjsports-2018-100045 (`van-dyk-2019-nordic`, **already in the registry**, claim `nordic-hamstring-injury`) | 15 studies, athletes in several sports, mostly football, men and women | Programmes that included the Nordic hamstring exercise halved the hamstring injury rate (risk ratio 0.49) | A | Reuse the existing claim and caveats; do not re-grade. Soreness when starting means a gradual build-up |

### 4.4 Cricket

Already in the registry and **reused, not re-graded:** `hulin-2014-spikes`, `dennis-2003-workload`, `gabbett-2016-paradox`, `impellizzeri-2020-acwr`, `foster-1989-back`, `elliott-2000-back`, `lloyd-2014-youth`, with claims `cricket-workload-spikes`, `cricket-workload-low-and-high`, `acwr-contested`, `cricket-back-injuries`, `youth-training-consensus` and `nordic-hamstring-injury`.

| ID | Source (proposed registry id) | Population studied | Supports | Grade | Limit |
|---|---|---|---|---|---|
| E18 | Orchard et al. 2002, Br J Sports Med, doi:10.1136/bjsm.36.4.270 (`orchard-2002-injuries`) | Australian first-class (state and national) men, six seasons | Common injuries were hamstring strains, side strains, groin, wrist and hand, and lumbar soft-tissue injuries. Pace-bowler prevalence 14% against 4% for spin and batters and 2% for wicketkeepers. More than 20 match overs in the week before a match: risk ratio 1.91 for bowling injury. Colliding with the boundary fence is a fielding risk | C | Elite men, now two decades old. An injury had to cost a major match, so minor injuries are missed |
| E19 | Alway et al. 2019, BMJ Open Sport Exerc Med, doi:10.1136/bmjsem-2019-000529 (`alway-2019-lsf`) | 368 professional English county fast bowlers, 2010 to 2016, 57 lumbar stress fractures (mean age 22.8) | Annual incidence 2.46 per 100 bowlers; peak 7-day workload above 234 deliveries raised the odds of a lumbar stress fracture 11-fold against fewer than 197; most common in July and September | C | Observational, professional, match workload only. The thresholds are descriptions of this sample, **not safe limits to publish** |
| E20 | Ramachandran et al. 2021, Sports Biomech, doi:10.1080/14763141.2020.1858152 (`ramachandran-2021-bowling-speed`) | 18 studies (cricket bowlers of various levels, correlational data) | Ball release speed correlated with physical characteristics (r = 0.65, including shoulder strength 0.58 and arm length 0.65), run-up speed (0.50) and front-knee angle at release (0.40); not with vertical ground reaction force (0.13) | C | Correlations, not training effects. Level and age mix is not in the abstract: full text needed. Arm length cannot be trained |
| E21 | Freeston et al. 2016, J Strength Cond Res, doi:10.1519/jsc.0000000000001246 (`freeston-2016-throwing`) | 17 sub-elite male cricketers, mean age 21 | Throwing velocity from a stretch correlated with medicine-ball rotation-throw velocity (r = 0.73), chest-pass distance (0.67), lateral-to-medial jump (0.71) and shoulder internal-rotation strength (0.55) but not with 1RM squat or bench | C | Small cross-sectional study of men, correlation only. Suggests the **kind** of power that goes with throwing, not that training it adds speed |
| E22 | Houghton et al. 2013, J Strength Cond Res, doi:10.1519/jsc.0b013e3182651e7a (`houghton-2013-plyo-cricket`) | 15 cricketers (plyometric n = 7, control n = 8), 8 weeks | Plyometric training increased jump height (9 to 11%) and Achilles tendon cross-sectional area; shuttle times did not change significantly; tendon stiffness did not change | C | Tiny, abstract does not state randomisation, men. The authors state that injury-risk benefit is not shown |
| E23 | Forrest et al. 2020a, J Sci Med Sport, doi:10.1016/j.jsams.2019.12.009 (`forrest-2020-ipp`) | 65 male pace bowlers aged 14 to 17 in eight community clubs, 8 weeks, cluster-randomised | An exercise programme improved shoulder, hamstring and hip-adductor strength, balance reach and back endurance; no effect on lumbopelvic stability or single-leg-squat knee angle | B | Outcomes were **risk factors, not injuries**. Adolescents, so outside the audience of the pages; used as a model of programme content only. Injury effect untested (the authors say so) |
| E24 | Forrest et al. 2020b, J Sci Med Sport, doi:10.1016/j.jsams.2020.06.014 (`forrest-2020-kinematics`) | Same trial | The programme was associated with small reductions in shoulder counter-rotation (-3.8 degrees) and lateral trunk flexion relative to the pelvis (-2.2 degrees); no change in ball velocity or lower-limb angles | B | Same limits. Small angles; whether this lowers injury is not shown |
| E25 | Forrest et al. 2018, Sports Med, doi:10.1007/s40279-018-0981-6 (`forrest-2018-ipp-review`) | Narrative review, adolescent pace bowlers | A rationale and design principles for an exercise programme (eccentric posterior-shoulder, adductor and hamstring work, neuromuscular control, trunk-extensor endurance) and load management | D | Narrative review and an untested example programme. Used as a pointer for outline only, never as support for an effect |

### 4.5 Badminton (deferred; none of these sources is in the registry)

| ID | Source (proposed registry id) | Population studied | Supports | Grade | Limit |
|---|---|---|---|---|---|
| E26 | Stepper et al. 2025, BMJ Open Sport Exerc Med, doi:10.1136/bmjsem-2024-002127 (`stepper-2025-badminton-injuries`) | 19 epidemiological studies, ages 10 to 50, all levels, 60% male | Incidence about 1 to 4 per 1,000 hours; lower body 41 to 92% of injuries (strains, sprains, tendinopathy, stress fractures); overuse 25 to 74%; mostly mild or moderate; risk rose with level and prior injury, stated cautiously | C | Heterogeneous data and study quality, and the authors say the risk factors are tentative |
| E27 | Marchena-Rodriguez et al. 2024, Res Sports Med, doi:10.1080/15438627.2024.2351964 (`marchena-2024-badminton-injuries`) | 2,435 injured players aged 18 and over in 28 studies (64% male) | Sprains most common (36%), then muscle injuries (24%); lower limb 52% with ankle the most common site | C | Describes injured players, not incidence; generally low study quality |
| E28 | Fahlström et al. 2005, Scand J Med Sci Sports, doi:10.1111/j.1600-0838.2004.00427.x (`fahlstrom-2005-shoulder-elite`) | 188 international top-level players, questionnaire | Previous or present dominant-shoulder pain in 52%, ongoing in 20%; usually gradual onset, linked with stiffness, sleep disturbance and changed training | C | Cross-sectional self-report, elite. Does not establish a cause |
| E29 | Fahlström & Söderman 2006, Scand J Med Sci Sports, doi:10.1111/j.1600-0838.2006.00562.x (`fahlstrom-2006-shoulder-rec`) | 99 recreational players (57 also assessed) | Previous or present dominant-shoulder pain in 52%, ongoing in 16%, with lower function scores and reduced pain-free abduction; most kept playing with symptoms | C | Small, cross-sectional, one country. Diagnoses mostly unknown: the pages will not name one |
| E30 | Lam et al. 2020, PeerJ, doi:10.7717/peerj.10300 (`lam-2020-lunge`) | 20 laboratory biomechanics studies of the badminton lunge | Elite players showed more impact attenuation, more aggressive knee and ankle strategy and higher medial plantar load than amateurs; footwear changes mechanics, links to performance unclear | C | Scoping review, mostly laboratory lunges and no injury outcomes. Supports teaching lunge landing and deceleration, not a specific injury claim |
| E31 | Ma et al. 2024, PLoS One, doi:10.1371/journal.pone.0305116 (`ma-2024-core-badminton`) | 208 players aged 10 to 19 in 13 studies of moderate quality | Core strength training was associated with better explosive power and court skills; effects on speed, agility and endurance unclear; research on female players "significantly lacking" | C pending | Adolescents only. **The abstract's effect size for explosive power (0.03, "significant") looks inconsistent, so no numbers will be quoted until the full text is read.** Grade is provisional |
| E32 | Ma et al. 2025, BMC Sports Sci Med Rehabil, doi:10.1186/s13102-025-01199-y (`ma-2025-training-badminton`) | 370 healthy badminton players in 15 studies of 4 to 10 weeks (ages not in abstract) | Various training types were associated with better agility, balance and VO2max; core training and lower-limb resistance training with better power | C pending | Very large effect sizes in the abstract for balance and core training (5.6 to 6.8) are implausible and need the full text. Do not quote numbers |
| E33 | Hoskin et al. 2022, Inj Prev, doi:10.1136/ip-2022-044564 (`hoskin-2022-badminton-eye`) | 378 eyes in 19 studies from 12 countries | Shuttlecock caused 85% of eye injuries; most were closed-globe injuries with vision impairment; doubles play and lack of eye protection were associated | C | Case reports and series, not rates. Does not show which eyewear works (see E38) |

### 4.6 Squash and racket-sport safety (deferred; none of these sources is in the registry)

| ID | Source (proposed registry id) | Population studied | Supports | Grade | Limit |
|---|---|---|---|---|---|
| E34 | McCartney et al. 2026, Sports (Basel), doi:10.3390/sports14020079 (`mccartney-2026-squash`) | 12 studies of squash players | Lower-limb soft-tissue injuries most common; cardiovascular strain and hyperthermia risks are noted; protective equipment uptake was generally poor; consensus on injury surveillance is lacking | C | Pooled rate has 99.65% heterogeneity and is **not used**. Study populations are not in the abstract: full text needed |
| E35 | Girard et al. 2007, J Strength Cond Res, doi:10.1519/r-20306.1 (`girard-2007-squash-demands`) | 7 elite players (national ranking 1 to 25, including the world number 1), simulated matches | Mean rally 18.6 s, 69.7% effective playing time, oxygen uptake 86% of peak and heart rate 92% of peak on average; high-intensity aerobic with major anaerobic contribution | C | Seven elite players in a controlled setting. Not applicable to recreational play |
| E36 | Murray et al. 2016, J Sports Sci, doi:10.1080/02640414.2016.1216155 (`murray-2016-squash-rallies`) | 41 elite men's matches (British Grand Prix 2010 and 2011) | After rule changes, less time to return shots; short rallies played more from the middle and front of the court; "ghosting" patterns proposed to mimic demands | C | Elite men, match notation, no injury or training outcome |
| E37 | James et al. 2022, J Sports Sci Med, doi:10.52082/jssm.2022.82 (`james-2022-squash-physical`) | 31 elite players (21 men, 10 women) | Higher-ranked players scored better on a squash-specific test and change-of-direction speed; repeated-sprint ability and change-of-direction speed correlated with the test | C | Cross-sectional, elite, correlation only |
| E38 | Mazarelo et al. 2023, Phys Sportsmed, doi:10.1080/00913847.2023.2196934 (`mazarelo-2023-eyewear`) | 29 studies in squash, racketball, tennis and badminton (hospital-treated eye injuries) | A median 93% of eye injuries occurred without eyewear; only eyewear meeting updated ASTM (or similar) standards was associated with no eye injuries; lensless guards were ineffective in squash and racketball; some lenses made injuries worse | C | Covers only injuries that reached hospital. The exact standard must be read from the full text before any page names it (to research) |

### 4.4a Cricket build: what was added to the registry (2026-11-15)

For the cricket-only build, each abstract was read again before a claim was written, and each DOI went through `npm run verify:sources -- --write` (17 stamped). "Registry id" is the id in `sources.yml`; every source is `section: plyometrics`, `phase: cricket`. Claims are in `claims/plyometrics-cricket.yml` with ids starting `plyo-cricket-`. Years are the Crossref issued year (Prieske 2015, print 2016).

| Plan id | Registry id | Claim id | Grade used | Note |
|---|---|---|---|---|
| E18 | `orchard-2002-injuries` | `plyo-cricket-injury-sites`, `plyo-cricket-bowling-overs`, `plyo-cricket-boundary-fence` | C | Abstract does not state sex. Three claims from one source. |
| E19 | `alway-2019-lumbar-stress` | `plyo-cricket-lumbar-stress-professional` | C | Thresholds described as sample findings, not limits |
| E21 | `freeston-2016-throwing` | `plyo-cricket-throw-correlates` | C | Cross-sectional, 17 men |
| E23 | `forrest-2020-ipp-risk-factors` | `plyo-cricket-ipp-risk-factors` | B | Adolescents; outcomes are risk factors |
| E24 | `forrest-2020-ipp-kinematics` | `plyo-cricket-ipp-kinematics` | B | The control group's counter-rotation also rose by 2.2 degrees, which the plan's earlier wording ("reductions") missed |
| E25 | `forrest-2018-ipp-review` | `plyo-cricket-ipp-review` | D | Narrative review, untested example programme |
| E1 | `lauersen-2018-strength` | `plyo-cricket-strength-training-injuries` | A | Ages 12 to 40, adolescents included |
| E2 | `alattar-2022-acl-plyometric` | `plyo-cricket-acl-programmes` | A | The abstract does not name the sports |
| E3 | `bathe-2023-landing` | `plyo-cricket-landing-instruction` | C | Surrogate outcome |
| E5 | `prieske-2015-trunk` | `plyo-cricket-core-limits` | A | Median PEDro 4 |
| E7 | `oxfeldt-2019-plyometric-adults` | `plyo-cricket-plyometric-adults` | A | Jump, sprint and strength tests only |
| E8 | `raeder-2015-medicine-ball` | `plyo-cricket-medicine-ball-trial` | B | Women handball players; transfer to cricket untested |
| E9 | `wright-2021-shoulder` | `plyo-cricket-shoulder-programmes` | Mixed | The review itself draws no conclusion |
| new | `krishna-2019-plyometric-bowlers` | `plyo-cricket-plyometric-bowlers` | C | 42 professional fast bowlers; the abstract's "reduces injury risk" is not used, injuries were not measured |
| new | `nealon-2018-side-strain` | `plyo-cricket-side-strain` | C | 207 professional male fast bowlers; no link with side-bridge endurance |
| new | `mcleod-2020-medical-attention` | `plyo-cricket-community-injuries` | C | Hospital and claims data, all ages |
| new | `mcleod-2020-prospective` | `plyo-cricket-community-evidence` | C | Most community studies are juniors and adolescent bowlers |

**Read and not published (D-005).** E20 Ramachandran 2021 and E22 Houghton 2013 are not in the registry. Their abstracts do not give the population (level, age and sex for the 18 correlation studies; sex, age, level and allocation for the 15 cricketers), so a claim could not say whom the results apply to. Both need the full text; both are listed on the cricket evidence page. The plan's earlier table gave "men" and "randomised" for Houghton and a population for Ramachandran that the abstracts do not support.

**Not used:** E4 (ankle recurrence, not for uninjured readers), E6 (change of direction, not needed), E10 (Achilles risk factors), E17 (already in the registry as `van-dyk-2019-nordic`, cited by its existing claim `nordic-hamstring-injury`), and all of E11 to E16 and E26 to E38 (deferred sports). Reused claims on the cricket pages: `cricket-back-injuries`, `cricket-workload-spikes`, `cricket-workload-low-and-high`, `acwr-contested`, `youth-training-consensus`, `nordic-hamstring-injury`.

**Search log additions (2026-11-15, Europe PMC, sorted by citations, first 10 to 12 screened):** `TITLE:"cricket" AND (TITLE:"club" OR "amateur" OR "recreational" OR "community")` (28 hits, took McLeod 2020 twice); `TITLE:"cricket" AND (shoulder OR throwing OR fielding) AND (injury OR injuries OR prevention)` (5 hits, none taken: one case-report title and reviews seen by title only); `TITLE:"cricket" AND (hamstring OR knee OR "side strain")` (11 hits, took Nealon 2018; Krishna 2019 found through this and a related search); `TITLE:"cricket" AND TITLE:"prevention" AND (randomised OR randomized OR trial)` (3 hits, the two Forrest trials and a protocol).

### 4.7 Reused from the existing registry (not re-graded here)

`ma-2025-plyometrics` (grade A, athletes, countermovement jump), `fu-2026-achilles` (grade B, tendon size and stiffness, sparse networks), and the cricket sources in section 4.4.

### 4.8 Seen and not used

- **Zhao et al. 2021** (doi:10.1155/2021/5555853), integrative neuromuscular training in 38 professional female badminton players. No control group, injuries were not measured, and the authors' conclusion that it "prevents sports injury" is not supported by the design. **Not cited as prevention evidence.**
- **A cricket injury-prevention trial protocol** (Injury Prevention 2019) was seen by title. A protocol is not a result and the results paper, if it exists, has not been searched for. To research.
- **UEFA Elite Club Injury Study papers** (hamstring trend 2023, groin and return to play) and a 2017 meta-analysis of FIFA 11+ trials were seen in search results and **not read**. They may strengthen the football section and are listed in section 5.

### 4.9 Honest gaps by sport

| Sport | What we can say | What we cannot say, and why |
|---|---|---|
| **Cricket** | Injury sites and workload associations in professional and young bowlers; kinds of power that correlate with throwing and bowling speed; a small trial that adolescent pace bowlers can change risk-factor measures | That any power, rotational or plyometric programme reduces cricket injuries or improves bowling in **adults or club players**: no trial found. Nothing found on batting rotation, running between wickets, spin bowling, wicketkeeping or women's cricket. No source for a safe throwing or bowling build-up at club level. The workload thresholds are descriptions, not limits |
| **Badminton** | Lower-limb and shoulder problems are common; eye injuries happen without eyewear; lunge mechanics differ between levels | That any training programme lowers badminton injuries: no controlled study with injury outcomes found (the only one found was rejected). The training reviews are mostly adolescent samples (E31) or do not state age or level in the abstract (E32), with implausible effect sizes in both abstracts. Nothing sourced on the rotation of the smash or on jump demands |
| **Squash** | General injury sites (lower-limb soft tissue), eye risk, the physiological demand in elite play | Any pooled injury rate (too heterogeneous). Anything about strength, power or rotation training in squash: **no study found**. Nothing on lunge loading, groin, knee or hip in squash. Nothing on recreational or older players, though the review flags cardiovascular strain |
| **Football** | Programmes of several exercises, the Nordic hamstring exercise and (in men) the Copenhagen adductor exercise are associated with fewer injuries in the populations stated; plyometric components are in programmes associated with fewer ACL injuries | Which component does the work; anything for adult recreational women or older recreational players; movement demands, kicking mechanics, deceleration training with injury outcomes; concussion and heading (not searched yet). Groin prevention evidence is mixed (E14 and E15). Exercise doses need the full texts |
| **All** | Landing technique instruction changes landing mechanics (surrogate) | Contact budgets, progression rates, surface and footwear effects for adult recreational plyometrics. Injury outcomes for any landing programme in our audience |

## 5. Information still to gather

Search strings are logged in the appendix. For each new source: find it, read the abstract, confirm the DOI and title on Crossref and check for retraction, then write the claim, then grade it. **Never cite from memory.** Sources not yet found stay "to research" on the pages.

| Topic | Question | Where to look | Needed for |
|---|---|---|---|
| Football movement demands | Sprint, deceleration, change-of-direction and kicking demands at recreational and amateur level | Europe PMC: `soccer AND "match demands"`, `"high-speed running" soccer` | Football demand table |
| Football prevention programmes in detail | Exercises, doses and compliance in FIFA 11+, Knee Control and Copenhagen studies; the 2017 meta-analysis and UEFA papers seen but not read | Full texts of E11, E14, E16; Europe PMC `UEFA Elite Club Injury Study` | Football exercise doses and gates |
| Concussion and heading | Consensus statement on concussion in sport; heading guidance | Europe PMC: `concussion consensus statement sport` | Red flags, football and cricket helmet notes |
| Cricket adults and club level | Any training, injury or workload study in non-elite adult cricketers | Europe PMC: `"club cricket" OR "recreational cricket" injury` | Cricket gap |
| Cricket injury-prevention trial results | Whether the Cricket Injury Prevention Programme trial reported results | Europe PMC: `cricket injury prevention programme cluster randomised` | Cricket prevention claims |
| Batting, running between wickets, fielding throw | Movement demands, throwing load and shoulder injury | Europe PMC: `cricket fielding throwing shoulder`, `"between the wickets"` | Cricket batter and fielder content |
| Spin bowling, wicketkeeping | Injury sites and demands | Europe PMC: `spin bowling injuries`, `wicketkeeper` | Cricket gaps |
| Side strain and trunk rotation | Mechanism and prevention of side strain in cricketers | Europe PMC: `"side strain" cricket` | Rotation page, cricket |
| Lumbar tolerance of rotation | How much rotation and which loading the lumbar spine tolerates, and how that fits the back-safe core guide | Review literature and textbook sources; name them before use | Rotation ladder gates |
| Rotational power transfer | Whether medicine-ball or rotational training transfers to racket, bat or throw performance in adults | Europe PMC: `"medicine ball" throwing velocity randomised` | Rotation ladder, hypotheses to claims |
| Badminton jump and smash demands | Movement and loading in the jump smash and rear-court play | Europe PMC: `badminton smash jump landing` | Badminton demand table |
| Badminton ankle and Achilles | A 2020 biomechanics study on fatigue and ankle sprain risk was seen by title only | Europe PMC: `badminton ankle sprain fatigue` | Ankle education |
| Squash movement and injury | Lunge, knee, groin and hip loading; strength or power training in squash | Europe PMC: `squash AND (lunge OR knee OR groin)` | Squash demand and prevention |
| Squash cardiovascular and heat risk | Sudden cardiac events and heat illness in squash; a 1984 Lancet letter was seen by title only | Europe PMC: `squash cardiac`, `heat illness racket sports` | Red flags and screening note |
| Eye protection standard | Which standard and design are recommended, from the primary sources behind E38 | Full text of E38 and the cited standards | Eyewear section (no standard named until read) |
| Landing training with injury outcomes | Does landing instruction change injury rates in adults, and how often must it be repeated | Europe PMC: `landing error scoring system injury`, `jump-landing training injury` | Landing ladder |
| Plyometric dose and injuries in recreational adults | Contact budgets and rates of progression; surface and footwear effects | Europe PMC: `plyometric injury adverse events`, `surface plyometric` | Contact conventions and gates |
| In-season power scheduling | Fatigue and soreness around match days; maintaining power in-season | Europe PMC: `in-season strength power maintenance team sport`, `match-day minus 1` | Season rule (currently convention) |
| Female and masters players | Sex-specific and older-recreational evidence for each sport | Europe PMC per sport | Population statements |
| Warm-up programmes | Effect of structured warm-ups on injury in racket sports and cricket | Europe PMC: `warm-up injury prevention badminton OR squash OR cricket` | Warm-up pages |
| Reviewers | Safety, contraindications, gates, red flags | A named physiotherapist, a strength and conditioning coach, and a cricket-experienced reviewer, chosen by the owner | Moving past "draft" |
| Visual specs | Frontal-plane landing, rotation throws, lunges, Copenhagen adduction | Movement specs per `exercise-animation`; rig extension (platform) | Any animation (D-001) |

## 6. Architecture (proposed)

### 6.1 URL map

All routes are trailing-slash and under the existing plyometrics section. Nothing is linked from the nav, the footer or the home tile until the owner agrees.

```
/plyometrics/sports/                        hub: who it is for and not, screening, how to choose a sport page, stacking rule, referral tiers
  cricket/                                  demands (hypotheses flagged), the four pieces, week layout, gates, red flags, evidence, gaps
  badminton/                                same shape
  squash/                                   same shape
  football/                                 same shape
  rotation-and-core/                        shared ladders: anti-rotation and anti-lateral work first, rotational power gated
  landing-and-decelerating/                 shared ladder: landing, stopping, split-stance recovery (used by all four sports)
  injury-prevention/                        cross-sport education: load management, warm-up, graded evidence by site, red flags
  evidence/                                 claims, grades, sources and gaps for the whole sports area
```

The four sport pages each carry an `#injury-prevention` section that follows the shape in section 7 and links to the shared `injury-prevention/` page. Per-sport injury pages are not proposed: the evidence is too thin to justify eight pages.

**Route choice.** `hypertrophy-plan.md` section 12 sketched `/plyometrics/cricket/`. This plan proposes `/plyometrics/sports/cricket/` instead so all four sports sit together and share ladders. **This supersedes that sketch for the plyometrics section only and needs the owner's confirmation** (section 9). The other two sketched cricket sections (strength, isometrics) are not affected.

### 6.2 How it links to the cricket pages

The gym-side pages stay in `src/content/cricket/` (routes `/strength/cricket/<id>/`, ids from the Markdown file names: overview, fast-bowlers, spin-bowlers, batters, wicketkeepers, fielders, injury-prevention, season-planning). The rules:

- `/plyometrics/sports/cricket/` links to each of the eight strength pages by role and says what is where: **strength pages** = gym strength, workload and season planning; **this page** = power, rotation and landing drills and the injury-prevention education for power work.
- The strength pages link back to `/plyometrics/sports/cricket/`. This is `strength-coach`'s file, so it is a request in the report, not an edit.
- **Claims are not duplicated.** The cricket page cites the existing claim ids (`cricket-back-injuries`, `cricket-workload-spikes`, `cricket-workload-low-and-high`, `acwr-contested`, `youth-training-consensus`, `nordic-hamstring-injury`) instead of restating them. Claim ids are global, so a page can cite a claim from another file.
- New cricket claims from E18 to E25 go into `claims/plyometrics.yml` (ours) with `section: plyometrics`, so ownership stays clean. `strength-coach` may cite them by id from the cricket pages.
- Season and workload guidance (how to build bowling load) stays on the strength side (`season-planning`, `fast-bowlers`). Our page states only the association evidence and the rule that power work is short, early in the week and never the day before a match.

### 6.3 Content model

Reuse the shared collections; add one collection.

| Collection | Use |
|---|---|
| `guideGroups`, `guideExercises`, `guidePlans` (reused) | Ladders and exercises (section `plyometrics`), with `phase`, `gates`, `requires` and `convention`. Sport plans have their own `phase` so the validator's "every ladder is used in a session" rule works per sport |
| `sources`, `claims` (reused) | All sources and claims, `section: plyometrics`. Claims state `population` (see rules R6) |
| `painRules` (reused, extended) | Existing: `jumping`, `ankle-foot` (ours), `lower-back`, `shoulder`, `knee`, `hip`, `hamstring` (strength's). Proposed new rules in 6.5 |
| **New: `sportProfiles`** (`src/content/sports/*.md`, platform schema change) | One entry per sport: demands as structured rows with `status: hypothesis or sourced` and claim ids, the groups it uses, week layout, gates, `redFlags`, `scope` exclusions, `populationNote` and `status: draft` |

**Why a new collection and not more `guideGroups`.** A sport profile is not an exercise group. It says which groups to show, which demands are hypotheses, and which red flags apply. Putting that in page `.astro` files would put copy and numbers in markup, against the project rule. A Markdown collection mirrors the existing `cricket` collection.

**Existing pages and the shared loader (important).** `loadGuide('plyometrics')` loads **every** group, exercise and plan for the section, takes `plans[0]` as *the* plan, and the exercises, weekly-plan and progression pages show all of it. Adding sport groups to section `plyometrics` would put them on those pages and could change which plan is "the" plan. Options:

| Option | Effect | Recommendation |
|---|---|---|
| **A. Phase filter in `loadGuide`:** an optional `phase` argument; the existing pages ask for the unphased base, sport pages ask for `sport-*` | Small platform change (`src/lib/guide.ts`), existing data and pages unchanged | **Recommended** |
| B. A new section id (for example `plyometrics-sports`) | `sections.yml` drives home tiles and nav, so a new tile or a hidden-section feature would be needed | Not recommended |
| C. A separate sport collection for exercises | Duplicates the guide components and validator | Not recommended |

This is a platform file, so it is a request to the executive (section 9 and the report).

### 6.4 Proposed groups (all `plyo-` prefixed, so ownership is unchanged)

Group ids use the `plyo-` prefix that `protocols.md` already assigns to this coach; the sport appears in `phase`. All sport-phase groups need `convention: true` unless a graded claim backs them, and at least two gates (generalising the existing first-skills rule). Level 1 of every ladder needs no optional kit. Exercise counts are rough.

| Proposed group | Type, rough levels | Used by | Gates (conventions to be reviewed) | Evidence status | Shared pain rules |
|---|---|---|---|---|---|
| `plyo-landing` | Ladder, 5: step-down and stick; squat-hold landing; small jump and stick; jump and stick in other directions; single-leg stick (gated) | All sports | Strength base: 8 clean squats, 10 slow single-leg calf raises each side, 30 s single-leg stance each side | Technique training changes landing mechanics (E3, surrogate); landing before jumping is the standing site rule (D) | `jumping`, `ankle-foot`, `knee` |
| `plyo-decel-lunge` | Ladder, 5: split-stance hold; step-and-stick lunge forward; lateral lunge; run-and-stop; change-of-direction lunge and recover | Badminton, squash, football | `plyo-landing` level 3; no knee or hip pinch in lunge | Lunge biomechanics described (E30); training effect on injuries: none found. **Convention (D)** | `knee`, `hip`, `ankle-foot` |
| `plyo-lateral` | Ladder, 4: lateral step and stick; skater step; small lateral hop (existing `lateral-hop` is level 3); multi-directional hop | All | `plyo-landing` level 3 | Plyometric change-of-direction training is associated with better COD in athletes (E6). **Convention for dose (D)** | `jumping`, `ankle-foot` |
| `plyo-trunk-anti` | Ladder, 5: anti-extension and anti-lateral flexion from the floor (links to the existing dead bug, bird dog and side plank cards, not new copies); anti-rotation hold; anti-rotation press (band, optional); loaded carry | All | Pain-free floor core work (`lower-back` rule) | Core training raises trunk strength but only modestly changes performance (E5), so the page says so. **Convention (D)** | `lower-back` |
| `plyo-rotation-power` | Ladder, 5, **gated, convention**: unloaded hip-led rotation; rotation with light resistance; light ball side-throw to a solid wall (optional kit); step-and-throw; scoop or overhead toss | Cricket, badminton, squash, football | `plyo-trunk-anti` level 3; back-safe core guide completed; no back, rib or side pain with rotation; a solid wall ("only if" check) | Closest tested analogue is a handball medicine-ball trial (E8) and cricket throwing correlations (E21). **Hypothesis for each sport; convention (D)** | `lower-back`, `shoulder` |
| `plyo-hamstring-posterior` | Ladder, 4: hip hinge hold; bridge walk-outs; eccentric hamstring lowering; Nordic hamstring curl (link to the canonical card if one exists) | Football, cricket, squash | Pain-free sprint-style hip hinge; gradual start because of soreness | Nordic: grade A (E17, existing claim). Whole-programme evidence in football (E11, E12). | `hamstring` |
| `plyo-adductor` | Ladder, 3 levels like the studied programme (short-lever hold, long-lever hold, dynamic) | Football (first), badminton, squash | Pain-free groin on the floor | Single-exercise programme associated with fewer groin problems in semi-professional men (E14); a six-exercise programme did not significantly reduce injury (E15). **Mixed** | `hip` (does not cover adductor-loading groin pain) |
| `plyo-ankle-calf` | Reuse existing `plyo-calf` and `plyo-balance`, add a perturbation ladder (single-leg stance, eyes closed, reach, hop and stick) | All | Existing calf and balance gates | Balance training is moderate evidence for recurrence (E4, injured population); calf strength limited evidence (E10). Education-only for uninjured readers | `ankle-foot` |
| `plyo-shoulder-overhead` | Ladder, 4: scapular control; band external rotation; side-lying or prone posterior-shoulder work; overhead medicine-ball catch-and-throw (gated) | Badminton, cricket fielding | Pain-free overhead reach; `shoulder` rule | **Limited:** shoulder programmes had no firm effect in overhead athletes (E9). Convention (D), and the page says so | `shoulder` |
| Sport drills (footwork, ghosting, shuttle patterns) | Non-ladder groups, `convention: true` | Squash (ghosting, E36), badminton | `plyo-decel-lunge` level 3 | Ghosting proposed from elite match analysis (E36), no training outcome | `knee`, `ankle-foot` |

If a canonical exercise card (dead bug, bird dog, side plank, Nordic curl) already exists elsewhere, the sport ladder must **reference** it rather than rewrite it. The guide schema has no cross-link field today, so a `sameAs` field is proposed in 6.5. Each group is shown on the sport pages that use it; a group is never duplicated per sport.

### 6.5 Validator rules and platform changes to add (all executive-owned files)

| # | Rule or change | Why | Where |
|---|---|---|---|
| R1 | A `sportProfiles` entry needs `populationNote`, at least 5 `redFlags`, `scope` exclusions, and every demand row must be `hypothesis` or `sourced`; a `sourced` row must cite at least one existing claim id | Stops a hypothesis being written as fact | `scripts/check-content.mjs`, `content.config.ts` |
| R2 | Generalise the first-skills rule: a group in a `sport-*` phase must be `convention: true` or cite a claim, and needs at least 2 gates | Impact and rotation are gated and honest about evidence | `check-content.mjs`, optional `claims` field on `guideGroups` |
| R3 | In a sport plan: at most 2 impact sessions a week, never on consecutive days (existing), and never on a day listed as `matchDay` in a plan with `season: in-season`. Foot contacts per session never fall across blocks (existing rule, extended to totals per session, not only per exercise) | The season rule and the contact-budget rule | `check-content.mjs`, optional `season` and `matchDay` plan fields |
| R4 | Cap total contacts in the first block of any sport plan at the first block of `two-session-week` (stack rule) | Sport pages replace, not add to, the published plan | `check-content.mjs` |
| R5 | Extend banned phrases for sport claims and profiles: `prevents`, `prevented`, `fixes`, `heals`, `cures`, `injury-proof`, `bulletproof` (the word "prevention" stays allowed). Source titles are not checked | Skills: "is associated with", never "prevents" | `check-content.mjs` |
| R6 | A claim in section `plyometrics` with kind `safety`, `programming` or `cricket` must have `population`. (The two existing plyometrics claims lack it: add it when we next edit `claims/plyometrics.yml`) | Population must always be stated | `check-content.mjs` |
| R7 | A claim whose sources are all `cohort` or cross-sectional cannot be graded above C; a narrative review cannot be graded above D | Matches the rubric | `check-content.mjs` |
| R8 | `sameAs` on a guide exercise points at a canonical exercise; if two exercises share an id the validator compares contraindications and pain rule | D-003 by analogy | `content.config.ts`, `check-content.mjs` |
| R9 | A sport page must render a `#red-flags` section, an `#evidence` section and the referral tiers (Playwright) | Safety content cannot be dropped by accident | `tests/e2e/` |
| R10 | `loadGuide(section, { phase })` option; existing pages ask for the unphased base | Keeps the existing plyometrics pages unchanged | `src/lib/guide.ts` |
| R11 | Allow source `type: cross-sectional` (the questionnaire studies E28 and E29 are cross-sectional, and there is no matching type in the enum). Until then, use `cohort` with a note | Accurate typing | `content.config.ts` |
| R12 | Check that the sport pages' internal links to `/strength/cricket/...` resolve (the existing link crawl covers this once the pages exist) | Cricket linkage | Existing link check |

Proposed new shared pain rules (hotspot, so sequenced by the executive): `groin` (adductor-loading pain; the `hip` rule covers a pinch at the front of the hip in a squat or lunge only), `trunk-rotation` (back, rib or side pain during rotation, throwing or twisting), and `overhead-throwing` (shoulder and elbow pain during throwing or smashing, distinct from `shoulder` which is written for lifting). `lower-back`, `shoulder`, `knee`, `hip` and `hamstring` are strength's rules: this coach reuses them unchanged and requests any wording change. Each `seeClinician` list must match the referral tiers in section 2.2.

### 6.6 Evidence placement, tests and visuals

- **Sources:** append the proposed sources (E1 to E38 except E17, which exists) to `sources.yml` with `section: plyometrics`, then `npm run verify:sources -- --write`. Entries use the Crossref `issued` year and plain-text titles.
- **Claims:** write them in `claims/plyometrics.yml`, each with a grade, `population` and caveats, and none until the source is in the registry and stamped.
- **Tests:** Playwright already walks every built page (one `h1`, no horizontal scroll, no console errors). Add the sport routes to the plyometrics spec, assert R9, and check the existing plyometrics pages are unchanged after R10 (compare title, description and body text against the previous build, as the project's regression method does).
- **Visuals (D-001):** none ship in the first build. Movement specs (joint paths, planes, camera) are written for landing in the frontal plane, rotation throws, lunge and recover, Copenhagen adduction and the Nordic curl. Frontal-plane and rotation visuals need rig work the platform owner has not done.

## 7. Injury-prevention content outline (per sport)

Each sport follows the page shape from `sports-injury-prevention`: (1) who it is for and not, (2) what is commonly injured, (3) what training is associated with lower risk, with limits, (4) the exercises as ladders, (5) load management and recovery, (6) red flags and referral, (7) gaps. Every statement carries its population. This is the outline, not the content: nothing is written until the sources are in the registry.

### 7.1 Cross-sport page (`/plyometrics/sports/injury-prevention/`)

1. For healthy adults who play recreationally or at club level; not under-18s, pregnancy, current injury, or anyone not cleared to exercise.
2. What the research can and cannot tell us: multi-component programmes are associated with fewer injuries in trials of recreational to semi-professional football and in mixed-sport strength-training trials (E1, E11, E12, E16); programmes that include plyometrics are associated with fewer ACL injuries in 9 trials (E2); which part does the work is unknown.
3. Landing education: technique instruction changes landing mechanics (E3), a surrogate outcome.
4. Ankle: bracing and neuromuscular training are supported for preventing **recurrence** in people who have already sprained an ankle (E4). Page text: if you have had a sprain, ask a physiotherapist; this page does not set a rehab plan.
5. Calf and Achilles: lower plantar-flexor strength is a limited-evidence risk factor (E10); plyometric training ranked highest for tendon size in a network meta-analysis with sparse networks (`fu-2026-achilles`) and raised tendon cross-sectional area in a 15-player cricket trial (E22). Neither measured injuries.
6. Shoulder: no firm conclusion on prevention programmes (E9); say so plainly.
7. Load management: build up gradually, avoid spikes and long gaps, sleep and recovery; workload ratios are contested (`acwr-contested`). No numeric limits.
8. Warm-up, surface, footwear, eye protection (E33, E38), heat.
9. Red flags and the referral tiers (section 2.2). Gaps (section 4.9).

### 7.2 Cricket

| Part | Content outline |
|---|---|
| Who | Recreational and club adults; link to `/strength/cricket/` for the gym side; youth bowlers pointed to qualified supervision and `youth-training-consensus` |
| Commonly injured | Hamstring and side strains, groin, wrist and hand, lumbar soft tissue (E18); lumbar stress fracture in fast bowlers (E19, `cricket-back-injuries`); fence collisions (E18). Population on every line |
| Training associated with lower risk | Nordic hamstring exercise in programmes (E17); in adolescents an 8-week programme changed risk-factor measures and two bowling angles but injury effect is untested (E23, E24). **No adult club trial** |
| Exercises | `plyo-hamstring-posterior`, `plyo-adductor`, `plyo-trunk-anti`, `plyo-rotation-power` (hip-led), `plyo-shoulder-overhead`, `plyo-landing`, `plyo-decel-lunge` |
| Load | Workload associations only (E18, E19, existing claims); no thresholds; link to `season-planning` |
| Red flags | Persistent or recurring back pain in a bowler; head or face blow; shoulder pain with throwing; hamstring pop (section 2.3) |
| Gaps | Section 4.9 |

### 7.3 Badminton (deferred)

| Part | Content outline |
|---|---|
| Who | Recreational and club adults; no under-18 programming |
| Commonly injured | Lower limb (41 to 92% by study, E26; 52%, ankle most common, E27); dominant-shoulder pain in about half of players asked (E28, E29); eye injuries (E33); Achilles and knee are hypotheses |
| Training associated with lower risk | Little. Core training is associated with better power and court skills in adolescents with a doubtful abstract (E31); shoulder programmes have no firm evidence (E9); lunge landing technique is studied in the laboratory (E30). **No badminton prevention trial** |
| Exercises | `plyo-decel-lunge`, `plyo-lateral`, `plyo-landing`, `plyo-ankle-calf`, `plyo-shoulder-overhead`, `plyo-trunk-anti`, `plyo-rotation-power` (gated, hypothesis) |
| Load | Overuse is a large share (25 to 74%, E26); risk rose with level and prior injury (E26): build up gradually when returning to play after a break |
| Red flags | Eye strike; shoulder pain that disturbs sleep; ankle roll with no weight bearing; Achilles pop (section 2.3) |
| Gaps | Section 4.9 |

### 7.4 Squash (deferred)

| Part | Content outline |
|---|---|
| Who | Recreational and club adults; a screening note for older or less-active players because cardiovascular strain is noted (E34) |
| Commonly injured | Lower-limb soft tissue (E34, pooled rate not used); eye injuries (E38); knee, ankle, groin, hip and lower back are hypotheses |
| Training associated with lower risk | **None found for squash.** Pages say so and refer to the general strength and landing evidence (E1, E3) |
| Exercises | `plyo-decel-lunge`, `plyo-landing`, `plyo-lateral`, `plyo-adductor`, `plyo-ankle-calf`, `plyo-trunk-anti`, ghosting drills |
| Load | Matches are high-intensity with long rallies in elite players (E35, E36); heat on court is a hypothesis; warm-up and hydration are general education |
| Red flags | Eye strike; chest pain or fainting; heat illness; collision injuries (section 2.3) |
| Gaps | Section 4.9: the thinnest sport. Phase last |

### 7.5 Football (deferred)

| Part | Content outline |
|---|---|
| Who | Recreational and amateur adults; separate population statements for men and women where the trials differ |
| Commonly injured | Lower extremity, muscle and tendon injuries in professional men (E13); ankle in women's football (E12); hamstring, groin, knee ligament |
| Training associated with lower risk | FIFA 11+ (E11, recreational and sub-elite); multi-component programmes in women and girls with low-level evidence (E12); Nordic hamstring exercise within programmes (E17); adductor programme in semi-professional men (E14) with a null groin-programme trial alongside it (E15); Knee Control in amateurs aged 14 to 46 (E16); plyometric components in ACL programmes (E2) |
| Exercises | `plyo-landing`, `plyo-decel-lunge`, `plyo-hamstring-posterior`, `plyo-adductor`, `plyo-ankle-calf`, `plyo-lateral`, `plyo-trunk-anti`, `plyo-rotation-power` (gated, hypothesis) |
| Load | Match incidence is far higher than training incidence in professional men (E13); build-up after breaks; fixtures and surface are hypotheses |
| Red flags | Head injury; knee that gives way or swells; sudden hamstring pull; chest pain or fainting (section 2.3) |
| Gaps | Section 4.9: first sport to build because it has the strongest prevention trials; doses still need the full texts |

## 8. Phases and acceptance criteria

Order follows the evidence: shared base first, then the sports with the strongest prevention evidence, the thinnest last. The owner's list order (cricket first) is a preference to confirm; cricket is placed second because the site already has gym-side cricket pages to link to.

**2026-11-15 update:** the owner chose cricket only. Phase 3 (cricket) was built first as a draft, together with the parts of phase 1 that cricket needs (the phase filter, new pain rules, sources, an evidence page). Phases 2 (football), 4 (badminton) and 5 (squash) are **deferred**, and phases 6 (review) and 7 (go live) still apply to the cricket pages. Phase 3's "no thresholds published" and "no under-18 programming" criteria were met; "strength-coach has linked back" is open (a request in the build report).

| Phase | Deliverable | Done when |
|---|---|---|
| 0 | **This plan** | The owner has answered section 9, or changed the decisions |
| 1 | **Foundations.** Platform changes (R1 to R12 as agreed, `sportProfiles`, loader option); new pain rules; sources E1 to E10 verified and stamped; hub page, `landing-and-decelerating/`, `rotation-and-core/`, `injury-prevention/` and `evidence/` pages (draft, unlinked) | `npm run check` passes with no unread warnings; every new DOI stamped by `verify:sources`; each claim has grade, population and caveats; existing plyometrics pages compare identical to the previous build; every exercise passes `safety-review`; red flags and referral tiers present; build and Playwright pass; visuals are specs only |
| 2 | **Football page** with groups `plyo-hamstring-posterior`, `plyo-adductor`; sources E11 to E17 read at full-text level for doses | Section 4.3 claims written with populations; Nordic claim reused, not duplicated; page labels groin evidence as mixed; same checks as phase 1 |
| 3 | **Cricket page** with a link to and from the strength cricket pages | Cricket claims cite E18 to E24; no thresholds published; no under-18 programming; `strength-coach` has linked back; no claim duplicates `claims/cricket.yml` |
| 4 | **Badminton page** | The doubtful abstracts (E31, E32) are read in full text or dropped; eye and shoulder education present with the "limited evidence" statement; same checks |
| 5 | **Squash page** | The "no training evidence found" statement is on the page; eye and heat/cardiac notes present; same checks |
| 6 | **Review** | A named physiotherapist and a strength and conditioning coach (and a cricket-experienced reviewer) have signed off; draft labels move only for the content they cover |
| 7 | **Go live** | The owner agrees; nav, footer and tile copy updated in `sections.yml` by the executive; pages deployed only after sign-off |

Each phase's gate checks are, in addition to those in the table: the draft label on every page, British spelling, no personal or medical details, no outcome promises, no hypothesis written as fact, and an honest "what we did not verify" in the phase report.

## 9. Risks and open questions for the owner

| Risk or question | Mitigation or decision needed |
|---|---|
| **Pushing `main` deploys production**, and any page placed in `src/pages/` goes live at its URL even if it is unlinked | Build the pages but do not push until the owner agrees (D-004), or keep them on a branch. Decision for the owner and executive |
| **Route:** `/plyometrics/sports/<sport>/` versus the earlier sketch `/plyometrics/cricket/` | Recommended: the sports sub-area, so the four sports share ladders. Owner to confirm |
| **Audience:** recreational and club adults only | Recommended. Youth cricket evidence is the largest but the pages will not programme for under-18s. Owner to confirm |
| **Order of sports** | Recommended: football, cricket, badminton, squash (strongest to thinnest evidence). Owner to confirm or reorder |
| **Evidence is thin or absent for several of the things asked for.** There is **no** controlled study of rotational power training in cricket, badminton, squash or club football; none of strength or power training in squash; none of any programme with injury outcomes in badminton or cricket adults | Say so on every page. Rotational power ladders are grade D conventions, gated, and the page states the closest analogue (a handball trial). The owner must accept "convention, no sport-specific outcome evidence" as the standard for these pages, as the calisthenics skills do |
| **Rotation and the lower back.** The site has a back-safe core guide. Rotational power can load the spine. How much rotation the lumbar spine tolerates is **to research** | Anti-rotation work before rotational power, hip-led rotation, a back-safe-guide gate, the `trunk-rotation` pain rule. Rotation ladders ship last in each phase and only after a physiotherapist reviews the gates |
| **Sporting claims written from abstracts only**; some abstracts have implausible numbers (E31, E32); some results are mixed (E14 and E15, E9) | Full texts read before any number is quoted; mixed results stated as mixed |
| **Gate numbers** (8 squats, 10 calf raises, 30 s single-leg stance, and the like) are conventions, not validated thresholds | Labelled as conventions, flagged for physiotherapist and coach review |
| **Contact budgets.** A meta-analysis suggests about 100 jumps per session as a trend in athletes (E6); our published plan is far lower | Keep the conservative convention. Never adopt 100 as a cap. Contacts never fall across blocks (existing rule) |
| **Visuals (D-001):** frontal-plane, rotation and 3D landing visuals cannot be shown faithfully by the current rig | First build is text and cues with movement specs. Owner to decide whether pages ship without animation or wait for the rig work |
| **Cross-section duplication (D-003 by analogy):** core and hamstring exercises already exist in strength and getting-started | Reference one canonical card (`sameAs`), do not rewrite. Strength coach to confirm which card is canonical |
| **Shared loader (`loadGuide`) change** affects the existing plyometrics pages | Executive to decide option A, B or C in section 6.3 and run the regression comparison |
| **Eye protection:** the standard behind E38 is not yet read | Name no standard until the primary source is read; say "eyewear that meets a recognised protective standard" |
| **Concussion and heading:** no source gathered | Red-flag text only, with a head-injury urgent tier, until a consensus statement is verified |
| **Reviewers:** none named | Owner to name a physiotherapist, a strength and conditioning coach and a cricket-experienced reviewer, or the pages stay draft |
| **Ownership gaps:** `sport-` prefix is not in the ownership table; `shoulder`, `knee`, `hip`, `hamstring` and `lower-back` pain rules are strength's; new rules (`groin`, `trunk-rotation`, `overhead-throwing`) have no owner | This plan uses `plyo-` for group ids. Executive to assign the new pain rules to this coach |
| **Existing claims lack `population`** (`plyo-jump-performance`, `plyo-tendon`) | Add when `claims/plyometrics.yml` is next edited (our file) |
| Units, language | British English, metric. Imperial units are not used |

## Appendix: Europe PMC search log

All searches used `https://www.ebi.ac.uk/europepmc/webservices/rest/search`, `format=json`, `sort=CITED desc`, page sizes 4 to 14, on 2026-11-15. Result lists were screened by title and the chosen entries had `resultType=core` abstracts read.

| Topic | Query (abbreviated) | Hits and notes |
|---|---|---|
| Football prevention | `TITLE:"FIFA 11+" AND (TITLE:"systematic review" OR TITLE:"meta-analysis")` | 14. Took Thorborg 2017; others seen, not read |
| Football prevention | `(TITLE:"injury prevention" ...) AND TITLE:football AND (TITLE:"meta-analysis" OR ...)` | 13. Took Crossley 2020 |
| Football hamstring | `TITLE:"hamstring injuries" AND TITLE:"football" AND (...)` | 5. None taken |
| Football epidemiology | `(TITLE:"injury incidence" OR ...) AND (TITLE:"football" OR TITLE:"soccer") AND (...)` | 51. Took López-Valenciano 2019 |
| UEFA study | `TITLE:"UEFA" AND TITLE:"injury" AND (...)` | 28. Not read |
| Ankle sprain | `TITLE:"ankle sprain" AND (TITLE:"prevention" OR ...) AND (...)` | 3. Took Doherty 2016 |
| Groin | `TITLE:"groin" AND (TITLE:"prevention" OR TITLE:"Copenhagen adduction") AND (TITLE:"football" OR ...)` | 9. Took Hölmich 2009 |
| Adductor programme | `TITLE:"adductor strengthening" AND TITLE:"groin"` | 3. Took Harøy 2018 |
| Hamstring prevention | `TITLE:"hamstring" AND TITLE:"prevention" AND (...)` | 12. Reused van Dyk 2019 |
| Football RCTs | `TITLE:"football" AND TITLE:"randomised" AND (TITLE:"hamstring" OR TITLE:"nordic")` | 5. Took Lindblom 2022 |
| Cricket injuries | `TITLE:"cricket" AND (TITLE:"injuries" OR TITLE:"injury")` | 156. Took Orchard 2002 |
| Cricket bowling | `TITLE:"bowling" AND cricket AND (...)` | 30. Took Alway 2019 |
| Cricket throw, batting | `TITLE:"cricket" AND (TITLE:"throwing" OR TITLE:"shoulder" OR TITLE:"batting" OR TITLE:"sprint")` | 68. Took Freeston 2016, Houghton 2013 |
| Cricket reviews | `TITLE:"cricket" AND (TITLE:"physical" OR ...) AND (TITLE:"systematic review" OR TITLE:"review")` | 3. Took Ramachandran 2021 |
| Cricket prevention | `TITLE:"cricket" AND TITLE:"prevention"` | 8. Took Forrest 2018, 2020a, 2020b; protocol seen |
| Cricket (no hits) | queries with `injur*` wildcards in `TITLE` returned 0; re-run without wildcards | Wildcards unreliable in TITLE: use full words |
| Badminton | `TITLE:"badminton" AND (TITLE:"injuries" OR TITLE:"injury")`, `... AND (TITLE:"systematic review" OR ...)`, `... AND (TITLE:"plyometric" OR ...)`, `... AND (TITLE:"lunge" OR ...)`, `... AND (TITLE:"prevention" OR TITLE:"shoulder" ...)` | 79, 17, 136, 74, 49. Took Stepper, Marchena-Rodriguez, Lam, Ma (2), Hoskin, Fahlström (2); rejected Zhao 2021 |
| Squash | `TITLE:"squash" AND (...)` returned many plant papers; narrowed with `(TITLE:"squash players" OR ...)`, `TITLE:"squash" AND (TITLE:"injuries" OR ...) AND (...)`, `ABSTRACT:"squash players" AND (...)` | 96, 62, 2, 3. Took McCartney 2026, Girard 2007, Murray 2016, James 2022 |
| Racket eye injuries | `TITLE:"eye injuries" AND TITLE:"squash"`, `(TITLE:"racket sports" OR TITLE:"racquet sports") AND (...)` | 13, 11. Took Mazarelo 2023 |
| Rotation, medicine ball | `(TITLE:"medicine ball" OR TITLE:"rotational power" OR ...) AND (TITLE:"systematic review" OR ...)`; `(TITLE:"rotational" OR TITLE:"rotation") AND ... AND (TITLE:"systematic review" OR TITLE:"meta-analysis")` | 5, then 0: **no review of rotational power training found**. Took Raeder 2015 |
| Trunk training | `TITLE:"trunk" AND (TITLE:"athletic performance" OR TITLE:"core") AND (...)` | 4. Took Prieske 2015 |
| Strength and injuries | `TITLE:"strength training" AND TITLE:"sports injuries" AND TITLE:"meta-analysis"` | 1. Took Lauersen 2018 |
| Change of direction | `TITLE:"change of direction" AND TITLE:"training" AND (...)` | 32. Took Asadi 2016 |
| ACL, plyometrics | `TITLE:"plyometric" AND (TITLE:"injury prevention" OR TITLE:"injury risk" OR TITLE:"landing") AND (...)`; `TITLE:"anterior cruciate ligament" AND TITLE:"neuromuscular" AND (...)` | 2, 4. Took Al Attar 2022 |
| Landing | `(TITLE:"landing" AND (TITLE:"training" OR ...)) AND (TITLE:"systematic review" OR TITLE:"meta-analysis")` | 5. Took Bathe 2023 |
| Plyometrics in adults | `TITLE:"plyometric" AND (TITLE:"adults" OR ...) AND (...)` | 11. Took Oxfeldt 2019 |
| Shoulder | `TITLE:"shoulder" AND (TITLE:"overhead" OR TITLE:"throwing") AND TITLE:"injury prevention" AND (...)` | 1. Took Wright 2021 |
| Achilles | `TITLE:"Achilles tendinopathy" AND (TITLE:"prevention" OR TITLE:"risk factors") AND (...)` | 2. Took van der Vlist 2019 |
| Concussion | `TITLE:"concussion" AND TITLE:"football" AND TITLE:"systematic review" AND TITLE:"incidence"` | 2, both Australian football and general head-impact. Not taken: to research |

Crossref was queried at `https://api.crossref.org/works/<doi>` for each taken DOI, and at `https://api.crossref.org/works?filter=updates:<doi>` for notices, on 2026-11-15.
