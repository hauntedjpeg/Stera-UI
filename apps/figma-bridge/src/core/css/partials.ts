import {
  buildModel,
  buildThemeInline,
  formatDecls,
  type CssModel,
  type GenerateOptions,
} from "./model.js"

export type CssFile = {
  /** Path relative to the project's styles directory, e.g. `ui/colors.css`. */
  path: string
  /** Basename, used for the download filename and the file tab label. */
  name: string
  contents: string
}

export type PartialsResult = {
  files: CssFile[]
  warnings: string[]
  errors: string[]
}

/**
 * Stera-UI installs three static partials alongside the generated ones. The
 * plugin does not emit them — they contain no Figma-derived tokens — but
 * `index.css` still has to import them or the install loses its base layer.
 */
const STATIC_PARTIALS = ["scrollbar.css", "scroll-fade.css", "base.css"]

function renderIndex(model: CssModel): string {
  const imports = [
    ...model.imports,
    '@import "./colors.css";',
    '@import "./typography.css";',
    ...STATIC_PARTIALS.map((f) => `@import "./${f}";`),
  ]
  return `${imports.join("\n")}\n\n@custom-variant dark (&:is(.dark *));\n`
}

// The registry ships these headers; emitting them keeps a fresh paste identical.
const COLORS_HEADER =
  "/* Color tokens. Generated from Figma — safe to paste over wholesale. */"
const TYPOGRAPHY_HEADER =
  "/* Type tokens and typography utilities. Generated from Figma. Point the --font-* roles at other fonts here. */"

function renderColors(model: CssModel): string {
  const parts: string[] = [COLORS_HEADER]
  const themeInline = buildThemeInline(model.semanticLight)
  if (themeInline) parts.push(themeInline)

  const rootSections: string[] = []
  if (model.colorRamps.length > 0)
    rootSections.push(formatDecls(model.colorRamps, "  "))
  if (model.semanticLight.length > 0) {
    rootSections.push(formatDecls(model.semanticLight, "  "))
  }
  parts.push(`:root {\n${rootSections.join("\n\n")}\n}`)

  parts.push(`.dark {\n${formatDecls(model.semanticDark, "  ")}\n}`)

  return `${parts.join("\n\n")}\n`
}

function renderTypography(model: CssModel): string {
  const parts: string[] = [TYPOGRAPHY_HEADER]
  if (model.typography.length > 0) {
    parts.push(`:root {\n${formatDecls(model.typography, "  ")}\n}`)
  }
  if (model.utilitiesCss.trim()) parts.push(model.utilitiesCss.trim())
  return `${parts.join("\n\n")}\n`
}

/**
 * Renders the export as the partials Stera-UI installs at `styles/ui/`, rather
 * than one flat file. Only the Figma-derived partials are emitted — `base.css`,
 * `scrollbar.css` and `scroll-fade.css` are static and stay as the user has
 * them, which is why `STERA_BASE_UTILITIES` is absent here.
 */
export function generatePartials(options: GenerateOptions): PartialsResult {
  const { model, warnings, errors } = buildModel(options)
  if (!model) return { files: [], warnings, errors }

  const files: CssFile[] = [
    { path: "ui/index.css", name: "index.css", contents: renderIndex(model) },
    {
      path: "ui/colors.css",
      name: "colors.css",
      contents: renderColors(model),
    },
  ]

  const typography = renderTypography(model)
  if (typography.trim()) {
    files.push({
      path: "ui/typography.css",
      name: "typography.css",
      contents: typography,
    })
  }

  return { files, warnings, errors }
}
