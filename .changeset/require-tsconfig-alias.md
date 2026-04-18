---
"stera-ui": patch
---

Fix `init` writing unresolvable `@/*` aliases into `components.json` on projects without matching tsconfig paths

- `init` now reads `compilerOptions.paths` from the project's `tsconfig.json` and derives the alias prefix from it (e.g. `@` or `~`), matching shadcn's behavior. Vite/custom-prefix projects no longer get `@/…` aliases hardcoded.
- When tsconfig has no paths (e.g. a references-only root tsconfig in a Figma plugin or some monorepo setups), `init` exits with a clear error pointing at the installation docs instead of writing a broken `components.json` that would scatter files at the repo root on subsequent `add` runs.
- `resolveOutputPath` now throws with an actionable message when a configured alias can't be resolved against tsconfig, instead of silently stripping `@/` and writing files to the wrong place. Also fixes a case where `createMatchPath` would silently accept unmapped aliases.
- `hasGlobalsCss` now also recognises Stera tokens inlined directly in the user's main CSS file (not just the sibling `stera-ui.css` partial), so re-running `init` on a hand-rolled setup no longer re-appends tokens.
