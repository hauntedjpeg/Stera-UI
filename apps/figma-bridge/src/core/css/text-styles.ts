import type { SerializedTextStyle } from "../../shared/messages.js"
import { toKebabName } from "../naming/kebab.js"

export type UtilityUnit = "rem" | "px"

export type BuildUtilitiesOptions = {
  textStyles: SerializedTextStyle[]
  /** Figma variable id → emitted custom property name, from `buildNameMap`. */
  nameMap: Map<string, string>
  /** Unit chosen for the Typography collection, applied to unbound literals. */
  unit: UtilityUnit
}

export type BuildUtilitiesResult = {
  css: string
  warnings: string[]
}

/**
 * Figma exposes a style's weight as a font-style name unless it's bound to a
 * variable. Only used as a fallback — bound styles resolve by variable id.
 */
const STYLE_NAME_WEIGHTS: Record<string, number> = {
  thin: 100,
  extralight: 200,
  ultralight: 200,
  light: 300,
  regular: 400,
  normal: 400,
  book: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  extrabold: 800,
  ultrabold: 800,
  black: 900,
  heavy: 900,
}

const CATEGORY_ORDER = ["body", "heading", "display", "hero"]

/**
 * Tailwind v4's default `tracking-*` scale, in em. Raw letter spacing that
 * lands exactly on a step is emitted as Tailwind's own theme variable.
 */
const TAILWIND_TRACKING_EM: Record<string, number> = {
  tighter: -0.05,
  tight: -0.025,
  normal: 0,
  wide: 0.025,
  wider: 0.05,
  widest: 0.1,
}

/**
 * Custom properties Tailwind itself declares (via `@import "tailwindcss"`), so
 * utilities may reference them even though this export never emits them.
 */
export const TAILWIND_THEME_VARS: string[] = Object.keys(
  TAILWIND_TRACKING_EM
).map((key) => `--tracking-${key}`)

function round(n: number): number {
  return Math.round(n * 10000) / 10000
}

function tailwindTracking(em: number): string | null {
  const value = round(em)
  for (const [key, step] of Object.entries(TAILWIND_TRACKING_EM)) {
    if (step === value) return `var(--tracking-${key})`
  }
  return null
}

function lengthValue(px: number, unit: UtilityUnit): string {
  if (unit === "px") return `${round(px)}px`
  return `${round(px / 16)}rem`
}

function utilityName(styleName: string): string {
  return `st-${toKebabName(styleName, undefined).replace(/^--/, "")}`
}

function categoryKey(name: string): number {
  const head = name.replace(/^st-/, "").split("-")[0]
  const index = CATEGORY_ORDER.indexOf(head)
  return index === -1 ? CATEGORY_ORDER.length : index
}

function weightFromStyleName(fontStyle: string): number | null {
  const key = fontStyle.toLowerCase().replace(/[^a-z]/g, "")
  return STYLE_NAME_WEIGHTS[key] ?? null
}

type FieldName =
  | "fontFamily"
  | "fontWeight"
  | "fontSize"
  | "lineHeight"
  | "letterSpacing"

const FIELD_LABELS: Record<FieldName, string> = {
  fontFamily: "font",
  fontWeight: "weight",
  fontSize: "size",
  lineHeight: "line height",
  letterSpacing: "letter spacing",
}

/**
 * Emits `@utility st-*` blocks from Figma text styles. Every field prefers the
 * bound variable — `Weight/Medium` and `Weight/Strong` can share a numeric
 * value, so resolving by variable id is the only lossless route. Unbound (or
 * unresolvable) fields fall back to a literal and raise a warning naming the
 * style and field, so the drift is visible rather than silent.
 *
 * Letter spacing is the exception: a raw value is legitimate, so an unbound one
 * does not warn. Values on Tailwind's tracking scale map to `var(--tracking-*)`.
 */
export function buildUtilities(
  options: BuildUtilitiesOptions
): BuildUtilitiesResult {
  const { textStyles, nameMap, unit } = options
  const warnings: string[] = []

  const resolve = (
    style: SerializedTextStyle,
    field: FieldName,
    literal: () => string | null,
    { warnIfUnbound = true }: { warnIfUnbound?: boolean } = {}
  ): string | null => {
    const boundId = style.boundVariables[field]
    if (boundId) {
      const name = nameMap.get(boundId)
      if (name) return `var(${name})`
      warnings.push(
        `Text style "${style.name}" binds its ${FIELD_LABELS[field]} to a variable that is not part of the exported collections. Emitted a literal value instead.`
      )
    } else if (warnIfUnbound) {
      warnings.push(
        `Text style "${style.name}" has no variable bound to ${FIELD_LABELS[field]}. Bind it in Figma to keep the export token-based.`
      )
    }
    return literal()
  }

  const blocks: Array<{ name: string; css: string }> = []

  for (const style of textStyles) {
    const name = utilityName(style.name)
    if (!name || name === "st-") {
      warnings.push(
        `Text style "${style.name}" does not produce a usable utility name and was skipped.`
      )
      continue
    }

    const fontFamily = resolve(style, "fontFamily", () =>
      style.fontFamily ? `"${style.fontFamily}"` : null
    )
    const fontSize = resolve(style, "fontSize", () =>
      lengthValue(style.fontSize, unit)
    )
    const lineHeight = resolve(style, "lineHeight", () => {
      const lh = style.lineHeight
      if (lh.unit === "AUTO") return "normal"
      if (lh.unit === "PERCENT") return `${round(lh.value)}%`
      return lengthValue(lh.value, unit)
    })
    const fontWeight = resolve(style, "fontWeight", () => {
      const derived = weightFromStyleName(style.fontStyle)
      return derived === null ? null : String(derived)
    })
    const letterSpacing = resolve(
      style,
      "letterSpacing",
      () => {
        const ls = style.letterSpacing
        if (ls.unit === "PERCENT") {
          const em = ls.value / 100
          return tailwindTracking(em) ?? `${round(em)}em`
        }
        const fromPx =
          style.fontSize > 0
            ? tailwindTracking(ls.value / style.fontSize)
            : null
        return fromPx ?? lengthValue(ls.value, unit)
      },
      { warnIfUnbound: false }
    )

    const decls: string[] = []
    const push = (prop: string, value: string | null) => {
      if (value !== null) decls.push(`  ${prop}: ${value};`)
    }
    push("font-family", fontFamily)
    push("font-size", fontSize)
    push("line-height", lineHeight)
    push("font-weight", fontWeight)
    push("letter-spacing", letterSpacing)

    blocks.push({
      name,
      css: `@utility ${name} {\n${decls.join("\n")}\n}`,
    })
  }

  const ordered = blocks
    .map((block, index) => ({ block, index }))
    .sort((a, b) => {
      const ka = categoryKey(a.block.name)
      const kb = categoryKey(b.block.name)
      if (ka !== kb) return ka - kb
      return a.index - b.index
    })
    .map((x) => x.block.css)

  return { css: ordered.join("\n\n"), warnings }
}

/**
 * Every `var(--x)` referenced by the utilities has to exist in the emitted
 * output, otherwise the utility silently resolves to nothing. This is the check
 * whose absence let the hand-written utilities drift from the Figma file.
 */
export function findUnresolvedReferences(
  utilitiesCss: string,
  emittedNames: Iterable<string>
): string[] {
  const known = new Set(emittedNames)
  const missing = new Set<string>()
  for (const match of utilitiesCss.matchAll(/var\((--[a-zA-Z0-9-]+)\)/g)) {
    if (!known.has(match[1])) missing.add(match[1])
  }
  return [...missing]
}
