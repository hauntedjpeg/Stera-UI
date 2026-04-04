import fs from "node:fs"
import path from "node:path"
import { findConfigPath, CONFIG_FILE, type SteraConfig } from "../utils/resolve-config.js"
import { resolveDependencies, getComponent } from "../registry.js"
import { writeComponentFiles } from "../utils/write-files.js"
import { installDependencies } from "../utils/install-deps.js"
import { hasGlobalsCss } from "../utils/detect-globals.js"
import { detectProject, type ProjectInfo } from "../utils/detect-project.js"

/**
 * Build a SteraConfig based on detected project structure.
 */
function buildConfig(project: ProjectInfo): SteraConfig {
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
    $schema: "https://stera.site/ui/schema.json",
    version: 1,
    css: cssPath,
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      lib: "@/lib",
      hooks: "@/hooks",
    },
  }
}

/**
 * Strip the import lines from registry globals.css content.
 * The first 3 lines are @import directives that an existing project
 * already has or should manage separately.
 */
function stripGlobalsImports(content: string): string {
  const lines = content.split("\n")
  // Skip lines that are @import directives or blank lines at the top
  let startIndex = 0
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    if (trimmed.startsWith("@import") || trimmed === "") {
      startIndex = i + 1
    } else {
      break
    }
  }
  return lines.slice(startIndex).join("\n")
}

export async function init(options: { cwd?: string; yes?: boolean }) {
  const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd()

  // Check if config already exists
  const existing = findConfigPath(cwd)
  if (existing) {
    console.log(`components.json already exists at ${existing}`)
    console.log('Run "stera-ui add <component>" to add components.')
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

  const parts: string[] = []
  if (frameworkName) parts.push(frameworkName)
  if (project.hasSrc) parts.push("src/ directory")
  if (parts.length > 0) {
    console.log(`Detected ${parts.join(" project with ")} project`)
  }

  // Build config from detection
  const config = buildConfig(project)

  // Write config
  const configPath = path.join(cwd, CONFIG_FILE)
  fs.writeFileSync(
    configPath,
    JSON.stringify(config, null, 2) + "\n",
    "utf-8"
  )
  console.log("\nCreated components.json")

  // Install base styles
  console.log("\nInstalling base styles...")

  const cssDir = path.dirname(path.resolve(cwd, config.css))

  if (project.existingCssFile) {
    // Existing CSS file found — append tokens if not already present
    if (hasGlobalsCss(config, cwd)) {
      console.log(
        `  Stera design tokens already present in ${project.existingCssFile}`
      )
    } else {
      const globalsItem = getComponent("globals")
      if (globalsItem) {
        const globalsContent = globalsItem.files[0].content
        const tokensOnly = stripGlobalsImports(globalsContent)

        const existingCssPath = path.resolve(cwd, project.existingCssFile)
        const existingContent = fs.readFileSync(existingCssPath, "utf-8")

        // Append Stera tokens to existing file
        const separator = existingContent.endsWith("\n") ? "\n" : "\n\n"
        fs.writeFileSync(
          existingCssPath,
          existingContent + separator + tokensOnly,
          "utf-8"
        )
        console.log(
          `  Appended Stera design tokens to ${project.existingCssFile}`
        )
      }
    }

    // Write fonts.css to the same directory as the existing CSS file
    const fontsItem = getComponent("fonts")
    if (fontsItem) {
      const fontsPath = path.join(cssDir, "fonts.css")
      fs.mkdirSync(path.dirname(fontsPath), { recursive: true })
      if (!fs.existsSync(fontsPath)) {
        fs.writeFileSync(fontsPath, fontsItem.files[0].content, "utf-8")
        console.log(`  ${path.relative(cwd, fontsPath)}`)
      } else {
        console.log(
          `  ${path.relative(cwd, fontsPath)} (already exists, skipped)`
        )
      }
    }
  } else {
    // No existing CSS file — write globals.css and fonts.css from registry
    const resolved = resolveDependencies(["globals"])
    const { written } = await writeComponentFiles(resolved, config, cwd)
    for (const file of written) {
      console.log(`  ${file}`)
    }
  }

  // Install npm dependencies from globals (tw-animate-css)
  const globalsItem = getComponent("globals")
  if (globalsItem?.dependencies) {
    const deps = [...new Set(globalsItem.dependencies)].sort()
    console.log("")
    installDependencies(deps, cwd)
  }

  // Next steps
  console.log("")
  console.log("Next steps:")
  if (project.existingCssFile) {
    console.log(
      `  Add to your CSS file: @import './fonts.css';`
    )
  }
  console.log('  Run "stera-ui add <component>" to add components')
  console.log("")
  console.log("See the README for font setup instructions.")
}
