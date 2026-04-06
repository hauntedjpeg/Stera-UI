# stera-ui

A component registry for React, built on [Base UI](https://base-ui.com) and [Tailwind CSS](https://tailwindcss.com).

Components are copied directly into your project — you own the code. There is no runtime library to install or update.

## Quick Start

```bash
pnpm dlx stera-ui init
pnpm dlx stera-ui add button
```

---

## CLI

### `init`

```bash
pnpm dlx stera-ui init
```

Initializes Stera UI in your project. Run this once before adding any components.

**What it does:**

1. Creates a `components.json` configuration file in your project root.
2. Writes `styles/globals.css` containing the Stera design tokens (CSS variables for colors, borders, etc.) and typography utilities.
3. Writes `styles/fonts.css` which loads the Geist variable font.
4. Installs `tw-animate-css` as a dependency.

**Requirements:**

- A `package.json` must exist in the current directory.
- If `components.json` already exists, `init` exits early without making changes.

**Options:**


| Option             | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `-c, --cwd <path>` | Run in a different directory instead of the current one |
| `-y, --yes`        | Skip confirmation prompts                               |


**After running `init`**, import the globals into your Tailwind CSS entry point if it isn't already:

```css
@import './fonts.css';
@import 'tailwindcss';
@import 'tw-animate-css';
```

See [Font Setup](#font-setup) for how to load the Geist font in your app.

---

### `add`

```bash
pnpm dlx stera-ui add <component> [components...]
```

Adds one or more components to your project.

**What it does:**

1. Resolves the component and all of its dependencies (other components, utilities, and hooks it relies on).
2. Rewrites import paths in component files to match your configured aliases (see `components.json`).
3. Checks for existing files before writing:
  - **Identical content** — skips silently.
  - **Different content** — prompts you to confirm before overwriting.
  - **New file** — writes without prompting.
4. Installs any required npm packages that aren't already in your `package.json`.

**Example — adding a single component:**

```bash
pnpm dlx stera-ui add button
```

Output:

```
Components to install:
  button
  utils (dependency)

npm dependencies:
  @base-ui/react
  class-variance-authority
  clsx
  tailwind-merge

Files written:
  components/ui/button.tsx
  lib/utils.ts
```

**Example — adding multiple components at once:**

```bash
pnpm dlx stera-ui add card table badge
```

Shared dependencies (like `utils`) are only written once regardless of how many components need them.

**Dependency resolution:**

When you add a component, its registry dependencies are automatically included. For example, adding `sidebar` also adds `button`, `input`, `separator`, `sheet`, `skeleton`, `tooltip`, `use-mobile`, and `utils`. The dependency list is shown before any files are written.

**Globals warning:**

If Stera design tokens are not detected in your CSS file, a warning is shown:

```
Warning: Stera design tokens not found in styles/globals.css
Components may not render correctly.
Run "stera-ui add globals" to install base styles.
```

Run `pnpm dlx stera-ui add globals` to install the base styles, or `pnpm dlx stera-ui init` to set up a fresh project correctly.

**Options:**


| Option             | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `-o, --overwrite`  | Overwrite existing files without prompting              |
| `-c, --cwd <path>` | Run in a different directory instead of the current one |
| `-y, --yes`        | Skip confirmation prompts                               |


---

### `list`

```bash
pnpm dlx stera-ui list
```

Lists all available components grouped by type, along with their registry dependencies.

---

## components.json

`components.json` is created by `init` and tells the CLI where to write files in your project. You can edit it to match your project structure.

```json
{
  "$schema": "https://ui.stera.site/schema.json",
  "version": 1,
  "css": "src/styles/globals.css",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

> **Upgrading?** If you have an older `components.json` with a `tailwind` object and fields like `style`, `rsc`, etc., the CLI will read it just fine — those fields are migrated automatically in memory. No manual changes needed.

### `css`

Path to your Tailwind CSS entry file. The CLI uses this to:

- Detect whether Stera design tokens are present.
- Write `globals.css` and `fonts.css` to the same directory during `init`.

### Aliases

The `aliases` field controls where each file type is written and how imports are rewritten inside component files.


| Key          | Default           | What it controls                         |
| ------------ | ----------------- | ---------------------------------------- |
| `ui`         | `@/components/ui` | UI components (button, card, etc.)       |
| `components` | `@/components`    | Non-UI components (theme-provider, etc.) |
| `lib`        | `@/lib`           | Library utilities                        |
| `utils`      | `@/lib/utils`     | The `cn()` utility function              |
| `hooks`      | `@/hooks`         | Hooks (use-mobile, etc.)                 |


These must match the path aliases in your `tsconfig.json`. For example, if you set `"ui": "@/ui"`, the CLI will write button to `ui/button.tsx` (resolved via tsconfig) and rewrite any `import ... from "@/components/ui/button"` statements in other components to `@/ui/button`.

---

## Available Components

### UI Components


| Name            | Dependencies                                                                          |
| --------------- | ------------------------------------------------------------------------------------- |
| `accordion`     | `utils`                                                                               |
| `alert-dialog`  | `utils`, `button`                                                                     |
| `aspect-ratio`  | `utils`                                                                               |
| `avatar`        | `utils`                                                                               |
| `badge`         | `utils`                                                                               |
| `breadcrumb`    | `utils`                                                                               |
| `button`        | `utils`                                                                               |
| `button-group`  | `utils`, `separator`                                                                  |
| `calendar`      | `utils`, `button`                                                                     |
| `callout`       | `utils`                                                                               |
| `card`          | `utils`                                                                               |
| `chart`         | `utils`                                                                               |
| `checkbox`      | `utils`                                                                               |
| `chip`          | `utils`                                                                               |
| `collapsible`   | —                                                                                     |
| `combobox`      | `utils`, `button`, `chip`, `input-group`                                              |
| `command`       | `utils`, `dialog`, `input-group`                                                      |
| `dialog`        | `utils`, `button`                                                                     |
| `drawer`        | `utils`                                                                               |
| `dropdown-menu` | `utils`                                                                               |
| `empty`         | `utils`                                                                               |
| `field`         | `utils`, `label`, `separator`                                                         |
| `hover-card`    | `utils`                                                                               |
| `input`         | `utils`                                                                               |
| `input-group`   | `utils`, `button`, `input`, `textarea`                                                |
| `input-otp`     | `utils`                                                                               |
| `item`          | `utils`, `separator`                                                                  |
| `kbd`           | `utils`                                                                               |
| `label`         | `utils`                                                                               |
| `menubar`       | `utils`, `dropdown-menu`                                                              |
| `native-select` | `utils`                                                                               |
| `notice`        | —                                                                                     |
| `pagination`    | `utils`, `button`                                                                     |
| `popover`       | `utils`                                                                               |
| `progress`      | `utils`                                                                               |
| `radio-group`   | `utils`                                                                               |
| `scroll-area`   | `utils`                                                                               |
| `select`        | `utils`                                                                               |
| `separator`     | `utils`                                                                               |
| `sheet`         | `utils`, `button`                                                                     |
| `sidebar`       | `utils`, `use-mobile`, `button`, `input`, `separator`, `sheet`, `skeleton`, `tooltip` |
| `skeleton`      | `utils`                                                                               |
| `slider`        | `utils`                                                                               |
| `spinner`       | `utils`                                                                               |
| `switch`        | `utils`                                                                               |
| `table`         | `utils`                                                                               |
| `tabs`          | `utils`                                                                               |
| `textarea`      | `utils`                                                                               |
| `toggle`        | `utils`                                                                               |
| `toggle-group`  | `utils`, `toggle`                                                                     |
| `tooltip`       | `utils`                                                                               |


### Other


| Name             | Type      | Description                                       |
| ---------------- | --------- | ------------------------------------------------- |
| `utils`          | lib       | `cn()` utility (clsx + tailwind-merge)            |
| `globals`        | style     | Design tokens, typography utilities, dark mode    |
| `fonts`          | style     | Geist variable font (loaded by `globals`)         |
| `theme-provider` | component | Dark mode provider (next-themes)                  |
| `use-mobile`     | hook      | Returns `true` when viewport width is below 768px |


---

## Font Setup

The Geist font files are not included in this package and must be served by your app. After running `init`, download the Geist variable font and place the files in `public/fonts/`:

```
public/
  fonts/
    GeistVF.woff2
    GeistMonoVF.woff2
```

Geist is available from [vercel/geist-font](https://github.com/vercel/geist-font/releases).

Then apply the font in your root layout:

```tsx
// app/layout.tsx (Next.js)
import '@/styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

---

## Dark Mode

Dark mode is implemented with [next-themes](https://github.com/pacocoursey/next-themes) and a class-based CSS variable strategy. Add the `ThemeProvider` to your root layout:

```bash
pnpm dlx stera-ui add theme-provider
```

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

