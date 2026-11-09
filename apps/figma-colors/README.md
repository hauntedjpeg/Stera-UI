# Stera UI Colors

A Figma plugin that generates 12-step color ramps and writes them as Figma variables, laid out the way [Stera UI Bridge](../figma-bridge) exports them. Previously published as Huemanize.

## How it works

1. Enter a hex color.
2. Choose **Semantic** (role bands for families like brand, accent, success, …), **Neutral** (the same roles for the gray family behind your surfaces) or **Standard** (a traditional Tailwind-like ramp) as the scale type. Standard ignores the backgrounds, so those two fields are hidden for it.
3. Optionally adjust the light and dark backgrounds the scale will sit on.
4. Name the color and choose a collection. The default is `Color`, which is created if the file has none.
5. Click **Add variables**.

To regenerate an existing ramp, switch to **Update**, pick the group, and click **Update variables**. The preview shows one appearance at a time; switch with the **Light** / **Dark** tabs. Click a swatch to copy its hex; hover it for the step's role. The color, backgrounds, scale type and mode are remembered between sessions.

## Steps and roles

Steps are named `25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950`. Step 25 is always the one nearest the page background: near white in the Light ramp, near black in the Dark ramp. A semantic token therefore aliases the same step in both modes.

A Semantic ramp is a set of roles, not an even lightness scale. Its twelve steps are four bands of base, hover and pressed — subtle, muted, solid, bold — generated in three groups:

- **25–400, subtle and muted surfaces.** Fixed lightness and chroma, the same in every family, so `Success/Light/50` and `Brand/Light/50` are the same tint in different hues. Only the seed's hue and vividness flow in.
- **500–700, the solid.** 500 is your color, verbatim. 600 and 700 are its hover and pressed states, one and two notches more contrast against the page: darker in light mode, lighter in dark mode. A color with no room that way, because it is past the bold step or too near black or white for the pressed state, has its states step back toward the page instead, and the preview says so.
- **800–950, the bold surface.** Fixed again. 800 is the bold surface and 900 and 950 are its hover and pressed states, moving further from the page; 950 is the darkest step in light mode and the lightest tinted surface in dark mode.

Dark mode has no seed of its own. Dark 500 is your color when it has at least 3:1 against the dark page; otherwise it is lifted until it has the same contrast against the dark page that your color has against the light page, and the preview says so. A near-black brand becomes a near-white solid in dark mode.

The Theme collection aliases the steps like this, in every family and both modes:

| Role                                       | Step            |
| ------------------------------------------ | --------------- |
| `surface-x-subtle` / `-hover` / `-pressed` | 25 / 50 / 100   |
| `surface-x-muted` / `-hover` / `-pressed`  | 200 / 300 / 400 |
| `border-x`                                 | 200             |
| `border-x-bold`, `ink-x-subtle`            | 300             |
| `surface-x` / `-hover` / `-pressed`        | 500 / 600 / 700 |
| `ink-x`                                    | 500             |
| `surface-x-bold` / `-hover` / `-pressed`   | 800 / 900 / 950 |
| `ink-x-bold`                               | 800             |

Because 500 is the seed, `ink-x` has whatever contrast your color has; the preview notes when that is under 4.5:1.

Neutral ramps have the same roles as Semantic ones, but no seed band, and they are strictly ordered: each step is darker than the last in light mode and lighter in dark mode, so the ramp works as a set of backgrounds. Your seed sets the hue and how tinted the ramp is, not where it sits; a pure gray seed gives a pure gray ramp, and the seed hex itself need not appear in it. The ramp starts at your page: 25 is the light or dark background itself, 50 and 100 keep at least a small distance above it, and everything else sits on fixed targets.

Standard ramps have no roles. All twelve steps sit on fixed target lightnesses, so every family shares one ladder and contrast stays predictable when a token is re-pointed from one family to another. The steps are close together at the low end, where a UI needs several barely-separated surfaces, and step harder from 600 up. Your seed sets the hue and how vivid the ramp is, not where it sits: a Standard ramp is the same in every project, whatever the page color, and the seed hex itself does not appear in the ramp.

## Variables

- Each ramp is written as two groups of single-valued variables, `Name/Light/25…950` and `Name/Dark/25…950`. Collection modes are left alone. Light/dark lives in the names, and a `Theme` collection with Light and Dark modes aliases into them.
- Variables are upserted, so re-running on an existing group updates its values instead of creating duplicates. Variables from older versions, `Name/Light/1…12` and the flat `Name/1…12`, are renamed in place step for step and stay bound.
- Writing next to flat `Name/50…950` variables is refused, because the Bridge would export both as `--name-50`.

Stera UI Bridge exports these as `--name-25` … `--name-950` and `--name-dark-25` … `--name-dark-950`.

## Setup

From the Stera-UI repo root:

```bash
pnpm install
pnpm --filter @stera-ui/figma-colors build
```

In Figma Desktop: **Plugins → Development → Import plugin from manifest…** and pick `apps/figma-colors/manifest.json`.

## Development

Run from `apps/figma-colors`:

```bash
pnpm dev        # watch UI + sandbox
pnpm test       # vitest on src/core
pnpm typecheck  # sandbox + UI
pnpm tune       # tuning playground on http://localhost:4322
```

Sandbox in `src/code.ts`, UI in `src/ui/`, generation and naming logic in `src/core/`. The Semantic generator's numbers (lightness and chroma of the fixed steps, state offsets, the dark-solid rule, the yellow hue shift) live in `DEFAULT_TARGETS` in `src/core/scale/targets.ts`; the Neutral generator's (lightness, chroma and page offsets of all twelve steps) in `DEFAULT_NEUTRAL_TARGETS` in `src/core/scale/neutral-targets.ts`; the Standard generator's (lightness and chroma of all twelve steps) in `DEFAULT_STANDARD_TARGETS` in `src/core/scale/standard-targets.ts`. `pnpm tune` opens a playground (`tune/`, dev only, never built): pick a generator, click a step in the grid and adjust its numbers in the side panel; **Copy targets.ts** (or the Neutral or Standard file, depending on the generator tab) gives you the literal to paste back. See [CLAUDE.md](CLAUDE.md).
