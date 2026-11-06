# AGENTS.md

Guidance for AI coding agents working in this repository. Claude Code loads it through `CLAUDE.md`.

## What this repo is

Stera-UI is a **shadcn-style component registry** (copy-paste, not an installable component library) plus the CLI that distributes it. Consumers run `npx stera-ui add button`, which fetches a JSON manifest from the registry host (default `https://ui.stera.sh/r`) and writes the source files into their project.

Four workspaces matter:

- **`packages/stera-ui`** — the published CLI (`stera-ui` on npm). Built with `tsup`. Entry: `src/cli.ts` (Commander). Commands in `src/commands/` (`init`, `add`, `list`). Registry fetching/resolution lives in `src/registry/`; file transforms (import-path rewriting in `transform-imports.ts`, font setup in `font-setup.ts`, Next.js layout patching via `ts-morph` in `update-fonts.ts`) live in `src/utils/`. `ts-morph` bundles all of TypeScript, so only import `update-fonts.ts` dynamically, from code paths that need it.
- **`apps/docs`** — Next.js 16 / React 19 / Fumadocs MDX site that **doubles as the registry host**. The component source files under `apps/docs/registry/` are the canonical components; `scripts/build-registry.mts` reads `apps/docs/registry.json` and emits `apps/docs/public/r/*.json` files that the CLI fetches at runtime.

- **`apps/figma-bridge`** — private Figma plugin ("Stera UI Bridge") that exports Figma variables and text styles as Tailwind 4 CSS. It generates `apps/docs/registry/styles/ui/colors.css` and `typography.css`. Has its own `AGENTS.md`.
- **`apps/figma-colors`** — private Figma plugin ("Stera UI Colors", published) that generates 12-step color ramps (steps 25–950) and writes them as Figma variables. It writes the `Color` collection as `Family/Light/N` and `Family/Dark/N`, which is what the Bridge reads, and a vitest test checks that contract against the Bridge's model. Has its own `AGENTS.md`.

When a user says "add a component" or "fix the Button," the work almost always happens in `apps/docs/registry/ui/` — not in `packages/stera-ui/`.

## Commands

Package manager is **pnpm** (enforced; see `packageManager` field). Turbo orchestrates across workspaces.

From the repo root:

- `pnpm dev` — runs all dev tasks (Next.js docs site on default port)
- `pnpm build` — full build (CLI + docs, registry JSON regenerates as part of docs build)
- `pnpm lint`
- `pnpm typecheck`
- `pnpm release` — `turbo run build && changeset publish` (versioning via Changesets)

Workspace-scoped:

- `pnpm --filter stera-ui dev` — watch-build the CLI
- `pnpm --filter docs build:registry` — regenerate `apps/docs/public/r/*.json` only (run this after editing anything under `apps/docs/registry/` or `apps/docs/registry.json` if you want to test the CLI against your local changes)

`apps/figma-bridge` and `apps/figma-colors` (each covering `src/core/`) and `packages/stera-ui` (covering the font tooling in `src/utils/`) have vitest tests: `pnpm test` from the root runs them through turbo. vitest is a devDependency only, so it never ships with the CLI. Don't add a test runner to the other workspaces unless asked.

### Before you finish

CI runs `pnpm turbo run build lint typecheck test format:check` on every PR. Before calling a change done, run the parts that apply:

- `pnpm typecheck` and `pnpm lint`
- `pnpm format:check` (or `pnpm format` to fix). Prettier covers `ts`, `tsx`, `mjs`, `json`, `css` and `md`.
- `pnpm test` if you touched `apps/figma-bridge`, `apps/figma-colors` or `packages/stera-ui`
- `pnpm --filter docs build:registry` if you touched `apps/docs/registry/` or `apps/docs/registry.json`

A user-facing change to `packages/stera-ui` needs a changeset: run `pnpm changeset` and commit the generated file in `.changeset/`.

## Conventions

- Use American English spelling in code, comments and docs (`color`, `initialize`, `organize`).

## Component architecture

Each component is a single `.tsx` file under `apps/docs/registry/ui/`, with `apps/docs/examples/<component>-*.tsx` files driving the docs previews. The registry also ships non-component items — `registry/lib/` (utils), `registry/hooks/`, `registry/styles/globals.css`, `registry/components/` (e.g. theme-provider), and font entries — each with its own `type` in `registry.json` (`registry:lib`, `registry:hook`, `registry:style`, `registry:font`, …).

Stack used inside components:

- **Headless primitives:** `@base-ui/react` (Base UI). Components wrap a Base UI primitive and skin it.
- **Variants:** `class-variance-authority` (CVA).
- **Class merging:** `cn()` from `apps/docs/registry/lib/utils.ts` (clsx + tailwind-merge). Always use `cn()` when composing classes.
- **Icons:** `stera-icons` package.
- **Design tokens:** Tailwind classes built on CSS variables — `text-ink-*`, `bg-surface-*`, `border-border-*`, `ring-ring-*`, plus typography utilities like `st-display-sm`, `st-heading-md`, `st-body-lg` (defined in `apps/docs/registry/styles/`). Prefer these tokens over raw Tailwind colors.

TS path aliases inside `apps/docs` (see `apps/docs/tsconfig.json`):

- `@/components/ui/*` → `./registry/ui/*`
- `@/components/*` → `./components/*` (docs-site components — note this is NOT the registry)
- `@/lib/*` → `./registry/lib/*`
- `@/hooks/*` → `./registry/hooks/*`
- `@/examples/*` → `./examples/*`
- `@/*` → `./*`

## Adding or modifying a component

1. Edit/create the `.tsx` under `apps/docs/registry/ui/`.
2. Add or update its entry in `apps/docs/registry.json` — declare npm `dependencies` and any `registryDependencies` (other registry items it imports).
3. If adding a new component, add demo files under `apps/docs/examples/` and an MDX page under the docs content tree so it appears in the site nav.
4. Write or update the page's design guidance, the `<DesignGuidelines>` block, following [`apps/docs/content/writing-design-docs.md`](apps/docs/content/writing-design-docs.md). Read it before changing how a component looks or behaves, too.
5. Run `pnpm --filter docs build:registry` to regenerate the JSON manifests under `apps/docs/public/r/`.

The docs site also serves every page as plain markdown for consumers' agents: `/llms.txt`, `/llms-full.txt`, and `/<page>.md` (built in `apps/docs/lib/llms.ts`). It swaps `<ComponentPreview>` and `<InstallSnippet>` for the example source and the install command, and also serves each `<DesignGuidelines>` block on its own at `/<page>/design.md`. If you add a new docs-only MDX tag that hides content, teach `expandDocsTags` about it.

A component will not be installable via the CLI until step 2 is done — `registry.json` is the source of truth for what exists.

## Things that look weird but are intentional

- The **docs app hosts the registry**. Editing components in `apps/docs/registry/` is editing the published library; this isn't a docs-only sandbox.
- The CLI rewrites import paths when copying files into a consumer project, via a string-based alias transform (`src/utils/transform-imports.ts`) that maps the default `@/lib`, `@/components/ui`, `@/hooks` aliases to the user's configured ones. Registry components must author imports with those default `@/` aliases — imports the transform can't recognize (dynamic imports, relative paths to sibling registry files) won't be rewritten.
- `apps/docs/registry/styles/ui/colors.css` and `typography.css` are **generated** by `apps/figma-bridge` and pasted in. To change token values, change them in Figma and re-export. To change the _shape_ of the generated CSS, edit `apps/figma-bridge/src/core/css/`. The static partials (`base.css`, `scrollbar.css`, `scroll-fade.css`) are hand-written; the plugin only imports them from `index.css` by name (`STATIC_PARTIALS`), so rename them in both places together.
- **Fonts are decided by `ui/typography.css`.** Each font role points at a family-named variable (`--font-sans: var(--font-zalando-sans, sans-serif)`), and `stera-ui init` installs the `font-<family>` registry item for each one it finds. Changing fonts means changing them in Figma and re-exporting; `build:registry` fails if `typography.css` references a font with no matching `registry:font` item. On Next.js the CLI patches the root layout; elsewhere it writes `ui/fonts.css` (fontsource imports + family variables). It never edits `typography.css`.
