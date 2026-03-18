import fs from "node:fs"
import path from "node:path"
import { findConfigPath } from "../utils/resolve-config.js"

const DEFAULT_CONFIG = {
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

export function init(options: { cwd?: string; yes?: boolean }) {
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
  console.log("")
  console.log("Next steps:")
  console.log('  1. Run "stera-ui add globals" to install the base styles')
  console.log('  2. Run "stera-ui add <component>" to add components')
  console.log("")
  console.log(
    "See the README for font setup instructions."
  )
}
