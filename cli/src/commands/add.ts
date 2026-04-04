import path from "node:path"
import { loadConfig, findConfigPath, CONFIG_FILE } from "../utils/resolve-config.js"
import { resolveDependencies, getComponent } from "../registry.js"
import { writeComponentFiles } from "../utils/write-files.js"
import { installDependencies } from "../utils/install-deps.js"
import { applyTransforms } from "../utils/transform.js"
import { transformImports } from "../utils/transform-imports.js"
import { hasGlobalsCss } from "../utils/detect-globals.js"

const transforms = [transformImports]

export async function add(
  components: string[],
  options: { cwd?: string; yes?: boolean; overwrite?: boolean }
) {
  const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd()

  // Validate components exist
  for (const name of components) {
    const item = getComponent(name)
    if (!item) {
      console.error(`Error: Component "${name}" not found in registry.`)
      console.error(`Run "stera-ui list" to see available components.`)
      process.exit(1)
    }
  }

  // Load config
  const configPath = findConfigPath(cwd)
  if (!configPath) {
    console.error(
      `Error: ${CONFIG_FILE} not found. Run "stera-ui init" first.`
    )
    process.exit(1)
  }

  const config = loadConfig(cwd)
  if (!config) {
    console.error(`Error: Failed to parse ${CONFIG_FILE}.`)
    process.exit(1)
  }

  const projectRoot = path.dirname(configPath)

  // Check for globals CSS (warn if missing)
  const isAddingGlobals = components.includes("globals")
  if (!isAddingGlobals && !hasGlobalsCss(config, projectRoot)) {
    console.warn("\n  Warning: Stera design tokens not found in " + config.css)
    console.warn("  Components may not render correctly.")
    console.warn("  Run \"stera-ui add globals\" to install base styles.\n")
  }

  // Resolve all dependencies
  const resolved = resolveDependencies(components)

  // Apply transforms to file contents
  for (const item of resolved) {
    for (const file of item.files) {
      file.content = applyTransforms(
        file.content,
        { config, filename: file.path },
        transforms
      )
    }
  }

  // Show what will be installed
  const requested = new Set(components)
  const additional = resolved.filter((item) => !requested.has(item.name))

  console.log("\nComponents to install:")
  for (const item of resolved) {
    const tag = requested.has(item.name) ? "" : " (dependency)"
    console.log(`  ${item.name}${tag}`)
  }

  // Collect npm dependencies
  const allNpmDeps: string[] = []
  for (const item of resolved) {
    if (item.dependencies) {
      allNpmDeps.push(...item.dependencies)
    }
  }
  const uniqueNpmDeps = [...new Set(allNpmDeps)].sort()

  if (uniqueNpmDeps.length > 0) {
    console.log("\nnpm dependencies:")
    for (const dep of uniqueNpmDeps) {
      console.log(`  ${dep}`)
    }
  }

  console.log("")

  // Write files (with overwrite detection)
  const { written, skipped } = await writeComponentFiles(
    resolved,
    config,
    projectRoot,
    { overwrite: options.overwrite }
  )

  if (written.length > 0) {
    console.log("Files written:")
    for (const file of written) {
      console.log(`  ${file}`)
    }
  }

  if (skipped.length > 0) {
    console.log("Files skipped (unchanged):")
    for (const file of skipped) {
      console.log(`  ${file}`)
    }
  }

  // Install npm dependencies
  if (uniqueNpmDeps.length > 0) {
    console.log("")
    installDependencies(uniqueNpmDeps, projectRoot)
  }

  console.log("\nDone.")
}
