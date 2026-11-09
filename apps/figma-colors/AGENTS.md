# AGENTS.md

Guidance for AI coding agents working in this app. The repo-wide [`AGENTS.md`](../../AGENTS.md) also applies; this file adds what is specific to the plugin.

## Project

Stera UI Colors is a Figma plugin that generates 12-step color ramps (steps `25, 50, 100 … 900, 950`) and writes them as Figma variables. All three scale types come from Stera's own target-driven generators: Semantic for role-banded families, Neutral for the gray family behind a UI's surfaces, Standard for traditional Tailwind-like ramps. It runs inside Figma Desktop, not a browser. It is published to the Figma Community (formerly as "Huemanize"), so `manifest.json`'s `id` must never change.

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
- `src/core/` — pure logic with no `figma.*`, DOM or React: scale generation (`scale/`), variable naming (`naming/variable-names.ts`), color-name suggestions (`naming/color-name.ts`) and hex helpers (`color/hex.ts`). This is where vitest runs.

Data flow: UI mounts → posts `load` → sandbox replies `loaded` with the collections and prefs → UI renders the form and generates the scale. On submit the UI posts `write-variables` with the scale. The sandbox writes the variables and replies `variables-written` with fresh collections, or `legacy-naming` when the target group already uses 50–950 steps.

Scale generation and `color-name-list` (~30k entries) live in the UI bundle, so `dist/code.js` stays small.

## Scale generation (`src/core/scale/`)

- `steps.ts` — the step names and `ScaleEntry`. Dark ramps are mirrored: step 25 is nearest the page background in both modes, so a Theme token aliases the same step in Light and Dark.
- `roles.ts` — what each step is for (`STEP_ROLES`) and the four role bands (`ROLE_BANDS`, base/hover/pressed each, the order the preview segments them in). Semantic and Neutral ramps both follow it. The table is applied by hand in Figma's Theme collection; the plugin writes ramps only.
- `targets.ts` — `DEFAULT_TARGETS`, every number of the Semantic generator: per mode the lightness `L`, chroma `K` and page `offsets` of the nine fixed steps plus the `solidRef` curve point; and `minGap`, `stateDelta`, `stateMinContrast`, `darkSolidMinContrast`, `hueShift`. Change numbers here, never in `semantic.ts`. `ladder()` anchors the subtle and muted bands to the page; `shiftedHue()` rotates dark yellows toward orange by lightness.
- `gamut.ts` — OKLCH ↔ hex via colorjs.io, `cmaxSrgb` (max in-gamut chroma by fixed bisection, so output is deterministic) and WCAG contrast. Gamut is sRGB only, because Figma takes sRGB floats.
- `semantic.ts` — the Semantic generator, `generateSemanticScale(options, targets = DEFAULT_TARGETS)`. Three bands: 25–400 and 800–950 are fixed (target lightness, `vividness × K` chroma clamped to the gamut, seed hue); 500 is the seed verbatim and 600/700 move `stateDelta` away from the page, each pushed further until it has `stateMinContrast` against the step before (OKLCH lightness has no toe, so near black the plain offsets barely change the color). They move toward the page instead when the solid is past 950 or has no room for two such states, as with near-black seeds in light mode and near-white ones in dark. Dark 500 is the seed when it has `darkSolidMinContrast` against the dark page, otherwise lifted until it matches the seed's light-page contrast, with a note. 800 is the bold surface and 900 and 950 are its states, moving further from the page; 950 is the darkest step in light and the lightest in dark. There is no dark seed and no seed placement option.
- `neutral-targets.ts` — `DEFAULT_NEUTRAL_TARGETS`, every number of the Neutral generator: per mode the lightness `L` and chroma `K` of all twelve steps and the page `offsets` of 25–100, plus `minGap`. Change numbers here, never in `neutral.ts`. The fixed steps started as a copy of the Semantic numbers, deliberately not an import, so the two can be tuned apart. `neutralLadder()` is the Semantic `ladder()` over all twelve steps with no reset at the bold band: a step with an offset sits that far from the page or on its target, whichever is nearer the page; every other step sits on its target or `minGap` past the step before. Strict order is therefore a property of the ladder, not of the numbers.
- `neutral.ts` — the Neutral generator, `generateNeutralScale(options, targets = DEFAULT_NEUTRAL_TARGETS)`. The Semantic role layout and page anchoring (it reuses `backgroundError` and the same bounds), but no seed band: every step sits on its ladder lightness, strictly darker as the steps rise in light mode and strictly lighter in dark, so the seed is never locked to 500 and need not appear at all. The seed donates only its hue and its vividness (its chroma relative to the curve at its own lightness, measured on the light curve and reused for dark). No hue shift, no dark-solid lift, no notes. `anchored: false` skips the offsets and the background validation, so the ramp is absolute and only the targets and `minGap` apply. The plumbing for that is in place (`neutralAnchored` in `StoredPrefs` and `GenerationOptions`, and `src/ui/components/Checkbox.tsx` as its control) but the UI does not expose it yet: `App.tsx` pins `neutralAnchored` to true and ignores the stored pref until the option is ready. `relativeChroma` and `ACHROMATIC_C` are a third pair of deliberate twins.
- `standard-targets.ts` — `DEFAULT_STANDARD_TARGETS`, every number of the Standard generator: per mode the lightness `L` and chroma `K` of all twelve steps. Change numbers here, never in `standard.ts`. Much smaller than `targets.ts`, because Standard has no seed band, no page anchoring and no hue shift. The lightness tables were seeded from geometric gap ladders. Light is deliberately lopsided, in two segments: 25 → 400 runs 0.992 → 0.880 at growth `1.30`, so the six lightest steps sit within 0.11 of each other, and 400 → 950 covers the remaining 0.71 at growth `1.06`, close to even — a deliberate jump at 400 → 500, the same shape Tailwind's own scales have. Dark is one ladder, 0.220 → 0.960 at growth `1.20`. The total range is fixed, so a gentler low end is necessarily a steeper high end. The chroma tables are sampled from Tailwind's vivid families at each step's lightness rather than by step number, so they follow the lightness tables if those move.
- `standard.ts` — the Standard generator, `generateStandardScale(options, targets = DEFAULT_STANDARD_TARGETS)`. A traditional, Tailwind-like ramp: all twelve steps sit on their target lightness, so every family shares one ladder and contrast is predictable when a token is re-pointed. The seed donates only its hue and its vividness (chroma relative to the curve at the seed's own lightness, measured on the light curve and reused for dark) — its lightness is dropped, so the seed hex does not appear in its own ramp and a light seed like amber is pushed darker. Nothing reads the page: a Standard ramp is absolute. `relativeChroma` and `ACHROMATIC_C` are deliberate twins of `semantic.ts`'s private versions, kept separate so the two generators never affect each other.
- `bi-modal.ts` — dispatch only: `"accent"` (shown as Semantic) → `semantic.ts` with the backgrounds; `"neutral"` (Neutral) → `neutral.ts` with the backgrounds and `neutralAnchored`; `"gray"` (Standard) → `standard.ts` with the seed alone.
- `standard.test.ts` is the Standard contract: every step on its target lightness for every seed, one ladder shared by all families, gaps non-decreasing from 25 to 950 with the high end at least 1.3× the low end, hue kept at every step, chroma under the curve, gray seeds gray, the seed deliberately not preserved, custom targets honored. Like the Semantic suite it reads the defaults, so retuning does not break it unless the contract does.
- `neutral.test.ts` is the Neutral contract: twelve steps and no notes, strictly ordered by at least `minGap` for every seed and page in both modes, every step on its target lightness on the default pages whatever the seed, a cream page moves 25–100 and not 800–950, unanchored ramps ignore the backgrounds and stay ordered, bad backgrounds rejected, the seed deliberately not preserved, gray seeds gray, hue kept where there is chroma, chroma under the curve, custom targets honored. It reads `DEFAULT_NEUTRAL_TARGETS`, so retuning does not break it unless the contract does.
- `semantic.test.ts` is the Semantic contract: fixed steps on target for every seed and page, hue-equal tints and shades where the gamut allows, seed verbatim at light 500, dark 500 kept or lifted, band order, solid states at least `stateMinContrast` apart, yellow shift, gray seeds gray, custom targets honored. It reads `DEFAULT_TARGETS`, so retuning does not break it unless the contract does.

### Tuning playground (`tune/`)

`pnpm tune` runs `vite.tune.config.ts`, a second Vite app on port 4322. For the Claude desktop browser pane, add a `figma-colors-tune` entry to the root `.claude/launch.json` (gitignored) that runs `pnpm --filter @stera-ui/figma-colors tune` on port 4322. It imports the engine directly, shows every seed in both modes with demo components, and has a slider per target for all three generators — the Semantic bands, Neutral sections with an `L` and a `C` slider for each of the twelve steps plus its page offsets and min gap, and a Standard section with an `L` and a `C` slider for each of the twelve steps. The Neutral and Standard rows share one seed (the "Neutral" field) and are tuned live; both are left out of the demo strips, which compose from Semantic role steps. State lives in the URL hash and local storage; **Copy targets.ts** serializes `DEFAULT_TARGETS`, **Copy neutral-targets.ts** serializes `DEFAULT_NEUTRAL_TARGETS` and **Copy standard-targets.ts** serializes `DEFAULT_STANDARD_TARGETS`; `window.__tune` exposes the state. It is dev only: the plugin build names `src/ui/index.html` as its only input, so nothing under `tune/` ships. `tsconfig.ui.json` and ESLint cover it.

## Variable layout (the Bridge contract)

- Ramps go in the collection the user picks. The default is `Color`, created if missing: the only name the Bridge exports primitives from.
- Each ramp is 24 single-valued variables, `Name/Light/25..950` and `Name/Dark/25..950`. Collection modes are never added or changed. Light/dark lives in the names, and every existing mode gets the same value.
- Upserts are by name. Variables from older schemes are adopted by renaming them in place, index for index, so they keep their ids and bound layers stay bound: `Name/Light/1..12` from the 1..12 era, and for the light variant only the flat `Name/1..12` from when light/dark were modes (`legacyRampNames`).
- Writing into an existing collection is refused when flat `Name/50`…`Name/950` exist there: the Bridge drops the `Light` segment, so `Name/Light/50` would export as the same `--name-50`.
- Update mode lists groups by stripping the `/Light` or `/Dark` segment, and hides any group that holds an alias, since those are semantic tokens and not ramps.

`src/core/bridge-contract.test.ts` imports `buildModel()` from `apps/figma-bridge` and checks that a generated ramp exports as `--name-N` / `--name-dark-N` with no Dark-ramp or collision warnings. If you change naming on either side, that test should fail.

## Conventions

Same as `apps/figma-bridge`: strict TypeScript, ESM, `.js` extensions on relative imports, named exports, `type` rather than `interface`, and Tailwind v4 configured in `src/ui/index.css`. That file maps `--figma-color-*` theme variables to tokens like `surface`, `text`, `border` and `brand`, so the UI follows Figma's light/dark theme. Keep `font-size` off `html`, because Tailwind's spacing is rem-based. Icons come from `stera-icons`.
