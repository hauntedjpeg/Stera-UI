# AGENTS.md

Guidance for AI coding agents working in this app. The repo-wide [`AGENTS.md`](../../AGENTS.md) also applies; this file adds what is specific to the plugin.

## Project

Stera UI Colors is a Figma plugin that generates 12-step color ramps with the [Radix Colors custom palette](https://www.radix-ui.com/colors/custom) algorithm and writes them as Figma variables. It runs inside Figma Desktop, not a browser. It is published to the Figma Community (formerly as "Huemanize"), so `manifest.json`'s `id` must never change.

It feeds Stera UI Bridge (`apps/figma-bridge`). The ramps it writes are the `Color` collection the Bridge turns into `apps/docs/registry/styles/ui/colors.css`.

## Commands (use pnpm)

Run inside `apps/figma-colors`, or from the repo root with `pnpm --filter @stera-ui/figma-colors <script>`.

- `pnpm dev` — watch both bundles concurrently (UI + sandbox)
- `pnpm build` — production build (`dist/code.js` + inlined `dist/index.html`)
- `pnpm test` — vitest run (covers `src/core/`)
- `pnpm test:watch` — vitest watch
- `pnpm typecheck` — runs `tsc --noEmit` twice: the sandbox config (Figma plugin typings) and `tsconfig.ui.json` (DOM + React)

After editing source, you must rebuild before reloading the plugin in Figma. Figma Desktop loads `dist/code.js` and `dist/index.html` directly, as `manifest.json` says.

## Architecture: sandbox ↔ UI split

The layout matches `apps/figma-bridge`:

- `src/code.ts` — **sandbox**. The only place with `figma.*` access. Kept thin: list collections and their ramp groups, write variables, persist prefs in `figma.clientStorage`. Bundled with esbuild → `dist/code.js`.
- `src/ui/` — **iframe UI**. React 19 + Tailwind v4, no `figma.*`. It generates the scale itself (`useMemo` over the prefs) and sends the finished hex values to the sandbox. Bundled with Vite + `vite-plugin-singlefile` into one HTML file.
- `src/shared/messages.ts` — the **only** file both sides import. It defines the `SandboxToUi` / `UiToSandbox` unions and `StoredPrefs`.
- `src/core/` — pure logic with no `figma.*`, DOM or React: scale generation (`scale/bi-modal.ts`), variable naming (`naming/variable-names.ts`), color-name suggestions (`naming/color-name.ts`) and hex helpers (`color/hex.ts`). This is where vitest runs.

Data flow: UI mounts → posts `load` → sandbox replies `loaded` with the collections and prefs → UI renders the form and generates the scale. On submit the UI posts `write-variables` with the scale. The sandbox writes the variables and replies `variables-written` with fresh collections, or `legacy-naming` when the target group already uses 50–950 steps.

Scale generation and `color-name-list` (~30k entries) live in the UI bundle, so `dist/code.js` stays small.

## Vendored Radix generator

`src/core/radix/generate-radix-colors.ts` is copied verbatim from radix-ui/website (MIT). Do not edit it. It is excluded from Prettier and ESLint so it diffs cleanly against upstream. Stera-specific behavior goes in `src/core/scale/bi-modal.ts`, which runs the generator once per appearance and re-spaces light gray steps 2–7. Re-vendoring notes are in `src/core/radix/__vendor__.md`.

## Variable layout (the Bridge contract)

- Ramps go in the collection the user picks. The default is `Color`, created if missing: the only name the Bridge exports primitives from.
- Each ramp is 24 single-valued variables, `Name/Light/1..12` and `Name/Dark/1..12`. Collection modes are never added or changed. Light/dark lives in the names, and every existing mode gets the same value.
- Upserts are by name. Old flat `Name/N` variables (from when light/dark were modes) are renamed into `Name/Light/N` in place, keeping their ids, so bound layers stay bound.
- Writing into an existing collection is refused when `Name/50`…`Name/950` exist there, so the two step schemes never mix.
- Update mode lists groups by stripping the `/Light` or `/Dark` segment, and hides any group that holds an alias, since those are semantic tokens and not ramps.

`src/core/bridge-contract.test.ts` imports `buildModel()` from `apps/figma-bridge` and checks that a generated ramp exports as `--name-N` / `--name-dark-N` with no Dark-ramp or collision warnings. If you change naming on either side, that test should fail.

## Conventions

Same as `apps/figma-bridge`: strict TypeScript, ESM, `.js` extensions on relative imports, named exports, `type` rather than `interface`, and Tailwind v4 configured in `src/ui/index.css`. That file maps `--figma-color-*` theme variables to tokens like `surface`, `text`, `border` and `brand`, so the UI follows Figma's light/dark theme. Keep `font-size` off `html`, because Tailwind's spacing is rem-based. Icons come from `stera-icons`.
