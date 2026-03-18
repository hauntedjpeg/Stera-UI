import fs from "node:fs"
import path from "node:path"
import { execSync } from "node:child_process"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

export function detectPackageManager(cwd: string): PackageManager {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm"
  if (fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun"
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn"
  return "npm"
}

function getInstallCommand(pm: PackageManager, deps: string[]): string {
  const packages = deps.join(" ")
  switch (pm) {
    case "pnpm":
      return `pnpm add ${packages}`
    case "yarn":
      return `yarn add ${packages}`
    case "bun":
      return `bun add ${packages}`
    default:
      return `npm install ${packages}`
  }
}

/**
 * Install npm dependencies, skipping any already in the consumer's package.json.
 */
export function installDependencies(deps: string[], cwd: string): void {
  if (deps.length === 0) return

  // Read existing dependencies to avoid reinstalling
  const pkgPath = path.join(cwd, "package.json")
  let existing = new Set<string>()

  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
      const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
      }
      existing = new Set(Object.keys(allDeps))
    } catch {
      // Ignore parse errors
    }
  }

  const toInstall = deps.filter((dep) => !existing.has(dep))
  if (toInstall.length === 0) return

  const pm = detectPackageManager(cwd)
  const cmd = getInstallCommand(pm, toInstall)

  console.log(`Installing dependencies with ${pm}...`)
  execSync(cmd, { cwd, stdio: "inherit" })
}
