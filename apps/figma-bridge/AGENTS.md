# AGENTS.md

Guidance for AI coding agents working in this app. The repo-wide [`AGENTS.md`](../../AGENTS.md) also applies; this file adds what is specific to the plugin.

## Project

Stera UI Bridge — a Figma plugin that exports Figma variables as paste-ready CSS for Stera-UI projects, as the `styles/ui/` partials Stera-UI installs. Runs inside Figma Desktop, not a browser.

This app lives at `apps/figma-bridge` in the Stera-UI monorepo. It is the generator for `apps/docs/registry/styles/ui/colors.css` and `typography.css` — those files are its Partials output, pasted in. `scrollbar.css`, `scroll-fade.css` and `base.css` are static registry files the plugin only imports by name (`STATIC_PARTIALS` in `src/core/css/partials.ts`), so keep that list in sync when the registry's static partials change.

## Commands (use pnpm)

Run inside `apps/figma-bridge`, or from the repo root with `pnpm --filter @stera-ui/figma-bridge <script>`.

- `pnpm dev` — watch both bundles concurrently (UI + sandbox)
- `pnpm build` — production build (`dist/code.js` + inlined `dist/index.html`)
- `pnpm test` — vitest run (covers `src/core/`)
- `pnpm test:watch` — vitest watch
- `pnpm test -- src/core/css/model.test.ts` — single test file
- `pnpm typecheck` — runs both `tsc --noEmit` (sandbox) and `tsc -p tsconfig.ui.json` (UI). Two configs because the sandbox uses Figma plugin typings while the UI uses DOM + React.

After editing source, you must rebuild before reloading the plugin in Figma — Figma Desktop loads `dist/code.js` and `dist/index.html` directly per `manifest.json`.

## Architecture: sandbox ↔ UI split

Figma plugins run in two isolated contexts that talk only via `postMessage`. Respect the boundary:

- `src/code.ts` — **sandbox**. Has access to `figma.*` APIs (`figma.variables.*`, `figma.clientStorage`, `figma.ui.postMessage`). No DOM. Keep this file thin: read variables, persist prefs, relay messages. Bundled with esbuild → `dist/code.js`.
- `src/ui/` — **iframe UI**. React 19 + Tailwind v4. No `figma.*` access; talks to the sandbox by `parent.postMessage({ pluginMessage }, "*")`. Bundled with Vite + `vite-plugin-singlefile` into one HTML file with all JS/CSS inlined (Figma requires a single HTML).
- `src/shared/messages.ts` — the **only** file imported by both sides. Defines `SandboxToUi` / `UiToSandbox` discriminated unions and `StoredPrefs`. When changing the protocol, update both sides plus this file.
- `src/core/` — pure, framework-free conversion logic (OKLCH color math, kebab naming, font strategies, CSS assembly). Imported by the UI; **must not** import `figma.*` or browser/React APIs. This is where most CSS-output bugs are fixed and where vitest runs.

Data flow: UI mounts → posts `load-variables` → sandbox calls `figma.variables.getLocalVariableCollectionsAsync()` and `figma.getLocalTextStylesAsync()`, serializes to `SerializedCollection[]` + `SerializedTextStyle[]`, replies with `variables-loaded` → UI builds one `GenerateOptions` and feeds it to `generatePartials()` (re-run on every prefs change via `useMemo`). Any `errors` show the unsupported-file screen; otherwise the UI shows one tab per file. Links go through an `open-url` message to `figma.openExternal`.

UI (`src/ui/`): `App.tsx` switches between `views/FilesView.tsx` (file tabs, copy/download, warnings popover), `views/SettingsView.tsx` (prefix, font strategy, unit) and `views/UnsupportedView.tsx`. Shared controls are in `src/ui/components/`. Colors come from Figma's `--figma-color-*` theme variables (mapped in `src/ui/index.css`), so the plugin follows Figma's light/dark theme. Keep `font-size` off `html` there: Tailwind's spacing is rem-based. Icons are from `stera-icons`.

## CSS generation pipeline (`src/core/css/model.ts`)

The exporter is opinionated about Figma collection names — it only includes collections named `Color`, `Theme`, or `Typography` (see `INCLUDED_COLLECTIONS`). Collections whose names start with `Reference` are filtered out. `selectExportedCollections()` is the single filter for this, used by `buildModel()`. It also drops Figma-only groups inside an exported collection (`IGNORED_GROUPS` — currently the top-level `Utilities` group in `Theme`), which are then treated exactly like variables in an ignored collection. The sandbox still serializes every collection, because an exported variable may alias into an ignored one — `renderValue` follows such an alias to the first exported variable (`var(--…)`) or else inlines the literal, reading the target in the mode named like the source mode (falling back to its first mode). Only an alias to a variable that does not exist is reported as unresolved.

**Light/dark lives in the semantic layer, not the primitives.** `Color` is a mode-less collection of ramps grouped `Family/Light/N` and `Family/Dark/N` (`Black`/`White` alpha ramps have no subgroup); `Theme` carries the `Light` and `Dark` modes and aliases into those ramps per mode. So every primitive is declared exactly once in `:root` and `.dark` overrides only semantic tokens. That is what keeps a token like `Ink/Onwarning` — which points at `Warning/Light/12` in _both_ modes — lossless: because no ramp is ever redeclared, `var(--warning-12)` means the same thing inside `.dark` as outside. Two hard errors: a missing `Color` collection, and a missing `Theme` collection or one without a mode whose name contains "Dark". Error texts are short causes, since the UI shows them as the one-line reason under its own explanation.

In the `Color` collection a non-leading `Light` segment is dropped during naming, so the light ramp keeps the unqualified name downstream code has always used and only dark is namespaced: `Neutral/Light/1` → `--neutral-1`, `Neutral/Dark/1` → `--neutral-dark-1`.

`buildModel()` in `src/core/css/model.ts` does all the work — validation, name normalization, decl building, sorting, utility generation — and returns a framework-agnostic `CssModel`, which `generatePartials()` renders.

`CssModel` is `{ imports, colorRamps, typography, semanticLight, semanticDark, utilitiesCss }` — one ramp list, two semantic lists.

`generatePartials()` (`src/core/css/partials.ts`) mirrors Stera-UI's `styles/ui/` directory: `ui/index.css` (import manifest + `@custom-variant dark`), `ui/colors.css` (`@theme inline` + `:root` ramps and light semantic aliases + `.dark` dark semantic aliases), `ui/typography.css` (`:root` type tokens + `@utility st-*` blocks). `colors.css` and `typography.css` start with the same header comment the registry files carry, so a paste is a no-op diff. `base.css`, `scrollbar.css` and `scroll-fade.css` are static Stera-UI files, so they are imported by `index.css` but never generated.

Because the `Light` segment is dropped, a ramp can collide with a semantic token (`Color: Alpha/Light/1` and `Theme: Alpha/1` both become `--alpha-1`, and the alias renders as a self-reference). `findNameCollisions` warns whenever two exported variables share a CSS name; it does not rename anything.

Variable names go through `normalizeName` → `toKebabName` → `rewriteTypographyHead`. The Typography collection has special-case rewrites (`size` → `font-size`, `weight` → `font-weight`, etc.) that don't apply to other collections.

The `@utility st-*` typography blocks are generated from the file's local text styles by `src/core/css/text-styles.ts`. Each field prefers the variable the text style binds (resolved by Figma variable **id** through the same name map as the `:root` decls) — weights like `Weight/Medium` and `Weight/Strong` can share a numeric value, so binding by id is the only lossless route. Weight variables may be numbers or text: Figma binds a text one to the style's `fontStyle` (not `fontWeight`) and only applies a style name like `SemiBold`, so the weight field reads either binding, `:root` emits text weights as numbers via `weightFromStyleName()` (`src/core/css/weights.ts`), anything else warns, and `deriveFontAssignments()` skips `--font-weight-*` so they never become font roles. Unbound or out-of-export fields fall back to a literal and raise a warning — except unbound letter spacing, which is a legitimate raw value: it maps to Tailwind's `var(--tracking-*)` when it lands exactly on that scale, otherwise emits a literal, and never warns (`TAILWIND_THEME_VARS` keeps `findUnresolvedReferences` from flagging those names). `STERA_UTILITIES` in `src/core/css/utilities.ts` is now only a fallback for files with no local text styles (i.e. the styles live in a published library), copied from the registry's `ui/typography.css` utilities — update it when those change. After assembly, `findUnresolvedReferences` warns about any `var(--…)` in the utilities that the export does not actually emit.

Number units come from `StoredPrefs.unit`, one setting for every collection (font weights stay unitless). Font emission lives in `src/core/fonts/strategy.ts` and is driven by `StoredPrefs.strategy` (`next-font` | `fontsource-variable` | `raw`). `next-font` always emits a family-named variable with a short fallback (`--font-sans: var(--font-zalando-sans, sans-serif)`, from `fallbackStack()`), the same name `stera-ui init` and the registry's `registry:font` items load the font under. `stera-ui init` reads those `var(--font-<family>)` references to decide which `font-<family>` items to install, so the exported `typography.css` alone decides the fonts. `src/core/fonts/registry.test.ts` checks `KNOWN_FAMILIES` against `apps/docs/registry.json`. Fallbacks stay short so exported lines fit Prettier's 80 columns and a paste matches the formatted registry file. Font roles come from `deriveFontAssignments()` in `model.ts`: only STRING variables in the Typography collection whose exported name is `--font`/`--font-*` count, and the role _is_ that exported name (so it matches the `:root` decl and text-style utilities); with none, the Stera defaults (Zalando Sans, Zalando Sans SemiExpanded, Geist Mono) apply. A text style with an unbound family uses the role carrying that family (`var(--font-sans)`) when there is one. `src/core/fonts/registry.ts` is a list of exceptions: for `next-font` the variable defaults to `--font-<kebab family>` and the registry only overrides it (e.g. Geist → `--font-geist-sans`), so unknown families don't warn; for `fontsource-variable` the registry supplies the package and registered family name, so unknown families warn (once per family).

## Conventions

- TypeScript everywhere, strict mode, ESM.
- Imports use `.js` extensions even for `.ts` files (NodeNext/Bundler resolution).
- React 19 with the new JSX transform.
- Tailwind v4 (`@tailwindcss/vite`) — no `tailwind.config.js`; styles configured inline in `src/ui/index.css`.
