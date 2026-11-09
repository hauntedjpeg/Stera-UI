import type { BundledTheme } from "shiki"

/**
 * Syntax theme pair for every code block on the docs site: MDX fences
 * (source.config.ts) and example source (components/component-source.tsx).
 * Any bundled Shiki theme works: https://shiki.style/themes
 *
 * In dev, saving this file reloads the MDX config (see next.config.ts).
 */
export const codeThemes = {
  light: "github-light-high-contrast",
  dark: "github-dark-high-contrast",
} satisfies Record<"light" | "dark", BundledTheme>

/**
 * Shared Shiki options. `defaultColor: false` emits only CSS variables
 * (`--shiki-light`, `--shiki-dark`, …); app/code.css picks one per color mode.
 */
export const codeThemeOptions = {
  themes: codeThemes,
  defaultColor: false,
} as const
