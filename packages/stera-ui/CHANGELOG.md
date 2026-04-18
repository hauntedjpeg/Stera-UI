# stera-ui

## 0.3.2

### Patch Changes

- [`dfd8d6f`](https://github.com/hauntedjpeg/Stera-UI/commit/dfd8d6f548e84e2ac85ac85f7d567f651e9cac1e) Thanks [@hauntedjpeg](https://github.com/hauntedjpeg)! - Show a loading spinner while the CLI fetches from the registry
  - `stera-ui add`, `stera-ui list`, and `stera-ui init` now display the existing `• ✦ ✶ ✻` spinner during registry network calls, closing the 0.5–2s silent window where users couldn't tell if the command was running
  - Network failures transition the spinner to `✗ Failed to fetch registry` instead of leaking an in-progress animation
  - Moved the globals-CSS warning in `add` to after the spinner resolves so it no longer corrupts the single-line render

## 0.3.1

### Patch Changes

- [`de2d6e7`](https://github.com/hauntedjpeg/Stera-UI/commit/de2d6e771cd940656d82598958c5499198017020) Thanks [@hauntedjpeg](https://github.com/hauntedjpeg)! - Prevent duplicate `@import` declarations when initializing in a project with an existing CSS file
  - `stera-ui.css` no longer contains `@import` lines; required imports (e.g. `tw-animate-css`) are added to the user's main CSS instead
  - `insertImportLine` now skips imports that already exist, preventing duplicates across init and font setup

## 0.3.0

### Minor Changes

- [`c7a7313`](https://github.com/hauntedjpeg/Stera-UI/commit/c7a731375d1638b14f605cb7513fc9742fa8a15b) Thanks [@hauntedjpeg](https://github.com/hauntedjpeg)! - Adopt shadcn's registry-driven font strategy for init
  - Added `registry:font` type to the registry schema with font metadata (family, provider, variable, subsets, dependency)
  - Font setup during `init` now uses `@fontsource-variable/*` packages for non-Next.js projects and `next/font/google` with AST-based layout patching (via ts-morph) for Next.js projects, replacing the previous approach of copying woff2 files to `public/fonts/`
  - Renamed CSS variables: `--font-display` to `--font-heading`, `--font-body` to `--font-sans` to align with Tailwind/shadcn conventions
  - Removed `setup-fonts-nextjs.ts`, `setup-fonts-generic.ts`, and `copy-fonts.ts` in favor of the new `update-fonts.ts` module
  - Globals CSS no longer depends on a separate `fonts.css` file

## 0.2.1

### Patch Changes

- [`30e3d8f`](https://github.com/hauntedjpeg/Stera-UI/commit/30e3d8f549324ed3c031fc82d63acf8b02457e29) Thanks [@hauntedjpeg](https://github.com/hauntedjpeg)! - Show a friendly error message when running init in a pnpm workspace root instead of a raw stack trace

## 0.2.0

### Minor Changes

- [`3cfe1ad`](https://github.com/hauntedjpeg/Stera-UI/commit/3cfe1ad40e0e0ac0889eec00e4f8c21fb20e0e1b) Thanks [@hauntedjpeg](https://github.com/hauntedjpeg)! - Overhaul font strategy in `stera-ui init` for modern, performant defaults
  - Detect existing font usage (next/font, @font-face, Google Fonts) during init
  - Prompt users to keep their current fonts, adopt Stera UI defaults (Geist), or skip
  - For Next.js projects, optionally configure `next/font` via the `geist` npm package for automatic optimization, preloading, and self-hosting
  - For non-Next.js projects, copy self-hosted woff2 files from the `geist` package to `public/fonts/` and provide preload link tags
  - Record font strategy choice in `components.json` for future reference
  - Fonts now work immediately after init with no manual download steps

## 0.1.3

### Patch Changes

- [`149a5f0`](https://github.com/hauntedjpeg/Stera-UI/commit/149a5f0f91561851f2ea8a6299af924af1a5cf8a) Thanks [@hauntedjpeg](https://github.com/hauntedjpeg)! - Fix package manager detection in monorepos and surface install errors
  - Use `@antfu/ni` for lock file detection, which walks up the directory tree to find lock files at the monorepo root
  - Add `npm_config_user_agent` fallback for cases like `pnpm dlx` where no lock file exists in the working directory
  - Replace `spawn` with `execa` so package manager errors are visible to the user instead of being swallowed

## 0.1.2

### Patch Changes

- [`3b5fc16`](https://github.com/hauntedjpeg/Stera-UI/commit/3b5fc163ac1854cedc27d063fd2924678ac44f60) Thanks [@hauntedjpeg](https://github.com/hauntedjpeg)! - Update registry and schema URLs from ui.stera.site to ui.stera.sh

## 0.1.1

### Patch Changes

- [`5a98702`](https://github.com/hauntedjpeg/Stera-UI/commit/5a987026adcbd8ca94afe99f47792aeccdec4a04) Thanks [@hauntedjpeg](https://github.com/hauntedjpeg)! - Fix CLI crash caused by duplicate shebang in dist/index.js. Split CLI entrypoint into separate dist/cli.js so the bin and library exports no longer conflict.
