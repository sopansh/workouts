---
name: diet-plan-design
description: Designs diet-plan templates and goal guidance (weight loss, maintenance, weight gain, body recomposition, sports nutrition) across diet patterns for workouts.theroningamer.com, with the safety scope, evidence method and the plan document required before any nutrition pages are built. Use when asked for a diet plan, calorie or weight goals, or to start the nutrition section.
---

# Diet plan design

The nutrition section is a "Coming soon" tile. Nothing is built. **First deliverable: `docs/nutrition-plan.md`**, modelled on `docs/hypertrophy-plan.md` (scope, safety stance, evidence table with gaps, architecture, phases, acceptance criteria). The owner approves it before pages exist.

## Scope and referral

General education for healthy adults. Out of scope, with a "see a doctor or registered dietitian" note: under-18s, pregnancy and breastfeeding, diabetes, kidney, liver, heart or digestive conditions, a history of disordered eating, medication that interacts with food or supplements, and any clinical deficiency or unexplained weight change. No crash or very-low-energy plans. No fixed-timeline promises. No spot reduction. No detox. No disease claims. No brand endorsements.

## Method (every number needs a named source)

1. **Intake** (for a chat plan, ask; for the site, it becomes the page's "who this is for"): adult, health scope check, goal, activity level, training days, body size, diet pattern, food preferences and exclusions (culture, religion, ethics, allergies), budget and cooking time.
2. **Energy estimate.** Use a published predictive equation, an activity factor and a stated margin of error. Look up and verify the equation and the activity factors from a source and name it on the page. Say plainly that the result is an estimate to adjust against real weight trend over weeks.
3. **Goal adjustment.** A moderate deficit for loss, a modest surplus for gain, near maintenance for recomposition with resistance training. The size and the safe rate of change come from a verified authority. If none is found, say so and keep the guidance qualitative.
4. **Protein, fat, carbohydrate.** Take ranges from consensus statements or position stands (look them up and verify; see `micronutrients-supplements` for authorities). State the population studied.
5. **Meal structure and distribution.** Meal timing and frequency are adherence tools unless a graded source says otherwise.
6. **Adherence and tracking.** Weekly average weight or waist trend, not daily weight; non-scale signals; a review cadence and a rule for adjusting. Plans must tolerate imperfect weeks.
7. **Training link.** Resistance training supports lean mass during a deficit: ask the executive for the training side from `strength-coach`.

## Diet patterns to cover (each graded, with limits)

Omnivore, lacto-vegetarian and ovo-vegetarian, vegan, Mediterranean-style, low-carbohydrate, intermittent or time-restricted eating, high-protein. For each: what is known, what is not, who it suits, nutrients to watch (for example vitamin B12 in vegan patterns), and who should avoid it. Present patterns neutrally: the best pattern is the one a person can sustain safely.

## Template for a goal plan (as data)

```
Goal: <loss | maintenance | gain | recomposition>
Pattern: <diet pattern>
Day structure: <meals, protein anchors, example foods from food-databases-regional>
Targets: <energy, protein, other, each with source and population>
Adjust: <weekly review rule>
Watch: <nutrients and red flags>
Scope: <exclusions, referral>
Sources: <graded claims, gaps>
```

## Architecture proposal (needs executive approval)

Propose new collections (for example foods, diet patterns, plan templates, nutrient references) with Zod schemas, a `claims/nutrition.yml`, validator rules (every intake number has a source, every supplement has an upper intake) and pages under `src/pages/nutrition/`. A client-side calculator is optional and needs the owner's approval because it adds script to a static site.

## Safety

Apply the nutrition section of `safety-review`. Never write a plan for a named real person into the repo.
