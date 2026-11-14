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
| Stack | Plain HTML, CSS and ES modules. **No build step, no package manager.** three.js r128 from a CDN |
| Language | British English (stabilise, colour); "program" is used for training programs |

## 2. Current state

| Area | Status |
|---|---|
| `/home/` landing page with section tiles | **Done, live** |
| `/core/` Isometrics (Core): back-safe core, glute and power guide, 3D exercise demos | **Done, live** (8 exercises, 3 phases) |
| Shared design system (`site/shared/`) | **Done** |
| Custom 404 page | **Done** |
| `/strength/` Strength / Hypertrophy | **Not started.** Tile shows "Coming soon". Fully planned in `docs/hypertrophy-plan.md` |
| `/plyometrics/` | Not started (tile "Coming soon") |
| `/nutrition/` Health & Nutrition | Not started (tile "Coming soon"). Out of scope for the current plan |
| Cricket-specific tracks (in strength, plyometrics, isometrics) | Planned only (plan section 12) |
| Automated tests / CI | None (see section 6) |

## 3. Repo layout

```
netlify.toml                 publish dir = site/, redirect / -> /home/ (302)
docs/
  hypertrophy-plan.md        implementation + information-gathering plan (NOT published)
site/                        everything here is served; nothing outside it is
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
  Netlify. It means local serving must also be from the `site/` root (section 5).
- **Security/robustness:** the three.js script is pinned to r128 with a Subresource Integrity hash. If you change the
  version, regenerate the hash (`openssl dgst -sha512 -binary file | openssl base64 -A`). Never use `innerHTML` with data;
  use `h()`.

## 5. Run it locally

```bash
cd site
python3 -m http.server 8000        # then open http://localhost:8000/home/
```

ES modules do not work from `file://`, and the absolute `/shared/...` paths require serving `site/` as the web root.

Caveats of the local server versus Netlify:
- It does **not** apply `netlify.toml` redirects, so `/` is a 404 locally. Open `/home/` directly.
- It does not serve `404.html` for unknown paths.
- Browsers cache aggressively: hard-refresh (Cmd+Shift+R) after editing CSS/JS/SVG.

## 6. Testing and verification (no framework yet)

There is no test runner or CI. What has been done, and is worth repeating after risky changes:

- **Syntax check JS:** `for f in $(find site -name '*.js'); do node --input-type=module --check < "$f"; done`
- **CSS brace balance** (an unbalanced `}` once silently disabled all mobile styles): count `{` vs `}` per file.
- **Browser smoke test** (Playwright via the editor's browser tools): no console errors or failed requests; home -> core ->
  back; pause/resume actually animates; keyboard and drag rotate; theme persists across pages; mobile has no horizontal
  overflow; 3D failure fallback works (block the three.js request and confirm `.no-3d`).
- **Playwright gotcha:** `locator.click()` on the sticky toolbar can scroll the page, which makes `IntersectionObserver` stop
  rendering canvases and looks like a bug. Click by coordinates (`page.mouse.click`) when testing pause/resume.
- Screenshot tools sometimes return a stale frame: hard-reload and re-capture before trusting a visual.

If the site grows (plan section 9), add schema validation and a link checker to CI first.

## 7. Deploy and infrastructure

- **Flow:** commit -> `git push origin main` -> Netlify builds automatically -> live in ~30 to 60 seconds. There is no
  build command; Netlify just publishes `site/` (set in `netlify.toml`, which overrides dashboard settings).
- **Roll back:** Netlify dashboard -> Deploys -> pick an earlier deploy -> Publish deploy. Or `git revert` and push.
- **DNS:** registrar is Squarespace Domains. Record: `CNAME workouts -> core-workouts.netlify.app` (TTL 4 hrs). Don't change
  it unless you change the Netlify site name.
- **HTTPS:** Netlify-managed Let's Encrypt certificate for `workouts.theroningamer.com`, renewed automatically. If a browser
  shows "not secure", first suspect a stale cached state: test in a private window and check
  `curl -sI https://workouts.theroningamer.com/home/`.
- **Redirects:** `/` -> `/home/` (302) in `netlify.toml`. `http://` is redirected to `https://` by Netlify. `/core/` is canonical
  for the core guide; do not move it without adding a redirect.
- **Not published:** anything outside `site/` (e.g. `docs/`). Verified: `/docs/...` returns 404 live.

## 8. Common tasks

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
- Client-rendered pages are weaker for SEO and have no build-time validation; this is why the plan recommends Astro once the
  strength section starts (decision pending, plan section 9).
- Stage framing assumes a roughly human-sized figure; very large range-of-motion poses may need a bounds check.
- The core guide's Phase 1 now says "all six" (the original said "five" but there are six exercises).
- Health content here is general education. The guide's medical wording was authored by the site owner, not clinically
  reviewed. See plan section 1 and section 13 before expanding it.
- `docs/core/` (a lossy Markdown export of the original core guide) may exist locally but is intentionally not tracked.

## 10. What to build next

The agreed direction is the **Strength / Hypertrophy section**, built as a small **chest pilot first** and then rolled out.
Everything is specified in [`docs/hypertrophy-plan.md`](docs/hypertrophy-plan.md). Start at its **section 14 (decisions)** and
**section 11 (phases)**.

Open decisions that block Phase 0 (answer these before building):

1. Audience: personal use or a public site others will rely on? (sets the review strictness)
2. Can a physiotherapist/doctor and an S&C coach review content? Until then, label pages as drafts.
3. Approve moving content sections to Astro (recommended), or stay hand-rolled for now?
4. Isometrics URL: keep `/core/` with a future `/isometrics/` hub linking to it (recommended), or `/isometrics/core/` + redirect?
5. Personal context to tailor to: training age, equipment, session length, current back-recovery stage.
6. Cricket scope: role (batter / bowler type / all-rounder), level, format, age group.
7. Visuals: OK to draw our own SVG anatomy and demos, or use own photos/videos?
8. Start the pilot with chest?

Suggested first session, once those are answered: **Phase 1 (foundations)** from the plan: content schemas + validator, page
templates (muscle, exercise, program, principle), `/strength/` hub shell, evidence/status badges. Then **Phase 3 (chest pilot)**.

## 11. Conventions

- Match the existing style: small modules, data separated from rendering, comments only where the *why* isn't obvious.
- No `innerHTML` with data; use `h()` from `/shared/js/dom.js`.
- No new runtime dependency or build step without agreeing it (it changes Netlify settings).
- Accessibility is a requirement: keyboard operable, visible focus, text alternatives for diagrams, honour
  `prefers-reduced-motion`, WCAG AA contrast in both themes.
- Health content: every exercise needs contraindications, a regression and a pain rule; emphasis/benefit claims need a source
  and an evidence grade (plan section 5). Never cite from memory; verify DOIs.
- Commits: small and descriptive. Pushing to `main` deploys to production, so smoke-test locally first (section 6).

## 12. Starter prompt for a new session

> Open `CONTEXT.md` and `docs/hypertrophy-plan.md`. I've decided the open questions in plan section 14 as follows: <answers>.
> Begin Phase 1 (foundations) for the Strength / Hypertrophy section. Keep `/home/` and `/core/` working, and show me the
> proposed file layout before writing code.
