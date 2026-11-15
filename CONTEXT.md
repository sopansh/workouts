# Workouts: project context

Read this first when opening the repo. It is the hand-off document: what exists, how it fits together, how to run and deploy
it, the coding standards, and what to build next. The long-term plans live in
[`docs/hypertrophy-plan.md`](docs/hypertrophy-plan.md) and
[`docs/getting-started-and-calisthenics-plan.md`](docs/getting-started-and-calisthenics-plan.md).

## 1. What this is

A static website of training guides, published at **https://workouts.theroningamer.com**. It is a hobby/personal project,
independent of any other repo or site (it is **not** the `prep.theroningamer.com` interview-prep site).

| | |
|---|---|
| Live site | https://workouts.theroningamer.com (root redirects to `/home/`) |
| Repo | https://github.com/sopansh/workouts (public, branch `main`) |
| Hosting | Netlify site `core-workouts` (default URL `core-workouts.netlify.app`), auto-deploys on every push to `main` |
| Stack | **One stack: Astro 7** (static output). Every page, in every section, is an Astro page. Content is YAML or Markdown in content collections with Zod schemas. Client JS exists only where a page needs it (theme toggle, the 3D rig). three.js r128 from a CDN |
| Language | British English (stabilise, colour); "program" is used for training programs |

## 2. Current state

| Area | Status |
|---|---|
| `/home/` landing page | Rendered from `src/content/sections.yml`. **Live** |
| `/core/` Isometrics (Core): back-safe core, glute and power guide, 3D exercise demos | **Live** (8 exercises, 3 phases). Now an Astro page; the 3D rig is in `src/scripts/core/` |
| `/strength/` Strength / Hypertrophy | Drafts: weekly plans, 3 programs with a page per session, 68 exercises, 30 muscles, 10 principles, evidence and source registers, cricket stubs. Chest and legs are the detailed groups |
| `/getting-started/` Getting started with strength | **First slice built as a draft**: overview, 8-week plan, exercises (10 ladders, 20 exercises), progression, evidence. Home tile is **live** |
| `/plyometrics/` | **Built as a draft**: overview, weekly plan, exercises, progression, fascia and tendons. Personal plan, to follow once cleared to jump |
| `/calisthenics/` | **First build as a draft, tile live**: hub, start-here, foundations, first-skills, weekly-plan, exercises (41 in 12 ladders), progression, evidence. Two 8-week plans. Skills are gated and flagged as coaching convention. See the plan doc |
| `/nutrition/` Health & Nutrition | Not started (tile "Coming soon") |
| Cricket-specific tracks | Stubs in `/strength/cricket/`; planned for plyometrics and isometrics (hypertrophy plan section 12) |
| Checks | `npm run check` (content, standards, tests) runs the first two before every build. `npm run verify:sources` (Crossref). No CI yet. `npm run test:e2e` runs the browser tests |

## 3. Repo layout

```
astro.config.mjs             static output, trailingSlash always, directory format, strength redirect
netlify.toml                 build = npm run build, publish dir = dist/, redirect / -> /home/ (302)
package.json                 astro + yaml (+ @playwright/test, dev only); scripts: dev, build, preview, check, check:content, check:standards, verify:sources, test:e2e
.editorconfig                2 spaces, LF, final newline, no trailing whitespace
public/assets/img/           tile illustrations (SVG). The only static files; Astro copies them to dist/ untouched
docs/                        plans (NOT published)
scripts/
  check-content.mjs          build-time content validator (see section 6)
  check-standards.mjs        build-time coding-standards check (see section 11)
  verify-sources.mjs         Crossref DOI / title / year / retraction check
tests/                       node --test files for logic that is not a data rule; tests/e2e/ holds the Playwright suite
src/
  content.config.ts          Zod schemas for every collection. The shape-and-reference validator
  content/                   ALL CONTENT. Edit these, not pages (see 3a)
  layouts/Base.astro         the one layout: toolbar, nav, theme toggle, footer, slots
  components/                shared Astro components (PascalCase)
  lib/                       content.ts (strength loader, labels), guide.ts (guide loader), sections.ts, plan.ts (pure maths)
  loaders/yaml-dir.ts        loads every *.yml in a folder
  pages/                     one folder per section: home, core, strength, getting-started, plyometrics, plus 404.astro
  scripts/                   client scripts: theme.ts, theme-init.js (inlined), core/ (the 3D rig)
  styles/                    tokens.css (colours), base.css, chrome.css, app.css (shared components), home.css, core.css
```

## 3a. Content collections

| Collection | File(s) | Used by |
|---|---|---|
| `sections` | `sections.yml` | home tiles, each section's nav and footer links, page titles. `status: live` needs an `href` |
| `groups`, `muscles`, `exercises`, `programs`, `principles`, `cricket`, `glossary`, `painRules` | `groups.yml`, `muscles/`, `exercises/`, `programs.yml`, `principles/*.md`, `cricket/*.md`, ... | strength |
| `guideGroups`, `guideExercises`, `guidePlans` | `guides/groups.yml`, `guides/exercises/*.yml`, `guides/plans.yml` | getting-started, calisthenics and plyometrics. A **ladder** group runs level 1 (easier) to N; a plan names groups (ladders) or exercises. Optional `phase` (groups and plans, so one section can have two plans), `gates` (prerequisites), `requires` (kit the whole ladder needs) and `convention` (no training-outcome evidence). Guide ids are global, so calisthenics ids start `cal-` |
| `corePhases`, `coreExercises` | `core/phases.yml`, `core/exercises.yml` | `/core/`. `poses` drive the 3D figures |
| `sources`, `claims` | `sources.yml`, `claims/*.yml` | **every section**. Each entry has a `section` (default `strength`). Pages filter by section |

Rules that follow from this:
- **Order is explicit.** Astro does not guarantee collection load order, so anything shown in a sequence has an `order` field
  (guide exercises, core exercises, sections, groups). The validator requires unique values.
- **Defaults must be reference-shaped.** `section: reference('sections').default(...)` uses an object default, because Zod
  defaults skip the reference transform. A plain string default silently empties the strength evidence pages.
- **One evidence registry.** New sources go in `sources.yml` and are verified by the one verifier. Textbooks and guidelines
  are cited in page text and do not need a graded claim.

URL map (all trailing-slash): `/home/`, `/core/`, `/strength/...` (principles, muscles, exercises, programs, weekly-plan,
cricket, evidence, sources, glossary), and for each of `/getting-started/` and `/plyometrics/`: overview, `weekly-plan/`,
`exercises/`, `progression/`, plus `evidence/` (getting-started) or `fascia/` (plyometrics). Anchors: exercise cards use
`#<exercise-id>`, groups use `#group-<id>`, pain rules `#pain-<id>`, claims `#claim-<id>`.
`/strength/programs/push-pull-legs/week/` redirects to `/strength/weekly-plan/`.

User-provided context: 10+ years training, with beginner options limited to squats, glutes and lower-back work (strength
only). Full gym access, training days, session length and lower-back recovery are unconfirmed assumptions. The plyometrics plan
is personal (two sessions, floor first, box optional) and to be started only after a clinician clears jumping; the repo is
public, so no health details are published.

## 4. Architecture and the reasoning behind it

- **One layout, one registry.** `Base.astro` renders every page. A section id from `sections.yml` gives it the toolbar nav,
  title suffix, accent and footer links. Named slots (`head`, `nav`, `controls`, `footer`) let a page override a part; `/core/`
  uses them for its phase pills and animation buttons. Omit `section` for the home page.
- **Content is data.** Add an entry to a collection and the pages update. Do not hand-edit generated markup.
- **Shared components, shared CSS.** `app.css` holds every shared component style (badges, notes, callout, tables, cards,
  claims, guide cards, week strips). Only `home.css` and `core.css` are page-specific. Class names are the contract; do not
  reuse a shared class name for a different look (core's exercise cards are `.demo`, not `.card`, for this reason).
- **Content renders before 3D.** `/core/` is fully rendered at build time. `src/scripts/core/main.js` only attaches 3D to the
  cards already on the page and reads each exercise's poses from a JSON script tag. If three.js fails to load, the guide is
  still fully readable (`.no-3d` shows a fallback note).
- **One WebGL context, many canvases.** Browsers cap live WebGL contexts (~16). `Stage` renders the active figure into one
  offscreen renderer and copies it into that card's 2D canvas. Don't add a renderer per card.
- **Pose format.** Named joints in SVG-style units (origin top-left, y down, floor at y = 150, x = 150 is centre), e.g.
  `head: [192, 130]`. Far-side limbs are optional. Exercises animate `start -> end`. If you change `resolvePose`, re-verify.
- **Camera auto-frames each figure** from the extents of its two poses, so new exercises need no camera tuning.
- **Glow regions** are only `torso` and `hips` today (`figure.js`). Per-muscle glow needs more regions.
- **Theme** follows the OS (`prefers-color-scheme`) unless the user toggles; the choice is saved and shared across pages. A tiny
  blocking script (`theme-init.js`) is inlined in `<head>`; `theme.ts` is bundled. Tokens are duplicated across the light block,
  the dark media-query block and the `[data-theme=dark]` block of `tokens.css`; the standards check enforces that they match.
- **Security/robustness:** the three.js script is pinned to r128 with a Subresource Integrity hash. If you change the version,
  regenerate the hash (`openssl dgst -sha512 -binary file | openssl base64 -A`). Never inject data as HTML. The only
  `set:html` uses are the inlined theme script and the escaped core JSON.

## 5. Run it locally

```bash
npm install                        # first time only
npm run dev                        # http://localhost:4321/home/
npm run build && npm run preview   # serves dist/ exactly as Netlify will
npm run check                      # content + standards + tests, without building
```

Needs Node 22.23.4 or newer (Astro 7); Netlify uses Node 24. Notes:
- The dev and preview servers do **not** apply `netlify.toml` redirects, so `/` is a 404 locally. Open `/home/` directly.
- Browsers cache aggressively: hard-refresh (Cmd+Shift+R) after editing CSS or scripts.
- Do not run `npm run build` while a browser test is reading `dist/`: the build empties it first.

## 6. Testing and verification

- **Content validator:** `npm run check:content` (first step of the build). It checks references and shape beyond Zod, plus:
  every DOI source has a `verifiedOn` stamp; EMG-only claims are capped at grade C; a preprint alone cannot support A or B;
  every exercise (strength, guide) has contraindications, a regression and a pain rule; `level: foundation` is only for squat,
  glute and lower-back muscles (strength only); no strength session over its minutes and no two consecutive days both peaking at
  high spinal load; emphasis words need a claim; **guides:** ladders have consecutive levels from 1 and level 1 needs no optional
  equipment, plans reference real groups and exercises in their own section, sessions are never on consecutive days (Sunday to
  Monday included), session time estimates stay within budget, jump schedules never go down, no outcome promises ("burn fat",
  "tone", "guaranteed"); **core:** every pose has all required joints and a real phase; orders are unique. Add `-- --report` to
  print weekly volume for each strength program.
- **Standards check:** `npm run check:standards` (see section 11).
- **Sources:** `npm run verify:sources` checks only entries without a `verifiedOn` stamp; `-- --write` stamps them; `-- --all`
  rechecks every DOI. It backs off on Crossref rate limits. A new source must be looked up (Crossref / PubMed / Europe PMC) and its
  abstract read before any claim is written from it. Never cite from memory. Europe PMC can mislink a DOI to an unrelated paper:
  confirm the DOI on Crossref **and** the title.
- **Tests:** `node --test tests/paired-muscle-split.test.mjs`. Name the file: passing the `tests/` directory fails.
- **Regression check for refactors:** build the previous commit in a `git worktree`, then compare each page's title, description
  and visible body text between the two `dist/` folders. This caught a section default that silently emptied three pages.
- **Link check:** a crawl of `dist/` resolves every internal link, asset and `#anchor` (165 pages, about 5,000 links at last run).
- **Browser tests (Playwright):** `npm run test:e2e` builds, then runs `tests/e2e/*.spec.ts` in desktop and mobile Chromium against
  `astro preview` on port 4322 (`test:e2e:fast` skips the build). One-off setup: `npx playwright install chromium`. It covers every
  built page (loads, one `h1`, no horizontal scroll), redirects, home tiles and back, skip link, theme persistence, the exercise
  filters, the plyometrics section, and `/core/` (figure drawn, animates, pause/resume, speed, arrow-key rotation, reduced motion).
  Any console error, exception or 4xx/5xx fails the test (`fixtures.ts`). New pages are picked up from `dist/` automatically.
- **Ad-hoc browser gotchas:** a hidden tab (as in this editor) never runs animation frames, so coordinate clicks can wait forever on
  "stable" and the 3D loop never draws. Click through the DOM (`element.click()`), and test the rig by importing the built
  `Stage` and `Figure` chunks and rendering a frame by hand. Screenshots can return a stale frame: reload and re-capture.
  Playwright's `emulateMedia({ reducedMotion })` persists on the page across navigations.

## 7. Deploy and infrastructure

- **Flow:** commit -> `git push origin main` -> Netlify runs `npm run build` (content check, standards check, then `astro build`)
  and publishes `dist/` (set in `netlify.toml`, with `NODE_VERSION = 24`, which overrides dashboard settings). A content or
  standards error fails the build, so a bad deploy cannot go live. The dashboard's publish directory shows `.` but is
  "overridden by netlify.toml".
- **If a deploy succeeds but the site is stale:** the deploy list may not be publishing it. On the deploy, look for a **Published**
  badge and for a "lock to stop auto publishing" control. Confirm with `curl` on a changed file, cache-busted.
- **Roll back:** Netlify dashboard -> Deploys -> pick an earlier deploy -> Publish deploy. Or `git revert` and push.
- **DNS:** registrar is Squarespace Domains. Record: `CNAME workouts -> core-workouts.netlify.app` (TTL 4 hrs). Don't change
  it unless you change the Netlify site name.
- **HTTPS:** Netlify-managed Let's Encrypt certificate, renewed automatically. If a browser shows "not secure", first suspect a
  stale cached state: test in a private window and check `curl -sI https://workouts.theroningamer.com/home/`.
- **Redirects:** `/` -> `/home/` (302) in `netlify.toml`. `http://` is redirected to `https://` by Netlify. `/core/` is canonical
  for the core guide; do not move it without adding a redirect.
- **Not published:** anything not in `dist/` (`docs/`, `scripts/`, `src/`, `tests/`). The source is public on GitHub.

## 8. Common tasks

**Add a strength exercise.** Append to the right file in `src/content/exercises/` (copy a neighbour: setup, steps, mistakes,
contraindications, regression, progression, a `painRule` id). Muscles and claims are referenced by id. Run `npm run check`.

**Add a guide exercise** (getting-started or plyometrics). Append to `src/content/guides/exercises/<section>.yml`: `section`,
`order`, `group`, `level` (ladder groups only), `equipment`, `muscles`, `setup`, `steps`, `mistakes`, `contraindications`,
`regression`, `progression`, `painRule`, and a `dose` or a `schedule`. Level 1 of a ladder must need no optional kit. Then make
sure the plan uses it: a ladder group must appear in a session, other exercises must be listed in a session or the warm-up.

**Change a guide plan.** Edit `src/content/guides/plans.yml` (sessions, weeks, timing). The validator checks spacing and time.

**Add a claim.** Find the paper, add it to `src/content/sources.yml` with a `section`, run `npm run verify:sources -- --write`,
read the abstract, then add the claim to `src/content/claims/<section>.yml` with a grade from the rubric on `/strength/evidence/`.

**Change the strength plan.** Edit `src/content/programs.yml`, run `npm run check:content -- --report`, read the tables.

**Add a muscle or group.** `src/content/muscles/` and `groups.yml`. To show it on the map, add a shape in `MuscleMap.astro`.

**Add a principle or cricket page.** A Markdown file in `src/content/principles/` or `src/content/cricket/`.

**Make a section live, or add one.** In `src/content/sections.yml` set `status: live` and an `href`, or append an entry (title,
short name, blurb, image in `public/assets/img/` at 16:10, accent `p1`..`p4`, nav, footer). Pages live in `src/pages/<section>/`
and pass `section="<id>"` to `Base`.

**Swap a tile image.** Replace the file in `public/assets/img/` (keep 16:10) or point `image` at a new one.

**Add an exercise to the core guide.** Append to `src/content/core/exercises.yml` (`order`, `phase`, name, dose, muscles, glow,
cycle, poses start/end, steps, mistakes). The card, nav and framing update themselves.

**Add a core phase.** Add to `core/phases.yml`, give exercises the matching `phase`, and add an accent rule for the number in
`core.css` (`[data-phase='N']`).

**Change colours.** Edit `src/styles/tokens.css`, in all three theme blocks (the standards check fails otherwise).

## 9. Known limitations and gotchas

- Poses are side-view x/y only with fixed depth offsets, so frontal-plane moves (lateral raise, fly) can't be shown correctly
  without a rig extension.
- Stage framing assumes a roughly human-sized figure; very large range-of-motion poses may need a bounds check.
- The 3D frame loop could not be watched in the hidden browser tab used for development; the rig was verified by rendering
  frames from the built chunks (all 8 exercises draw, glow and move). Look at `/core/` once in a normal browser before relying on it.
- Getting-started and strength each have their own beginner-level exercises (push-up, glute bridge, bird dog...) with separate
  text. That duplicates a concept; merging them is a possible later cleanup.
- Health content here is general education. Medical wording was authored by the site owner or drafted by an AI assistant and
  has not been clinically reviewed. Everything is labelled draft until a physiotherapist and a strength coach sign off.
- The Astro build was introduced without recorded approval from the owner, who has since asked for everything to use it.

## 10. What to build next

1. **Review pass** of the drafts (physiotherapist for anatomy, contraindications and pain rules; a CSCS coach for programs).
2. **Calisthenics, next pass:** adherence guidance, more handstand and wrist-load evidence, optional parallettes or rings, and a
   coach's review of the gates (the gate numbers are conventions). It uses `guideGroups` with `phase`, `gates`, `requires` and
   `convention`, and `guidePlans` with `phase` (two plans, foundations and first-skills).
3. **Finish getting-started:** soreness and adherence guidance, deeper exercise notes, the remaining evidence gaps in the plan doc.
4. **Deepen the other strength groups** (back, shoulders, arms, core) to the chest and legs standard.
5. **Anatomy sources:** modern OpenStax regional references are linked beside the 1918 Gray source; verify each muscle page.
6. **Cricket research** (hypertrophy plan section 12).
7. **Visuals:** per-muscle glow and 3D demos on the existing rig for strength exercises.
8. **Search and CI:** Pagefind for site search, and a GitHub Action that runs `npm run check` and a link check.

## 11. Coding standards

These are written down because tooling is deliberately minimal (no linter or formatter dependency). `scripts/check-standards.mjs`
enforces the mechanical ones on every build; the rest are reviewed.

**Enforced by the build**
- No HTML injection (`innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`); `set:html` only in the two reviewed files.
- No colour literals outside `tokens.css`, except pure white and black (icon text, shadows, canvas fades).
- Theme tokens: every colour in the light block exists in both dark blocks, and the two dark blocks match.
- Every `<img>` has `alt`, every `<canvas>` has `aria-label`, `target="_blank"` has `rel`.
- Every page under `src/pages/` uses the shared `Base` layout (directly or through `WeeklyPlan`).
- No `any`, no `console.log`, no references to the removed `site/` or `/shared/` folders.
- Naming: components and layouts `PascalCase.astro`; every other file under `src/` lowercase kebab-case (`content.config.ts` excepted).
- Whitespace: LF, final newline, no trailing whitespace; balanced CSS braces.

**Reviewed by hand**
- **Stack:** one Astro setup. New sections are pages plus content collections, never a separate plain-HTML folder. No new
  dependency or bundler without asking.
- **Data vs markup:** copy and numbers live in `src/content/`; pages and components only lay them out. Prose that belongs to one
  page (an overview, a "what this does not cover" list) may live in that page.
- **TypeScript:** strict (`astro/tsconfigs/strict`). Type component props with an `interface Props`. Use `unknown` and narrowing,
  not `any`. `src/scripts/core/` is legacy JavaScript moved without a rewrite; new client code is TypeScript.
- **Formatting:** 2 spaces, single quotes in TS and JS, semicolons, trailing commas in multiline literals, `const` by default,
  named exports. Short comments only where the *why* is not obvious.
- **CSS:** tokens only; mobile-first with `min-width` queries (existing `max-width` rules are tolerated); one class per concept;
  state through `data-*` attributes (`data-tone`, `data-accent`, `data-grade`).
- **Accessibility is a requirement:** keyboard operable, visible focus, `prefers-reduced-motion` honoured, text alternative for every
  diagram, WCAG AA contrast in both themes, a skip link, tables with headers, scrollable tables focusable.
- **Language:** British English, plain and concise UI text. Units are metric.
- **Health content:** every exercise needs contraindications, a regression, a progression and a pain rule; benefit or emphasis
  claims need a source and an evidence grade; no outcome promises; say what is unknown. Never invent or cite from memory.
- **Commits:** small and descriptive. Pushing to `main` deploys to production, so run `npm run check`, build, and the smoke test first.

## 12. Starter prompt for a new session

> Open `CONTEXT.md` (sections 3a, 8 and 11) and the relevant plan in `docs/`. Everything is Astro: pages in `src/pages/<section>/`,
> content in `src/content/`, one layout. Next: <your goal, e.g. "add parallettes to the calisthenics L-sit ladder" or "add a deload
> week to the getting-started plan">. Run `npm run check` and `npm run test:e2e` before finishing.
