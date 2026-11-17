// Flags Tailwind classes that have a canonical spelling, using Tailwind's own
// canonicalizer (the same one behind the editor extension's warnings), so
// `pnpm lint` and CI catch them. `--fix` rewrites them in place.
//
//   tsx scripts/check-tailwind-classes.mts [--fix]

import fs from "node:fs"
import path from "node:path"
import { __unstable__loadDesignSystem } from "@tailwindcss/node"

const ROOT = path.resolve(import.meta.dirname, "..")
const STYLESHEET = path.join(ROOT, "app", "globals.css")
const DIRS = ["registry", "examples", "components", "app", "lib"]
// The editor extension's default root font size, so `[16px]` maps to `4`.
const REM = 16

const fix = process.argv.includes("--fix")

const designSystem = await __unstable__loadDesignSystem(
  fs.readFileSync(STYLESHEET, "utf8"),
  { base: path.dirname(STYLESHEET) }
)

const cache = new Map<string, string | null>()

/** The canonical spelling of a class, or null if it is already canonical or not a class. */
function canonical(token: string): string | null {
  if (cache.has(token)) return cache.get(token)!
  let result: string | null = null
  if (!token.includes("${") && designSystem.parseCandidate(token).length > 0) {
    const [out] = designSystem.canonicalizeCandidates([token], { rem: REM })
    if (out && out !== token) result = out
  }
  cache.set(token, result)
  return result
}

function listFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return listFiles(full)
    return /\.(ts|tsx)$/.test(entry.name) ? [full] : []
  })
}

// Class names live in string and template literals (className, cn, cva).
const LITERAL = /"([^"\n]*)"|`([^`]*)`/g

let count = 0
const files = DIRS.flatMap((dir) => listFiles(path.join(ROOT, dir)))

for (const file of files) {
  const source = fs.readFileSync(file, "utf8")
  const rel = path.relative(ROOT, file)

  const next = source.replace(LITERAL, (literal, dq, tpl, offset: number) => {
    const body: string = dq ?? tpl
    const rewritten = body
      .split(/(\s+)/)
      .map((token) => {
        const out = canonical(token)
        if (!out) return token
        count++
        const line = source.slice(0, offset).split("\n").length
        console.log(`${rel}:${line}  ${token} → ${out}`)
        return out
      })
      .join("")
    if (rewritten === body) return literal
    const quote = dq !== undefined ? '"' : "`"
    return quote + rewritten + quote
  })

  if (fix && next !== source) fs.writeFileSync(file, next)
}

if (count === 0) {
  console.log("Tailwind classes are canonical.")
} else if (fix) {
  console.log(`\nRewrote ${count} class(es). Run \`pnpm format\` to re-sort them.`)
} else {
  console.error(
    `\n${count} class(es) have a canonical form. Run \`pnpm --filter docs lint:classes --fix\` to rewrite them.`
  )
  process.exitCode = 1
}
