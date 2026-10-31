import { STERA_BASE_UTILITIES } from "./utilities.js"
import {
  buildModel,
  buildThemeInline,
  formatDecls,
  type CssModel,
  type GenerateOptions,
} from "./model.js"

export type { GenerateOptions } from "./model.js"

export type GenerateResult = {
  css: string
  warnings: string[]
  errors: string[]
}

/**
 * The flat single-file shape: everything in one `:root`, then `.dark`, then the
 * typography utilities and the always-appended base utilities. Kept for projects
 * that paste one `globals.css` rather than installing Stera-UI's `styles/ui/`
 * partials — see `generatePartials` for that shape.
 */
function renderSingleFile(model: CssModel): string {
  const themeInline = buildThemeInline(model.semanticLight)

  const rootSections: string[] = []
  if (model.colorRamps.length > 0)
    rootSections.push(formatDecls(model.colorRamps, "  "))
  if (model.typography.length > 0)
    rootSections.push(formatDecls(model.typography, "  "))
  if (model.semanticLight.length > 0) {
    rootSections.push(formatDecls(model.semanticLight, "  "))
  }

  const parts: string[] = [
    model.imports.join("\n"),
    "",
    "@custom-variant dark (&:is(.dark *));",
    "",
  ]
  if (themeInline) {
    parts.push(themeInline, "")
  }
  parts.push(":root {", rootSections.join("\n\n"), "}", "")
  parts.push(".dark {", formatDecls(model.semanticDark, "  "), "}", "")
  parts.push(model.utilitiesCss, "", STERA_BASE_UTILITIES, "")

  return parts.join("\n")
}

export function generateGlobalsCss(options: GenerateOptions): GenerateResult {
  const { model, warnings, errors } = buildModel(options)
  if (!model) return { css: "", warnings, errors }
  return { css: renderSingleFile(model), warnings, errors }
}
