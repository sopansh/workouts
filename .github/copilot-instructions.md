# Copilot instructions: Workouts

Static training-guide site at workouts.theroningamer.com. **Read `CONTEXT.md` (architecture, run/deploy, tasks) and
`docs/hypertrophy-plan.md` (roadmap) before making changes.**

## Always
- Publish root is `site/`. Shared code lives in `site/shared/` and is imported with **absolute** paths (`/shared/...`).
- No build step or package manager. Plain HTML/CSS/ES modules. Don't add a dependency or bundler without asking.
- Content is data: edit `site/home/js/sections.js`, `site/core/js/data/*.js`; don't hand-edit rendered markup.
- Build DOM with `h()` from `/shared/js/dom.js`. Never use `innerHTML` with data.
- Colours come from CSS tokens in `site/shared/styles/tokens.css`. A token change must be made in **all three** theme blocks.
- British spelling (stabilise, colour). Keep UI text plain and concise.
- Accessible by default: keyboard operable, visible focus, `prefers-reduced-motion`, text alternative for every diagram.
- Health content needs contraindications, a regression and a pain rule; benefit/emphasis claims need a source and an
  evidence grade. Never invent or cite from memory. This is general education, not medical advice.

## Verify before pushing (pushing `main` deploys to production)
- Serve `site/` as the web root (`cd site && python3 -m http.server 8000`), open `/home/` (the local server has no
  redirects or custom 404).
- `node --input-type=module --check < file.js` for JS; check CSS braces balance.
- Smoke-test in a browser: no console errors, home -> core -> back works, 3D renders, mobile has no horizontal scroll.

## Avoid
- A new WebGL renderer per card (one shared `Stage` exists on purpose).
- Moving or renaming `/core/` without a redirect.
- Putting anything private in this repo: it is public. Only `site/` is served on the website, but the source and `docs/` are
  readable on GitHub.
