import fs from "node:fs"
import fsp from "node:fs/promises"
import path from "node:path"
import { select } from "@inquirer/prompts"
import { findConfigPath, CONFIG_FILE, type SteraConfig } from "../utils/resolve-config.js"
import { fetchRegistryItem } from "../registry/index.js"
import type { RegistryFontItem } from "../schema/index.js"
import { installDependencies } from "../utils/install-deps.js"
import { detectProject, detectAliasPrefix, type ProjectInfo } from "../utils/detect-project.js"
import { detectFonts, type DetectedFonts } from "../utils/detect-fonts.js"
import { patchCssVariables } from "../utils/patch-css-vars.js"
import { massageTreeForFonts, updateFonts } from "../utils/update-fonts.js"
import { writeSteraUiCss } from "../utils/write-stera-css.js"
import { insertImportLine } from "../utils/css-imports.js"
import { LOGO, CHECK, dim } from "../utils/format.js"
import { createSpinner } from "../utils/spinner.js"

type FontStrategy = "stera-default" | "keep-existing" | "skip"

/** Default font registry items to fetch for the "stera-default" strategy. */
const DEFAULT_FONT_NAMES = ["font-geist", "font-geist-mono"]

/**
 * Build a SteraConfig based on detected project structure.
 */
function buildConfig(
  project: ProjectInfo,
  strategy: FontStrategy,
  aliasPrefix: string
): SteraConfig {
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
      components: `${aliasPrefix}/components`,
      utils: `${aliasPrefix}/lib/utils`,
      ui: `${aliasPrefix}/components/ui`,
      lib: `${aliasPrefix}/lib`,
      hooks: `${aliasPrefix}/hooks`,
    },
    fonts: {
      strategy,
    },
  }
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
  const spinner = createSpinner("Fetching fonts")
  const fonts: RegistryFontItem[] = []
  try {
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
  } catch (err) {
    spinner.fail("Failed to fetch fonts")
    throw err
  }
  spinner.succeed("Fonts resolved")
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

  const cssDir = path.dirname(path.resolve(cwd, config.css))
  const steraUiPath = path.join(cssDir, "stera-ui.css")

  if (strategy === "keep-existing") {
    const fontFamily =
      detected.fontFamilies.length > 0 ? detected.fontFamilies[0] : null
    const fontValue =
      detected.nextFontVariable
        ? `var(${detected.nextFontVariable})`
        : fontFamily ?? "Geist"

    const patched = patchCssVariables(steraUiPath, {
      "--font-heading": fontValue,
      "--font-sans": fontValue,
    })

    if (patched.length > 0) {
      console.log(`  ${CHECK}  Updated font variables to use ${fontValue}`)
    }
    return
  }

  // strategy === "stera-default"
  const fonts = await fetchDefaultFonts()
  if (fonts.length === 0) return

  const fontTree = massageTreeForFonts(fonts, project)

  if (fontTree.dependencies.length > 0) {
    await installDependencies(fontTree.dependencies, cwd)
  }

  // Add CSS @import lines for fontsource (non-Next.js). Fonts are a
  // stera-ui concern, so they live in stera-ui.css — we never add imports
  // to the user's globals.css after the initial scaffold.
  if (fontTree.cssImports.length > 0) {
    for (const importLine of fontTree.cssImports) {
      await insertImportLine(steraUiPath, importLine)
    }
    console.log(`  ${CHECK}  Added font imports to ${path.relative(cwd, steraUiPath)}`)
  }

  if (Object.keys(fontTree.cssVars).length > 0) {
    const patched = patchCssVariables(steraUiPath, fontTree.cssVars)
    if (patched.length > 0) {
      console.log(`  ${CHECK}  Updated font variables in ${path.relative(cwd, steraUiPath)}`)
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

  // Require a tsconfig path alias — otherwise generated components.json
  // aliases won't resolve and `add` would scatter files at the repo root.
  const aliasPrefix = detectAliasPrefix(cwd)
  if (!aliasPrefix) {
    console.error("")
    console.error("  Error: No import alias found in your tsconfig.json file.")
    console.error(
      '  Stera UI requires a path alias (e.g. "@/*": ["./src/*"]) in compilerOptions.paths.'
    )
    console.error(
      "  See https://ui.stera.sh/docs/installation for setup instructions per framework."
    )
    console.error("")
    process.exit(1)
  }

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
  const config = buildConfig(project, strategy, aliasPrefix)

  // Write config
  const configPath = path.join(cwd, CONFIG_FILE)
  fs.writeFileSync(
    configPath,
    JSON.stringify(config, null, 2) + "\n",
    "utf-8"
  )
  console.log(`  ${CHECK}  Created components.json`)

  // Install base styles: always write stera-ui.css, then ensure the user's
  // globals.css exists and imports it. globals.css is user-owned from this
  // point forward — `add <component>` never touches any CSS.
  const fetchSpinner = createSpinner("Fetching base styles")
  let steraCssResult
  try {
    steraCssResult = await writeSteraUiCss(config, cwd)
  } catch (err) {
    fetchSpinner.fail("Failed to fetch base styles")
    throw err
  }
  fetchSpinner.succeed("Base styles resolved")
  console.log(
    `  ${CHECK}  Created ${path.relative(cwd, steraCssResult.steraUiPath)}`
  )

  const globalsPath = project.existingCssFile
    ? path.resolve(cwd, project.existingCssFile)
    : path.resolve(cwd, config.css)

  if (fs.existsSync(globalsPath)) {
    // User has globals.css — add required @imports (idempotent).
    for (const imp of steraCssResult.extraImports) {
      await insertImportLine(globalsPath, imp)
    }
    await insertImportLine(globalsPath, '@import "./stera-ui.css";')
    console.log(
      `  ${CHECK}  Added @import to ${path.relative(cwd, globalsPath)}`
    )
  } else {
    // No globals.css — scaffold a minimal one. Tailwind directives live in
    // stera-ui.css (e.g. @custom-variant, @theme inline), so the scaffold
    // only needs to wire in the imports.
    await fsp.mkdir(path.dirname(globalsPath), { recursive: true })
    const scaffold =
      [
        '@import "tailwindcss";',
        ...steraCssResult.extraImports,
        '@import "./stera-ui.css";',
      ].join("\n") + "\n"
    await fsp.writeFile(globalsPath, scaffold, "utf-8")
    console.log(`  ${CHECK}  Created ${path.relative(cwd, globalsPath)}`)
  }

  // Execute font strategy (patches stera-ui.css only)
  await executeFontStrategy(
    strategy,
    project,
    detectedFonts,
    config,
    cwd
  )

  // Install npm dependencies declared by the globals registry item
  // (e.g. tw-animate-css).
  if (steraCssResult.dependencies.length > 0) {
    const deps = [...new Set(steraCssResult.dependencies)].sort()
    console.log("")
    await installDependencies(deps, cwd)
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
