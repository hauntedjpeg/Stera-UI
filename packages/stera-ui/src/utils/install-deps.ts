import fs from "node:fs"
import path from "node:path"
import { detect } from "@antfu/ni"
import { execa } from "execa"
import { createSpinner } from "./spinner.js"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

export async function detectPackageManager(cwd: string): Promise<PackageManager> {
  // Use @antfu/ni which walks up the directory tree to find lock files
  // This handles monorepos where the lock file is at the root
  const detected = await detect({ programmatic: true, cwd })

  if (detected === "pnpm@6" || detected === "pnpm") return "pnpm"
  if (detected === "yarn@berry" || detected === "yarn") return "yarn"
  if (detected === "bun") return "bun"
  if (detected === "npm") return "npm"

  // Fallback: check npm_config_user_agent (set by pnpm dlx, npx, etc.)
  const userAgent = process.env.npm_config_user_agent || ""
  if (userAgent.startsWith("pnpm")) return "pnpm"
  if (userAgent.startsWith("yarn")) return "yarn"
  if (userAgent.startsWith("bun")) return "bun"

  return "npm"
}

function getInstallArgs(pm: PackageManager, deps: string[]): [string, string[]] {
  switch (pm) {
    case "pnpm":
      return ["pnpm", ["add", ...deps]]
    case "yarn":
      return ["yarn", ["add", ...deps]]
    case "bun":
      return ["bun", ["add", ...deps]]
    default:
      return ["npm", ["install", ...deps]]
  }
}

/**
 * Install npm dependencies, skipping any already in the consumer's package.json.
 */
export async function installDependencies(deps: string[], cwd: string): Promise<void> {
  if (deps.length === 0) return

  // Read existing dependencies to avoid reinstalling
  const pkgPath = path.join(cwd, "package.json")
  let existing = new Set<string>()

  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
      existing = new Set(Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }))
    } catch {
      // Ignore parse errors
    }
  }

  const toInstall = deps.filter((dep) => !existing.has(dep))
  if (toInstall.length === 0) return

  const pm = await detectPackageManager(cwd)
  const [cmd, args] = getInstallArgs(pm, toInstall)
  const spinner = createSpinner(`Installing with ${pm}`)

  try {
    await execa(cmd, args, { cwd })
    spinner.succeed(`Installed with ${pm}`)
  } catch (error) {
    spinner.fail(`Install failed`)

    // Detect pnpm workspace root error and provide actionable guidance
    if (
      error instanceof Error &&
      "stdout" in error &&
      typeof (error as any).stdout === "string" &&
      (error as any).stdout.includes("ERR_PNPM_ADDING_TO_ROOT")
    ) {
      throw new Error(
        `Cannot install dependencies at a pnpm workspace root.\n` +
        `Run stera-ui init from within a specific workspace package instead,\n` +
        `or use "pnpm add -w <package>" manually to install at the root.`
      )
    }

    throw error
  }
}
