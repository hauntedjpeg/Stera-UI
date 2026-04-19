import fs from "node:fs/promises"
import path from "node:path"
import { fetchRegistryItem } from "../registry/index.js"
import type { SteraConfig } from "./resolve-config.js"

export interface WriteSteraCssResult {
  /** Absolute path to the written `stera-ui.css`. */
  steraUiPath: string
  /**
   * Non-tailwindcss `@import` statements stripped from the registry content
   * (e.g. `@import "tw-animate-css";`). Callers are expected to ensure these
   * are present in the user's main globals.css.
   */
  extraImports: string[]
  /** npm packages declared by the globals registry item. */
  dependencies: string[]
}

/**
 * Strip `@import` lines from registry globals content.
 *
 * `stera-ui.css` is loaded as a partial from the user's globals.css — it
 * should not carry its own `@import` statements (tailwindcss is already in
 * the user's environment, and peer imports belong alongside it).
 *
 * Returns the cleaned content and any non-tailwindcss imports the caller
 * should ensure in the user's globals.css.
 */
function stripImportLines(content: string): {
  content: string
  imports: string[]
} {
  const lines = content.split("\n")
  const imports: string[] = []
  const kept: string[] = []

  for (const line of lines) {
    if (line.trim().match(/^@import\s+["'].+["']/)) {
      if (!line.trim().match(/^@import\s+["']tailwindcss["']/)) {
        imports.push(line.trim())
      }
    } else {
      kept.push(line)
    }
  }

  return { content: kept.join("\n"), imports }
}

/**
 * Fetch the `globals` registry item and write `stera-ui.css` into the
 * directory that holds the user's configured globals.css. Overwrites
 * unconditionally — the caller decides when this is appropriate (init or
 * an explicit `add globals` refresh).
 *
 * Does NOT touch the user's globals.css.
 */
export async function writeSteraUiCss(
  config: SteraConfig,
  cwd: string
): Promise<WriteSteraCssResult> {
  const item = await fetchRegistryItem("globals")
  const rawContent = item.files?.[0]?.content ?? ""
  const { content, imports } = stripImportLines(rawContent)

  const cssDir = path.dirname(path.resolve(cwd, config.css))
  const steraUiPath = path.join(cssDir, "stera-ui.css")

  await fs.mkdir(cssDir, { recursive: true })
  await fs.writeFile(steraUiPath, content, "utf-8")

  return {
    steraUiPath,
    extraImports: imports,
    dependencies: item.dependencies ?? [],
  }
}
