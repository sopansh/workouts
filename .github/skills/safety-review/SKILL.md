---
name: safety-review
description: The content safety checklist for every exercise, plan, injury and nutrition page on workouts.theroningamer.com. Use before reporting any content as done, and when reviewing another coach's work.
---

# Safety review

The pages reach strangers we cannot see. Pass every applicable item or mark the content blocked. A passing build is not a safety review.

## Every exercise

- [ ] Contraindications, a regression (easier version), a progression (harder version) and a pain rule that points at a shared rule in `pain-rules.yml`.
- [ ] The pain rule matches the joint at risk (wrist work uses `wrist`, jumps use `jumping`, and so on). Add a new shared rule rather than a one-off sentence.
- [ ] "Do not do this if" names the conditions that stop the exercise, not generic text.
- [ ] Equipment that carries load (table, doorway bar, box, rack) has an "only if" check and a no-equipment alternative.
- [ ] Prerequisites or gates exist for anything with a fall, impact, inversion or sustained straight-arm load.
- [ ] No claim of what the exercise "targets" without a graded claim.

## Every plan

- [ ] Sessions are not on consecutive days, volume starts low, and the first week is deliberately easy.
- [ ] Rest, deload or repeat-the-week guidance exists, with a rule for holding or stepping back after pain, illness or a break.
- [ ] A stated session length, with the estimate method.
- [ ] The scope note: not a personal prescription, not reviewed by a physiotherapist or coach, draft.

## Scope and language

- [ ] General education for healthy adults. Out of scope with a clinician pointer: under-18s, pregnancy and postnatal, frailty and older-adult programmes, heart, lung, joint or neurological conditions, current injury.
- [ ] The PAR-Q+ and "speak to a GP first" note appears on beginner pages.
- [ ] No outcome promises, no body-image or sex-targeted claims, no "fix", "cure" or "heal".
- [ ] No diagnosis. No individual rehabilitation or return-to-play plan.
- [ ] Red flags that mean "see a clinician" are listed where pain is discussed (sudden weakness, numbness, night pain, bladder or bowel change with back pain, pain not improving in two to three weeks).
- [ ] No personal, medical or identity details about any real person. The repo is public.

## Injury and sport content

- [ ] Education, not treatment: what is commonly injured, what training is associated with lower risk (graded), what to do when it hurts, when to see a clinician.
- [ ] Return-to-play and rehab are described as clinician-led.
- [ ] Evidence for any prevention claim is verified and graded, with the population stated.

## Nutrition content

- [ ] Scope exclusions shown: under-18s, pregnancy and breastfeeding, diabetes and kidney, liver, heart or digestive conditions, disordered-eating history, interacting medication.
- [ ] No crash or very-low-energy plan, no fixed timeline promise, no spot reduction, no detox, no disease claims.
- [ ] Every intake number, upper limit and food value comes from a named authority or database with the edition recorded.
- [ ] Supplements: evidence grade, upper intake, interactions, who should avoid them, third-party testing and anti-doping note for athletes, "food first" framing.
- [ ] Dietary patterns driven by culture, religion or ethics are respected.

## Result

State `pass`, `pass with notes` or `blocked`, list failed items with file and line, and say what correction is needed. Unresolved safety items go in the report under "Safety" and "Open".
