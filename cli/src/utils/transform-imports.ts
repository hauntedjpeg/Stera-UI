import type { TransformFn } from "./transform.js"

/**
 * Default aliases used in registry component source files.
 * These are the paths components are authored with.
 */
const DEFAULT_ALIASES = {
  utils: "@/lib/utils",
  ui: "@/components/ui",
  components: "@/components",
  lib: "@/lib",
  hooks: "@/hooks",
}

/**
 * Rewrite import paths in component files to match the user's configured aliases.
 *
 * Registry components use default aliases (e.g. `@/lib/utils`, `@/components/ui/button`).
 * If the user configured different aliases, this transform rewrites the paths.
 *
 * When aliases match defaults (the common case), this is a no-op.
 */
export const transformImports: TransformFn = (content, ctx) => {
  // Only transform TypeScript files
  if (!ctx.filename.endsWith(".ts") && !ctx.filename.endsWith(".tsx")) {
    return content
  }

  const { aliases } = ctx.config

  // Build ordered rewrite rules: most specific first
  // Each rule is [defaultPrefix, userPrefix] for prefix matching,
  // or [defaultExact, userExact, true] for exact matching
  type Rule =
    | { type: "exact"; from: string; to: string }
    | { type: "prefix"; from: string; to: string }

  const rules: Rule[] = []

  // Exact match for utils (most specific — @/lib/utils is a full path, not a prefix)
  if (aliases.utils !== DEFAULT_ALIASES.utils) {
    rules.push({ type: "exact", from: DEFAULT_ALIASES.utils, to: aliases.utils })
  }

  // Prefix matches — order matters: more specific first
  if (aliases.ui !== DEFAULT_ALIASES.ui) {
    rules.push({ type: "prefix", from: DEFAULT_ALIASES.ui, to: aliases.ui })
  }
  if (aliases.components !== DEFAULT_ALIASES.components) {
    rules.push({ type: "prefix", from: DEFAULT_ALIASES.components, to: aliases.components })
  }
  if (aliases.lib !== DEFAULT_ALIASES.lib) {
    rules.push({ type: "prefix", from: DEFAULT_ALIASES.lib, to: aliases.lib })
  }
  if (aliases.hooks !== DEFAULT_ALIASES.hooks) {
    rules.push({ type: "prefix", from: DEFAULT_ALIASES.hooks, to: aliases.hooks })
  }

  // Nothing to transform if all aliases match defaults
  if (rules.length === 0) {
    return content
  }

  // Match `from "..."` and `from '...'` (handles import and re-export statements)
  return content.replace(
    /from\s+(["'])([^"']+)\1/g,
    (match, quote: string, importPath: string) => {
      for (const rule of rules) {
        if (rule.type === "exact" && importPath === rule.from) {
          return `from ${quote}${rule.to}${quote}`
        }
        if (rule.type === "prefix" && importPath.startsWith(rule.from + "/")) {
          const rest = importPath.slice(rule.from.length)
          return `from ${quote}${rule.to}${rest}${quote}`
        }
        // Also match exact prefix (e.g. importing the directory itself)
        if (rule.type === "prefix" && importPath === rule.from) {
          return `from ${quote}${rule.to}${quote}`
        }
      }
      return match
    }
  )
}
