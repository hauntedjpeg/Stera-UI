import { existsSync, promises as fs } from "node:fs"
import path from "node:path"
import type { RegistryFontItem } from "../schema/index.js"
import type { ProjectInfo } from "./detect-project.js"
import { createSpinner } from "./spinner.js"
import { WARN } from "./format.js"
import {
  type JsxOpeningElement,
  type SourceFile,
  type VariableDeclaration,
  Node,
  Project,
  ScriptKind,
  SyntaxKind,
} from "ts-morph"

// ─── Types ───────────────────────────────────────────────────────────

export interface TransformLayoutResult {
  content: string
  /** False when the layout has no `<html>` element to carry the variables. */
  appliedToHtml: boolean
}

// ─── updateFonts (Next.js layout patching) ───────────────────────────

/**
 * For Next.js projects: load the fonts with next/font/google in the root
 * layout and put their variables on <html>.
 *
 * Prints what to do by hand when the layout can't be patched (Pages Router,
 * no `<html>` element, a parse failure).
 *
 * @returns Whether the layout now loads every font.
 */
export async function updateFonts(
  fonts: RegistryFontItem[],
  project: ProjectInfo,
  cwd: string
): Promise<boolean> {
  if (fonts.length === 0) return false
  if (project.framework !== "next") return false

  const layoutPath = findLayoutFile(project, cwd)
  if (!layoutPath) {
    const appDir = project.hasSrc ? "src/app" : "app"
    console.log(
      `${WARN} No ${appDir}/layout.tsx found, so the fonts were not added. (Pages Router projects need this step by hand.)`
    )
    printManualFontSteps(fonts)
    return false
  }

  const relativePath = path.relative(cwd, layoutPath)
  const spinner = createSpinner("Updating fonts")

  try {
    const layoutContent = await fs.readFile(layoutPath, "utf-8")
    const result = transformLayoutFonts(layoutContent, fonts)

    if (!result.appliedToHtml) {
      spinner.fail(`No <html> element in ${relativePath}; fonts not added`)
      printManualFontSteps(fonts)
      return false
    }

    if (result.content === layoutContent) {
      spinner.succeed(`Fonts already loaded in ${relativePath}`)
    } else {
      await fs.writeFile(layoutPath, result.content, "utf-8")
      spinner.succeed(`Added fonts to ${relativePath}`)
    }
    return true
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    spinner.fail(`Failed to update ${relativePath}: ${message}`)
    printManualFontSteps(fonts)
    return false
  }
}

function printManualFontSteps(fonts: RegistryFontItem[]) {
  const names = fonts.map((font) => font.font.import)
  console.log("  Load them with next/font and put their variables on <html>:")
  console.log(`    import { ${names.join(", ")} } from "next/font/google"`)
  for (const font of fonts) {
    console.log(
      `    const ${getFontVariableName(font.font.import, font.font.variable)} = ${font.font.import}(${buildFontOptions(font, "")})`
    )
  }
  console.log("  See https://ui.stera.sh/docs/fonts")
}

// ─── Layout file helpers ─────────────────────────────────────────────

function findLayoutFile(project: ProjectInfo, cwd: string): string | null {
  if (!project.layoutFile) return null
  const fullPath = path.join(cwd, project.layoutFile)
  return existsSync(fullPath) ? fullPath : null
}

/**
 * Add next/font/google declarations for `fonts` to a root layout and apply
 * their `.variable` classes to `<html>`.
 *
 * A font the layout already loads under the same CSS variable is reused as
 * is — its options and name are the user's. Running this twice changes
 * nothing the second time.
 */
export function transformLayoutFonts(
  input: string,
  fonts: RegistryFontItem[]
): TransformLayoutResult {
  const project = new Project({ compilerOptions: {} })
  const sourceFile = project.createSourceFile("layout.tsx", input, {
    scriptKind: ScriptKind.TSX,
  })

  const html = sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
    .find((element) => element.getTagNameNode().getText() === "html")
  if (!html) return { content: input, appliedToHtml: false }

  // Only Google fonts are loaded through next/font for now.
  const googleFonts = fonts.filter((f) => f.font.provider === "google")

  const variableNames: string[] = []
  const toDeclare: { font: RegistryFontItem; name: string }[] = []

  for (const font of googleFonts) {
    const existing = findFontDeclaration(sourceFile, font.font.variable)
    if (existing) {
      variableNames.push(existing.getName())
      continue
    }

    ensureNamedImport(sourceFile, font.font.import)
    const name = uniqueName(
      sourceFile,
      getFontVariableName(font.font.import, font.font.variable),
      toDeclare.map((d) => d.name)
    )
    toDeclare.push({ font, name })
    variableNames.push(name)
  }

  // Declarations go after the last import, in registry order. Inserted as
  // text so ts-morph doesn't re-indent the multi-line options.
  if (toDeclare.length > 0) {
    sourceFile.insertStatements(
      findInsertPosition(sourceFile),
      toDeclare
        .map(
          ({ font, name }) =>
            `\nconst ${name} = ${font.font.import}(${buildFontOptions(font, "\n")});`
        )
        .join("\n")
    )
  }

  addHtmlClassNames(html, variableNames)

  return { content: sourceFile.getFullText(), appliedToHtml: true }
}

// ─── Internal helpers ────────────────────────────────────────────────

/**
 * next/font options as an object literal, multi-line when `newline` is set.
 */
function buildFontOptions(font: RegistryFontItem, newline: "\n" | "") {
  const entries: [string, unknown][] = [["variable", font.font.variable]]
  if (font.font.subsets?.length) entries.push(["subsets", font.font.subsets])
  if (font.font.weight?.length) entries.push(["weight", font.font.weight])

  const body = entries.map(
    ([key, value]) => `${key}: ${JSON.stringify(value).replace(/,/g, ", ")}`
  )
  return newline
    ? `{\n${body.map((line) => `  ${line},`).join("\n")}\n}`
    : `{ ${body.join(", ")} }`
}

function getFontVariableName(importName: string, variable: string) {
  const baseName = toCamelCase(importName)
  const suffix = variable.replace(/^--font-/, "")
  // Family-named variables already say which font they are:
  // Zalando_Sans + --font-zalando-sans → zalandoSans, and
  // Geist + --font-geist-sans → geistSans.
  if (suffix === kebab(importName)) return baseName
  if (suffix.startsWith(`${kebab(importName)}-`)) {
    return toCamelCase(suffix.replace(/-/g, "_"))
  }
  return `${baseName}${toPascalCase(suffix)}`
}

function kebab(str: string) {
  return str.replace(/_/g, "-").toLowerCase()
}

function toCamelCase(str: string) {
  return str
    .split("_")
    .map((part, index) =>
      index === 0
        ? part.toLowerCase()
        : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    )
    .join("")
}

function toPascalCase(str: string) {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

/** `name`, or `name2`, `name3`… when the layout already uses it. */
function uniqueName(sourceFile: SourceFile, name: string, taken: string[]) {
  const used = new Set([
    ...taken,
    ...sourceFile
      .getDescendantsOfKind(SyntaxKind.Identifier)
      .map((id) => id.getText()),
  ])
  if (!used.has(name)) return name
  let n = 2
  while (used.has(`${name}${n}`)) n++
  return `${name}${n}`
}

/**
 * The `const x = Font({ variable: "<variable>" })` declaration whose
 * `variable` option is exactly `variable`.
 */
function findFontDeclaration(
  sourceFile: SourceFile,
  variable: string
): VariableDeclaration | null {
  for (const declaration of sourceFile.getVariableDeclarations()) {
    const initializer = declaration.getInitializer()
    if (!initializer || !Node.isCallExpression(initializer)) continue

    const options = initializer.getArguments()[0]
    if (!options || !Node.isObjectLiteralExpression(options)) continue

    const property = options.getProperty("variable")
    if (!property || !Node.isPropertyAssignment(property)) continue

    const value = property.getInitializer()
    if (
      value &&
      Node.isStringLiteral(value) &&
      value.getLiteralValue() === variable
    ) {
      return declaration
    }
  }
  return null
}

function ensureNamedImport(sourceFile: SourceFile, importName: string) {
  const existingImport = sourceFile.getImportDeclaration(
    (decl) => decl.getModuleSpecifierValue() === "next/font/google"
  )
  if (!existingImport) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: "next/font/google",
      namedImports: [importName],
    })
    return
  }
  const hasImport = existingImport
    .getNamedImports()
    .some((imp) => imp.getName() === importName)
  if (!hasImport) existingImport.addNamedImport(importName)
}

function findInsertPosition(sourceFile: SourceFile) {
  const imports = sourceFile.getImportDeclarations()
  if (imports.length > 0) {
    return imports[imports.length - 1].getChildIndex() + 1
  }
  return 0
}

/**
 * Add `${name}.variable` for each name to `<html className>`, keeping whatever
 * is already there. No helper like `cn()` is needed: a string or template
 * becomes a template literal, and an existing call gets extra arguments.
 */
function addHtmlClassNames(html: JsxOpeningElement, names: string[]) {
  const attribute = html.getAttribute("className")
  const currentText = attribute?.getText() ?? ""
  const missing = names
    .map((name) => `${name}.variable`)
    .filter(
      (expr) =>
        !new RegExp(`\\b${expr.replace(".", "\\.")}\\b`).test(currentText)
    )
  if (missing.length === 0) return

  const prefix = missing.map((expr) => `\${${expr}}`).join(" ")

  if (!attribute || !Node.isJsxAttribute(attribute)) {
    html.addAttribute({ name: "className", initializer: `{\`${prefix}\`}` })
    return
  }

  const initializer = attribute.getInitializer()
  if (!initializer) {
    attribute.setInitializer(`{\`${prefix}\`}`)
    return
  }

  if (Node.isStringLiteral(initializer)) {
    attribute.setInitializer(
      `{\`${prefix} ${escapeTemplate(initializer.getLiteralValue())}\`}`
    )
    return
  }

  if (!Node.isJsxExpression(initializer)) return
  const expression = initializer.getExpression()
  if (!expression) {
    attribute.setInitializer(`{\`${prefix}\`}`)
    return
  }

  if (
    Node.isNoSubstitutionTemplateLiteral(expression) ||
    Node.isTemplateExpression(expression)
  ) {
    expression.replaceWithText(`\`${prefix} ${expression.getText().slice(1)}`)
  } else if (Node.isStringLiteral(expression)) {
    expression.replaceWithText(
      `\`${prefix} ${escapeTemplate(expression.getLiteralValue())}\``
    )
  } else if (Node.isCallExpression(expression)) {
    // cn(), clsx() and friends all accept extra class arguments.
    expression.addArguments(missing)
  } else {
    expression.replaceWithText(`\`${prefix} \${${expression.getText()}}\``)
  }
}

function escapeTemplate(value: string) {
  return value.replace(/[`\\]/g, "\\$&").replace(/\$\{/g, "\\${")
}
