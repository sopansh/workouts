# Workouts: project context

Read this first when opening the repo. It is the hand-off document: what exists, how it fits together, how to run and
deploy it, the conventions to follow, and what to build next. The long-term plan lives in
[`docs/hypertrophy-plan.md`](docs/hypertrophy-plan.md).

## 1. What this is

A static website of training guides, published at **https://workouts.theroningamer.com**. It is a hobby/personal project,
independent of any other repo or site (it is **not** the `prep.theroningamer.com` interview-prep site).

| | |
|---|---|
| Live site | https://workouts.theroningamer.com (root redirects to `/home/`) |
| Repo | https://github.com/sopansh/workouts (public, branch `main`) |
| Hosting | Netlify site `core-workouts` (default URL `core-workouts.netlify.app`), auto-deploys on every push to `main` |
| Stack | **Astro 7** (static output) for the strength section. `/home/` and `/core/` stay plain HTML, CSS and ES modules, served unchanged from `site/`. three.js r128 from a CDN |
| Language | British English (stabilise, colour); "program" is used for training programs |

## 2. Current state

| Area | Status |
|---|---|
| `/home/` landing page with section tiles | **Done, live** |
| `/core/` Isometrics (Core): back-safe core, glute and power guide, 3D exercise demos | **Done, live** (8 exercises, 3 phases) |
| Shared design system (`site/shared/`) | **Done** |
| Custom 404 page | **Done** |
| `/strength/` Strength / Hypertrophy | **Built as drafts, not deployed yet** (Astro, plan phases 1 to 3 and 7 in skeleton form): weekly plan, 2 programs with a page per session, 68 exercises, 30 muscles, 10 principles, evidence and source registers, cricket stubs. Chest and legs are the detailed groups. See section 3a |
| `/plyometrics/` | Not started (tile "Coming soon") |
| `/nutrition/` Health & Nutrition | Not started (tile "Coming soon"). Out of scope for the current plan |
| Cricket-specific tracks (in strength, plyometrics, isometrics) | Planned only (plan section 12) |
| Content validation | `npm run check:content` (runs before every build) and `npm run verify:sources` (Crossref). No CI yet |

## 3. Repo layout

```
netlify.toml                 build = npm run build, publish dir = dist/, redirect / -> /home/ (302)
astro.config.mjs             publicDir = site/ (copied to dist unchanged), trailingSlash always, strength redirects
package.json                 astro + yaml; scripts: dev, build, check:content, verify:sources
docs/
  hypertrophy-plan.md        implementation + information-gathering plan (NOT published)
scripts/
  check-content.mjs          build-time validator (refs, claims, safety fields, session time, spinal-load spacing)
  verify-sources.mjs         Crossref DOI / title / year / retraction check; `-- --write` stamps verifiedOn
src/                         the Astro project (strength section) - see section 3a
site/                        static files, copied to dist/ unchanged (Astro `publicDir`)
  404.html                   custom not-found page
  assets/img/*.svg           home-page tile illustrations (hand-drawn SVG; swap for photos any time)
  shared/                    reused by every section
    styles/tokens.css        colour/spacing tokens, light + dark themes (incl. --p1..--p4 accents)
    styles/base.css          reset, typography, skip-link, focus ring, reduced-motion
    styles/chrome.css        sticky toolbar, buttons, hero text, footer
    js/theme-init.js         blocking <head> script: applies saved theme before first paint
    js/theme.js              theme toggle + change events (localStorage key: "workouts-theme")
    js/dom.js                h() element builder (never innerHTML)
  home/                      /home/
    index.html  styles/home.css
    js/main.js               renders tiles from sections.js, wires the theme button
    js/sections.js           DATA: the list of sections shown on the home page
  core/                      /core/  (the isometrics core guide)
    index.html  styles/components.css
    js/main.js               entry: renders content, then enhances with 3D
    js/data/exercises.js     DATA: every exercise (text + named-joint poses)
    js/data/phases.js        DATA: the three phases
    js/rig/pose.js           pure pose maths (no DOM, no three.js)
    js/rig/figure.js         the 3D mannequin (meshes, glow, auto-framing camera)
    js/stage.js              ONE shared WebGL renderer + scene for all cards
    js/three.js              facade for the global THREE (null if the CDN failed)
    js/playback.js           shared pause/speed clock
    js/ui/cards.js nav.js controls.js     card/plan rendering, scroll-spy nav, toolbar + drag/keyboard rotation
```

## 3a. The strength section (Astro)

```
src/
  content.config.ts          Zod schemas for every collection (the validator for shape and references)
  loaders/yaml-dir.ts        loads every *.yml in a folder (one file per group, each a list of entries)
  lib/content.ts             url helpers, loadAll(), labels.   lib/plan.ts  pure planning maths (sets, time, spinal load)
  content/                   ALL CONTENT (edit these, not pages)
    groups.yml  pain-rules.yml  sources.yml  glossary.yml  programs.yml
    claims/*.yml  muscles/*.yml  exercises/*.yml
    principles/*.md  cricket/*.md
  layouts/Base.astro         chrome, nav, theme toggle (reuses /shared/ CSS and theme JS as static files)
  components/                Breadcrumbs, badges, ClaimList, PainRule, ExerciseCard, MuscleMap (SVG), WeeklyPlan
  pages/strength/            index, principles, muscles/[group]/[muscle], exercises, programs/[program]/[day],
                             weekly-plan (the weekly distribution page), cricket, evidence, sources, glossary
  styles/strength.css        section styles (tokens only; no new colour tokens)
```

URL map: `/strength/`, `/strength/principles/<id>/`, `/strength/muscles/<group>/<muscle>/`, `/strength/exercises/<id>/`,
`/strength/programs/<program>/<day>/`, `/strength/weekly-plan/` (default program) and `/strength/weekly-plan/<program>/`,
`/strength/cricket/<role>/`, `/strength/evidence/`, `/strength/sources/`, `/strength/glossary/`.
`/strength/programs/push-pull-legs/week/` redirects to `/strength/weekly-plan/`.

Key rules baked into the build (`scripts/check-content.mjs`):
- every reference resolves (exercise -> muscle, claim, pain rule; program -> exercise; claim -> source);
- every DOI source has a `verifiedOn` stamp; EMG-only claims are capped at grade C; a preprint alone cannot support A or B;
- every exercise has contraindications, a regression and a pain rule (shared per body area in `pain-rules.yml`);
- `level: foundation` is only allowed for squat, glute and lower-back muscles (the owner wants no beginner-level work elsewhere);
- no session may estimate over the program's minutes; no two consecutive days may both peak at `spinalLoad: high`;
- emphasis words ("targets", "optimal", "superior"...) in exercise text need a claim.

The weekly-plan page is computed from `programs.yml` + each exercise's `primary`/`secondary` muscles: direct sets, helper
sets, effective sets (direct + half of helper sets), session spacing, spinal load per day and time per session. Change the
program and the page follows.

Personal context used to build it: 10+ years training (upper-intermediate to advanced), full commercial gym, 6 days a week,
90-minute sessions, lower back fully recovered (still spread heavy spinal loading), cricket track requested as stubs.

## 4. Architecture and the reasoning behind it

- **Content is data.** Pages are rendered from JS data modules (`sections.js`, `exercises.js`, `phases.js`). Add an entry
  and the page updates; do not hand-edit generated markup.
- **Content renders before 3D.** `core/js/main.js` builds all text first, then dynamically imports the 3D modules only if
  `THREE` exists. If three.js fails to load, the guide is still fully readable (`.no-3d` class shows a fallback note).
- **One WebGL context, many canvases.** Browsers cap live WebGL contexts (~16). `Stage` renders the active figure into a
  single offscreen renderer and copies the result into that card's 2D canvas. Don't add a renderer per card.
- **Pose format.** Poses are named joints in SVG-style units (origin top-left, y down, floor at y = 150, x = 150 is centre),
  e.g. `head: [192, 130]`. Far-side limbs are optional and default to the near side. Exercises animate `start -> end`.
  `core/js/data/exercises.js` documents the format at the top. A numeric check against the original arrays was done when
  migrating; if you change `resolvePose`, re-verify.
- **Camera auto-frames each figure** from the extents of its two poses, so new exercises need no camera tuning.
- **Glow regions** are only `torso` and `hips` today (`figure.js`). Per-muscle glow needs more regions (see plan section 10.2).
- **Theme** follows the OS (`prefers-color-scheme`) unless the user toggles; the choice is saved and shared across pages.
  Tokens are duplicated across the light block, the dark media-query block and the `[data-theme=dark]` block in
  `tokens.css`. Change all of them together.
- **Absolute paths for shared files** (`/shared/...`, `/assets/...`). The site lives at the domain root, so this is correct on
  Netlify. Astro serves `site/` as its static folder, so the same paths work in `npm run dev` and in `dist/`.
- **Astro pages link the shared CSS and theme scripts as static files** (not bundled), so the theme and tokens stay identical
  across `/home/`, `/core/` and `/strength/`. Astro can only bundle files it owns, which is why `site/` is `publicDir`.
- **Security/robustness:** the three.js script is pinned to r128 with a Subresource Integrity hash. If you change the
  version, regenerate the hash (`openssl dgst -sha512 -binary file | openssl base64 -A`). Never use `innerHTML` with data;
  use `h()`.

## 5. Run it locally

```bash
npm install                        # first time only
npm run dev                        # http://localhost:4321/home/  and  /strength/
npm run build && npm run preview   # serves dist/ exactly as Netlify will
```

Needs Node 22.23.4 or newer (Astro 7). Notes:
- The dev and preview servers do **not** apply `netlify.toml` redirects, so `/` is a 404 locally. Open `/home/` directly.
- Browsers cache aggressively: hard-refresh (Cmd+Shift+R) after editing CSS/JS/SVG.
- Plain `python3 -m http.server` from `site/` still serves `/home/` and `/core/` if you want to test them in isolation.

## 6. Testing and verification

- **Content validator:** `npm run check:content` (also the first step of `npm run build`). Add `-- --report` to print weekly
  sets per muscle, spacing, time and spinal load for each program: use it when changing `programs.yml`.
- **Sources:** `npm run verify:sources` re-checks every DOI against Crossref; `-- --write` stamps `verifiedOn`. A new source
  must be looked up (Crossref / PubMed / Europe PMC) and read before any claim is written from it. Never cite from memory.
- **Syntax check JS in `site/`:** `for f in $(find site -name '*.js'); do node --input-type=module --check < "$f"; done`
- **CSS brace balance** (an unbalanced `}` once silently disabled all mobile styles): count `{` vs `}` per file.
- **Browser smoke test** (Playwright via the editor's browser tools): no console errors or failed requests; home -> strength ->
  weekly plan; home -> core -> back; exercise filters; theme persists across pages; mobile (390px) has no horizontal
  overflow; every internal link and `#anchor` resolves (a small crawler against `npm run preview` did this: 146 pages).
- **Playwright gotcha:** `locator.click()` on the sticky toolbar can scroll the page, which makes `IntersectionObserver` stop
  rendering canvases and looks like a bug. Click by coordinates (`page.mouse.click`) when testing pause/resume on `/core/`.
- Screenshot tools sometimes return a stale frame: hard-reload and re-capture before trusting a visual.

## 7. Deploy and infrastructure

- **Flow:** commit -> `git push origin main` -> Netlify runs `npm run build` (validator, then `astro build`) and publishes
  `dist/` (set in `netlify.toml`, with `NODE_VERSION = 24`, which overrides dashboard settings). A content error fails the build,
  so a bad deploy cannot go live. **First deploy of the Astro setup: check the Netlify build log once.**
- **Roll back:** Netlify dashboard -> Deploys -> pick an earlier deploy -> Publish deploy. Or `git revert` and push.
- **DNS:** registrar is Squarespace Domains. Record: `CNAME workouts -> core-workouts.netlify.app` (TTL 4 hrs). Don't change
  it unless you change the Netlify site name.
- **HTTPS:** Netlify-managed Let's Encrypt certificate for `workouts.theroningamer.com`, renewed automatically. If a browser
  shows "not secure", first suspect a stale cached state: test in a private window and check
  `curl -sI https://workouts.theroningamer.com/home/`.
- **Redirects:** `/` -> `/home/` (302) in `netlify.toml`. `http://` is redirected to `https://` by Netlify. `/core/` is canonical
  for the core guide; do not move it without adding a redirect.
- **Not published:** anything not in `dist/` (e.g. `docs/`, `scripts/`, `src/content/` source files). Verified before Astro: `/docs/...` returned 404 live.

## 8. Common tasks

**Add an exercise.** Append an object to the right file in `src/content/exercises/` (copy a neighbour: it needs setup, steps,
mistakes, contraindications, regression, progression and a `painRule` id from `pain-rules.yml`). Muscles and claims are
referenced by id. Run `npm run check:content`.

**Add a claim.** Find the paper (Crossref / PubMed), add it to `src/content/sources.yml`, run `npm run verify:sources -- --write`,
read the abstract, then add the claim to `src/content/claims/` with a grade from the rubric on `/strength/evidence/`.

**Change the plan.** Edit `src/content/programs.yml`, run `npm run check:content -- --report`, and read the volume and time
tables. The weekly-plan page, day pages and exercise pages ("used in your plan") all update.

**Add a muscle or a group.** Add to `src/content/muscles/` (and `groups.yml`). To show it on the map, add a shape in
`src/components/MuscleMap.astro`.

**Add a principle or cricket page.** Add a Markdown file in `src/content/principles/` or `src/content/cricket/`.

**Make a home tile live.** In `site/home/js/sections.js` set `status: 'live'` and `href: '/yourpath/'`.

**Add a new section tile.** Append an entry to `sections` (title, blurb, image under `/assets/img/`, accent `p1`..`p4`,
status). The grid reflows by itself. New section code lives in its own folder under `site/` (copy the shape of `site/core/`),
importing shared files from `/shared/`.

**Swap a tile image.** Drop a JPG/PNG/WebP into `site/assets/img/` and point `image` at it (keep 16:10).

**Add an exercise to the core guide.** Add an object to `site/core/js/data/exercises.js` (id, phase, name, dose, muscles,
glow, cycle, poses start/end, steps, mistakes). Nothing else needs editing; the card, nav and framing update themselves.

**Add a phase.** Add to `phases.js`, and give exercises a matching `phase` number. Add an accent rule for the new number in
`core/styles/components.css` (`[data-phase='N']`) and a token in `tokens.css` if needed.

**Change colours.** Edit `site/shared/styles/tokens.css` (all three theme blocks).

## 9. Known limitations and gotchas

- Poses are side-view x/y only with fixed depth offsets, so frontal-plane moves (lateral raise, fly) can't be shown correctly
  without a rig extension (plan section 10.2).
- The strength section is statically rendered by Astro (good for SEO and build-time validation). `/home/` and `/core/` are still
  client-rendered.
- Stage framing assumes a roughly human-sized figure; very large range-of-motion poses may need a bounds check.
- The core guide's Phase 1 now says "all six" (the original said "five" but there are six exercises).
- Health content here is general education. The guide's medical wording was authored by the site owner, not clinically
  reviewed. See plan section 1 and section 13 before expanding it.
- `docs/core/` (a lossy Markdown export of the original core guide) may exist locally but is intentionally not tracked.

## 10. What to build next

Decisions already made (this session): stack = Astro; audience = the owner (experienced lifter, full gym, 6 days, 90 minutes,
back recovered); cricket = stub pages; chest and legs are the detailed groups. Still open from plan section 14: named
reviewers (everything is labelled draft), cricket role/level/format, and whether `/isometrics/` becomes a hub for `/core/`.

Suggested next steps, in order:
1. **Review pass** of the drafts (physiotherapist for anatomy, contraindications and pain rules; a CSCS coach for the program).
2. **Deepen the other groups** (back, shoulders, arms, core) to the chest and legs standard: full setup/cues/variation tables,
   muscle growth claims with verified sources.
3. **Anatomy sources:** replace the Gray 1918 reference with a modern atlas or textbook and verify each muscle page.
4. **Cricket research** (plan section 12): role demands, injury epidemiology, workload evidence, then prescriptions.
5. **Visuals:** per-muscle glow and tier-2 3D demos on the existing rig (plan section 10); a tighter muscle-map drawing.
6. **Search and CI:** Pagefind for site search, and a GitHub Action that runs `check:content` and a link check.

## 11. Conventions

- Match the existing style: small modules, data separated from rendering, comments only where the *why* isn't obvious.
- No `innerHTML` with data; use `h()` from `/shared/js/dom.js`.
- No new runtime dependency without agreeing it (Astro and `yaml` are the only ones). The build is `npm run build`.
- Accessibility is a requirement: keyboard operable, visible focus, text alternatives for diagrams, honour
  `prefers-reduced-motion`, WCAG AA contrast in both themes.
- Health content: every exercise needs contraindications, a regression and a pain rule; emphasis/benefit claims need a source
  and an evidence grade (plan section 5). Never cite from memory; verify DOIs.
- Commits: small and descriptive. Pushing to `main` deploys to production, so smoke-test locally first (section 6).

## 12. Starter prompt for a new session

> Open `CONTEXT.md` (sections 3a and 8) and `docs/hypertrophy-plan.md`. The strength section is built as drafts in Astro.
> Next: <your goal, e.g. "deepen the back group to the chest standard" or "add a Monday-only 45 minute variant of the plan">.
> Keep `/home/` and `/core/` working, run `npm run check:content` and the smoke test before finishing.
