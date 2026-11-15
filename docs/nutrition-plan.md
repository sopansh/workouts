# Health & Nutrition: scope, evidence and implementation plan

Status: **plan of record, awaiting owner approval. Nothing is built.** The home tile stays "Coming soon" (`status: soon` in `src/content/sections.yml`) until pages are ready and the owner agrees (directive D-004).
Related: [`CONTEXT.md`](../CONTEXT.md), [`hypertrophy-plan.md`](./hypertrophy-plan.md) and [`getting-started-and-calisthenics-plan.md`](./getting-started-and-calisthenics-plan.md). The evidence grades, the quality gates and the "plan before pages" method follow those plans.

Drafted by the nutrition-coach agent, an AI assistant. It reasons like a sports dietitian (energy balance, protein, micronutrients, patterns, food composition, supplement evidence), but that is a way of working, **not a credential**. Nothing here is written or signed off by a registered dietitian or doctor. Everything stays `draft` until named human reviewers sign off (section 8, question 1).

Contents

1. [Scope and decisions](#1-scope-and-decisions)
2. [Safety stance and referral rules](#2-safety-stance-and-referral-rules)
3. [Evidence gathered, and honest gaps](#3-evidence-gathered-and-honest-gaps)
4. [Information still to gather](#4-information-still-to-gather)
5. [Architecture](#5-architecture)
6. [Content design](#6-content-design)
7. [Phases and acceptance criteria](#7-phases-and-acceptance-criteria)
8. [Risks and open questions for the owner](#8-risks-and-open-questions-for-the-owner)
9. [Appendix A: authorities, databases and editions](#appendix-a-authorities-databases-and-editions)
10. [Appendix B: how the evidence was gathered](#appendix-b-how-the-evidence-was-gathered)

---

## 1. Scope and decisions

The owner's brief asked for a section covering diet patterns, calorie and weight-loss or weight-gain goals, Indian and Japanese food knowledge, vitamins, minerals and workout supplements. The rows marked **Proposed** are my recommendations and need approval.

| Question | Decision |
|---|---|
| What is the section for? | General education on fuel, recovery and the habits that make training work. Matches the tile blurb. **Not** medical nutrition therapy and **not** a personal prescription |
| Topics | Diet patterns; goals (weight loss, maintenance, weight gain, body recomposition); Indian and Japanese food knowledge; vitamins and minerals; workout supplements (from the brief) |
| Audience | Healthy adults aged 18 and over. Out-of-scope groups are listed in section 2 and shown on every nutrition page |
| Numbers | No intake, limit or food value is written from memory. Each comes from a named authority or database with its **edition recorded** (section 5.4, Appendix A) |
| Draft state | Every record and page is `draft` until a named registered dietitian or doctor signs off. **Proposed:** reviewers are named by the owner (section 8, question 1) |
| Tile | Stays "Coming soon" until the owner agrees (D-004). **Proposed:** not before phases 1 to 3 (section 7) |
| Stack | One Astro stack, content collections with Zod schemas, one evidence registry (`sources.yml`, `claims/nutrition.yml`), one layout. No new dependency |
| Regions | India and Japan first (from the brief), with global patterns. Other cuisines are a later extension |
| Units and language | Metric. British English. Food amounts in grams; household measures only where a source defines them in grams |
| Calculator | **Proposed: none at first.** Worked examples and tables instead. An optional client-side calculator needs the owner's approval because it adds script to a static site (section 8, question 4) |
| Training link | Resistance training during a deficit or surplus is the strength coach's area. This plan only links to it and lists a request (section 8) |
| Not planned | Medical nutrition, under-18s, pregnancy and breastfeeding, older-adult or frailty nutrition, weight-class cutting and contest preparation, clinical deficiency treatment, hydration and alcohol (possible later additions, not in this plan) |
| What I did not do | No pages, no data collections, no edits to `sources.yml`, `sections.yml`, `pain-rules.yml` or any file outside this document. Proposed sources and collections are **listed here only** |

---

## 2. Safety stance and referral rules

The pages reach strangers we cannot see, and food and weight are sensitive topics. The stance is stricter than a general health page.

### 2.1 Rules

1. **General education for healthy adults.** The hub and every plan page say so, say the content is a draft reviewed by no clinician, and say it is not a personal prescription.
2. **No crash or very-low-energy plans.** Goal templates use a moderate deficit or a modest surplus. A numeric deficit or surplus appears **only** after a verified authority is found for it (gap 1 in section 3.4). Until then the guidance is qualitative.
3. **No fixed timeline promises** ("lose 5 kg in a month"), no before-and-after framing, no spot-reduction claims, no "detox", no "boosts metabolism", no disease claims, no brand endorsements and no affiliate links.
4. **Food first.** A supplement page is a risk assessment, not a recommendation.
5. **Cultural, religious and ethical patterns are respected, not corrected** (vegetarian, Jain, vegan, halal, kosher and others). A pattern is treated as a filter the plan works inside. Fasting for religious observance is **not** treated as a diet to optimise (section 6.2).
6. **No personal or medical details about any real person.** The repo is public. No plan is written for a named person, and sample "reference adults" are generic.
7. **Calorie counting is optional, never the default.** Two cross-sectional studies found calorie-tracker use associated with more eating-disorder symptoms (section 3.3, rows 29 and 30). Plans offer a gram-based plate method and a weekly-trend method that need no food diary.
8. **Draft label and reviewer status on every page**, like the other sections.

### 2.2 Out of scope, shown on every nutrition page

Each item carries "see a doctor or registered dietitian". The same list is a shared component and a schema constant (section 5.3), so it cannot be dropped from a page.

| Id | Out of scope |
|---|---|
| `scope-under-18` | Under-18s |
| `scope-pregnancy-breastfeeding` | Pregnancy and breastfeeding |
| `scope-diabetes` | Diabetes |
| `scope-kidney-liver-heart-digestive` | Kidney, liver, heart or digestive conditions |
| `scope-eating-disorder-history` | A history of disordered eating, or feeling preoccupied with food or weight |
| `scope-interacting-medication` | Medication that interacts with food or supplements |
| `scope-clinical-deficiency` | Any diagnosed or suspected deficiency. Deficiency is diagnosed by a clinician, not by a web page |
| `scope-unexplained-weight-change` | Unexplained weight loss or gain |

### 2.3 Red flags that mean "stop and see a clinician" (convention, grade D)

Unintended weight change, dizziness or fainting, absent or irregular periods, persistent low energy or low mood, injuries that do not heal, constant preoccupation with food or weight, guilt after eating, or binge or purge behaviour. The list is my convention, informed by the IOC 2023 consensus on Relative Energy Deficiency in Sport (row 31) but **not copied from it** (I read only its abstract). A clinician reviewer must confirm or change it before the pages can leave draft.

### 2.4 Eligibility checks for weight-loss content

The weight-loss page needs a lower body-mass-index (BMI) limit below which it is not shown. **No sourced number was found yet** (gap 2). Two facts from the evidence apply now:

- BMI is a screening number, not a diagnosis. The WHO expert consultation (row 13) found that risk in Asian populations is substantial at BMIs below the standard overweight cut-off, and chose **not** to set a single new cut-off. The pages therefore show BMI as context and never as a precise target for Indian or Japanese readers.
- Athletes are told that low energy availability harms health and performance in women and men (row 31), and that in athletes a slower rate of loss kept more lean mass (rows 7 and 12, athlete evidence only).

### 2.5 Supplement rules

Evidence grade, the outcome studied and in whom; a dose range **and** a safe upper intake from a named authority (no dose without an upper intake); form; interactions; who should avoid it; adverse effects; a note that labels can be wrong; and, for athletes, the anti-doping and third-party-testing notes (section 6.5). No page tells an athlete that a product is safe for drug testing.

---

## 3. Evidence gathered, and honest gaps

### 3.1 Method and limits of what I checked

- **Found** on Europe PMC (`curl` against the REST API), **abstract read**, then **DOI, title, year and update notices checked on Crossref on 2026-11-15**. All 42 DOI-bearing rows below passed the Crossref lookup (the DOI resolves and the title matches); row 4 is an authority note, not a paper. The extra DOIs named in the text (the 2020 correction to row 14, the Canadian obesity guideline, the 2025 Indian vitamin D consensus, a 2024 Japanese yield-factor paper, two EFSA publications and the retracted 2015 vegetarian position paper) were also confirmed on Crossref. No row is retracted. Three rows have a correction or erratum on Crossref: the IOC REDs consensus (row 31), the Indian nutrient-database paper (row 40) and the protein meta-analysis (row 14, see its row). Checking a DOI proves the paper exists, not that our claim fits it, so each row states limits.
- **I read abstracts, not full texts**, except where a row says otherwise. Where an abstract was cut short I say so and do not use the missing part.
- Grades follow the site rubric: **A** meta-analysis or systematic review, **B** a well-conducted trial, **C** observational, validation or modelling work, **D** guideline, position stand, narrative review or convention, **Mixed**.
- Years are journal issue years. For six rows Crossref's online date is one year earlier (rows 8, 14, 21, 24, 26 and 28, marked "online" in the table). The verifier tolerates a one-year gap.
- Proposed source ids are in backticks. Row 14 and the Nunes 2022 meta-analysis (`nunes-2022-protein`) are **already in the register** and are linked, not duplicated (section 6.3).

### 3.2 Reference authorities and databases

The numbers on pages will come from these. They are not papers and need no graded claim, but their **edition and reachability** matter. The full register with URLs and what I read is in [Appendix A](#appendix-a-authorities-databases-and-editions). In short:

| Need | Authority and edition found | Reached? |
|---|---|---|
| Indian food composition | Indian Food Composition Tables 2017 (ICMR-NIN) | Yes, PDF read (front matter only). **The old web address now redirects to an unrelated site, do not link it** |
| Indian reference intakes | Nutrient requirements, RDA and EAR for Indians, 2020 (ICMR-NIN) | Brief note read; full report not read |
| Indian guidelines | Dietary Guidelines for Indians, 2024 (ICMR-NIN) | Page reached; text not read |
| Japanese food composition | Standard Tables of Food Composition in Japan, 2020 (Eighth Revised Edition), with Supplement 2023 and an errata of 27 March 2026 | Yes, page read; tables not opened |
| Japanese reference intakes | Dietary Reference Intakes for Japanese, 2025 edition (for FY2025 to FY2029) | Page read; report not read |
| General cross-check | USDA FoodData Central, October 2026 release (Foundation and Branded); SR Legacy April 2018; FNDDS 2021 to 2023 | Yes, page read |
| Energy requirements | FAO/WHO/UNU Human energy requirements, 2004 | Reached; tables not read |
| Upper intake limits | EFSA Tolerable Upper Intake Levels for Vitamins and Minerals, February 2006, and later per-nutrient opinions; NIH Office of Dietary Supplements fact sheets | EFSA 2006 PDF reached (cover read). **NIH ODS blocked automated access (HTTP 403), to check in a browser** |
| Anti-doping | WADA Prohibited List. The page served on 2026-11-15 was the **2026 List** | Yes. Check whether the 2027 List is out before building |
| Supplement framework | Australian Institute of Sport Sports Supplement Framework (ABCD classification) | Page read; classification pages not found yet |

### 3.3 Evidence table

Crossref-confirmed on 2026-11-15 unless stated. "Pop." is the population studied.

**Energy estimation and weight change**

| # | Source | What it supports | Grade | Main limit |
|---|---|---|---|---|
| 1 | Mifflin et al. 1990, `mifflin-1990-ree`, AJCN, doi:10.1093/ajcn/51.2.241 | A resting-energy-expenditure equation from weight, height, age and sex, derived from 498 healthy adults (19 to 78 y, normal weight and obese) measured by indirect calorimetry; R² 0.71. The older Harris-Benedict equation overestimated by 5% | C | 1990 US sample. This paper does not test Indian or Japanese adults |
| 2 | Frankenfield et al. 2005, `frankenfield-2005-ree`, J Am Diet Assoc, doi:10.1016/j.jada.2005.02.005 | Systematic review of four common equations: Mifflin-St Jeor was within 10% of measured in more people than the others, but individual errors remain "noteworthy". No individual-error validation was found for the FAO/WHO/UNU equation | A | Older adults and US-resident ethnic minorities were under-represented. It says nothing about Indian or Japanese residents |
| 3 | Miyake et al. 2011, `miyake-2011-bmr-japan`, J Nutr Sci Vitaminol, doi:10.3177/jnsv.57.224 | In 365 healthy Japanese adults (18 to 79 y), the Harris-Benedict, Schofield and FAO/WHO/UNU equations gave **higher** BMR than measured. The Japan DRI equation and the Ganpule equation did not differ from measured, and Ganpule was the most accurate | C | One sample, BMR only (not total energy). I did not see Mifflin-St Jeor named in the abstract |
| 4 | ICMR-NIN Expert Group 2020, brief note on nutrient requirements (guideline, D) | The committee states that FAO/WHO/UNU BMR equations can overestimate BMR in Indians by 10 to 12%, and that measured physical-activity ratios in Indians were lower than earlier values. It also gives a daily range for visible fat (cooking oil), with an example for a 2,000 kcal diet | D | A six-page summary: I read it, not the full report. The 10 to 12% is the committee's statement, not a result I re-derived |
| 5 | Hall et al. 2011, `hall-2011-energy-imbalance`, Lancet, doi:10.1016/s0140-6736(11)60812-x | A dynamic model of adult metabolism: body weight responds slowly to a change in energy intake (half-times of about a year), and people with more adiposity lose more for the same change | C | A mathematical model, not a trial |
| 6 | Thomas et al. 2013, `thomas-2013-3500-rule`, Int J Obes, doi:10.1038/ijo.2013.51 | The "3,500 kcal = 1 lb" rule grossly overestimates actual weight loss when tested against seven supervised experiments | C | A commentary with modelling tools. Supports **not** using the rule |
| 7 | Garthe et al. 2011, `garthe-2011-loss-rate`, IJSNEM, doi:10.1123/ijsnem.21.2.97 | 24 athletes on a diet with four resistance sessions a week: a loss of about 0.7% of body weight a week gained lean mass (+2.1%), while about 1.4% a week did not (-0.2%) | B | 24 athletes, different durations (8.5 vs 5.3 weeks). Athlete evidence, not a general-population safety limit |
| 8 | Murphy and Koehler 2022 (online 2021), `murphy-2022-deficit-rt`, Scand J Med Sci Sports, doi:10.1111/sms.14075 | Meta-analysis of RCTs of resistance training in an energy deficit (3 or more weeks): lean-mass gains were impaired (ES -0.57) while strength gains were comparable. The authors suggest avoiding deficits above 500 kcal a day to preserve lean mass | A | I did not read the number of studies. The 500 kcal figure is the authors' suggestion for training populations, not a safety limit |
| 9 | Longland et al. 2016, `longland-2016-protein-deficit`, AJCN, doi:10.3945/ajcn.115.119339 | In 40 young men over 4 weeks (deficit about 40%, resistance plus interval training six days a week), 2.4 g/kg/day protein gave more lean-mass gain and fat loss than 1.2 g/kg/day | B | Young men, 4 weeks, a very high training load and a marked deficit. **Not** a template for general readers |
| 10 | Slater et al. 2019, `slater-2019-surplus`, Front Nutr, doi:10.3389/fnut.2019.00131 | The energy surplus needed to maximise muscle growth is **unknown**; textbook figures rest on the energy stored in tissue and miss other costs | D (narrative) | A narrative review: it supports saying "small, judged by trend", not a number |
| 11 | Aragon et al. 2017, `aragon-2017-diets-bodycomp`, JISSN, doi:10.1186/s12970-017-0174-y | Position stand: fat loss is driven by a sustained deficit; a wide range of dietary approaches (low-fat to low-carbohydrate) can be similarly effective; intermittent restriction showed no advantage over daily restriction; research on women and older people is thin | D | A society position stand. Treat as consensus, not as new evidence |
| 12 | Helms et al. 2014, `helms-2014-contest-prep`, JISSN, doi:10.1186/1550-2783-11-20 | Narrative recommendations for lean natural bodybuilders: slow loss (about 0.5 to 1% of body weight a week), high protein, and a warning that dehydration and electrolyte manipulation can be dangerous | D (narrative) | Contest-preparation context. **Context only; not used for numbers on pages** |
| 13 | WHO Expert Consultation 2004, `who-2004-asian-bmi`, Lancet, doi:10.1016/s0140-6736(03)15268-3 | Risk of type 2 diabetes and cardiovascular disease in Asian populations is substantial below the standard overweight BMI of 25. Observed risk cut-offs ranged from 22 to 25 and high-risk from 26 to 31, so no single new cut-off was set. Extra public-health action points were proposed at 23.0, 27.5, 32.5 and 37.5 | D | Consensus from 2004; population-level, not a personal target. The standard WHO cut-offs were retained |

**Protein**

| # | Source | What it supports | Grade | Main limit |
|---|---|---|---|---|
| 14 | Morton et al. 2018 (online 2017), already in the register as `morton-2018-protein`, BJSM, doi:10.1136/bjsports-2017-097608 | 49 trials, 1,863 healthy adults: protein supplementation added to resistance-training gains in muscle size and strength, with no further fat-free-mass gain beyond about 1.62 g/kg/day total intake | A | Healthy adults in resistance-training trials. A 2020 correction (doi:10.1136/bjsports-2017-097608corr1, read in full text) is a **competing-interest declaration** that one author had served on the advisory board of a sports-supplement maker. The strength principles page does not mention it: see Requests |
| 15 | Jäger et al. 2017, `jager-2017-issn-protein`, JISSN, doi:10.1186/s12970-017-0177-8 | Position stand: 1.4 to 2.0 g/kg/day is sufficient for most exercising people; 2.3 to 3.1 g/kg/day may help retain lean mass in resistance-trained people eating less than they need; intakes above 3 g/kg/day are "novel" evidence | D | Position stand. The per-serving advice was cut off in the abstract I read, so it is not used yet |
| 16 | Schoenfeld et al. 2013, `schoenfeld-2013-protein-timing`, JISSN, doi:10.1186/1550-2783-10-53 | Meta-analysis (23 hypertrophy studies, 525 participants): after controlling for covariates, protein timing around training had no significant effect. **Total protein intake was the strongest predictor** | A | 2013; supports "timing is secondary to total intake", not "timing never matters" |
| 17 | Schoenfeld and Aragon 2018, `schoenfeld-2018-per-meal`, JISSN, doi:10.1186/s12970-018-0215-1 | Reviews whether there is an upper anabolic limit per meal and what that means for spreading protein through the day | D (narrative) | Conclusions were cut off in the abstract I read. **Not used until the full text is read** |
| 18 | Thomas, Erdman and Burke 2016, `thomas-2016-joint-position`, MSSE, doi:10.1249/mss.0000000000000852 | Joint position of the Academy of Nutrition and Dietetics, Dietitians of Canada and ACSM: well-chosen nutrition supports performance and recovery, and **athletes should be referred to a registered dietitian for a personalised plan** | D | A position paper. Supports the referral rule |
| 19 | Hevia-Larraín et al. 2021, `hevia-larrain-2021-vegan-rt`, Sports Med, doi:10.1007/s40279-021-01434-9 | 19 habitual vegans and 19 omnivores (young men) trained for 12 weeks with protein set at about 1.6 g/kg/day: both gained muscle and strength, with no group differences | B | Small, untrained young men; the diet groups were habitual, not randomised; protein was topped up with a soy or whey supplement |

**Diet patterns**

| # | Source | What it supports | Grade | Main limit |
|---|---|---|---|---|
| 20 | Ge et al. 2020, `ge-2020-named-diets`, BMJ, doi:10.1136/bmj.m696 | Network meta-analysis of 121 trials (21,942 adults with overweight or obesity): low-carbohydrate and low-fat diets gave similar weight loss at six months (about 4.6 vs 4.4 kg more than usual diet; moderate certainty) | A | Adults with overweight or obesity, trial settings, six and twelve months. Not athletes |
| 21 | Dinu et al. 2018 (online 2017), `dinu-2018-mediterranean`, Eur J Clin Nutr, doi:10.1038/ejcn.2017.58 | Umbrella review of 13 observational and 16 trial meta-analyses (over 12.8 million people): greater adherence to a Mediterranean-style pattern was associated with robustly lower overall mortality and several chronic-disease outcomes; for many other outcomes the evidence was only suggestive | A | Mostly observational input, so **association**, not cause. See open question 6 on how far pages may mention health outcomes |
| 22 | Melina, Craig and Levin 2016, `melina-2016-vegetarian`, J Acad Nutr Diet, doi:10.1016/j.jand.2016.09.025 | Position paper: appropriately planned vegetarian and vegan diets are nutritionally adequate for all life stages and for athletes; **vegans need reliable vitamin B12 from fortified foods or supplements** | D | Position paper. A **retracted 2015 version** of this paper exists (doi:10.1016/j.jand.2015.02.033); cite only the 2016 paper |
| 23 | Pawlak et al. 2013, `pawlak-2013-b12-vegetarians`, Nutr Rev, doi:10.1111/nure.12001 | Review of 18 studies using B12 markers: deficiency was common in vegetarians (rates ranged widely by group), higher in vegans than vegetarians, and the authors advise B12 supplements | C | Review of mixed populations (many pregnant, child, elderly). The ranges are wide, so **no single prevalence is quoted** |
| 24 | Haider et al. 2018 (online 2017), `haider-2018-vegetarian-iron`, Crit Rev Food Sci Nutr, doi:10.1080/10408398.2016.1259210 | Meta-analysis (27 cross-sectional and 3 interventional studies): adult vegetarians had lower serum ferritin than non-vegetarians (about 30 µg/L lower) | A (design) | Mostly cross-sectional, so association. Ferritin measures stores, not deficiency. The authors note high iron stores carry risks too |
| 25 | Liu et al. 2022, `liu-2022-tre-nejm`, NEJM, doi:10.1056/nejmoa2114833 | 139 adults with obesity, 12 months, same calorie restriction with or without an 8 am to 4 pm eating window: weight loss was not significantly different (-8.0 vs -6.3 kg; net -1.8 kg, 95% CI -4.0 to 0.4) | B | Adults with obesity; one time window; calories were restricted in both arms |
| 26 | Hua et al. 2025 (online 2024), `hua-2025-fasting-umbrella`, Diabetes Obes Metab, doi:10.1111/dom.16092 | Umbrella review (12 meta-analyses): high-quality evidence linked time-restricted eating with weight and fat-mass loss in adults with overweight or obesity; other fasting types had moderate-to-low-quality evidence; long-term effects and adverse effects need more research | A | Adults with overweight or obesity. Says little about people at healthy weight or in training |

**Tracking, adherence and risk**

| # | Source | What it supports | Grade | Main limit |
|---|---|---|---|---|
| 27 | Burke et al. 2011, `burke-2011-self-monitoring`, J Am Diet Assoc, doi:10.1016/j.jada.2010.10.008 | Systematic review (22 studies): self-monitoring of diet, exercise and weight was consistently associated with weight loss | A | The authors rate the evidence **weak**; samples were mostly white women; mostly self-report |
| 28 | Zheng et al. 2015 (online 2014), `zheng-2015-self-weighing`, Obesity, doi:10.1002/oby.20946 | Systematic review (17 longitudinal studies): regular self-weighing was associated with more weight loss and **not** with adverse psychological outcomes | A | Adults seeking weight-loss treatment. Association; frequency varied between studies |
| 29 | Simpson and Mazzeo 2017, `simpson-2017-calorie-apps`, Eat Behav, doi:10.1016/j.eatbeh.2017.02.002 | In 493 students, calorie-tracker users had higher eating concern and dietary restraint | C | Cross-sectional and preliminary; students |
| 30 | Linardon and Messer 2019, `linardon-2019-calorie-app-men`, Eat Behav, doi:10.1016/j.eatbeh.2019.02.003 | In 122 men recruited mostly through fitness social media, users of a calorie-tracking app had higher eating-disorder symptoms; about 40% of users felt it contributed | C | Cross-sectional, small, self-selected. Cause and direction unknown |
| 31 | Mountjoy et al. 2023, `mountjoy-2023-reds`, BJSM, doi:10.1136/bjsports-2023-106994 | IOC consensus: low energy availability (too little energy for the training done) harms health and performance in women and men; links with mental health; offers a clinical assessment tool | D | Consensus aimed at clinicians and athletes. Crossref lists a correction I did not read |

**Supplements and anti-doping**

| # | Source | What it supports | Grade | Main limit |
|---|---|---|---|---|
| 32 | Maughan et al. 2018, `maughan-2018-ioc-supplements`, BJSM, doi:10.1136/bjsports-2018-099027 | IOC consensus: supplements make a minor contribution; a full nutrition assessment should come first; only a few (caffeine, creatine, buffering agents, nitrate) have good evidence of benefit; some can harm health or cause an anti-doping violation | D | Written for high-performance athletes |
| 33 | Kreider et al. 2017, `kreider-2017-creatine`, JISSN, doi:10.1186/s12970-017-0173-z | Position stand: creatine supplementation increases muscle creatine and is linked with better high-intensity performance and training adaptations | D | Society position stand; the safety passages were cut off in the abstract, so **no safety or dose claim is taken from it yet** |
| 34 | Guest et al. 2021, `guest-2021-caffeine`, JISSN, doi:10.1186/s12970-020-00383-4 | Position stand: 3 to 6 mg/kg improved performance in many studies, effects differ between people, about 9 mg/kg gave a high rate of side effects, and about 60 minutes before exercise is the common timing | D | Performance benefit, not a general-health upper limit. That needs EFSA (section 4, row 12) |
| 35 | Zhang et al. 2019, `zhang-2019-vitd-athletes`, PLoS One, doi:10.1371/journal.pone.0215826 | Meta-analysis of 8 trials (284 athletes): vitamin D supplements had no overall effect on strength (SMD 0.05) and no effect on upper-limb strength or jump power, with a possible effect on lower-limb strength | A | Few small trials with inconsistent results; baseline status not summarised in the abstract |
| 36 | US Preventive Services Task Force 2022, `uspstf-2022-vitamins`, JAMA, doi:10.1001/jama.2022.8970 | Recommends **against** beta-carotene and vitamin E supplements to prevent cardiovascular disease or cancer (harm and no net benefit, respectively); evidence is insufficient for multivitamins or single nutrients | D (guideline) | US guideline on cancer and cardiovascular prevention in non-pregnant community adults. It says nothing about sports performance |
| 37 | Maughan 2005, `maughan-2005-contamination`, J Sports Sci, doi:10.1080/02640410400023258 | Some supplements contain undeclared prohibited substances; under strict liability an innocent source is no excuse | D (narrative) | 2005 review |
| 38 | Geyer et al. 2004, `geyer-2004-supplement-steroids`, Int J Sports Med, doi:10.1055/s-2004-819955 | 634 supplements bought in 13 countries in 2000 to 2001: 14.8% contained undeclared anabolic steroids (mostly prohormones) | C | About 25 years old; one type of contaminant; I found no recent survey yet |
| 39 | Outram and Stewart 2015, `outram-2015-doping-supplements`, IJSNEM, doi:10.1123/ijsnem.2013-0174 | Review: 10 to 15% of supplements may contain prohibited substances; 6.4 to 8.8% of doping cases were attributed to supplement use in the estimates cited | C | The authors say the estimates are not comparable |

**Regional food and nutrient context**

| # | Source | What it supports | Grade | Main limit |
|---|---|---|---|---|
| 40 | Vijayakumar et al. 2024, `vijayakumar-2024-indb`, Curr Dev Nutr, doi:10.1016/j.cdnut.2024.103790 | An open-access Indian Nutrient Databank (1,095 foods and 1,014 recipes) built mainly from IFCT 2017, with gaps filled from IFCT 2004 and UK and US databases | n/a (database description, not a health claim) | Has a 2025 corrigendum (not read). Possible cross-check or licence-friendly route, **not** a replacement for IFCT |
| 41 | Zava and Zava 2011, `zava-2011-japan-iodine`, Thyroid Res, doi:10.1186/1756-6614-4-14 | Japanese iodine intake, largely from seaweed, is estimated at 1,000 to 3,000 µg/day on average and varies with seaweed type and processing | C | Literature-based estimate. Supports a caution about **iodine supplements** where seaweed is eaten |
| 42 | Aparna et al. 2018, `aparna-2018-vitd-india`, J Family Med Prim Care, doi:10.4103/jfmpc.jfmpc_78_18 | Review: reported vitamin D deficiency in Indian studies ranged from 40% to 99%, most 80 to 90%, and the review says typical Indian diets seldom meet vitamin D needs | C | Heterogeneous studies and cut-offs. A 2025 Indian expert consensus (Kalra et al., doi:10.4103/ijem.ijem_264_24, Delphi of 41 endocrinologists) says cut-offs are inconsistent; it gives clinical treatment regimens, so it is **not used** for dosing |
| 43 | Manoj Shah et al. 2025, `shah-2025-dgi-compare`, Indian J Med Res, doi:10.25259/ijmr_1674_2024 | Confirms the Dietary Guidelines for Indians, 2024 exist, group foods into 10 categories and use serving sizes and sample menus that differ from other countries | D | A comparison review. **The guidelines themselves were not read** |

### 3.4 Gaps, stated honestly

1. **No verified authority for the size of a safe deficit** for the general population. The papers above are for athletes (rows 7, 8, 9, 12) and none is a public-health limit. NICE guideline NG246 returned HTTP 403 to my command-line fetch and was not read. The Canadian adult-obesity guideline (Wharton et al. 2020, doi:10.1503/cmaj.191707, open access PMC7828878) exists but was **not read**. Until a source is read, deficits stay qualitative.
2. **No sourced BMI lower limit** for showing weight-loss content (section 2.4).
3. **No verified size of a surplus** for weight gain; row 10 says it is unknown.
4. **Body recomposition has thin evidence.** I did not find the commonly cited review in Europe PMC, so it is **unverified, to research**. Only rows 8 and 9 touch it, and row 9 is in young men.
5. **No energy-equation validation in Indian adults** was found (searches in Appendix B). Row 4 is a committee statement. Row 3 is Japanese. Mifflin-St Jeor is validated mainly in other populations (row 2).
6. **No evidence found for Jain, pescatarian or lacto-ovo patterns as such**, nor on the adequacy of Indian vegetarian diets for B12, iron or protein. Pattern pages for these will describe composition and what to watch, and will make no outcome claims.
7. **No Japanese source yet** on sodium, vegetarian adequacy or fish-intake targets.
8. **Evidence in women is thin** (row 11 says so). Most trials above are in men or young adults.
9. **Upper intake limits and reference intakes are not yet read from any authority.** The authorities are located (section 3.2) but no number has been entered anywhere.
10. **Omega-3, magnesium, zinc, iodine and calcium** have no source collected yet.
11. **Licensing is unresolved** (section 8, question 2). The IFCT 2017 front matter says no part may be stored or reproduced electronically "for creating a product" without written permission from NIN. The MEXT conditions of use, the USDA licence and the INDB licence were not read.
12. **Everything was read at abstract level.** A reviewer should open full texts before a claim leaves draft.

---

## 4. Information still to gather

Search strings are logged in Appendix B so searches are reproducible. For each new source: find it, read the abstract, check the DOI and update notices on Crossref, then write and grade the claim. **Never cite from memory.**

| # | Topic | Question | Where to look | Needed for |
|---|---|---|---|---|
| 1 | Safe size and rate of a deficit | What do NICE, the Canadian guideline, NHS and WHO say for general adults? | NICE NG246 (open in a browser), PMC7828878 full text, NHS and WHO pages | Weight-loss template |
| 2 | BMI limit for weight-loss pages | What lower BMI limit and what Asian cut-offs do WHO and the Indian and Japanese authorities use? | WHO BMI classification; Japan Society for the Study of Obesity; Indian health ministry (unverified, to research) | Eligibility, section 2.4 |
| 3 | Activity factors | Which physical-activity levels and ratios apply? | FAO/WHO/UNU 2004 tables; ICMR-NIN 2020 full report; Japan DRI 2025 report | Energy method |
| 4 | Equation choice by region | Is there a validated equation for Indian adults? Which Japanese equation (Ganpule) and what error? | ICMR-NIN 2020 full report; the Ganpule primary paper; Europe PMC `Ganpule` | Energy method |
| 5 | Protein upper intake and kidney safety | Is there a sourced upper intake or caution for high protein in healthy adults? | EFSA, Japan DRI 2025, ICMR-NIN 2020; Europe PMC | Protein ranges |
| 6 | Protein per meal | What per-serving figure do the ISSN and Schoenfeld and Aragon give? | Full texts of rows 15 and 17 | Meal structure |
| 7 | Fat and carbohydrate ranges | Which ranges do the joint position (row 18) and national authorities give? | Full text row 18; Japan DRI 2025; ICMR-NIN 2020 | Targets |
| 8 | Women | What is the evidence for deficits, gain and protein in women? | Europe PMC `women AND resistance training AND energy restriction` | Goal pages |
| 9 | Indian vegetarian adequacy | Protein quality, B12, iron, zinc and vitamin D in Indian vegetarian diets | ICMR-NIN and national surveys; DGI 2024 text; Europe PMC (two title searches returned nothing, broader abstract searches not yet run) | Patterns, nutrients |
| 10 | Japanese diets | Sodium, iodine and fish targets; vegetarian adequacy | Japan DRI 2025 report; national nutrition survey; Europe PMC | Japan section |
| 11 | Upper limits | What are the ULs for the priority nutrients, and where do authorities differ? | EFSA 2006 PDF and later opinions; NIH ODS (browser); Japan DRI 2025; ICMR-NIN 2020 | Nutrient pages |
| 12 | Caffeine and creatine safe intake | What do EFSA (caffeine opinion 2015, doi:10.2903/j.efsa.2015.4102, Crossref-confirmed but **not read**) and the creatine literature say for healthy adults? | EFSA; full text row 33 | Supplement pages |
| 13 | Other supplements | Evidence for omega-3, beta-alanine, nitrate, buffering agents, protein powders | AIS framework (find the classification pages); Europe PMC systematic reviews | Supplement pages |
| 14 | Anti-doping | WADA 2026 and 2027 Lists; the national anti-doping organisations for India and Japan | WADA site; the two national bodies (URLs unverified) | Anti-doping note |
| 15 | Third-party testing | What do independent certification programmes test for, and how current is each list? | AIS, WADA and programme sites. **Decision needed:** whether pages name programmes (section 8, question 5) | Supplement pages |
| 16 | Fasting patterns | Evidence in people who train; women; adverse effects. Two 2025 trials in resistance-trained adults appeared in a search and were not read | Europe PMC `time-restricted eating AND resistance training` | Pattern page |
| 17 | Cooked and raw foods | How do the national tables handle cooked states and yield? A 2024 Japanese reverse-yield-factor paper (doi:10.3390/foods13070988) appeared and was not read | IFCT 2017 front matter and methods; MEXT tables; Europe PMC | Food data |
| 18 | Licence and permission | May we store a small set of rounded values with attribution? | NIN (written permission); MEXT use-and-citation page; USDA FDC terms; INDB licence | Food data, phase 4 |
| 19 | Portion sizes in grams | What do DGI 2024 and the Japanese food guide define for a katori, roti and rice bowl? | DGI 2024 text; MHLW and the agriculture ministry food guide (unverified, to research) | Portion data |
| 20 | Disordered-eating wording | Which screening wording and referral text is safe? | Clinician reviewer; a validated screening tool (unverified, to research) | Section 2 pages |
| 21 | Trend method | How many weeks of weight data are needed before changing intake? | Rows 5, 6, 28; Europe PMC; convention until sourced | Weekly review rule |
| 22 | Reviewers | Who signs off? | Owner names a registered dietitian or doctor | Leaving draft |

---

## 5. Architecture

### 5.1 Stack

One Astro stack, as for every section. Content in YAML or Markdown collections with Zod schemas, pages that only lay data out, one layout (`Base`), shared components, colours from tokens only. No new dependency, no analytics, no accounts, and nothing the reader types is stored or sent.

### 5.2 URL map (all trailing-slash, all under `/nutrition/`)

```
/nutrition/                          hub: who it is for, scope, draft status, how the numbers are sourced
  start-here/                        scope checks, referral list, red flags, how to use the site
  energy-and-protein/                the method: equations, activity factors, protein ranges, adjusting by weekly trend
  goals/                             index
    weight-loss/  maintenance/  weight-gain/  recomposition/
  patterns/                          index; one page each:
    omnivore/  lacto-vegetarian/  ovo-lacto-vegetarian/  vegan/  jain/  pescatarian/
    mediterranean-style/  low-carbohydrate/  time-restricted-eating/  high-protein/
  foods/                             index with edition register
    india/                           staples, protein in vegetarian diets, oil and ghee, portions in grams
    japan/                           staples, soy and fish, sodium, convenience-store foods, portions in grams
  plans/                             example-day templates by goal, pattern and cuisine
  vitamins-minerals/                 index; one page per nutrient
  supplements/                       index; one page per supplement; anti-doping and testing; "claims to be sceptical of"
  tracking/                          weekly trend, review rule, when to stop tracking
  evidence/                          claims, grades, sources, editions
```

Anchors follow the site pattern: `#claim-<id>`, `#<nutrient-id>`, `#<supplement-id>`. The `nutrition` entry in `sections.yml` gets its `nav` and `footer` only when the section goes live.

### 5.3 Proposed collections and schemas

All live under `src/content/nutrition/` and are registered in `src/content.config.ts` by the executive. Every record has `id`, `order` (explicit and unique within its collection), `status` (`draft` until `review` is complete) and `review: { by, on }` (empty while draft). **Every numeric field is an object `{ value, unit, source, population }`**, so no bare number exists. Names only; fields in the order a reviewer would read them.

| Collection | One record per | Fields |
|---|---|---|
| `nutritionScope` | the standard exclusion (section 2.2) | `id` (the eight ids), `text`, `referral` |
| `foods` | food, in one file per cuisine | `id`, `name` (English, local name, script), `cuisine` (`india`, `japan`, `general`), `category`, `state` (`raw`, `cooked`, `dry`, `prepared`), `per100g` (energy, protein, fat, carbohydrate, fibre, sodium, optional micronutrients, each `{value, unit}`), `database` (a `sources` id), `entryId` (the database's own code), `valueTier` (`database`, `label`, `calculated`), `portions` (`{label, grams, source}`, grams required), `contains` (flags: `meat`, `fish`, `egg`, `dairy`, `honey`, `root-vegetable`, `alcohol`, `pork`, `beef`, `gluten`, `nuts`, `soy`, `shellfish`), `note` |
| `dietPatterns` | pattern | `id`, `name`, `kind`, `summary`, `excludes` (the `contains` flags it removes), `known` (claim ids), `unknown`, `suits`, `watch` (`{nutrient, why, claim}`), `avoidIf` (scope ids and text), `culturalNote` |
| `goalTemplates` | goal | `id`, `goal` (`loss`, `maintenance`, `gain`, `recomposition`), `summary`, `energyMethod` (a `methods` id), `adjustment` (`{kind: qualitative | numeric, value?, source?}`), `protein` (`{lowGPerKg, highGPerKg, basis, population, source}`), `fatNote`, `carbNote`, `reviewRule`, `watch`, `scope` (all eight scope ids), `trainingLink`, `claims` |
| `methods` | calculation | `id`, `name`, `appliesTo` (population), `source`, `formula` (structured coefficients), `errorMargin` (`{pct, source}`), `activityFactors` (`{label, value, source}`), `regionNote` (for example the Indian and Japanese overestimation findings, rows 3 and 4) |
| `planTemplates` | example day | `id`, `goal`, `pattern`, `cuisine`, `referenceBodyWeightKg` (a generic reference adult, not a person), `meals` (`{name, items: [{food, grams}]}`), `budget`, `cookingMinutes`, `scope`, `note`. **Totals are computed at build, never stored** |
| `nutrients` | vitamin or mineral | `id`, `name`, `kind`, `role`, `foodSources` (foods and cuisines), `atRisk` (`{group, claim}`), `reference` (`{value, unit, authority, edition, population}`), `upperLimit` (`{value, unit, authority, edition, population, scope}`) **or** `noUpperLimitSet: {authority, edition, statement}`, `interactions`, `avoidIf`, `performanceClaims`, `seeClinician`, `claims` |
| `supplements` | supplement | `id`, `name`, `category`, `evidenceGrade`, `outcomeStudied`, `population`, `dose` (`{low, high, unit, source, population}`), `upperIntake` (`{value, unit, source}`) **or** `noUpperLimitSet`, `form`, `timing` (only if sourced), `adverse`, `interactions`, `avoidIf`, `antiDoping` (`{note, listYear, checkedOn}`), `thirdPartyTesting`, `foodFirst`, `claims` |
| `sources` (existing) | paper or authority | add optional `edition` and `accessedOn`, and a `database` type, so a database or guideline without a DOI carries its edition. Papers keep `doi` and `verifiedOn` |
| `claims` (existing) | claim | `claims/nutrition.yml`, `kind: nutrition`, `section: nutrition` (already allowed by the schema) |

### 5.4 How numbers reach a page

- Pages never type a nutrient number. They render a component bound to a record, for example `<Intake of="protein-range-resistance-trained">` or `<FoodRow food="dal-toor-cooked">`. Each shows its source and edition beside the number.
- Meal and day totals are summed at build from `foods`. A mismatch between a quoted figure and the computed one fails the build.
- Do not mix databases inside one meal without a visible note (`planTemplates` lists the databases it uses).
- Quote rounded values and say the values are averages of samples.
- Raw and cooked values are matched to the state of the food in the meal.

### 5.5 Validator rules (executive-owned `scripts/check-content.mjs`)

| Rule | Fails when | Reason |
|---|---|---|
| N1 numbers have sources | any intake, target, limit or food value lacks `source` and `population`, or its source id does not exist | Nothing from memory |
| N2 editions | a `database` or URL-only source lacks `edition` and `accessedOn`; a DOI source lacks `verifiedOn` | Edition rule, existing Crossref rule |
| N3 every supplement has an upper limit | `upperIntake` and `noUpperLimitSet` are both missing; or a `dose` exists without an upper intake; or a `dose.high` exceeds a same-unit upper intake | "No dose without a sourced upper intake" |
| N4 every nutrient has an upper limit or a stated absence | neither `upperLimit` nor `noUpperLimitSet` | Same |
| N5 supplement safety fields | `interactions`, `avoidIf`, `antiDoping`, `thirdPartyTesting`, `foodFirst` or `claims` missing | Skill checklist |
| N6 grade follows the claims | `evidenceGrade` differs from the lowest grade of its claims | Grade drift |
| N7 totals computed | a stored total exists, or a page figure differs from the computed one | Single source of truth |
| N8 state and basis | a food lacks `state`, `database`, `entryId`, per-100 g basis or a portion in grams | Raw and cooked differ greatly |
| N9 patterns respected | a plan template contains a food whose `contains` flag is in its pattern's `excludes` | Cultural and religious patterns |
| N10 scope present | a goal, pattern, plan or supplement record lacks all eight scope ids; or a rendered `/nutrition/` page lacks the scope component (a test, like the other sections' safety components) | Scope on every page |
| N11 no bare numbers in page prose | `src/pages/nutrition/**` contains a number followed by kcal, g, mg, µg, mcg or IU outside a bound component | Numbers come from data |
| N12 qualitative until sourced | a goal template has `adjustment.kind: numeric` without a source whose type is `guideline`, `consensus` or a Crossref-verified paper | Gap 1 |
| N13 nutrition outcome-promise set | see below | The existing set blocks the words this section must use |

**N13, and a point to settle.** The current outcome-promise pattern in `check-content.mjs` (`lose weight`, `weight loss`, `burn fat`, `tone`, `guaranteed` and others) is applied to guide exercises and to claims whose section has guide groups (lines 187 and 191). A `nutrition` claim is **not** caught today, because the nutrition section has no guide groups, but the pattern would fail the ordinary phrase "weight loss" if it were widened or if a nutrition page ever used the guide collections. Nutrition therefore needs its **own** set, which **allows** "weight loss" and "weight gain" as topic names and **blocks** detox, cleanse, flush, "boost(s) metabolism", "fat burner", superfood, "melt", "belly fat", spot-reduce, tone, guaranteed, "cure", "treat(s)" and "prevent(s)" a disease, "before and after", brand names from a maintained list, and timeline promises (a number of kilograms or pounds with "in", "within" or "per" a number of days, weeks or months). The executive owns the script.

Every rule needs a negative test: break the data on purpose and see the build fail, as the earlier plans did.

---

## 6. Content design

### 6.1 Goal templates (as data, one per goal)

Template: `Goal`, `Pattern`, `Day structure` (meals, protein anchors, example foods), `Targets` (energy, protein, other, each with source and population), `Adjust` (weekly review rule), `Watch`, `Scope`, `Sources`. The method on each goal page:

1. **Who this is for.** A healthy adult with the scope checks passed (section 2). Intake questions become the page's "who this is for" list: goal, activity, training days, pattern, exclusions (culture, religion, ethics, allergies), budget, cooking time.
2. **Energy estimate.** A published equation plus an activity factor, shown with its margin of error (row 2: within 10% for most people, with noteworthy individual errors). For Indian and Japanese readers the page shows the regional findings (rows 3 and 4: some common equations overestimate) and says the result is **a starting estimate to adjust against the weekly weight trend**. The 3,500 kcal rule is explicitly rejected (row 6).
3. **Goal adjustment.**
   - *Loss:* a moderate deficit, qualitative until gap 1 is closed. Rows 7 and 8 are shown as athlete evidence only: slow loss kept more lean mass, and deficits impair lean-mass gains while strength is comparable.
   - *Maintenance:* the estimate, adjusted by trend.
   - *Gain:* a small surplus judged by trend; the size is unknown (row 10).
   - *Recomposition:* near maintenance with resistance training. Marked **thin evidence** (gap 4).
4. **Protein.** A range, with its population, never a single magic number: 1.4 to 2.0 g/kg/day for most exercising people and higher in resistance-trained people in a deficit (row 15); about 1.6 g/kg/day as the point beyond which supplementation trials found no further fat-free-mass gain (row 14, existing claim `protein-intake`). Linked to the strength section's protein principle rather than restated (section 6.3). No upper safe intake is shown until it is sourced (gap, section 4 row 5).
5. **Fat and carbohydrate.** From the position statements and national authorities once read (section 4, row 7). Until then: qualitative.
6. **Meal structure.** Timing and frequency are **adherence tools**: row 16 found total protein the strongest predictor and timing not significant once other factors were controlled.
7. **Tracking and review.** Weekly average weight or waist, not daily weight; non-scale signals; review every few weeks. The cadence is a **convention (grade D)** informed by rows 5, 6 and 28. Self-weighing was not linked to adverse psychological outcomes in the studied adults (row 28) but calorie counting was linked to eating-disorder symptoms in two cross-sectional studies (rows 29 and 30), so the page offers a non-counting route and a "stop tracking if it harms you" note. Plans tolerate imperfect weeks.
8. **Training link.** Resistance training supports lean mass in a deficit (rows 8 and 9). Details are requested from `strength-coach`.

### 6.2 Diet patterns

Each pattern page: what is known (graded claims), what is not, who it suits, nutrients to watch, who should avoid it, and a cultural note. Patterns are presented neutrally; **the best pattern is the one a person can sustain safely**, and the WHO fact sheet (26 January 2026, read) says healthy diets come in many forms.

| Pattern | Evidence available | Nutrients to watch | Notes |
|---|---|---|---|
| Omnivore | Whole-diet evidence is mostly the general rows above | None specific | The default comparator |
| Lacto-vegetarian, ovo-lacto-vegetarian, Jain | Rows 22, 23, 24; **no pattern-specific study found** for Jain (gap 6) | B12, iron, zinc, vitamin D, protein planning | Jain: no root vegetables as a `contains` flag; shown as an exclusion filter |
| Vegan | Rows 19, 22, 23, 24 | **B12 from fortified food or a supplement** (row 22), iron, iodine, calcium, zinc, omega-3: only B12 and iron are sourced so far | Equal muscle gain at matched protein in one small trial (row 19) |
| Pescatarian | None found | Iodine, mercury (to research) | Composition page only |
| Mediterranean-style | Row 21 (association, observational input) | None specific | See open question 6 |
| Low-carbohydrate | Rows 11, 20: similar weight loss to low-fat at six months | Fibre, micronutrients (to research) | Not for the scope groups in section 2.2 |
| Intermittent or time-restricted | Rows 11, 25, 26 | Adequate protein and energy for training | No advantage over daily restriction in a 12-month trial (row 25). **Religious fasting is a separate respectful note**, not a diet to optimise |
| High-protein | Rows 9, 14, 15 | Kidney caveat (scope), fibre | Protein ranges, not a target to maximise |

### 6.3 Reuse and overlap with the strength section

The strength section already has `/strength/principles/protein/` and the claim `protein-intake` (sources `morton-2018-protein` and `nunes-2022-protein`, both verified). One concept, one source of truth: the nutrition protein content **links to and reuses** them and adds the deficit, vegetarian and regional context. Any difference in wording between the two sections is reported rather than left to drift (the same logic as D-003).

### 6.4 Indian and Japanese food sections

**Rule:** foods are named from knowledge, **values only from a database with its edition**. If a database is unreachable or a food is missing, the page says so and does not estimate.

**India.** Primary database: IFCT 2017 (Longvah et al., ICMR-NIN). Cross-check: USDA FoodData Central, with the dataset type and identifier noted, and the INDB (row 40). First-pass food list, names only: rice, wheat roti, ragi, jowar and bajra, the main dals and pulses, chickpeas and rajma, soya chunks, curd, milk, paneer, groundnuts, common vegetables, ghee and oil, eggs, fish and chicken. Planning points:

- Protein in vegetarian patterns from pulses, dairy, soy, nuts and seeds, reaching a target **without excess energy**.
- Oil and ghee as concentrated energy. The ICMR-NIN brief note (row 4) gives a daily visible-fat range and an example for a 2,000 kcal diet. It is the starting source to read in full.
- Portions: a katori or a roti is **never** used until a source defines it in grams (section 4, row 19). Grams are the base.
- B12, iron and vitamin D in vegetarian patterns: rows 22 to 24 and 42 are the evidence so far, with gap 6 stated on the page.
- Regional variation is wide. The first build avoids implying one "Indian diet".

**Japan.** Primary database: Standard Tables of Food Composition in Japan, 2020 (Eighth Revised Edition) with the 2023 supplement and its March 2026 errata, plus the amino acid, fatty acid and carbohydrate tables where used. Cross-check: USDA FoodData Central. First-pass list: cooked rice, onigiri, udon and soba, tofu, natto, miso, eggs, fish (salmon, mackerel), seaweed, pickles, chicken, pork, milk and yoghurt, edamame. Planning points:

- Sodium in miso, pickles and prepared foods (source to read: Japan DRI 2025, section 4, row 10).
- Rice portions in grams; how fish intake is counted.
- Convenience-store foods as an everyday protein source, shown as **generic categories** (for example "boiled egg", "cooked chicken salad") valued from the national tables, never by shop or brand. A label value is used only if flagged `valueTier: label`.
- Seaweed and iodine (row 41): a caution against iodine supplements, to be checked against the Japan DRI 2025 upper limit before it is written.
- Adapting the pattern for a vegetarian or high-protein goal.

**Cross-cultural.** A pattern is never "corrected". The page shows how to meet a goal inside it, with a few budget-limited and time-limited options.

**First data scope (phase 4):** about 40 foods per cuisine and a handful of example days, to prove the pipeline before growing.

### 6.5 Vitamins, minerals and supplements

**Per-nutrient page**, following the skill: what it does; food sources in Indian, Japanese and other diets; who is at risk of low intake and why (sourced); the intake reference and the **upper limit**, each with authority, edition and population; interactions and who should not take it; any performance claim with a grade (and "only seen in deficiency" where that is true); when to see a doctor.

- **First batch** (sourced pattern risks): vitamin B12, iron, vitamin D, calcium, iodine, zinc.
- **Second batch:** magnesium, potassium, sodium, folate, vitamin A, vitamin C, omega-3 fats.
- Row 36 gives an important framing: for healthy adults the evidence does not support routine vitamin or mineral pills for disease prevention, and two (beta-carotene, vitamin E) are advised against for that purpose. The pages say "food first" and do not suggest a general multivitamin.

**Per-supplement page**, following the skill: evidence grade and the outcome studied in whom; dose range and upper limit from a named source; form and timing only if sourced; adverse effects; interactions; who should avoid it; the label-accuracy warning; third-party testing; anti-doping. Priority order, each by evidence:

| Supplement | Evidence so far | First thing to check |
|---|---|---|
| Protein powders | Row 14: supplementation added small gains in trials; row 16: total intake matters most | Contamination (rows 37 to 39); kidney scope |
| Creatine | Rows 32, 33 | Safe intake and kidney statements (full text, section 4 row 12) |
| Caffeine | Rows 32, 34 | EFSA safe intake (section 4, row 12) |
| Vitamin D | Row 35: no overall strength effect in athletes; row 42 on Indian status | Upper limit; clinician-diagnosed status |
| Omega-3, beta-alanine, nitrate, buffering agents | Row 32 names nitrate and buffering agents as having good evidence; row 12 mentions beta-alanine in contest preparation (narrative); nothing collected on omega-3 | Everything: unverified, to research |
| Multivitamin | Row 36: insufficient evidence for prevention | Upper limits per nutrient |
| "Be sceptical of" page | Rows 37 to 39 on contamination | Fat burners, prohormones, "test boosters": described as risks, not rated products |

**Athletes.** Every supplement page says: supplements can contain prohibited substances (rows 37 to 39); under strict liability an innocent source is no defence (row 37); check the current WADA List (the 2026 List was served on 2026-11-15, section 4 row 14) and the national anti-doping organisation; use independent third-party testing where it exists, noting that **testing reduces but does not remove risk**; and **never** a statement that a product is safe for testing. Whether to name certification programmes is open question 5. No brand names, ever.

### 6.6 Quality gates (same pattern as the other plans)

| Gate | Check | Who or what |
|---|---|---|
| Schema | Records valid, references resolve | Automated |
| Sources | Every number has a source; DOIs verified on Crossref; editions recorded | Automated plus researcher |
| Grading | Every claim graded, limits stated; "Mixed" shows both sides | Researcher |
| Safety | `safety-review` nutrition section passes on every page | Nutrition coach, then executive |
| Clinical | Scope, red flags, upper limits, patterns reviewed | **Registered dietitian or doctor (to be named)** |
| Culture | Pattern pages respect, not correct | Reviewer from the relevant community if possible (open question 7) |
| Accessibility | Keyboard, contrast, text alternatives | Automated plus manual |
| Copy | British spelling, plain language, no outcome promises | Editor |

---

## 7. Phases and acceptance criteria

| Phase | Deliverable | Done when |
|---|---|---|
| 0 | This plan; the tile stays "Coming soon" | The owner approves, or changes, the plan and answers section 8 |
| 1 | **Research completion and approvals.** Close the gaps that block pages: rows 1, 2, 5, 9, 11 and 12 of section 4; resolve licences (section 8, question 2); add the section 3 sources to `sources.yml` and verify them | Each closed item has a read abstract (or full text for authorities), a Crossref-confirmed DOI, an edition and a graded claim. Reachability of each authority recorded. Items that cannot be closed are marked "unverified, to research" and keep their pages out of the build |
| 2 | **Foundations and method.** Schemas, validator rules N1 to N13, the scope component, `nutrition` hub, `start-here`, `energy-and-protein`, `tracking`, `evidence` pages. No food values yet | Every rule has a negative test that fails when the data is broken on purpose; scope component present on every page; `npm run check` and `npm run build` pass; Playwright covers every new page; no console errors; draft labels |
| 3 | **Goals and patterns.** Four goal pages and the pattern pages, with claims graded and limits stated | Every number bound to a record; no numeric deficit without a source; the safety review passes with notes recorded; patterns respectful |
| 4 | **Regional foods.** India and Japan food data (about 40 foods each) and example days | Every value traces to a database entry and edition; totals computed; no database mixed silently; licence position recorded and followed; raw and cooked matched |
| 5 | **Vitamins and minerals.** First batch, then second | Each has a reference intake and an upper limit (or a stated absence) from a named authority with edition, interactions, who should avoid it, at-risk groups and "see a doctor" text |
| 6 | **Supplements.** Priority list and the "be sceptical of" page | Each supplement meets N3, N5 and N6; anti-doping and third-party-testing notes present; no brand names; the current WADA List year recorded |
| 7 | **Review.** Named registered dietitian or doctor reviews scope, red flags, limits and patterns | Sign-off recorded per page; status moves from draft |
| 8 | **Make the tile live** | The owner decides. **My recommendation:** not before phases 1 to 3 and a first clinician review of the scope and red-flag text. The strength tile precedent allows going live while labelled draft, so this is the owner's call |
| Optional | **Calculator** | Only if the owner approves a client script (question 4): runs in the browser, stores and sends nothing, shows margins of error, refuses to give results outside the scope checks, tested for accessibility |

---

## 8. Risks and open questions for the owner

| # | Risk or question | Recommended default |
|---|---|---|
| 1 | **Reviewers.** Who is the registered dietitian or doctor who signs off? Without one, every page stays draft | Owner names one before phase 7. No page is called reviewed until then |
| 2 | **Food-data licence.** IFCT 2017's front matter says no part may be stored or reproduced electronically "for creating a product" without written permission from NIN. MEXT, USDA and INDB terms were not read | Ask NIN in writing (owner decision). Meanwhile phase 4 does not start. Fallbacks, in order: a permitted open dataset (INDB, if its licence allows), a very small attributed set of rounded values (legal view needed, outside my competence), or foods and portions without values |
| 3 | **A wrong web address.** The address printed in IFCT 2017 (`ifct2017.com`) now redirects to an unrelated site (checked 2026-11-15) | Never link it. Link the NIN-hosted PDF and record the edition |
| 4 | **Calculator** adds client script | Off by default. Approve only after phase 3 |
| 5 | **Naming certification programmes** for third-party testing | Default: do not name them on pages; name the idea and point to the anti-doping organisation. An endorsement risk, and the "no brand" rule |
| 6 | **How far can pattern pages mention health outcomes?** "No disease claims" is a hard rule, but row 21 reports associations with lower mortality | Allow graded, population-stated associations only, never as treatment or prevention advice, and never aimed at people in scope group lists. Confirm |
| 7 | **Cultural review.** Indian and Japanese pattern pages are written by an AI from sources | Owner may name a reader from each community; absent that, say "not culturally reviewed" |
| 8 | **Disordered-eating risk** from any weight content | Optional tracking, no calorie-target push, red flags and stop rules, a clinician-reviewed wording (section 4, row 20) |
| 9 | **Weight-loss eligibility BMI** has no sourced number | Show no weight-loss template until gap 2 is closed |
| 10 | **Verifier limits.** The new `database` source type and `edition` field need schema and verifier changes | Executive approval; the verifier stays Crossref-only for DOIs |
| 11 | **Validator wording (N13).** The shared outcome-promise pattern blocks "weight loss" in guide sections and is not applied to nutrition today, but nutrition needs its own phrase set | Executive adds a nutrition set before phase 2 |
| 12 | **Evidence is abstract-level and athlete-heavy.** Many sources are position stands and athlete trials | Say so on pages; a reviewer reads full texts before anything leaves draft |
| 13 | **Ageing sources.** Two contamination studies are 20 or more years old | Find recent data in phase 1 or say they are dated |
| 14 | **Requests to other agents** | Listed in the report for the executive to route |

---

## Appendix A: authorities, databases and editions

Opened or fetched on **2026-11-15**. "Read" says what I actually read.

| Authority | Edition or date found | URL (as reached) | Read, and reachability |
|---|---|---|---|
| ICMR-NIN, Indian Food Composition Tables | 2017 (Longvah T, Ananthan R, Bhaskarachary K, Venkaiah K), 585-page PDF | `https://www.nin.res.in/ebooks/IFCT2017_16122024.pdf` | Front matter and citation read. Terms of use read (section 8, question 2). `www.ifct2017.com`, printed in the book, **redirected to an unrelated site** |
| ICMR-NIN, Nutrient Requirements, RDA and EAR for Indians | 2020 (the NIN pages are labelled 2024; confirm there is no newer edition) | `https://www.nin.res.in/rdabook/brief_note.pdf` | Six-page brief note read; full report not read |
| ICMR-NIN, Dietary Guidelines for Indians | 2024 | `https://www.nin.res.in/dietaryguidelines/index.html` | Reached (document viewer); text not read. Edition confirmed by row 43 |
| MEXT, Standard Tables of Food Composition in Japan | 2020 edition (Eighth Revised Edition), Supplement 2023, errata dated 27 March 2026 | `https://www.mext.go.jp/a_menu/syokuhinseibun/mext_00001.html` | Page read (Japanese); tables not opened. Usage conditions page not read |
| MEXT online food composition database | Reflects the Eighth Revised Edition including the 2023 update; last updated 9 June 2026; labelled a trial release | `https://fooddb.mext.go.jp/` | Page read. The site says to cite the MEXT publication, not the database |
| MHLW, Dietary Reference Intakes for Japanese | 2025 edition, used FY2025 to FY2029 (2020 edition was the previous one) | `https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/eiyou/syokuji_kijyun.html` | Page read; report not read |
| USDA FoodData Central | Foundation Foods and Branded, October 2026; SR Legacy, April 2018; FNDDS 2021 to 2023 | `https://fdc.nal.usda.gov/download-datasets` | Page read. Licence terms not read |
| FAO/WHO/UNU, Human energy requirements | Rome, 2004 (consultation held 2001) | `https://www.fao.org/4/y5686e/y5686e00.htm` | Contents page only |
| EFSA, Tolerable Upper Intake Levels for Vitamins and Minerals | February 2006 overview; later per-nutrient opinions exist | `https://www.efsa.europa.eu/sites/default/files/efsa_rep/blobserver_assets/ndatolerableuil.pdf` | Cover and front matter read; I did not list the later updates |
| EFSA, Dietary Reference Values | Topic page last reviewed 5 August 2024; summary report 2017 (doi:10.2903/sp.efsa.2017.e15121, Crossref-confirmed) | `https://www.efsa.europa.eu/en/topics/topic/dietary-reference-values` | Page read; summary report not read |
| EFSA, safety of caffeine | Scientific Opinion, 2015 (doi:10.2903/j.efsa.2015.4102, Crossref-confirmed) | via DOI | **Not read** |
| NIH Office of Dietary Supplements | Fact sheets (dates per fact sheet) | `https://ods.od.nih.gov/` | **Not reached: HTTP 403 to my automated request.** Open in a browser |
| WADA, Prohibited List | 2026 List served on 2026-11-15; the page says the new List is published each October and in force from 1 January, and links to 2027 Code and Standards | `https://www.wada-ama.org/en/prohibited-list` | Page read. Check for a 2027 List |
| Australian Institute of Sport, Sports Supplement Framework | Current page (no edition date seen); ABCD classification described | `https://www.ausport.gov.au/ais/nutrition/supplements` | Page read; the classification sub-pages were not found at the URL I tried |
| WHO, Healthy diet fact sheet | 26 January 2026 | `https://www.who.int/news-room/fact-sheets/detail/healthy-diet` | Opening sections read |
| NICE, Overweight and obesity management (NG246) | Not confirmed | `https://www.nice.org.uk/guidance/ng246` | **Not reached: HTTP 403.** Open in a browser |
| NHS, Eatwell Guide | Not confirmed | `https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/the-eatwell-guide/` | Reached (HTTP 200); not read |

---

## Appendix B: how the evidence was gathered

**Method.** Europe PMC REST search (`curl`, `resultType=core`) by title, then the abstract read, then Crossref (`https://api.crossref.org/works/<doi>`) for title, year and update notices. The system Python lacks CA certificates, so `curl` did the fetching. Europe PMC can link a wrong DOI, so each title was confirmed on Crossref. The author lists came from Europe PMC.

**Searches that found sources** (exact titles were used, then checked): resting-energy equations (Mifflin; the Frankenfield review; the Japanese validation), the 3,500 kcal rule, energy imbalance modelling, slow versus fast weight loss in athletes, energy deficiency and resistance training, energy surplus, high versus lower protein in a deficit, contest-preparation nutrition, Asian BMI, protein supplementation (Morton and its correction), the ISSN protein, diets and body composition, caffeine and creatine position stands, protein timing, protein per meal, the joint position on athletic nutrition, named diets, the Mediterranean umbrella review, the vegetarian position papers (2016, and the retracted 2015 version), plant-based versus omnivorous training, B12 in vegetarians, iron in vegetarians, time-restricted eating (NEJM) and an intermittent-fasting umbrella review, self-monitoring and self-weighing, calorie-tracking and eating-disorder studies, the 2023 REDs consensus, the IOC supplements consensus, vitamin D and athletes, the USPSTF vitamin statement, supplement contamination (three papers), Indian vitamin D and nutrient databank papers, Japanese iodine and seaweed, Dietary Guidelines for Indians.

**Searches that found nothing usable** (so the gaps in section 3.4 are real for this search method, not for the literature as a whole):
- The commonly cited body recomposition review (exact title): 0 hits.
- Energy-equation validation in Indian adults (three queries): 0 usable hits.
- B12 in Indian vegetarians and Indian vegetarian diet adequacy (title searches): 0 hits.
- Japanese vegetarian nutrient intake (title search): 0 hits.
- "Vitamin D supplementation and muscle strength" returned several meta-analyses; I used the one in athletes only.
- A national dietary guidelines document for India and a nutrient-requirements document for India are **not** papers, so they sit in Appendix A, not here.

**What I did not verify.**
- Full texts of any paper.
- The contents of the ICMR-NIN full RDA report, the Dietary Guidelines for Indians 2024, the Japan DRI 2025 report, the MEXT tables, the EFSA opinions (beyond the 2006 cover) and every NIH ODS fact sheet.
- The licence terms of MEXT, USDA and INDB.
- The 2020 correction to row 14 beyond its competing-interest text, and the corrections noted on rows 31 and 40.
- That each paper's abstract matches its full text.
- Anything on NICE NG246.
- The 2027 WADA List.
- Whether the Dietary Guidelines for Indians 2024 and the RDA 2020 are the current editions: the NIN pages carry both 2020 and 2024 labels.
