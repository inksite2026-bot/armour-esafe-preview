# Claude Code handoff — publish ARMOUR e-Safe preview

## Requested outcome

Publish the current local project to its existing GitHub repository and GitHub Pages site so the client can view and interact with all six designs through a shareable link. Implement the deployment; do not stop at instructions.

## Existing project

- Folder: `/Users/nazmi/Desktop/Test/Codex/Tukar Screen`
- Git remote: `https://github.com/inksite2026-bot/armour-esafe-preview.git`
- Current branch at handoff: `main`
- Expected Pages entry: `https://inksite2026-bot.github.io/armour-esafe-preview/#/designs`
- Stack: React, TypeScript, Vite.
- Existing workflow: `.github/workflows/deploy.yml`; pushes to `main` deploy `dist` with GitHub Actions.
- Existing production base: `/armour-esafe-preview/` in `vite.config.ts`.
- Hash routing and asset helpers: `src/routing.ts`.

## Preserve all six proposals

1. Corporate Minimalist — `#/option-1`
2. Premium Touchscreen — `#/option-2`
3. Gradient Flow — `#/option-3`
4. Easy Touch — `#/option-4`
5. Guided Steps — `#/option-5`
6. Banknote Focus — `#/option-6`

Keep the selector, comparison page, independent sessions, all nine transaction screens, languages, keyboards, demo controls, fullscreen and scaled previews. Do not redesign or rebuild the app. All transactions are simulated; demo User ID is **1001**.

Official BNM front-side images are already in `public/assets/notes/` for all six denominations. Preserve these files, original proportions and the larger note views. Source attribution and demo-only scope are in `public/assets/notes/SOURCES.md`. Preserve that notice; do not represent the assets as openly licensed or the site as a production banking service.

## Work to perform

1. Read applicable project instructions and inspect the current Git status, remote and workflow before changes. There is substantial uncommitted and untracked implementation work: preserve and include the actual new designs, assets, preview screenshots, tests and documentation.
2. Fetch the remote and inspect differences. If the remote has advanced, integrate safely without discarding local work. Do not force-push, reset hard, clean untracked files, or overwrite another project.
3. Review staged files. Keep `.env`, credentials, private `reference/` WhatsApp material, `node_modules`, test reports and generated `dist` out of the source commit. Respect `.gitignore`. Include the six actual proposal thumbnails in `public/assets/previews/`.
4. Run `npm ci`, `npm run build`, and `npm test`. Playwright currently expects installed Google Chrome; use an available supported browser or install it if needed. The latest completed suite had 25 passing tests. Fix genuine failures without weakening checks.
5. Verify the production build under `/armour-esafe-preview/`, including hash-route refreshes, comparison iframe paths, logo and all six note images. Preserve the existing base and routing compatibility.
6. Commit the reviewed changes and push to the existing repository's `main` branch. The user requests publication of this demo. If authentication or branch protection blocks deployment, report the exact blocker and the smallest user action required. Do not expose credentials.
7. Confirm GitHub Pages uses GitHub Actions and monitor the existing deployment workflow until success. Do not create another repository or replace the hosting setup unnecessarily.
8. Open the deployed site and verify all six choices, at least one complete demo transaction, comparison, and image loading. Do not claim publication based only on a local build or successful push.
9. Return the verified live client link, commit SHA and deployment result. If anything remains blocked, state it clearly.

## Local preview caution

Another project, `H/ISK`, previously took localhost port 5173. That was a development-server collision, not lost e-Safe files. Inspect the process working directory before stopping any server. Use another free local port when needed and do not modify or delete H/ISK work.

## Scope of this handoff

The local app has been prepared; this handoff itself does not publish or verify the current live site. The expected URL above must be verified after deployment.
