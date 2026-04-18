import path from "node:path"
import { loadConfig, findConfigPath, CONFIG_FILE } from "../utils/resolve-config.js"
import { resolveDependencies, getComponent } from "../registry/index.js"
import { writeComponentFiles } from "../utils/write-files.js"
import { installDependencies } from "../utils/install-deps.js"
import { applyTransforms } from "../utils/transform.js"
import { transformImports } from "../utils/transform-imports.js"
import { hasGlobalsCss } from "../utils/detect-globals.js"
import { CHECK, WARN, dim } from "../utils/format.js"
import { createSpinner } from "../utils/spinner.js"

const transforms = [transformImports]

export async function add(
  components: string[],
  options: { cwd?: string; yes?: boolean; overwrite?: boolean }
) {
  const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd()

  const spinner = createSpinner("Fetching registry")

  // Validate components exist
  try {
    for (const name of components) {
      const item = await getComponent(name)
      if (!item) {
        spinner.fail(`Component "${name}" not found in registry.`)
        console.error(`  Run "stera-ui list" to see available components.`)
        process.exit(1)
      }
    }
  } catch (err) {
    spinner.fail("Failed to fetch registry")
    throw err
  }

  // Load config
  const configPath = findConfigPath(cwd)
  if (!configPath) {
    spinner.fail(`${CONFIG_FILE} not found. Run "stera-ui init" first.`)
    process.exit(1)
  }

  const config = loadConfig(cwd)
  if (!config) {
    spinner.fail(`Failed to parse ${CONFIG_FILE}.`)
    process.exit(1)
  }

  const projectRoot = path.dirname(configPath)

  // Resolve all dependencies
  let resolved
  try {
    resolved = await resolveDependencies(components)
  } catch (err) {
    spinner.fail("Failed to fetch registry")
    throw err
  }

  spinner.succeed("Registry resolved")

  // Check for globals CSS (warn if missing) — after spinner so it doesn't
  // corrupt the single-line render.
  const isAddingGlobals = components.includes("globals")
  if (!isAddingGlobals && !hasGlobalsCss(config, projectRoot)) {
    console.warn(`\n  ${WARN}  Stera design tokens not found in ${config.css}`)
    console.warn(`     Components may not render correctly.`)
    console.warn(`     Run "stera-ui add globals" to install base styles.\n`)
  }

  // Apply transforms to file contents
  for (const item of resolved) {
    for (const file of item.files ?? []) {
      if (file.content) {
        file.content = applyTransforms(
          file.content,
          { config, filename: file.path },
          transforms
        )
      }
    }
  }

  // Show what will be installed
  const requested = new Set(components)

  console.log("\n  Installing components\n")
  for (const item of resolved) {
    const tag = requested.has(item.name) ? "" : dim("  (dependency)")
    console.log(`  → ${item.name}${tag}`)
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
    console.log("\n  npm packages\n")
    for (const dep of uniqueNpmDeps) {
      console.log(`  → ${dep}`)
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

  for (const file of written) {
    console.log(`  ${CHECK}  ${file}`)
  }

  for (const file of skipped) {
    console.log(`  ${dim(`·  ${file}  (unchanged)`)}`)
  }

  // Install npm dependencies
  if (uniqueNpmDeps.length > 0) {
    console.log("")
    await installDependencies(uniqueNpmDeps, projectRoot)
  }

  console.log("")
}
