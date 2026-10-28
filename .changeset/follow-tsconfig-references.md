---
"stera-ui": minor
---

`init` now works on create-vite projects.

- Path alias detection follows TypeScript project references, so a solution-style `tsconfig.json` whose `compilerOptions` live in `tsconfig.app.json` is understood.
- When no alias exists, `init` prints framework-specific instructions naming the file that actually holds `compilerOptions`, with snippets that work on TypeScript 7 (no `baseUrl`) and Vite 8 (`resolve.tsconfigPaths`). It never edits `tsconfig` or bundler config.
- `add` errors name the config file the alias was resolved from.
