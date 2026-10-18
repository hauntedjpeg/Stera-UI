/**
 * Audit registry components for Tailwind color utilities whose token is not
 * defined in registry/styles/ui/colors.css.
 *
 * Usage: pnpm --filter docs audit:tokens
 * Exits non-zero when unknown tokens are found.
 */
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

const root = new URL("..", import.meta.url).pathname
const colorsCss = readFileSync(
  join(root, "registry/styles/ui/colors.css"),
  "utf8"
)
const uiDir = join(root, "registry/ui")

const tokens = new Set<string>()
for (const m of colorsCss.matchAll(/--color-([a-z0-9-]+)\s*:/g)) tokens.add(m[1])

// Utility prefixes whose value is a color.
const colorPrefixes = [
  "bg",
  "text",
  "border",
  "border-t",
  "border-b",
  "border-l",
  "border-r",
  "border-x",
  "border-y",
  "ring",
  "ring-offset",
  "outline",
  "fill",
  "stroke",
  "divide",
  "placeholder",
  "decoration",
  "caret",
  "shadow",
  "inset-ring",
  "from",
  "via",
  "to",
]

// Values that are valid for these prefixes but are not color tokens.
const nonColorValues = new Set([
  "transparent",
  "current",
  "inherit",
  "none",
  "inset",
  "auto",
  // text sizes / alignment / wrapping
  "xs",
  "sm",
  "base",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "left",
  "center",
  "right",
  "justify",
  "start",
  "end",
  "wrap",
  "nowrap",
  "balance",
  "pretty",
  "ellipsis",
  "clip",
  // border styles
  "solid",
  "dashed",
  "dotted",
  "double",
  "hidden",
  // bg layout values
  "cover",
  "contain",
  "repeat",
  "no-repeat",
  "fixed",
  "local",
  "scroll",
  "top",
  "bottom",
  "clip-text",
  "clip-border",
  "clip-padding",
  "clip-content",
  "origin-border",
  "origin-padding",
  "origin-content",
  // misc
  "visible",
  "offset",
  // bare side / collapse borders: border-t, border-x, border-collapse
  "t",
  "b",
  "l",
  "r",
  "x",
  "y",
  "s",
  "e",
  "collapse",
  "separate",
])

// Colors Tailwind v4 ships in its default theme (imported by index.css).
const builtinColors = new Set(["black", "white"])

const isNonColor = (value: string) =>
  nonColorValues.has(value) ||
  /^\d+(\.\d+)?$/.test(value) || // widths: border-2, ring-3, text-2
  /^\[.*\]$/.test(value) || // arbitrary: bg-[...]
  /^\(.*\)$/.test(value) || // css var shorthand: bg-(--x)
  /^(linear|radial|conic)-/.test(value) || // gradients
  /^(repeat|size|position|blend|spacing)-/.test(value) || // bg-repeat-x, bg-blend-*
  /^(xs|sm|md|lg|xl|\d+xl)\/.+$/.test(value) // text-sm/6 (size/leading)

// Drop variant prefixes: split on the last ":" that is outside [] or ().
const stripVariants = (cls: string) => {
  let depth = 0
  let last = -1
  for (let i = 0; i < cls.length; i++) {
    const c = cls[i]
    if (c === "[" || c === "(") depth++
    else if (c === "]" || c === ")") depth--
    else if (c === ":" && depth === 0) last = i
  }
  return cls.slice(last + 1)
}

type Hit = { file: string; line: number; cls: string; token: string }
const hits: Hit[] = []

const files = readdirSync(uiDir).filter((f) => f.endsWith(".tsx"))
for (const file of files) {
  const src = readFileSync(join(uiDir, file), "utf8")
  const lines = src.split("\n")
  lines.forEach((line, i) => {
    // Candidate class tokens: whitespace-separated words inside string
    // literals, shaped like [variants:]prefix-value[/opacity][!]
    for (const m of line.matchAll(/[^\s"'`]+/g)) {
      // trim JS punctuation that follows a class word, but keep a ")" that
      // closes a css-variable shorthand like bg-(--x)
      let cls = m[0].replace(/[,;]+$/, "")
      while (cls.endsWith(")") && !cls.includes("(")) cls = cls.slice(0, -1)
      const base = stripVariants(cls).replace(/^!|!$/g, "")
      if (base.startsWith("-")) continue
      for (const prefix of colorPrefixes) {
        if (!base.startsWith(prefix + "-")) continue
        let value = base.slice(prefix.length + 1)
        // strip opacity modifier (bg-x/50) unless the value is arbitrary
        if (!value.startsWith("[") && !value.startsWith("("))
          value = value.replace(/\/[0-9]+$/, "")
        if (!value || isNonColor(value)) break
        // longer prefixes like border-t are checked by prefix order; if a
        // shorter prefix matched but value starts with a known longer prefix
        // (e.g. border-t-border), let the longer prefix handle it.
        if (
          colorPrefixes.some(
            (p) => p !== prefix && p.startsWith(prefix + "-") && base.startsWith(p + "-")
          )
        )
          continue
        if (!tokens.has(value) && !builtinColors.has(value))
          hits.push({ file, line: i + 1, cls, token: `${prefix}-${value}` })
        break
      }
    }
  })
}

if (hits.length === 0) {
  console.log(`✓ ${files.length} files checked, no unknown color tokens.`)
} else {
  console.error(`✗ ${hits.length} unknown color token(s):`)
  for (const h of hits) console.error(`  ${h.file}:${h.line}  ${h.cls}`)
  process.exit(1)
}
