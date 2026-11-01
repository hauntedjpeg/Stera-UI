# Stera UI Colors

A Figma plugin that generates 12-step color ramps with the [Radix Colors custom palette generator](https://www.radix-ui.com/colors/custom) and writes them as Figma variables, laid out the way [Stera UI Bridge](../figma-bridge) exports them. Previously published as Huemanize.

## How it works

1. Enter a hex color.
2. Choose **Tuned** (accent) or **Standard** (gray) as the scale type.
3. Optionally adjust the light and dark backgrounds the scale will sit on.
4. Name the color and choose a collection. The default is `Color`, which is created if the file has none.
5. Click **Add Variables**.

To regenerate an existing ramp, switch to **Update**, pick the group, and click **Update Variables**. Click a swatch in the preview to copy its hex. The color, backgrounds, scale type and mode are remembered between sessions.

## Variables

- Steps follow Radix Colors (`1` … `12`), not Tailwind (`50` … `950`). Step 9 is closest to your input color.
- Each ramp is written as two groups of single-valued variables, `Name/Light/1…12` and `Name/Dark/1…12`. Collection modes are left alone. Light/dark lives in the names, and a `Theme` collection with Light and Dark modes aliases into them.
- Variables are upserted, so re-running on an existing group updates its values instead of creating duplicates. Variables from older versions named `Name/1…12` are renamed into `Name/Light/…` and stay bound.

Stera UI Bridge exports these as `--name-1` … `--name-12` and `--name-dark-1` … `--name-dark-12`.

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
```

Sandbox in `src/code.ts`, UI in `src/ui/`, generation and naming logic in `src/core/`. See [CLAUDE.md](CLAUDE.md).

## Acknowledgments

Color generation is performed by `generateRadixColors`, vendored from the [radix-ui/website](https://github.com/radix-ui/website) repo (MIT, © Radix UI authors). See [`src/core/radix/__vendor__.md`](src/core/radix/__vendor__.md) for re-vendoring notes.
