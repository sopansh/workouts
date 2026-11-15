---
name: release-readiness
description: The verification ladder the executive runs before calling site work done or recommending a push to production on workouts.theroningamer.com. Use before any final report, commit or push request.
---

# Release readiness (executive)

Pushing `main` deploys to production through Netlify. Nothing is committed or pushed without the owner's explicit go-ahead. This skill decides whether to recommend it.

## Ladder (stop at the first failure and fix it)

1. **Scope.** `git status` and `git diff --stat`: every changed file is expected, no stray files (`test-results/`, temp files, personal notes), no secrets, nothing private. The repo is public.
2. **Rules.** `npm run check` passes (content validator, standards, agents check, tests). Read warnings, do not ignore them.
3. **Build.** `npm run build` succeeds. Note the page count; an unexpected change means something moved.
4. **Behaviour.** `npm run test:e2e` passes (builds first). It covers every built page, redirects, home tiles, theme, filters and the `/core/` figure. Add specs for new interactive behaviour.
5. **Regression for refactors.** Build the previous commit in a `git worktree` and compare each page's title, description and body text, then crawl `dist/` for broken links and anchors.
6. **Eyes.** Open the changed pages at desktop and about 390 px: no horizontal scroll, readable, safety notice visible.
7. **Content.** Every new claim has a verified source and a grade (`evidence-and-sources`). Every exercise passes `safety-review`. Everything is labelled draft.
8. **Directives.** Each directive that applies was applied and cited.

## Deploy facts

- Netlify builds with `npm run build` and publishes `dist/` on Node 24. A passing local build is the best proxy for a passing deploy.
- A "Deploy successful" message once coincided with stale content, so after a push confirm the deploy is **published** and curl the live page.
- The local server has no redirects: open `/home/`, not `/`.

## Report

State what ran and the result of each step, what was not run and why, and then one of: `ready for the owner to commit and push`, `ready with notes`, or `not ready` with the blocking items. Do not run `git commit` or `git push` unless the owner asked.
