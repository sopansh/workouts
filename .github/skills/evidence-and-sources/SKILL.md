---
name: evidence-and-sources
description: How to find, verify, grade and write up evidence for workouts.theroningamer.com, including the A to D grade rubric, claim and source schemas, Europe PMC and Crossref workflow and how to state gaps. Use before writing any benefit, emphasis, safety, nutrition or injury claim, or adding a source.
---

# Evidence and sources

The site's credibility rests on one rule: never cite from memory. A claim exists only after the paper was found, its abstract read and its DOI verified.

## Workflow

1. **Search.** Europe PMC REST API with `curl` (the system Python has no usable CA bundle, `curl` works):
   `curl -s "https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22repeated%20bout%20effect%22&format=json&resultType=core&pageSize=8"`.
   Search titles and abstracts, prefer systematic reviews and meta-analyses, then trials. Log the search string you used.
2. **Read the abstract.** Use `resultType=core` for `abstractText`. Write the claim from what the abstract says, not from what you expect it to say.
3. **Add the source** to `src/content/sources.yml` with `id`, `type`, `authors`, `year`, `title`, `venue`, `doi` (or `url` for guidelines) and `section`. Quote any title that contains a colon.
4. **Verify.** `npm run verify:sources -- --write` checks the DOI, title, year and retraction status on Crossref and stamps `verifiedOn`. Europe PMC sometimes links a DOI to the wrong paper: confirm the title on Crossref, never on Europe PMC alone. A passing DOI proves the paper exists, not that your claim fits it.
5. **Write the claim** in `src/content/claims/<section>.yml` (see below).
6. **Run** `npm run check`. Every DOI source needs a Crossref stamp, and every claim needs a source and caveats.

## Grades

| Grade | Meaning |
|---|---|
| A | Meta-analysis or systematic review of trials |
| B | A well-conducted trial |
| C | Observational, biomechanics or muscle-activity (EMG) studies, or a plausible mechanism |
| D | Guideline, position stand, textbook or coaching convention |
| Mixed | Studies disagree, or a result applies only in part |

Muscle-activity-only claims set `emgOnly: true`. Activity is not growth.

## Claim shape

`id`, `kind` (`emphasis`, `programming`, `mechanism`, `safety`, `health`, `nutrition`, `cricket`), `section`, `statement` (paraphrase the abstract), `grade`, `sources` (ids), `caveats` (population, size, duration, what it does not show), optional `population` and `emgOnly`. State the limits every time: who was studied, how many, how long.

## Rules

- No outcome promises ("burns fat", "tones", "guaranteed"). The validator blocks these.
- Where no evidence exists, say so on the page, grade the content D and label it a convention. The calisthenics skill steps are the model.
- Guidelines and textbooks (type `guideline` or `textbook`) are cited in text and need no claim.
- Do not copy abstracts. Paraphrase.
- Name the gaps: which population, outcome or sport has no study found.
- Authorities you may look up for nutrition, injury or anatomy content are listed in the relevant domain skill. They are pointers to look up, not facts.
- Do not claim a source says something you did not read.
