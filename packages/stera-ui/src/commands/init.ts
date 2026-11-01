import fs from "node:fs"
import fsp from "node:fs/promises"
import path from "node:path"
import { confirm, select } from "@inquirer/prompts"
import {
  findConfigPath,
  CONFIG_FILE,
  LEGACY_CONFIG_FILE,
  type SteraConfig,
} from "../utils/resolve-config.js"
import { installDependencies } from "../utils/install-deps.js"
import {
  detectProject,
  detectAliasPrefix,
  type ProjectInfo,
} from "../utils/detect-project.js"
import { loadTsConfigPaths } from "../utils/tsconfig.js"
import { formatAliasGuidance } from "../utils/alias-guidance.js"
import {
  detectFonts,
  findFontOverrides,
  type DetectedFonts,
} from "../utils/detect-fonts.js"
import {
  fetchFontItems,
  readFontVariables,
  setupFonts,
  warnMissingFonts,
  FONTS_TARGET,
} from "../utils/font-setup.js"
import { writeStyles, migrateLegacyStyles } from "../utils/write-styles.js"
import { insertImportLine } from "../utils/css-imports.js"
import { LOGO, CHECK, WARN, dim } from "../utils/format.js"
import { createSpinner } from "../utils/spinner.js"

type FontStrategy = "stera-default" | "skip"

const FONTS_DOCS = "https://ui.stera.sh/docs/fonts"

/**
 * Build a SteraConfig based on detected project structure.
 */
/**
 * Where the project's main stylesheet lives (or will). Depends only on the
 * detected project, so it can be resolved before any prompting.
 */
function resolveCssPath(project: ProjectInfo): string {
  if (project.existingCssFile) return project.existingCssFile
  return project.hasSrc ? "src/styles/globals.css" : "styles/globals.css"
}

function buildConfig(
  project: ProjectInfo,
  strategy: FontStrategy,
  aliasPrefix: string
): SteraConfig {
  const cssPath = resolveCssPath(project)

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
 * Prompt user for font strategy. Skipped when --yes is passed, which always
 * installs the Stera fonts.
 */
async function promptFontStrategy(
  detected: DetectedFonts,
  skipPrompts: boolean
): Promise<FontStrategy> {
  if (skipPrompts) return "stera-default"

  const hasExistingFonts =
    detected.hasNextFont || detected.hasFontFace || detected.hasGoogleFontsLink

  if (hasExistingFonts) {
    const sources: string[] = []
    if (detected.fontFamilies.length > 0) {
      sources.push(detected.fontFamilies.join(", "))
    }
    if (detected.hasNextFont) sources.push("next/font")
    if (detected.hasGoogleFontsLink) sources.push("Google Fonts")
    console.log(`Detected existing fonts: ${sources.join(" via ")}\n`)
  }

  const strategy = await select<FontStrategy>({
    message: "How would you like to set up fonts?",
    choices: [
      {
        value: "stera-default",
        name: "Install the Stera UI fonts",
        description: hasExistingFonts
          ? "Loads the fonts ui/typography.css uses. Your current fonts stay loaded for your own code."
          : "Loads the fonts ui/typography.css uses, via next/font or fontsource",
      },
      {
        value: "skip",
        name: "Skip font setup",
        description:
          "Point the font roles in ui/typography.css at your own fonts",
      },
    ],
    default: "stera-default",
  })

  console.log("")
  return strategy
}

/**
 * Load the fonts `ui/typography.css` references.
 *
 * The font list comes from the stylesheet itself — whatever family variables
 * the Figma export points the roles at — so a font change in Figma needs no
 * CLI change. Each `--font-<family>` maps to the `font-<family>` registry item.
 */
async function installStyleFonts(
  project: ProjectInfo,
  cssDir: string,
  typographyPath: string,
  globalsPath: string,
  cwd: string
): Promise<void> {
  const css = fs.readFileSync(typographyPath, "utf-8")
  const variables = readFontVariables(css)
  if (variables.length === 0) return

  const spinner = createSpinner("Fetching fonts")
  const { fonts, missing } = await fetchFontItems(variables)
  if (fonts.length > 0) {
    spinner.succeed(
      `Resolved ${fonts.map((font) => font.name.replace(/^font-/, "")).join(", ")}`
    )
  } else {
    spinner.fail("No fonts resolved")
  }
  warnMissingFonts(missing, typographyPath)

  const result = await setupFonts(fonts, project, cssDir, cwd)
  if (result) {
    await insertImportLine(globalsPath, `@import "./${FONTS_TARGET}";`)
  }
}

/**
 * On skip, show where the font roles live and which fonts the project
 * already exposes, so pointing the roles at them is a three-line edit.
 */
function printSkipHint(
  detected: DetectedFonts,
  typographyPath: string,
  cwd: string
) {
  const relative = path.relative(cwd, typographyPath)
  const example = detected.nextFontVariables[0] ?? "--font-your-font"
  console.log("")
  console.log(
    `${dim(`Font setup was skipped. Point the font roles in ${relative} at your fonts, e.g.`)}`
  )
  console.log(`${dim(`  --font-sans: var(${example}, sans-serif);`)}`)
  if (detected.nextFontVariables.length > 0) {
    console.log(
      `${dim(`Your layout loads: ${detected.nextFontVariables.join(", ")}`)}`
    )
  }
  console.log(`${dim(FONTS_DOCS)}`)
}

/**
 * Warn about rules in the user's stylesheet that win over the Stera font
 * tokens (create-next-app ships some). Never edits the file: globals.css is
 * the user's.
 */
function warnFontOverrides(globalsPath: string, cwd: string) {
  const overrides = findFontOverrides(fs.readFileSync(globalsPath, "utf-8"))
  if (overrides.length === 0) return

  const relative = path.relative(cwd, globalsPath)
  console.log("")
  console.log(`${WARN} ${relative} overrides the Stera UI fonts:`)
  for (const override of overrides) {
    console.log(
      `    line ${override.line}  ${override.declaration}  ${dim(`(${override.context})`)}`
    )
  }
  console.log("  Remove these to use the Stera UI fonts everywhere.")
}

export async function init(options: { cwd?: string; yes?: boolean }) {
  const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd()

  console.log(`\n${LOGO} Stera UI\n`)

  // Check if config already exists
  const existing = findConfigPath(cwd)
  if (existing) {
    const existingName = path.basename(existing)
    if (existingName === LEGACY_CONFIG_FILE) {
      console.log(`Found legacy ${LEGACY_CONFIG_FILE} at ${existing}`)
      const shouldRename = options.yes
        ? true
        : await confirm({
            message: `Rename it to ${CONFIG_FILE}?`,
            default: true,
          })
      if (shouldRename) {
        const renamed = path.join(path.dirname(existing), CONFIG_FILE)
        fs.renameSync(existing, renamed)
        console.log(`${CHECK} Renamed to ${CONFIG_FILE}`)
        console.log('Run "stera-ui add <component>" to add components.\n')
      } else {
        console.log(
          `Keeping ${LEGACY_CONFIG_FILE} for now. Legacy filename support will be removed in a future release.\n`
        )
      }
      return
    }

    console.log(`${CONFIG_FILE} already exists at ${existing}`)
    console.log('Run "stera-ui add <component>" to add components.\n')
    return
  }

  // Check for package.json
  const pkgPath = path.join(cwd, "package.json")
  if (!fs.existsSync(pkgPath)) {
    console.error(
      "Error: No package.json found. Please run this in a project directory."
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

  if (frameworkName || project.hasSrc) {
    const label = frameworkName ? `${frameworkName} project` : "project"
    const suffix = project.hasSrc ? " with src/ directory" : ""
    console.log(`Detected ${label}${suffix}\n`)
  }

  // Require a tsconfig path alias — otherwise generated stera.config.json
  // aliases won't resolve and `add` would scatter files at the repo root.
  // The CLI never edits tsconfig or bundler config itself; it explains the
  // exact change for this framework and layout instead.
  const aliasPrefix = detectAliasPrefix(cwd)
  if (!aliasPrefix) {
    console.error(formatAliasGuidance(cwd, project, loadTsConfigPaths(cwd)))
    process.exit(1)
  }

  // Detect existing fonts
  const detectedFonts = detectFonts(cwd, project)

  // A project may already keep its own partials in a ui/ folder beside its
  // globals.css. Writing into it blind could clobber files that have nothing
  // to do with Stera, so ask first.
  const uiDir = path.join(
    path.dirname(path.resolve(cwd, resolveCssPath(project))),
    "ui"
  )
  if (fs.existsSync(uiDir) && fs.readdirSync(uiDir).length > 0) {
    const relativeUiDir = path.relative(cwd, uiDir)
    console.log("")
    console.log(`${relativeUiDir} already exists and is not empty.`)

    const proceed =
      options.yes ||
      (process.stdin.isTTY &&
        (await confirm({
          message: `Write the style partials into ${relativeUiDir}?`,
          default: false,
        })))

    if (!proceed) {
      console.log("")
      console.log(
        `Aborted. Move ${relativeUiDir} aside, or point "css" in ${CONFIG_FILE} at a different stylesheet, then run init again.`
      )
      return
    }
  }

  // Prompt for font strategy
  const strategy = await promptFontStrategy(detectedFonts, options.yes ?? false)

  // Build config from detection. It is written last: init refuses to run
  // where a config exists, so writing it first would leave a half-finished
  // setup (say, a failed font install) impossible to retry.
  const config = buildConfig(project, strategy, aliasPrefix)

  // Install base styles: write the ui/ partials, then ensure the user's
  // globals.css exists and imports the index. globals.css is user-owned from
  // this point forward — `add <component>` never touches any CSS.
  const fetchSpinner = createSpinner("Downloading base styles")
  let stylesResult
  try {
    await migrateLegacyStyles(config, cwd)
    stylesResult = await writeStyles(config, cwd, {
      yes: options.yes,
      onFetched: () => fetchSpinner.stop(),
    })
  } catch (err) {
    fetchSpinner.fail("Failed to fetch base styles")
    throw err
  }
  console.log(`${CHECK} Created ${path.relative(cwd, stylesResult.indexPath)}`)

  const globalsPath = project.existingCssFile
    ? path.resolve(cwd, project.existingCssFile)
    : path.resolve(cwd, config.css)

  if (fs.existsSync(globalsPath)) {
    // User has globals.css — add required @imports (idempotent).
    for (const imp of stylesResult.extraImports) {
      await insertImportLine(globalsPath, imp)
    }
    await insertImportLine(globalsPath, '@import "./ui/index.css";')
    console.log(`${CHECK} Added @import to ${path.relative(cwd, globalsPath)}`)
  } else {
    // No globals.css — scaffold a minimal one. Tailwind directives live in
    // the ui/ partials (e.g. @custom-variant, @theme inline), so the scaffold
    // only needs to wire in the imports.
    await fsp.mkdir(path.dirname(globalsPath), { recursive: true })
    const scaffold =
      [
        '@import "tailwindcss";',
        ...stylesResult.extraImports,
        '@import "./ui/index.css";',
      ].join("\n") + "\n"
    await fsp.writeFile(globalsPath, scaffold, "utf-8")
    console.log(`${CHECK} Created ${path.relative(cwd, globalsPath)}`)
  }

  if (strategy === "stera-default") {
    await installStyleFonts(
      project,
      path.dirname(path.resolve(cwd, config.css)),
      stylesResult.typographyPath,
      globalsPath,
      cwd
    )
  }

  // Install npm dependencies declared by the globals registry item
  // (e.g. tw-animate-css).
  if (stylesResult.dependencies.length > 0) {
    const deps = [...new Set(stylesResult.dependencies)].sort()
    console.log("")
    await installDependencies(deps, cwd)
  }

  const configPath = path.join(cwd, CONFIG_FILE)
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8")
  console.log(`${CHECK} Created ${CONFIG_FILE}`)

  if (strategy === "stera-default") {
    warnFontOverrides(globalsPath, cwd)
  } else {
    printSkipHint(detectedFonts, stylesResult.typographyPath, cwd)
  }

  // Next steps
  console.log("")
  console.log("Next steps:")
  console.log("  stera-ui add <component>")
  console.log("")
}
