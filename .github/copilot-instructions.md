# Copilot instructions: Workouts

Static training-guide site at workouts.theroningamer.com. **Read `CONTEXT.md` (architecture, run/deploy, tasks) and
`docs/hypertrophy-plan.md` (roadmap) before making changes.**

## Always
- Netlify builds with `npm run build` (content validator, then Astro) and publishes `dist/`. `site/` is Astro's static folder: `home/`, `core/`, `shared/`, `assets/` and `404.html` are copied through unchanged. Shared code lives in `site/shared/` and is imported with **absolute** paths (`/shared/...`).
- `/home/` and `/core/` are plain HTML/CSS/ES modules. The strength section is Astro (`src/`). Don't add a dependency or bundler without asking.
- Content is data: edit `src/content/**` (strength), `site/home/js/sections.js`, `site/core/js/data/*.js`; don't hand-edit rendered markup. See `CONTEXT.md` section 3a.
- In `site/` client JS, build DOM with `h()` from `/shared/js/dom.js`. Never use `innerHTML` with data.
- Sources: never cite from memory. Find the paper, add it to `src/content/sources.yml`, run `npm run verify:sources -- --write`, read the abstract, then write the claim.
- `foundation`-level (beginner) exercises are only for squat, glute and lower-back work.
- Colours come from CSS tokens in `site/shared/styles/tokens.css`. A token change must be made in **all three** theme blocks.
- British spelling (stabilise, colour). Keep UI text plain and concise.
- Accessible by default: keyboard operable, visible focus, `prefers-reduced-motion`, text alternative for every diagram.
- Health content needs contraindications, a regression and a pain rule; benefit/emphasis claims need a source and an
  evidence grade. Never invent or cite from memory. This is general education, not medical advice.

## Verify before pushing (pushing `main` deploys to production)
- `npm run check:content` (also runs before `npm run build`); add `-- --report` after changing `programs.yml`.
- `npm run build && npm run preview` and open `/home/` (the local server has no redirects or custom 404).
- `node --input-type=module --check < file.js` for JS in `site/`; check CSS braces balance.
- Smoke-test in a browser: no console errors, home -> strength -> weekly plan, home -> core -> back works, 3D renders, mobile has no horizontal scroll.

## Avoid
- A new WebGL renderer per card (one shared `Stage` exists on purpose).
- Moving or renaming `/core/` without a redirect.
- Putting anything private in this repo: it is public. Only the built `dist/` is served on the website, but the source (`src/`, `scripts/`) and `docs/` are
  readable on GitHub.
