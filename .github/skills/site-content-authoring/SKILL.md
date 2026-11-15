---
name: site-content-authoring
description: Where every kind of content on workouts.theroningamer.com lives, how to add or change it as data, and how to validate it. Use before editing anything under src/content, src/pages or sections.yml, when adding an exercise, plan, claim, source or a whole new section.
---

# Site content authoring

The site is Astro over YAML and Markdown collections. Content is data; pages only lay it out. Read `CONTEXT.md` sections 3a, 8 and 11 first. Never hand-edit rendered markup and never inject data as HTML.

## Where things live

| Content | Files |
|---|---|
| Strength exercises, muscles, programmes, principles, cricket | `src/content/exercises/*.yml`, `muscles/`, `programs.yml`, `principles/*.md`, `cricket/*.md` |
| Getting started, calisthenics, plyometrics (guides) | `src/content/guides/groups/<section>.yml`, `plans/<section>.yml`, `exercises/*.yml` |
| Back-safe core guide with 3D figures | `src/content/core/phases.yml`, `exercises.yml` |
| Claims and sources (one registry, filtered by `section`) | `src/content/claims/*.yml`, `sources.yml` |
| Pain rules (one per body area, shared) | `src/content/pain-rules.yml` |
| Home tiles, per-section navigation and footers | `src/content/sections.yml` |
| Schemas | `src/content.config.ts` (platform file: ask the executive) |
| Pages | `src/pages/<section>/**`, using `Base` with `section="<id>"` |

## Workflow

1. Read the neighbouring entries and copy their shape. Do not invent fields.
2. Edit data. Quote YAML scalars that contain a colon.
3. `npm run check` (content validator, standards check, tests). Fix every error; read every warning.
4. `npm run build`. A passing check does not prove the pages render: open the new page.
5. For new pages or interactive behaviour, add or extend a spec in `tests/e2e/` and run `npm run test:e2e`.
6. Report with the commands run.

## Rules that have bitten before

- Anything shown in a sequence has an explicit numeric `order`, unique within its page. Collection load order is not guaranteed.
- A `reference()` default must be an object (`{ collection: 'sections', id: 'strength' }`), never a string. A string silently empties pages while the build passes.
- Guide ids (groups, exercises, plans) are global across sections. Calisthenics uses the `cal-` prefix, plyometrics groups use `plyo-`. A repeated id fails the check.
- A guide ladder needs consecutive levels from 1, a `test` on the group, and a level 1 that needs no optional equipment (or `requires` on the group).
- First-skills groups need `convention: true` and at least two `gates`.
- Do not run `npm run build` while a browser test reads `dist/`. A stray `astro preview` on port 4322 breaks the Playwright run: stop it with `kill <pid>`.
- `foundation`-level strength exercises exist only for squat, glute and lower-back work.
- British spelling. The validator warns on American spellings in your own text.
- No colour literals outside `src/styles/tokens.css`. A token change goes in all three theme blocks.

## Adding a new section

1. A plan document in `docs/` first (scope, safety stance, evidence table with gaps, architecture, phases). The owner approves it.
2. An entry in `sections.yml` with `status: soon`. Flip to `live` with an `href` only when the pages are ready and the owner agrees.
3. Pages under `src/pages/<section>/` using `Base`, `Breadcrumbs` and the shared guide components where they fit.
4. Validator rules for anything new that must hold (put them in `scripts/check-content.mjs` through the executive).
5. A Playwright spec for the section.
6. Update `CONTEXT.md` section 3a and the section table.
