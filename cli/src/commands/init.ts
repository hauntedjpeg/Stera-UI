import fs from "node:fs"
import path from "node:path"
import { findConfigPath, type SteraConfig } from "../utils/resolve-config.js"
import { resolveDependencies } from "../registry.js"
import { writeComponentFiles } from "../utils/write-files.js"
import { installDependencies } from "../utils/install-deps.js"

const DEFAULT_CONFIG: SteraConfig = {
  $schema: "https://ui.shadcn.com/schema.json",
  style: "stera",
  rsc: true,
  tsx: true,
  tailwind: {
    config: "",
    css: "styles/globals.css",
    baseColor: "neutral",
    cssVariables: true,
    prefix: "",
  },
  iconLibrary: "stera-icons",
  aliases: {
    components: "@/components",
    utils: "@/lib/utils",
    ui: "@/components/ui",
    lib: "@/lib",
    hooks: "@/hooks",
  },
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

  // Write config
  const configPath = path.join(cwd, "components.json")
  fs.writeFileSync(
    configPath,
    JSON.stringify(DEFAULT_CONFIG, null, 2) + "\n",
    "utf-8"
  )

  console.log("Created components.json")

  // Install globals and fonts (base styles)
  console.log("\nInstalling base styles...")
  const resolved = resolveDependencies(["globals"])

  const { written } = await writeComponentFiles(resolved, DEFAULT_CONFIG, cwd)
  if (written.length > 0) {
    for (const file of written) {
      console.log(`  ${file}`)
    }
  }

  // Install npm dependencies from globals
  const npmDeps: string[] = []
  for (const item of resolved) {
    if (item.dependencies) {
      npmDeps.push(...item.dependencies)
    }
  }
  if (npmDeps.length > 0) {
    const uniqueDeps = [...new Set(npmDeps)].sort()
    console.log("")
    installDependencies(uniqueDeps, cwd)
  }

  console.log("")
  console.log("Next steps:")
  console.log('  Run "stera-ui add <component>" to add components')
  console.log("")
  console.log(
    "See the README for font setup instructions."
  )
}
