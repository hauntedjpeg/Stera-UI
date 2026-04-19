import path from "node:path"
import { loadConfig, findConfigPath, CONFIG_FILE } from "../utils/resolve-config.js"
import { resolveDependencies, getComponent } from "../registry/index.js"
import { writeComponentFiles } from "../utils/write-files.js"
import { installDependencies } from "../utils/install-deps.js"
import { applyTransforms } from "../utils/transform.js"
import { transformImports } from "../utils/transform-imports.js"
import { writeSteraUiCss } from "../utils/write-stera-css.js"
import { CHECK, CROSS, dim } from "../utils/format.js"
import { createSpinner } from "../utils/spinner.js"

const transforms = [transformImports]

export async function add(
  components: string[],
  options: { cwd?: string; yes?: boolean; overwrite?: boolean }
) {
  const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd()

  // Load config first — needed for both the globals refresh and component installs.
  const configPath = findConfigPath(cwd)
  if (!configPath) {
    console.error(`  ${CROSS}  ${CONFIG_FILE} not found. Run "stera-ui init" first.`)
    process.exit(1)
  }

  const config = loadConfig(cwd)
  if (!config) {
    console.error(`  ${CROSS}  Failed to parse ${CONFIG_FILE}.`)
    process.exit(1)
  }

  const projectRoot = path.dirname(configPath)

  // `add globals` is a special refresh operation — it overwrites stera-ui.css
  // with the latest registry content. Not compatible with adding components
  // in the same invocation.
  if (components.includes("globals")) {
    if (components.length > 1) {
      console.error(
        `  ${CROSS}  "stera-ui add globals" refreshes design tokens and cannot be combined with other components.`
      )
      console.error(
        `     Run "stera-ui add globals" and "stera-ui add ${components
          .filter((c) => c !== "globals")
          .join(" ")}" separately.`
      )
      process.exit(1)
    }

    const spinner = createSpinner("Refreshing base styles")
    let result
    try {
      result = await writeSteraUiCss(config, projectRoot)
    } catch (err) {
      spinner.fail("Failed to refresh base styles")
      throw err
    }
    spinner.succeed(
      `Refreshed ${path.relative(projectRoot, result.steraUiPath)}`
    )
    console.log("")
    return
  }

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

  // Resolve all dependencies
  let resolved
  try {
    resolved = await resolveDependencies(components)
  } catch (err) {
    spinner.fail("Failed to fetch registry")
    throw err
  }

  spinner.succeed("Registry resolved")

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
