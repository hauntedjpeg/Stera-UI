---
"stera-ui": minor
---

Adopt shadcn's registry-driven font strategy for init

- Added `registry:font` type to the registry schema with font metadata (family, provider, variable, subsets, dependency)
- Font setup during `init` now uses `@fontsource-variable/*` packages for non-Next.js projects and `next/font/google` with AST-based layout patching (via ts-morph) for Next.js projects, replacing the previous approach of copying woff2 files to `public/fonts/`
- Renamed CSS variables: `--font-display` to `--font-heading`, `--font-body` to `--font-sans` to align with Tailwind/shadcn conventions
- Removed `setup-fonts-nextjs.ts`, `setup-fonts-generic.ts`, and `copy-fonts.ts` in favor of the new `update-fonts.ts` module
- Globals CSS no longer depends on a separate `fonts.css` file
