import fs from "node:fs"
import path from "node:path"
import { findConfigPath, CONFIG_FILE, type SteraConfig } from "../utils/resolve-config.js"
import { resolveDependencies, fetchRegistryItem } from "../registry/index.js"
import { writeComponentFiles } from "../utils/write-files.js"
import { installDependencies } from "../utils/install-deps.js"
import { hasGlobalsCss } from "../utils/detect-globals.js"
import { detectProject, type ProjectInfo } from "../utils/detect-project.js"
import { LOGO, CHECK, dim } from "../utils/format.js"

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

  // Build config from detection
  const config = buildConfig(project)

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
        const globalsContent = globalsItem.files[0].content ?? ""
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

    // Write fonts.css to the same directory as the existing CSS file
    try {
      const fontsItem = await fetchRegistryItem("fonts")
      const fontsPath = path.join(cssDir, "fonts.css")
      fs.mkdirSync(path.dirname(fontsPath), { recursive: true })
      if (!fs.existsSync(fontsPath)) {
        fs.writeFileSync(fontsPath, fontsItem.files[0].content ?? "", "utf-8")
        console.log(`  ${CHECK}  Created ${path.relative(cwd, fontsPath)}`)
      } else {
        console.log(`  ${dim(path.relative(cwd, fontsPath) + " (already exists, skipped)")}`)
      }
    } catch {
      // fonts not found — skip
    }
  } else {
    // No existing CSS file — write globals.css and fonts.css from registry
    const resolved = await resolveDependencies(["globals"])
    const { written } = await writeComponentFiles(resolved, config, cwd)
    for (const file of written) {
      console.log(`  ${CHECK}  Created ${file}`)
    }
  }

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
  console.log("")
  console.log(`  ${dim("See the README for font setup instructions.")}`)
  console.log("")
}
