/**
 * Figma variable naming for generated ramps. This is the contract with Stera UI
 * Bridge (`apps/figma-bridge`): ramps live in a mode-less `Color` collection,
 * grouped `Family/Light/N` and `Family/Dark/N`, and the Bridge exports them as
 * `--family-N` and `--family-dark-N`.
 */

export const DEFAULT_COLLECTION_NAME = "Color"

export const VARIANTS = ["Light", "Dark"] as const
export type Variant = (typeof VARIANTS)[number]

/** Tailwind-style steps an older scheme used; never mixed with 1..12. */
const LEGACY_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

export function rampVariableName(
  colorName: string,
  variant: Variant,
  step: number
): string {
  return `${colorName}/${variant}/${step}`
}

/**
 * The name used before light and dark became subgroups, when one variable held
 * both values in two modes. Such variables are renamed into the `Light`
 * subgroup, which keeps their id so bound layers stay bound.
 */
export function flatVariableName(colorName: string, step: number): string {
  return `${colorName}/${step}`
}

/**
 * Drop a trailing `/Light` or `/Dark` segment from a group path. Only strips
 * when a non-empty prefix remains, so a top-level group literally named `Light`
 * survives.
 */
export function stripVariantSegment(group: string): string {
  for (const variant of VARIANTS) {
    const suffix = `/${variant}`
    if (group.endsWith(suffix) && group.length > suffix.length) {
      return group.slice(0, -suffix.length)
    }
  }
  return group
}

/**
 * The color groups a collection offers for updating. `Neutral/Light/1` and
 * `Neutral/Dark/1` both belong to `Neutral`: the variant is an implementation
 * detail the user shouldn't have to pick between. A group holding any alias is
 * semantic, not a ramp, so it is left out.
 */
export function listRampGroups(
  variables: Array<{ name: string; isAlias: boolean }>
): string[] {
  const hasAlias = new Map<string, boolean>()
  for (const v of variables) {
    const slash = v.name.lastIndexOf("/")
    if (slash === -1) continue
    const group = stripVariantSegment(v.name.slice(0, slash))
    hasAlias.set(group, (hasAlias.get(group) ?? false) || v.isAlias)
  }
  return Array.from(hasAlias.entries())
    .filter(([, alias]) => !alias)
    .map(([group]) => group)
    .sort()
}

/**
 * Whether the names already use 50-950 steps under `colorName`. Writing 1..12
 * next to them would silently leave both schemes in one group.
 */
export function hasLegacyStepNames(
  names: string[],
  colorName: string
): boolean {
  const legacy = new Set(
    LEGACY_STEPS.map((step) => flatVariableName(colorName, step))
  )
  return names.some((name) => legacy.has(name))
}
