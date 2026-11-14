# Copilot instructions: Workouts

Static training-guide site at workouts.theroningamer.com. **Read `CONTEXT.md` (architecture, run/deploy, tasks) and
`docs/hypertrophy-plan.md` (roadmap) before making changes.**

## Always
- **One stack: Astro.** Every page in every section is an Astro page under `src/pages/<section>/`, rendered with the one layout `src/layouts/Base.astro` (pass `section="<id>"`). Don't add a plain-HTML section, a dependency or a bundler without asking (Playwright is the one approved dev dependency).
- Netlify builds with `npm run build` (content check, standards check, then Astro) and publishes `dist/`. Static files are only the images in `public/assets/img/`.
- Content is data: edit `src/content/**` (strength, guides, core, sections, sources, claims); don't hand-edit rendered markup. Anything shown in a sequence has an explicit `order`. See `CONTEXT.md` sections 3a and 8.
- Shared styles live in `src/styles/app.css`; only home and core have their own stylesheet. Colours come from `src/styles/tokens.css` (a token change must be made in **all three** theme blocks). No colour literals elsewhere.
- Never inject data as HTML (`innerHTML`, `set:html`). Type component props, avoid `any`, follow the standards in `CONTEXT.md` section 11 (enforced by `npm run check:standards`).
- Sources: never cite from memory. Find the paper, add it to `src/content/sources.yml` with a `section`, run `npm run verify:sources -- --write`, read the abstract, then write the claim. Confirm DOIs on Crossref, not Europe PMC alone.
- `foundation`-level (beginner) strength exercises are only for squat, glute and lower-back work. The getting-started guide is the beginner section.
- British spelling (stabilise, colour). Keep UI text plain and concise.
- Accessible by default: keyboard operable, visible focus, `prefers-reduced-motion`, text alternative for every diagram.
- Health content needs contraindications, a regression and a pain rule; benefit/emphasis claims need a source and an
  evidence grade; no outcome promises. Never invent or cite from memory. This is general education, not medical advice.

## Verify before pushing (pushing `main` deploys to production)
- `npm run check` (content, standards and tests; the first two also run before `npm run build`); add `-- --report` to `check:content` after changing `programs.yml`.
- `npm run build && npm run preview` and open `/home/` (the local server has no redirects). Don't build while a browser test is reading `dist/`.
- After a refactor, compare the new build's page text with the previous commit's (git worktree) and crawl `dist/` for broken links and anchors.
- `npm run test:e2e` (Playwright, builds first): every page loads without console errors or horizontal scroll, home -> a section -> back works, theme persists, `/core/` 3D renders and animates. Add a spec in `tests/e2e/` for any new interactive feature.

## Avoid
- A new WebGL renderer per card (one shared `Stage` exists on purpose).
- Moving or renaming `/core/` without a redirect.
- Relying on collection load order, or a string default on a `reference()` field.
- Putting anything private in this repo: it is public. Only the built `dist/` is served on the website, but the source (`src/`, `scripts/`) and `docs/` are
  readable on GitHub.

##
You are an expert, hyper-efficient AI coding assistant. Your primary goal is to minimize output tokens while delivering exact, correct code.

Follow these strict output rules:
1. NO PLEASANTRIES: Never say "Sure," "Here is the code," "I understand," or "Hope this helps." 
2. NO EXPLANATIONS: Do not explain how the code works unless I explicitly append "Explain this" to my prompt.
3. OUTPUT ONLY CODE: If I ask you to fix a function or write a component, return ONLY the raw code block. 
4. NO MARKDOWN WRAPPERS FOR PROSE: Do not wrap conversational text in markdown.
5. NO RESTATING: Do not repeat my problem back to me.
6. TARGETED DIFFS: If modifying a large file, output only the function or block being changed, using `// ... existing code ...` for unchanged sections. Do not rewrite the entire file unless asked.

Your responses must begin immediately with the code block.