import fs from "node:fs"
import path from "node:path"
import { select } from "@inquirer/prompts"
import { findConfigPath, CONFIG_FILE, type SteraConfig } from "../utils/resolve-config.js"
import { resolveDependencies, fetchRegistryItem } from "../registry/index.js"
import type { RegistryFontItem } from "../schema/index.js"
import { writeComponentFiles } from "../utils/write-files.js"
import { installDependencies } from "../utils/install-deps.js"
import { hasGlobalsCss } from "../utils/detect-globals.js"
import { detectProject, type ProjectInfo } from "../utils/detect-project.js"
import { detectFonts, type DetectedFonts } from "../utils/detect-fonts.js"
import { patchCssVariables } from "../utils/patch-css-vars.js"
import { massageTreeForFonts, updateFonts } from "../utils/update-fonts.js"
import { LOGO, CHECK, dim } from "../utils/format.js"

type FontStrategy = "stera-default" | "keep-existing" | "skip"

/** Default font registry items to fetch for the "stera-default" strategy. */
const DEFAULT_FONT_NAMES = ["font-geist", "font-geist-mono"]

/**
 * Build a SteraConfig based on detected project structure.
 */
function buildConfig(project: ProjectInfo, strategy: FontStrategy): SteraConfig {
  // Determine CSS file path
  let cssPath: string
  if (project.existingCssFile) {
    cssPath = project.existingCssFile
  } else if (project.hasSrc) {
    cssPath = "src/styles/globals.css"
  } else {
    cssPath = "styles/globals.css"
  }

  return {
    $schema: "https://ui.stera.sh/schema.json",
    version: 1,
    css: cssPath,
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      lib: "@/lib",
      hooks: "@/hooks",
    },
    fonts: {
      strategy,
    },
  }
}

/**
 * Remove only the `@import "tailwindcss"` line from globals content.
 * The user's project already has this import; all other imports are kept.
 */
function stripTailwindCoreImport(content: string): string {
  return content
    .split("\n")
    .filter((line) => !line.trim().match(/^@import\s+["']tailwindcss["']/))
    .join("\n")
}

/**
 * Insert an @import statement into an existing CSS file, placed after the
 * last existing @import line. If no imports exist, prepend to the file.
 */
function insertImportLine(filePath: string, importStatement: string): void {
  const content = fs.readFileSync(filePath, "utf-8")
  const lines = content.split("\n")

  let lastImportIndex = -1
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith("@import")) {
      lastImportIndex = i
    }
  }

  if (lastImportIndex >= 0) {
    lines.splice(lastImportIndex + 1, 0, importStatement)
  } else {
    lines.unshift(importStatement)
  }

  fs.writeFileSync(filePath, lines.join("\n"), "utf-8")
}

/**
 * Prompt user for font strategy. Skipped when --yes is passed.
 */
async function promptFontStrategy(
  detected: DetectedFonts,
  skipPrompts: boolean
): Promise<FontStrategy> {
  const hasExistingFonts =
    detected.hasNextFont || detected.hasFontFace || detected.hasGoogleFontsLink

  const defaultStrategy: FontStrategy = hasExistingFonts
    ? "keep-existing"
    : "stera-default"

  if (skipPrompts) return defaultStrategy

  // Show detected fonts
  if (hasExistingFonts) {
    const sources: string[] = []
    if (detected.fontFamilies.length > 0) {
      sources.push(detected.fontFamilies.join(", "))
    }
    if (detected.hasNextFont) sources.push("next/font")
    if (detected.hasGoogleFontsLink) sources.push("Google Fonts")
    console.log(`  Detected existing fonts: ${sources.join(" via ")}\n`)
  }

  type StrategyChoice = { value: FontStrategy; name: string; description: string }
  const choices: StrategyChoice[] = []

  if (hasExistingFonts) {
    choices.push({
      value: "keep-existing",
      name: "Keep my current fonts",
      description: "Update CSS variables to use your existing fonts",
    })
  }

  choices.push({
    value: "stera-default",
    name: "Use Stera UI default fonts (Geist Sans + Geist Mono)",
    description: "Optimized variable fonts via next/font or fontsource",
  })

  choices.push({
    value: "skip",
    name: "Skip font setup",
    description: "Configure fonts manually later",
  })

  const strategy = await select<FontStrategy>({
    message: "How would you like to set up fonts?",
    choices,
    default: defaultStrategy,
  })

  console.log("")
  return strategy
}

/**
 * Fetch font registry items for the default Stera fonts.
 */
async function fetchDefaultFonts(): Promise<RegistryFontItem[]> {
  const fonts: RegistryFontItem[] = []
  for (const name of DEFAULT_FONT_NAMES) {
    try {
      const item = await fetchRegistryItem(name)
      if (item.type === "registry:font") {
        fonts.push(item as RegistryFontItem)
      }
    } catch {
      // Font not found in registry — skip silently.
    }
  }
  return fonts
}

/**
 * Execute the chosen font strategy using the registry-driven approach.
 *
 * - **stera-default**: Fetches font items from registry, then:
 *   - Next.js: patches layout with next/font/google imports via AST
 *   - Other: installs @fontsource-variable/* packages + adds CSS @import
 * - **keep-existing**: Patches CSS variables to reference user's existing fonts
 * - **skip**: Does nothing
 */
async function executeFontStrategy(
  strategy: FontStrategy,
  project: ProjectInfo,
  detected: DetectedFonts,
  config: SteraConfig,
  cwd: string
): Promise<void> {
  if (strategy === "skip") return

  if (strategy === "keep-existing") {
    const cssPath = path.resolve(cwd, config.css)
    const cssDir = path.dirname(cssPath)

    if (fs.existsSync(cssPath)) {
      const fontFamily =
        detected.fontFamilies.length > 0 ? detected.fontFamilies[0] : null
      const fontValue =
        detected.nextFontVariable
          ? `var(${detected.nextFontVariable})`
          : fontFamily ?? "Geist"

      const patched = patchCssVariables(cssPath, {
        "--font-heading": fontValue,
        "--font-sans": fontValue,
      })

      // Also check stera-ui.css if it exists
      const steraUiPath = path.join(cssDir, "stera-ui.css")
      if (fs.existsSync(steraUiPath)) {
        patchCssVariables(steraUiPath, {
          "--font-heading": fontValue,
          "--font-sans": fontValue,
        })
      }

      if (patched.length > 0) {
        console.log(`  ${CHECK}  Updated font variables to use ${fontValue}`)
      }
    }
    return
  }

  // strategy === "stera-default"
  const fonts = await fetchDefaultFonts()
  if (fonts.length === 0) return

  // Process fonts based on framework
  const fontTree = massageTreeForFonts(fonts, project)

  // Install font dependencies
  if (fontTree.dependencies.length > 0) {
    await installDependencies(fontTree.dependencies, cwd)
  }

  // Add CSS @import lines for fontsource (non-Next.js)
  if (fontTree.cssImports.length > 0) {
    const cssPath = path.resolve(cwd, config.css)
    const cssDir = path.dirname(cssPath)
    const targetCss = fs.existsSync(path.join(cssDir, "stera-ui.css"))
      ? path.join(cssDir, "stera-ui.css")
      : cssPath

    if (fs.existsSync(targetCss)) {
      for (const importLine of fontTree.cssImports) {
        insertImportLine(targetCss, importLine)
      }
      console.log(`  ${CHECK}  Added font imports to ${path.relative(cwd, targetCss)}`)
    }
  }

  // Patch CSS variables
  if (Object.keys(fontTree.cssVars).length > 0) {
    const cssPath = path.resolve(cwd, config.css)
    const cssDir = path.dirname(cssPath)
    const targetCss = fs.existsSync(path.join(cssDir, "stera-ui.css"))
      ? path.join(cssDir, "stera-ui.css")
      : cssPath

    if (fs.existsSync(targetCss)) {
      const patched = patchCssVariables(targetCss, fontTree.cssVars)
      if (patched.length > 0) {
        console.log(`  ${CHECK}  Updated font variables in ${path.relative(cwd, targetCss)}`)
      }
    }
  }

  // For Next.js: patch layout file with next/font imports
  await updateFonts(fonts, project, cwd)
}

export async function init(options: { cwd?: string; yes?: boolean }) {
  const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd()

  console.log(`\n  ${LOGO}  Stera UI\n`)

  // Check if config already exists
  const existing = findConfigPath(cwd)
  if (existing) {
    console.log(`  components.json already exists at ${existing}`)
    console.log('  Run "stera-ui add <component>" to add components.\n')
    return
  }

  // Check for package.json
  const pkgPath = path.join(cwd, "package.json")
  if (!fs.existsSync(pkgPath)) {
    console.error(
      "  Error: No package.json found. Please run this in a project directory."
    )
    process.exit(1)
  }

  // Detect project structure
  const project = detectProject(cwd)

  // Log what was detected
  const frameworkName =
    project.framework === "next"
      ? "Next.js"
      : project.framework === "vite"
        ? "Vite"
        : null

  const parts: string[] = []
  if (frameworkName) parts.push(frameworkName)
  if (project.hasSrc) parts.push("src/ directory")
  if (parts.length > 0) {
    console.log(`  Detected ${parts.join(" project with ")} project\n`)
  }

  // Detect existing fonts
  const detectedFonts = detectFonts(cwd, project)

  // Prompt for font strategy
  const strategy = await promptFontStrategy(
    detectedFonts,
    options.yes ?? false
  )

  // Build config from detection
  const config = buildConfig(project, strategy)

  // Write config
  const configPath = path.join(cwd, CONFIG_FILE)
  fs.writeFileSync(
    configPath,
    JSON.stringify(config, null, 2) + "\n",
    "utf-8"
  )
  console.log(`  ${CHECK}  Created components.json`)

  // Install base styles
  const cssDir = path.dirname(path.resolve(cwd, config.css))

  if (project.existingCssFile) {
    // Existing CSS file found — append tokens if not already present
    if (hasGlobalsCss(config, cwd)) {
      console.log(
        `  ${CHECK}  Stera already initialised ${dim(`(${path.join(path.dirname(project.existingCssFile), "stera-ui.css")} exists)`)}`
      )
    } else {
      try {
        const globalsItem = await fetchRegistryItem("globals")
        const globalsContent = globalsItem.files?.[0]?.content ?? ""
        const steraUiContent = stripTailwindCoreImport(globalsContent)

        const steraUiPath = path.join(cssDir, "stera-ui.css")
        fs.mkdirSync(cssDir, { recursive: true })
        fs.writeFileSync(steraUiPath, steraUiContent, "utf-8")
        console.log(`  ${CHECK}  Created ${path.relative(cwd, steraUiPath)}`)

        const existingCssPath = path.resolve(cwd, project.existingCssFile)
        insertImportLine(existingCssPath, "@import './stera-ui.css';")
        console.log(`  ${CHECK}  Added @import to ${project.existingCssFile}`)
      } catch {
        // globals not found — skip
      }
    }
  } else {
    // No existing CSS file — write globals.css from registry
    // Note: we no longer write fonts.css since fonts are handled by
    // fontsource packages or next/font instead of @font-face files.
    const resolved = await resolveDependencies(["globals"])
    // Filter out the old "fonts" registry dependency (if still resolved)
    const filtered = resolved.filter((item) => item.name !== "fonts")
    const { written } = await writeComponentFiles(filtered, config, cwd)
    for (const file of written) {
      console.log(`  ${CHECK}  Created ${file}`)
    }
  }

  // Execute font strategy
  await executeFontStrategy(
    strategy,
    project,
    detectedFonts,
    config,
    cwd
  )

  // Install npm dependencies from globals (tw-animate-css)
  try {
    const globalsItem = await fetchRegistryItem("globals")
    if (globalsItem.dependencies) {
      const deps = [...new Set(globalsItem.dependencies)].sort()
      console.log("")
      await installDependencies(deps, cwd)
    }
  } catch {
    // globals not found — skip deps install
  }

  // Next steps
  console.log("")
  console.log("  Next steps:")
  console.log('    stera-ui add <component>')

  if (strategy === "skip") {
    console.log("")
    console.log(`  ${dim("Font setup was skipped. See https://ui.stera.sh for font configuration docs.")}`)
  }

  console.log("")
}
