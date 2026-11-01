---
"stera-ui": minor
---

Font setup now follows `ui/typography.css`, and no longer breaks Next.js builds.

- `init` installs the fonts `ui/typography.css` points its font roles at (`--font-zalando-sans` → the `font-zalando-sans` item), instead of a fixed list. A font change exported from Figma needs no CLI update.
- On Next.js, `init` no longer adds `import { cn } from "@/lib/utils"` to the root layout. That import broke the build because `utils` wasn't installed yet. Font variables are now merged into `<html className>` without a helper.
- Re-running the layout patch is safe: it reuses fonts the layout already declares under the same variable, and keeps their options (such as `display`). It no longer mistakes `--font-zalando-sans` for `--font-zalando-sans-semiexpanded`.
- On other frameworks, fonts are loaded from a new `ui/fonts.css` (fontsource imports + family variables) instead of rewriting `ui/typography.css`, so `add globals --overwrite` no longer removes them.
- `stera-ui add font-<name>` now installs the font, and says how to point a role at it.
- The "Keep my current fonts" option is gone: `init` offers to install the Stera UI fonts or skip. `--yes` always installs them. Skipping prints the role lines to edit and the `next/font` variables your layout already loads.
- `init` warns when `globals.css` overrides the Stera fonts (`--font-*` in `@theme inline`, or `font-family` on `html`/`body`), as create-next-app's does.
- `init` warns when a font can't be fetched, or the layout can't be patched (Pages Router, no `<html>`), and prints the code to add by hand. `stera.config.json` is now written last, so a failed `init` can be re-run.
