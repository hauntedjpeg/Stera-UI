# AGENTS.md

Guidance for AI coding agents working in this app. The repo-wide [`AGENTS.md`](../../AGENTS.md) also applies; this file adds what is specific to the plugin.

## Project

Stera UI Bridge — a Figma plugin that exports Figma variables as paste-ready CSS for Stera-UI projects, either as the `styles/ui/` partials Stera-UI installs or as one flat `globals.css`. Runs inside Figma Desktop, not a browser.

This app lives at `apps/figma-bridge` in the Stera-UI monorepo. It is the generator for `apps/docs/registry/styles/ui/colors.css` and `typography.css` — those files are its Partials output, pasted in. `scrollbar.css`, `scroll-fade.css` and `base.css` are static registry files the plugin only references (`STATIC_PARTIALS` in `src/core/css/partials.ts`; `STERA_BASE_UTILITIES` in `src/core/css/utilities.ts` is `base.css` + `scrollbar.css` for single-file mode), so keep those in sync when the registry's static partials change.

## Commands (use pnpm)

Run inside `apps/figma-bridge`, or from the repo root with `pnpm --filter @stera-ui/figma-bridge <script>`.

- `pnpm dev` — watch both bundles concurrently (UI + sandbox)
- `pnpm build` — production build (`dist/code.js` + inlined `dist/index.html`)
- `pnpm test` — vitest run (covers `src/core/`)
- `pnpm test:watch` — vitest watch
- `pnpm test -- src/core/css/generate.test.ts` — single test file
- `pnpm typecheck` — runs both `tsc --noEmit` (sandbox) and `tsc -p tsconfig.ui.json` (UI). Two configs because the sandbox uses Figma plugin typings while the UI uses DOM + React.

After editing source, you must rebuild before reloading the plugin in Figma — Figma Desktop loads `dist/code.js` and `dist/index.html` directly per `manifest.json`.

## Architecture: sandbox ↔ UI split

Figma plugins run in two isolated contexts that talk only via `postMessage`. Respect the boundary:

- `src/code.ts` — **sandbox**. Has access to `figma.*` APIs (`figma.variables.*`, `figma.clientStorage`, `figma.ui.postMessage`). No DOM. Keep this file thin: read variables, persist prefs, relay messages. Bundled with esbuild → `dist/code.js`.
- `src/ui/` — **iframe UI**. React 19 + Tailwind v4. No `figma.*` access; talks to the sandbox by `parent.postMessage({ pluginMessage }, "*")`. Bundled with Vite + `vite-plugin-singlefile` into one HTML file with all JS/CSS inlined (Figma requires a single HTML).
- `src/shared/messages.ts` — the **only** file imported by both sides. Defines `SandboxToUi` / `UiToSandbox` discriminated unions and `StoredPrefs`. When changing the protocol, update both sides plus this file.
- `src/core/` — pure, framework-free conversion logic (OKLCH color math, kebab naming, font strategies, CSS assembly). Imported by the UI; **must not** import `figma.*` or browser/React APIs. This is where most CSS-output bugs are fixed and where vitest runs.

Data flow: UI mounts → posts `load-variables` → sandbox calls `figma.variables.getLocalVariableCollectionsAsync()` and `figma.getLocalTextStylesAsync()`, serializes to `SerializedCollection[]` + `SerializedTextStyle[]`, replies with `variables-loaded` → UI builds one `GenerateOptions` and feeds it to both `generatePartials()` and `generateGlobalsCss()` (both re-run on every prefs change via `useMemo`).

## CSS generation pipeline (`src/core/css/model.ts`)

The exporter is opinionated about Figma collection names — it only includes collections named `Color`, `Theme`, or `Typography` (see `INCLUDED_COLLECTIONS`). Collections whose names start with `Reference` are filtered out. `selectExportedCollections()` is the single filter for this: `buildModel()` uses it, and so do the Preview and Options tabs, so the UI never lists or offers controls for a collection that is not exported. It also drops Figma-only groups inside an exported collection (`IGNORED_GROUPS` — currently the top-level `Utilities` group in `Theme`), which are then treated exactly like variables in an ignored collection. The sandbox still serializes every collection, because an exported variable may alias into an ignored one — `renderValue` follows such an alias to the first exported variable (`var(--…)`) or else inlines the literal, reading the target in the mode named like the source mode (falling back to its first mode). Only an alias to a variable that does not exist is reported as unresolved.

**Light/dark lives in the semantic layer, not the primitives.** `Color` is a mode-less collection of ramps grouped `Family/Light/N` and `Family/Dark/N` (`Black`/`White` alpha ramps have no subgroup); `Theme` carries the `Light` and `Dark` modes and aliases into those ramps per mode. So every primitive is declared exactly once in `:root` and `.dark` overrides only semantic tokens. That is what keeps a token like `Text/Onbrand` — which points at `Neutral/Light/1` in _both_ modes — lossless: because no ramp is ever redeclared, `var(--neutral-1)` means the same thing inside `.dark` as outside. Two hard errors: a missing `Color` collection, and a missing `Theme` collection or one without a Dark mode (name it `Dark`, or map it in the Options tab).

In the `Color` collection a non-leading `Light` segment is dropped during naming, so the light ramp keeps the unqualified name downstream code has always used and only dark is namespaced: `Neutral/Light/1` → `--neutral-1`, `Neutral/Dark/1` → `--neutral-dark-1`.

`buildModel()` in `src/core/css/model.ts` does all the work — validation, name normalization, decl building, sorting, utility generation — and returns a framework-agnostic `CssModel`. Two renderers consume it, so the output shapes can never drift on naming, units, or ordering:

`CssModel` is `{ imports, colorRamps, typography, semanticLight, semanticDark, utilitiesCss }` — one ramp list, two semantic lists.

- `generateGlobalsCss()` (`src/core/css/generate.ts`) — one flat file: `@import` lines → `@custom-variant dark` → optional `@theme inline { … }` (semantic colors mapped to `--color-*`) → `:root { … }` (all ramps + typography + light semantic) → `.dark { … }` (dark semantic, every token mirrored) → generated `@utility st-*` blocks → `STERA_BASE_UTILITIES`.
- `generatePartials()` (`src/core/css/partials.ts`) — the default. Mirrors Stera-UI's `styles/ui/` directory: `ui/index.css` (import manifest + `@custom-variant dark`), `ui/colors.css` (`@theme inline` + `:root` ramps and light semantic aliases + `.dark` dark semantic aliases), `ui/typography.css` (`:root` type tokens + `@utility st-*` blocks). `base.css`, `scrollbar.css` and `scroll-fade.css` are static Stera-UI files, so they are imported by `index.css` but never generated — which is why partials mode does **not** emit `STERA_BASE_UTILITIES`.

Because the `Light` segment is dropped, a ramp can collide with a semantic token (`Color: Alpha/Light/1` and `Theme: Alpha/1` both become `--alpha-1`, and the alias renders as a self-reference). `findNameCollisions` warns whenever two exported variables share a CSS name; it does not rename anything.

Variable names go through `normalizeName` → `toKebabName` → `rewriteTypographyHead`. The Typography collection has special-case rewrites (`size` → `font-size`, `weight` → `font-weight`, etc.) that don't apply to other collections.

The `@utility st-*` typography blocks are generated from the file's local text styles by `src/core/css/text-styles.ts`. Each field prefers the variable the text style binds (resolved by Figma variable **id** through the same name map as the `:root` decls) — weights like `Weight/Medium` and `Weight/Strong` can share a numeric value, so binding by id is the only lossless route. Unbound or out-of-export fields fall back to a literal and raise a warning — except unbound letter spacing, which is a legitimate raw value: it maps to Tailwind's `var(--tracking-*)` when it lands exactly on that scale, otherwise emits a literal, and never warns (`TAILWIND_THEME_VARS` keeps `findUnresolvedReferences` from flagging those names). `STERA_UTILITIES` in `src/core/css/utilities.ts` is now only a fallback for files with no local text styles (i.e. the styles live in a published library); `STERA_BASE_UTILITIES` (`scrollbar-hide` + `@layer base`) is appended by the single-file renderer only. After assembly, `findUnresolvedReferences` warns about any `var(--…)` in the utilities that the export does not actually emit.

Font emission lives in `src/core/fonts/strategy.ts` and is driven by `StoredPrefs.strategy` (`next-font` | `fontsource-variable` | `raw`). `next-font` always emits a family-named variable (`--font-sans: var(--font-zalando-sans)`), the same name `stera-ui init` and the registry's `registry:font` items load the font under, so keep `KNOWN_FAMILIES` and `apps/docs/registry.json` in agreement. Font roles come from `deriveFontAssignments()` in `model.ts`: only STRING variables in the Typography collection whose exported name is `--font`/`--font-*` count, and the role _is_ that exported name (so it matches the `:root` decl and text-style utilities); with none, the Stera defaults (Zalando Sans, Zalando Sans SemiExpanded, Geist Mono) apply. `src/core/fonts/registry.ts` is a list of exceptions: for `next-font` the variable defaults to `--font-<kebab family>` and the registry only overrides it (e.g. Geist → `--font-geist-sans`), so unknown families don't warn; for `fontsource-variable` the registry supplies the package and registered family name, so unknown families warn (once per family).

## Conventions

- TypeScript everywhere, strict mode, ESM.
- Imports use `.js` extensions even for `.ts` files (NodeNext/Bundler resolution).
- React 19 with the new JSX transform.
- Tailwind v4 (`@tailwindcss/vite`) — no `tailwind.config.js`; styles configured inline in `src/ui/index.css`.
