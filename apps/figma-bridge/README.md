# Stera UI Bridge

A Figma plugin that exports Figma variables and text styles as paste-ready CSS for [Stera-UI](https://ui.stera.sh) projects.

The Export tab offers three formats:

- **Partials** (default) — `index.css`, `colors.css` and `typography.css`, matching the `styles/ui/` directory Stera-UI installs. Each file has its own Copy and Download. `base.css`, `scrollbar.css` and `scroll-fade.css` ship with Stera-UI and are left alone.
- **Single file** — everything in one flat `globals.css`.
- **JSON** — the raw Figma variables payload.

## Setup

From the Stera-UI repo root:

```bash
pnpm install
pnpm --filter @stera-ui/figma-bridge build
```

In Figma Desktop: **Plugins → Development → Import plugin from manifest…** and pick `apps/figma-bridge/manifest.json`.

## Figma file requirements

- A **`Color`** collection of primitive ramps. Required. It has no modes — each ramp carries `Light` and `Dark` subgroups instead (`Neutral/Light/1`, `Neutral/Dark/1`). Alpha ramps like `Black`/`White` need no subgroup.
- A **`Theme`** collection with **Light** and **Dark** modes, aliasing into those ramps. Required — this is what carries light/dark. If the dark mode has another name, map it in the plugin's Options tab.
- A **`Typography`** collection is optional. All other collections are ignored, including `Reference*` ones. A top-level **`Utilities`** group inside `Theme` is ignored the same way. The plugin's Preview and Options tabs only show the exported three. If an exported variable aliases into an ignored collection, its value is inlined as a literal (read from the mode with the matching name, else the first mode).
- Local text styles become `@utility st-*` blocks; fields bound to variables resolve to the exported custom properties. Letter spacing may be a raw value: steps on Tailwind's scale (e.g. -5% → `var(--tracking-tighter)`) map to Tailwind's theme variables, anything else is emitted as-is.

Slash paths become kebab names: `surface/brand/hover` → `--surface-brand-hover`. In the `Color` collection the `Light` segment is dropped so light ramps keep their plain names — `Neutral/Light/1` → `--neutral-1`, `Neutral/Dark/1` → `--neutral-dark-1`. Every ramp is declared once in `:root`; `.dark` overrides only the semantic tokens.

## Font strategies

Pick the one matching how your app loads fonts: **`next/font`** — `--font-sans: var(--font-geist-sans)`, or `var(--font-sans)` to match `stera-ui init`; **`@fontsource-variable`** — adds `@import` lines plus literal families; **raw** — the family name as-is. Geist, Geist Mono, Inter, JetBrains Mono, Roboto, and Roboto Mono are mapped by name; other families export with a warning.

## Development

Run from `apps/figma-bridge`:

```bash
pnpm dev        # watch UI + sandbox
pnpm test       # vitest on src/core
pnpm typecheck  # sandbox + UI
```

Sandbox in `src/code.ts`, UI in `src/ui/`, conversion logic in `src/core/` — see [CLAUDE.md](CLAUDE.md).
