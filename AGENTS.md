# Repository Guidelines

## Project Structure & Module Organization
- `bin/` — CLI entry (`index.ts`) that wires flags and calls `main`.
- `*.ts` at repo root — core logic (`main.ts`, `helpers.ts`, `types.ts`).
- `lib/` — compiled output (TypeScript build). Do not edit by hand.
- `tests/` — unit tests (`*.test.ts`) run with Vitest.
- `sample/` — example Firestore index JSON files for local testing.
- `.github/` — CI and release workflows; `.husky/` — git hooks.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies.
- `pnpm build` — compile TypeScript to `lib/`.
- `pnpm dev` — compile in watch mode.
- `pnpm test` / `pnpm test:run` — run tests once; `pnpm test:coverage` for coverage.
- `pnpm lint` — ESLint with TypeScript rules; `pnpm format` — Prettier write.
- Run CLI locally after build: `node lib/bin/index.js --source sample/dev_indexes.json --target sample/prod_indexes.json`.

## Coding Style & Naming Conventions
- TypeScript, ESM (`type: module`). Target Node 20.
- Prettier: 2‑space indent, single quotes, semi, width 80.
- ESLint: `@typescript-eslint` with `no-unused-vars:error`, `no-explicit-any:warn`.
- Files: lowercase `.ts` (e.g., `helpers.ts`, `main.ts`).
- Types/interfaces: `PascalCase`. Functions/variables: `camelCase`.
- Never modify `lib/` or `package/` outputs; change sources and rebuild.

## Testing Guidelines
- Framework: Vitest (`tests/**/*.test.ts`).
- Prefer small, isolated units; mock I/O where practical (see `tests/main.test.ts`).
- Run `pnpm test:run` before pushing; aim to keep/add coverage with `pnpm test:coverage`.

## Commit & Pull Request Guidelines
- Conventional Commits; releases via semantic‑release on `master`.
  - Examples: `feat: add diff for field overrides`, `fix: handle empty indexes`, `chore: update deps`.
- Before opening a PR: run `pnpm lint && pnpm test:run && pnpm build`.
- PRs should include: clear description, linked issues, and any relevant output screenshots/snippets.
- Hooks: `pre-push` runs lint, tests, build; keep them passing. Do not commit `lib/` output or local diff artifacts (`diff-indexes.json`, `diff-field-overrides.json`).

## Security & Configuration Tips
- No secrets required for local dev. CI release needs `GITHUB_TOKEN` and `NPM_TOKEN` (set in repo secrets).
- Validate JSON inputs before sharing; avoid committing real project index files.

## Agent-Specific Instructions
- Respect `.editorconfig`, ESLint, and Prettier. Keep changes minimal and focused.
- Maintain ESM and TypeScript settings from `tsconfig.json`.
- Update or add tests for behavior changes; do not alter CI/release unless requested.
