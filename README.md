# stera-ui

Stera UI components are built on [Base UI](https://base-ui.com), styled with [Tailwind CSS v4](https://tailwindcss.com), and use [stera-icons](https://stera.sh/) for iconography. The CLI copies source directly into your project, so there's no runtime package to install or version to track. Theming uses CSS custom properties, and dark mode is included.

Full documentation: [ui.stera.sh](https://ui.stera.sh).

## Quick Start

```bash
pnpm dlx stera-ui@latest init
pnpm dlx stera-ui@latest add button
```

## CLI

| Command                          | Description                                                                                                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stera-ui init`                  | Scaffolds `stera.config.json`, writes `stera-ui.css` (design tokens, typography, dark mode), wires it into your Tailwind entry, and walks you through font setup. |
| `stera-ui add <component> [...]` | Copies the requested components (and their dependencies) into your project, rewriting import paths to match your aliases and installing any missing npm packages. |
| `stera-ui list`                  | Lists all available components grouped by type, with their registry dependencies.                                                                                 |

All commands accept `--cwd <path>` and `--yes`. `add` also accepts `--overwrite`. See [`stera-ui --help`](https://ui.stera.sh/docs/cli) for the full reference.

## Configuration

`stera-ui init` writes a `stera.config.json` to your project root:

```json
{
  "$schema": "https://ui.stera.sh/schema.json",
  "version": 1,
  "css": "src/styles/globals.css",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "fonts": { "strategy": "stera-default" }
}
```

`css` is your Tailwind entry; aliases must match your `tsconfig.json` paths. Field-by-field reference at [ui.stera.sh/docs/configuration](https://ui.stera.sh/docs/configuration). Projects from earlier releases with a `components.json` are detected and offered an inline rename.

## Components

50+ components ship today — accordion, button, calendar, chart, combobox, command, dialog, sidebar, table, and the rest. Browse the full catalog with live examples at [ui.stera.sh/docs/components](https://ui.stera.sh/docs/components), or run `stera-ui list` locally.

## Fonts

`init` walks you through font setup: Geist Sans + Geist Mono by default (via `next/font` for Next.js, `@fontsource-variable/*` otherwise), or keep your existing fonts. See [ui.stera.sh/docs/fonts](https://ui.stera.sh/docs/fonts).

## Dark Mode

Dark mode is class-based and works with [next-themes](https://github.com/pacocoursey/next-themes):

```bash
pnpm dlx stera-ui add theme-provider
```

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"

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
