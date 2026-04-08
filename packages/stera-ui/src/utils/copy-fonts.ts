import fs from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"
import { createSpinner } from "./spinner.js"

interface FontFileSpec {
  /** Path relative to the geist package dist/fonts/ directory */
  src: string
  /** Path relative to the user's public/fonts/ directory */
  dest: string
}

const FONT_FILES: FontFileSpec[] = [
  {
    src: "geist-sans/Geist-Variable.woff2",
    dest: "geist/Geist-Variable.woff2",
  },
  {
    src: "geist-sans/Geist-Italic[wght].woff2",
    dest: "geist/Geist-Italic.woff2",
  },
  {
    src: "geist-mono/GeistMono-Variable.woff2",
    dest: "geist-mono/GeistMono-Variable.woff2",
  },
  {
    src: "geist-mono/GeistMono-Italic[wght].woff2",
    dest: "geist-mono/GeistMono-Italic.woff2",
  },
]

/**
 * Resolve the path to the geist package's fonts directory.
 */
function resolveGeistFontsDir(cwd: string): string {
  const require = createRequire(path.join(cwd, "package.json"))
  const geistEntry = require.resolve("geist/font/sans")
  // geist entry resolves to something like .../geist/dist/sans.js
  // fonts are at .../geist/dist/fonts/
  const distDir = path.dirname(geistEntry)
  return path.join(distDir, "fonts")
}

/**
 * Copy Geist variable font files from node_modules to public/fonts/.
 * Returns the list of destination paths relative to cwd.
 */
export function copyFonts(cwd: string): string[] {
  const spinner = createSpinner("Copying font files")
  const fontsDir = resolveGeistFontsDir(cwd)
  const publicFontsDir = path.join(cwd, "public", "fonts")
  const written: string[] = []

  for (const file of FONT_FILES) {
    const srcPath = path.join(fontsDir, file.src)
    const destPath = path.join(publicFontsDir, file.dest)

    if (fs.existsSync(destPath)) continue

    if (!fs.existsSync(srcPath)) {
      spinner.fail(`Font file not found: ${file.src}`)
      throw new Error(
        `Could not find ${srcPath}. Is the geist package installed?`
      )
    }

    fs.mkdirSync(path.dirname(destPath), { recursive: true })
    fs.copyFileSync(srcPath, destPath)
    written.push(path.relative(cwd, destPath))
  }

  if (written.length > 0) {
    spinner.succeed(`Copied ${written.length} font files to public/fonts/`)
  } else {
    spinner.succeed("Font files already exist")
  }

  return written
}
