import fs from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import { fetchRegistryItem } from "../registry/index.js"
import { insertImportLine } from "./css-imports.js"
import { removeCssImport } from "./patch-css-vars.js"
import { confirmOverwrite, type SkippedFile } from "./write-files.js"
import type { SteraConfig } from "./resolve-config.js"

/** Entry point the user's globals.css imports; owns the partial wiring. */
export const INDEX_TARGET = "ui/index.css"

/** Partial that owns the font variables patched during init. */
export const TYPOGRAPHY_TARGET = "ui/typography.css"

/**
 * Partials users are expected to edit — colors are regenerated from design
 * tools, and typography carries their font setup. A refresh prompts before
 * replacing these; everything else is ours and overwrites freely.
 */
const PROTECTED_TARGETS = new Set([TYPOGRAPHY_TARGET, "ui/colors.css"])

/** Pre-split layout: a single flat file next to the user's globals.css. */
const LEGACY_FILENAME = "stera-ui.css"
const LEGACY_IMPORT = "./stera-ui.css"

export interface WriteStylesResult {
  /** Absolute path to the written `ui/index.css`. */
  indexPath: string
  /** Absolute path to `ui/typography.css`, where font variables are patched. */
  typographyPath: string
  /**
   * Non-relative `@import` statements lifted out of the index (e.g.
   * `@import "tw-animate-css";`). Callers ensure these are present in the
   * user's globals.css.
   */
  extraImports: string[]
  /** npm packages declared by the globals registry item. */
  dependencies: string[]
  /** Consumer-relative paths written this run. */
  written: string[]
  /** Protected partials left untouched. */
  skipped: SkippedFile[]
}

/**
 * Split `@import` lines in the index into those that stay and those that hoist.
 *
 * Relative imports wire the index to its sibling partials and must survive.
 * Bare specifiers resolve against node_modules and belong alongside
 * `@import "tailwindcss"` in the user's globals.css, which already has
 * tailwindcss itself — so that one is dropped outright.
 */
function partitionImports(content: string): {
  content: string
  hoisted: string[]
} {
  const lines = content.split("\n")
  const hoisted: string[] = []
  const kept: string[] = []

  for (const line of lines) {
    const specifier = line.trim().match(/^@import\s+["'](.+?)["']/)?.[1]

    if (specifier === undefined) {
      kept.push(line)
    } else if (specifier.startsWith("./") || specifier.startsWith("../")) {
      kept.push(line)
    } else if (specifier !== "tailwindcss") {
      hoisted.push(line.trim())
    }
  }

  // Hoisting leaves a run of blank lines where the imports were.
  const cleaned = kept
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\n+/, "")

  return { content: cleaned, hoisted }
}

/**
 * Remove the pre-split `stera-ui.css` and its import.
 *
 * Projects initialized before the styles were split carry a single flat file
 * plus an `@import "./stera-ui.css"` line. Left in place the file goes stale
 * and its import points at content the `ui/` folder now owns.
 *
 * @returns The removed file's absolute path, or null if there was nothing to do.
 */
export async function migrateLegacyStyles(
  config: SteraConfig,
  cwd: string
): Promise<string | null> {
  const globalsPath = path.resolve(cwd, config.css)
  const legacyPath = path.join(path.dirname(globalsPath), LEGACY_FILENAME)

  if (!existsSync(legacyPath)) return null

  await fs.rm(legacyPath)

  // Swap the import over in the same step — dropping the old one without
  // adding the new one would leave the project importing no styles at all.
  if (existsSync(globalsPath)) {
    removeCssImport(globalsPath, LEGACY_IMPORT)
    await insertImportLine(globalsPath, `@import "./${INDEX_TARGET}";`)
  }

  return legacyPath
}

/**
 * Fetch the `globals` registry item and write its partials into a `ui/`
 * folder beside the user's configured globals.css.
 *
 * Stable partials are overwritten unconditionally — the caller decides when
 * that is appropriate (init, or an explicit `add globals` refresh). Protected
 * partials prompt first unless `overwrite` is set.
 *
 * Does NOT touch the user's globals.css.
 */
export async function writeStyles(
  config: SteraConfig,
  cwd: string,
  options: {
    overwrite?: boolean
    /** Never prompt — protected partials that differ are kept. */
    yes?: boolean
    /** Called once the registry fetch is done, before any prompt can appear. */
    onFetched?: () => void
  } = {}
): Promise<WriteStylesResult> {
  const item = await fetchRegistryItem("globals")
  options.onFetched?.()
  const cssDir = path.dirname(path.resolve(cwd, config.css))

  const written: string[] = []
  const skipped: SkippedFile[] = []
  let extraImports: string[] = []

  for (const file of item.files ?? []) {
    const target = file.target ?? path.basename(file.path)
    const outputPath = path.join(cssDir, target)

    let content = file.content ?? ""

    if (target === INDEX_TARGET) {
      const partitioned = partitionImports(content)
      content = partitioned.content
      extraImports = partitioned.hoisted
    }

    if (PROTECTED_TARGETS.has(target) && existsSync(outputPath)) {
      const existing = await fs.readFile(outputPath, "utf-8")

      if (existing === content) {
        skipped.push({ path: target, reason: "unchanged" })
        continue
      }

      if (
        !options.overwrite &&
        (options.yes || !(await confirmOverwrite(target)))
      ) {
        skipped.push({ path: target, reason: "declined" })
        continue
      }
    }

    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, content, "utf-8")
    written.push(target)
  }

  return {
    indexPath: path.join(cssDir, INDEX_TARGET),
    typographyPath: path.join(cssDir, TYPOGRAPHY_TARGET),
    extraImports,
    dependencies: item.dependencies ?? [],
    written,
    skipped,
  }
}
