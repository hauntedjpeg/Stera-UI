export function toKebabName(figmaPath: string, prefix?: string): string {
  const cleaned = figmaPath
    .split("/")
    .map((seg) => seg.trim())
    .filter((seg) => seg.length > 0)
    .join("-")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()

  const withPrefix = prefix ? `${prefix}-${cleaned}` : cleaned
  return `--${withPrefix}`
}

export function kebab(input: string): string {
  return input
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
}
