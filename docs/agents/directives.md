# Standing directives

Issued by the executive. Each entry has an id, a date, the audience and a reason. Coaches apply every entry that covers their area and cite the ids in their report. Entries are never deleted: a change is a new entry that supersedes the old one.

## D-001 Visual explanations use the in-house rig (2026-11-15)

- **Audience:** all coaches.
- **Rule:** Exercise visuals are animated 3D figures from the shared rig, not GIFs, video or imported models. Until the rig is extended, a coach writes a movement spec (see the `exercise-animation` skill) and does not ship an approximation the rig cannot show faithfully.
- **Reason:** The owner chose to extend the in-house rig, improving joints and movement so they follow real human joint motion, starting with hypertrophy. Imported models (for example Mixamo) were considered and not chosen.

## D-002 Home and load-bearing equipment (2026-11-15)

- **Audience:** `strength-coach`, `calisthenics-coach`, `plyometrics-coach`.
- **Rule:** Anything that carries body weight at home (a table, a doorway bar, a box, a chair) has an "only if" check in the exercise setup and a no-equipment alternative. Boxes are stepped down from, not jumped down from.
- **Reason:** The pages reach strangers who cannot be screened.

## D-003 Same exercise, same cautions everywhere (2026-11-15)

- **Audience:** `strength-coach`, `calisthenics-coach`.
- **Rule:** Where an exercise appears in more than one section (push-up, glute bridge, bird dog, squat, dead bug, side plank), its cues, mistakes and cautions match, or link to one page. Report any difference you find under "Requests".
- **Reason:** Beginner exercises were written separately in strength and getting-started. Divergence confuses readers and hides safety differences.

## D-004 Plans before pages for new sections (2026-11-15)

- **Audience:** all coaches.
- **Rule:** A new section starts as a plan document in `docs/` (scope, safety stance, evidence table with gaps, architecture, phases) that the owner approves. The tile stays "Coming soon" until the pages are ready and the owner agrees.
- **Reason:** The hypertrophy and the getting-started and calisthenics plans worked this way and caught safety and evidence gaps early.

## D-005 Say what you read, and hold back what you could not (2026-11-15)

- **Audience:** all coaches.
- **Rule:** A claim written from an abstract says "abstract only" in the report. A claim whose number, definition or population you could not confirm from the abstract is not published: list it as unresolved on the evidence page's gaps instead. Quote years as Crossref records them and flag any difference from the print year. Never cite a figure from recalled anthropometry or recalled ranges as if it were sourced.
- **Reason:** Round one found abstracts with implausible effect sizes, a paywalled paper that was expected to supply every joint limit, a database with a licence restriction, and four calisthenics claims that needed full text. All were caught because the coaches said what they had not verified.

## D-006 List every text change that a test might assert (2026-11-15)

- **Audience:** all coaches.
- **Rule:** Coaches do not run `npm run build` or `npm run test:e2e` while others edit (builds empty `dist/` and collide). When your edit changes a sentence, heading or count, list it in your report so the executive updates `tests/e2e/`. The executive runs the full suite once per wave.
- **Reason:** Coaches share one working tree, and two builds at once break each other.

## D-007 No personal or medical details, ever (2026-11-15)

- **Audience:** all coaches and the executive.
- **Rule:** Describe a constraint generically ("a single box of fixed height", "an experienced lifter with a full gym"), never the person ("one experienced lifter", "the current user is recovering"), their injuries, their home (surfaces, furniture), their history or their circumstances. A page about a condition is education for anyone, with a clinician pointer. `npm run check:standards` has a tripwire for phrases that slipped in before, but it is not a complete check: read new text for the rest.
- **Reason:** The repository and its history are public. Keep all examples generic; a phrase checker cannot replace a privacy review. Earlier revisions may still require a separate history review.

## D-008 Illustrative rig approved (2026-11-15)

- **Audience:** all coaches and the executive. Supersedes D-001's ban on illustrative approximations, not its choice of renderer.
- **Rule:** Proceed with the in-house rig extension, starting with a bench-press and squat prototype. The owner accepts approximate proportions, angles and joint depth for reference illustrations. Do not wait for exact anthropometry or passive-range tables. Label visuals draft and approximate, not anatomical measurements or form validation. Keep recognisable movement, stable limb lengths and sensible equipment contacts; retain text instructions, keyboard controls, pause, reduced motion and one shared renderer.
- **Reason:** The owner approved the plan as a visual reference, not a clinical or biomechanical simulation. Approximate animation values are engineering choices, not sourced health claims.

