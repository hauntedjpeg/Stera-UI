import fs from "node:fs"
import path from "node:path"
import { spawn } from "node:child_process"
import { createSpinner } from "./spinner.js"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

export function detectPackageManager(cwd: string): PackageManager {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm"
  if (fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun"
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn"
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

  const pm = detectPackageManager(cwd)
  const [cmd, args] = getInstallArgs(pm, toInstall)
  const spinner = createSpinner(`Installing with ${pm}`)

  await new Promise<void>((resolve, reject) => {
    const proc = spawn(cmd, args, { cwd, stdio: "pipe" })
    proc.on("close", (code) => {
      if (code === 0) {
        spinner.succeed(`Installed with ${pm}`)
        resolve()
      } else {
        spinner.fail(`Install failed (exit ${code})`)
        reject(new Error(`${pm} exited with code ${code}`))
      }
    })
    proc.on("error", (err) => {
      spinner.fail(`Install failed`)
      reject(err)
    })
  })
}
