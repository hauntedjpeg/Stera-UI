---
"stera-ui": minor
---

Overhaul font strategy in `stera-ui init` for modern, performant defaults

- Detect existing font usage (next/font, @font-face, Google Fonts) during init
- Prompt users to keep their current fonts, adopt Stera UI defaults (Geist), or skip
- For Next.js projects, optionally configure `next/font` via the `geist` npm package for automatic optimization, preloading, and self-hosting
- For non-Next.js projects, copy self-hosted woff2 files from the `geist` package to `public/fonts/` and provide preload link tags
- Record font strategy choice in `components.json` for future reference
- Fonts now work immediately after init with no manual download steps
