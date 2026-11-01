import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const REGISTRY_PATH = path.join(ROOT, "registry.json")
const OUTPUT_DIR = path.join(ROOT, "public", "r")

interface RegistryFile {
  path: string
  type: string
  target?: string
  content?: string
}

interface RegistryFontMeta {
  family: string
  provider: string
  import: string
  variable: string
  weight?: string[]
  subsets?: string[]
  selector?: string
  dependency?: string
}

interface RegistryItem {
  name: string
  type: string
  dependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryFile[]
  font?: RegistryFontMeta
}

interface Registry {
  name: string
  items: RegistryItem[]
}

/**
 * `stera-ui init` installs the fonts `ui/typography.css` references by name:
 * the role `--font-sans: var(--font-zalando-sans, …)` makes it fetch the
 * `font-zalando-sans` item. Fail the build when a Figma export points a role
 * at a family no such item provides.
 */
function checkTypographyFonts(registry: Registry): string[] {
  const css = fs.readFileSync(
    path.join(ROOT, "registry/styles/ui/typography.css"),
    "utf-8"
  )
  const pattern = /^\s*--font-[\w-]+\s*:\s*var\(\s*(--font-[\w-]+)\s*[,)]/gm
  const errors: string[] = []

  for (const [, variable] of css.matchAll(pattern)) {
    const name = `font-${variable.replace(/^--font-/, "")}`
    const item = registry.items.find((entry) => entry.name === name)
    if (!item || item.type !== "registry:font") {
      errors.push(
        `[typography.css] references ${variable}, but there is no "${name}" registry:font item`
      )
    } else if (item.font?.variable !== variable) {
      errors.push(
        `[${name}] font.variable is "${item.font?.variable}", but typography.css references ${variable}`
      )
    }
  }
  return errors
}

function buildRegistry() {
  const registry: Registry = JSON.parse(
    fs.readFileSync(REGISTRY_PATH, "utf-8")
  )

  const itemNames = new Set(registry.items.map((item) => item.name))
  const errors: string[] = []

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const indexItems: Omit<RegistryItem, "files">[] = []

  for (const item of registry.items) {
    // Validate registryDependencies reference existing items.
    // NOTE: never list "globals" as a registryDependency. The CLI special-cases
    // `add globals`; reaching the style item through dependency resolution
    // instead routes it to the generic writer, which resolves registry:style
    // files by basename into the consumer's css directory and would overwrite
    // their own globals.css.
    if (item.registryDependencies) {
      for (const dep of item.registryDependencies) {
        if (!itemNames.has(dep)) {
          errors.push(
            `[${item.name}] registryDependency "${dep}" does not exist in registry`
          )
        }
      }
    }

    // Font items have no files to read — emit them directly.
    if (item.type === "registry:font") {
      const builtItem: RegistryItem = {
        name: item.name,
        type: item.type,
        ...(item.font && { font: item.font }),
      }

      const itemPath = path.join(OUTPUT_DIR, `${item.name}.json`)
      fs.writeFileSync(itemPath, JSON.stringify(builtItem, null, 2))

      indexItems.push({
        name: item.name,
        type: item.type,
      })
      continue
    }

    // Read file contents and strip the registry/ prefix from paths
    const files: RegistryFile[] = (item.files ?? []).map((file) => {
      const fullPath = path.join(ROOT, file.path)

      if (!fs.existsSync(fullPath)) {
        errors.push(`[${item.name}] file not found: ${file.path}`)
        return { ...file, content: "" }
      }

      const content = fs.readFileSync(fullPath, "utf-8")

      // Strip the "registry/" prefix so paths map to consumer's project
      // e.g. "registry/ui/button.tsx" -> "ui/button.tsx"
      const consumerPath = file.path.replace(/^registry\//, "")

      return {
        path: consumerPath,
        type: file.type,
        ...(file.target && { target: file.target }),
        content,
      }
    })

    const builtItem: RegistryItem = {
      name: item.name,
      type: item.type,
      ...(item.dependencies?.length && { dependencies: item.dependencies }),
      ...(item.registryDependencies?.length && {
        registryDependencies: item.registryDependencies,
      }),
      files,
    }

    // Write individual component JSON: public/r/{name}.json
    const itemPath = path.join(OUTPUT_DIR, `${item.name}.json`)
    fs.writeFileSync(itemPath, JSON.stringify(builtItem, null, 2))

    // Collect index entry (without file contents)
    indexItems.push({
      name: item.name,
      type: item.type,
      ...(item.dependencies?.length && { dependencies: item.dependencies }),
      ...(item.registryDependencies?.length && {
        registryDependencies: item.registryDependencies,
      }),
    })
  }

  errors.push(...checkTypographyFonts(registry))

  if (errors.length > 0) {
    console.error("Registry build errors:")
    for (const err of errors) {
      console.error(`  ${err}`)
    }
    process.exit(1)
  }

  // Write registry index: public/r/index.json
  const indexPath = path.join(OUTPUT_DIR, "index.json")
  const index = {
    name: registry.name,
    items: indexItems,
  }
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2))

  console.log(
    `Built ${registry.items.length} registry items -> ${path.relative(ROOT, OUTPUT_DIR)}/`
  )
  console.log(
    `  ${registry.items.length} component files + index.json`
  )
}

buildRegistry()
