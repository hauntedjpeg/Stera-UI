# Stera UI Bridge

A Figma plugin that exports Figma variables and text styles as paste-ready CSS for [Stera-UI](https://ui.stera.sh) projects.

It shows three files, `index.css`, `colors.css` and `typography.css`, matching the `styles/ui/` directory Stera-UI installs. Each tab has Copy and Download; a warning icon appears next to them when the export has warnings. `base.css`, `scrollbar.css` and `scroll-fade.css` ship with Stera-UI and are left alone.

Settings (the sliders icon) holds the variable prefix, the font strategy, and the unit for font sizes, spacing and radius (`rem` or `px`). Settings are saved per Figma file.

A file without the structure below gets an explanation, the specific problem, and a link to the Stera UI Figma file.

## Setup

From the Stera-UI repo root:

```bash
pnpm install
pnpm --filter @stera-ui/figma-bridge build
```

In Figma Desktop: **Plugins → Development → Import plugin from manifest…** and pick `apps/figma-bridge/manifest.json`.

## Figma file requirements

- A **`Color`** collection of primitive ramps. Required. It has no modes — each ramp carries `Light` and `Dark` subgroups instead (`Neutral/Light/1`, `Neutral/Dark/1`). Alpha ramps like `Black`/`White` need no subgroup.
- A **`Theme`** collection with **Light** and **Dark** modes, aliasing into those ramps. Required — this is what carries light/dark. The dark mode is found by name, so its name must contain "Dark".
- A **`Typography`** collection is optional. All other collections are ignored, including `Reference*` ones. A top-level **`Utilities`** group inside `Theme` is ignored the same way. If an exported variable aliases into an ignored collection, its value is inlined as a literal (read from the mode with the matching name, else the first mode).
- Local text styles become `@utility st-*` blocks; fields bound to variables resolve to the exported custom properties. Letter spacing may be a raw value: steps on Tailwind's scale (e.g. -5% → `var(--tracking-tighter)`) map to Tailwind's theme variables, anything else is emitted as-is.

Slash paths become kebab names: `surface/brand/hover` → `--surface-brand-hover`. In the `Color` collection the `Light` segment is dropped so light ramps keep their plain names — `Neutral/Light/1` → `--neutral-1`, `Neutral/Dark/1` → `--neutral-dark-1`. Every ramp is declared once in `:root`; `.dark` overrides only the semantic tokens.

## Font strategies

Pick the one matching how your app loads fonts: **`next/font`** — a family-named variable with a fallback, e.g. `--font-sans: var(--font-zalando-sans, sans-serif)`, the same name `stera-ui init` loads the font under; **`@fontsource-variable`** — adds `@import` lines plus literal families; **raw** — the quoted family name with a fallback. Zalando Sans, Zalando Sans SemiExpanded, Geist, Geist Mono, Inter, JetBrains Mono, Roboto, and Roboto Mono are mapped by name; under `@fontsource-variable` other families export with a warning, since their package can't be guessed.

## Development

Run from `apps/figma-bridge`:

```bash
pnpm dev        # watch UI + sandbox
pnpm test       # vitest on src/core
pnpm typecheck  # sandbox + UI
```

Sandbox in `src/code.ts`, UI in `src/ui/`, conversion logic in `src/core/` — see [CLAUDE.md](CLAUDE.md).
