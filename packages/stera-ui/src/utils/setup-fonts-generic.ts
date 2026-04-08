import fs from "node:fs"
import path from "node:path"
import { copyFonts } from "./copy-fonts.js"
import { CHECK, dim } from "./format.js"

const FONTS_CSS_CONTENT = `/* ─────────────────────────────────────────────
   Stera UI font registry
   To add a font:
     1. Drop .woff2 file(s) into public/fonts/{family-name}/
     2. Add an @font-face block below
     3. Add a --font-* variable in globals.css
───────────────────────────────────────────── */

/* ─── Geist Sans ─── */
@font-face {
  font-family: 'Geist';
  src: url('/fonts/geist/Geist-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Geist';
  src: url('/fonts/geist/Geist-Italic.woff2') format('woff2');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}

/* ─── Geist Mono ─── */
@font-face {
  font-family: 'Geist Mono';
  src: url('/fonts/geist-mono/GeistMono-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Geist Mono';
  src: url('/fonts/geist-mono/GeistMono-Italic.woff2') format('woff2');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
`

const PRELOAD_TAGS = `<link rel="preload" href="/fonts/geist/Geist-Variable.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/geist-mono/GeistMono-Variable.woff2" as="font" type="font/woff2" crossorigin />`

export interface GenericFontResult {
  preloadTags: string
}

/**
 * Set up self-hosted Geist fonts for non-Next.js projects (or Next.js without next/font).
 *
 * 1. Copies woff2 files from node_modules/geist to public/fonts/
 * 2. Writes fonts.css with @font-face declarations
 * 3. Returns preload tags for the user to add to their HTML head
 */
export function setupFontsGeneric(cwd: string, cssDir: string): GenericFontResult {
  // Copy font files from geist package
  copyFonts(cwd)

  // Write fonts.css
  const fontsPath = path.join(cssDir, "fonts.css")
  if (!fs.existsSync(fontsPath)) {
    fs.mkdirSync(path.dirname(fontsPath), { recursive: true })
    fs.writeFileSync(fontsPath, FONTS_CSS_CONTENT, "utf-8")
    console.log(`  ${CHECK}  Created ${path.relative(cwd, fontsPath)}`)
  } else {
    console.log(`  ${dim(path.relative(cwd, fontsPath) + " (already exists, skipped)")}`)
  }

  return { preloadTags: PRELOAD_TAGS }
}
