import { existsSync, promises as fs } from "node:fs"
import path from "node:path"
import type { RegistryFontItem } from "../schema/index.js"
import type { ProjectInfo } from "./detect-project.js"
import { createSpinner } from "./spinner.js"
import {
  CallExpression,
  Project,
  ScriptKind,
  SyntaxKind,
  VariableDeclarationKind,
} from "ts-morph"

const ROOT_FONT_VARIABLES = new Set([
  "--font-sans",
  "--font-serif",
  "--font-mono",
])

// ─── Types ───────────────────────────────────────────────────────────

export interface FontTreeResult {
  /** CSS variables to set in @theme inline */
  cssVars: Record<string, string>
  /** npm dependencies to install */
  dependencies: string[]
  /** CSS @import lines to add (fontsource) */
  cssImports: string[]
}

// ─── massageTreeForFonts ─────────────────────────────────────────────

/**
 * Process font items and return CSS variables, dependencies, and imports
 * based on the detected framework.
 *
 * - **Next.js**: Sets CSS vars to self-referencing `var(--font-sans)`.
 *   The actual font loading is handled by next/font in the layout file.
 * - **Other frameworks**: Installs @fontsource-variable/* packages and
 *   adds @import lines to CSS. Sets CSS vars to the font family string.
 */
export function massageTreeForFonts(
  fonts: RegistryFontItem[],
  project: ProjectInfo
): FontTreeResult {
  const result: FontTreeResult = {
    cssVars: {},
    dependencies: [],
    cssImports: [],
  }

  if (fonts.length === 0) return result

  const isNext = project.framework === "next"

  for (const font of fonts) {
    if (isNext) {
      // Next.js sets the CSS variable via next/font on the <html> element.
      // We set the theme variable to reference itself so it resolves to
      // the value injected by next/font on <html>.
      result.cssVars[font.font.variable] = `var(${font.font.variable})`
    } else {
      // Other frameworks use fontsource.
      const fontName = font.name.replace(/^font-/, "")
      const fontSourceDep =
        font.font.dependency ?? `@fontsource-variable/${fontName}`
      result.dependencies.push(fontSourceDep)
      result.cssImports.push(`@import "${fontSourceDep}";`)
      result.cssVars[font.font.variable] = font.font.family
    }
  }

  return result
}

// ─── updateFonts (Next.js layout patching) ───────────────────────────

/**
 * For Next.js projects: patch the layout file with next/font/google imports
 * and update the <html> className using AST manipulation.
 */
export async function updateFonts(
  fonts: RegistryFontItem[],
  project: ProjectInfo,
  cwd: string,
  options: { silent?: boolean } = {}
): Promise<void> {
  if (fonts.length === 0) return
  if (project.framework !== "next") return

  const layoutPath = findLayoutFile(project, cwd)
  if (!layoutPath) return

  if (options.silent) {
    // Silent mode: just do the work without spinners.
    try {
      const layoutContent = await fs.readFile(layoutPath, "utf-8")
      const updatedContent = transformLayoutFonts(layoutContent, fonts)
      if (updatedContent !== layoutContent) {
        await fs.writeFile(layoutPath, updatedContent, "utf-8")
      }
    } catch {
      // Silently fail.
    }
    return
  }

  const spinner = createSpinner("Updating fonts")

  try {
    const layoutContent = await fs.readFile(layoutPath, "utf-8")
    const updatedContent = transformLayoutFonts(layoutContent, fonts)

    if (updatedContent !== layoutContent) {
      await fs.writeFile(layoutPath, updatedContent, "utf-8")
    }
    spinner.succeed("Updated layout with font imports")
  } catch {
    spinner.fail("Failed to update fonts")
  }
}

// ─── Layout file helpers ─────────────────────────────────────────────

function findLayoutFile(project: ProjectInfo, cwd: string): string | null {
  if (!project.layoutFile) return null
  const fullPath = path.join(cwd, project.layoutFile)
  return existsSync(fullPath) ? fullPath : null
}

export function transformLayoutFonts(
  input: string,
  fonts: RegistryFontItem[]
): string {
  const project = new Project({ compilerOptions: {} })
  const sourceFile = project.createSourceFile("layout.tsx", input, {
    scriptKind: ScriptKind.TSX,
  })

  // Only process Google fonts for now.
  const googleFonts = fonts.filter((f) => f.font.provider === "google")

  const fontVariableNames: string[] = []
  const fontUtilityClasses: string[] = []

  for (const font of googleFonts) {
    const importName = font.font.import
    if (!importName) continue

    // Add or merge import from "next/font/google".
    const existingImport = sourceFile.getImportDeclaration(
      (decl) => decl.getModuleSpecifierValue() === "next/font/google"
    )
    let hasExistingImport = false

    if (existingImport) {
      const namedImports = existingImport.getNamedImports()
      hasExistingImport = namedImports.some(
        (imp) => imp.getName() === importName
      )
      if (!hasExistingImport) {
        existingImport.addNamedImport(importName)
      }
    } else {
      sourceFile.addImportDeclaration({
        moduleSpecifier: "next/font/google",
        namedImports: [importName],
      })
    }

    const varName = getFontVariableName(importName, font.font.variable)
    const fontOptions = buildFontOptions(font)

    // Check if variable declaration already exists with same CSS variable.
    const existingVarDecl = findFontVariableDeclaration(
      sourceFile,
      font.font.variable
    )

    if (
      hasExistingImport &&
      !existingVarDecl &&
      isRootFontVariable(font.font.variable)
    ) {
      continue
    }

    if (existingVarDecl) {
      existingVarDecl.setInitializer(`${importName}(${fontOptions})`)
      if (existingVarDecl.getName() !== varName) {
        existingVarDecl.rename(varName)
      }
    } else {
      const insertPosition = findInsertPosition(sourceFile)
      const statement = sourceFile.insertVariableStatement(insertPosition, {
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
          {
            name: varName,
            initializer: `${importName}(${fontOptions})`,
          },
        ],
      })
      statement.appendWhitespace("\n")
    }

    fontVariableNames.push(varName)
    if (shouldApplyFontUtilityToHtml(font)) {
      fontUtilityClasses.push(font.font.variable.replace("--", ""))
    }
  }

  // Only keep one font-family class on <html>.
  const fontFamilyClasses = new Set(["font-sans", "font-serif", "font-mono"])
  const lastFontFamilyClass = [...fontUtilityClasses]
    .reverse()
    .find((cls) => fontFamilyClasses.has(cls))
  const filteredUtilityClasses = fontUtilityClasses.filter(
    (cls) => !fontFamilyClasses.has(cls)
  )
  if (lastFontFamilyClass) {
    filteredUtilityClasses.unshift(lastFontFamilyClass)
  }

  if (fontVariableNames.length > 0) {
    updateHtmlClassName(sourceFile, fontVariableNames, filteredUtilityClasses)
  }

  return sourceFile.getFullText()
}

// ─── Internal helpers ────────────────────────────────────────────────

function buildFontOptions(font: RegistryFontItem) {
  const options: Record<string, unknown> = {}
  if (font.font.subsets?.length) options.subsets = font.font.subsets
  if (font.font.weight?.length) options.weight = font.font.weight
  options.variable = font.font.variable

  return JSON.stringify(options)
    .replace(/"([^"]+)":/g, "$1:") // Remove quotes from keys.
    .replace(/"/g, "'") // Use single quotes for strings.
}

function isRootFontVariable(variable: string) {
  return ROOT_FONT_VARIABLES.has(variable)
}

function shouldApplyFontUtilityToHtml(font: RegistryFontItem) {
  return !font.font.selector && isRootFontVariable(font.font.variable)
}

function getFontVariableName(importName: string, variable: string) {
  const baseName = toCamelCase(importName)
  if (isRootFontVariable(variable)) return baseName
  return `${baseName}${toPascalCase(variable.replace(/^--font-/, ""))}`
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

function findFontVariableDeclaration(
  sourceFile: ReturnType<Project["createSourceFile"]>,
  variable: string
) {
  for (const statement of sourceFile.getVariableStatements()) {
    for (const declaration of statement.getDeclarations()) {
      const initializer = declaration.getInitializer()
      if (!initializer || initializer.getKind() !== SyntaxKind.CallExpression)
        continue

      const args = (initializer as CallExpression).getArguments()
      if (args.length === 0) continue

      const argText = args[0].getText()
      if (argText.includes("variable:") && argText.includes(variable)) {
        return declaration
      }
    }
  }
  return null
}

function findInsertPosition(
  sourceFile: ReturnType<Project["createSourceFile"]>
) {
  const imports = sourceFile.getImportDeclarations()
  if (imports.length > 0) {
    return imports[imports.length - 1].getChildIndex() + 1
  }
  return 0
}

function updateHtmlClassName(
  sourceFile: ReturnType<Project["createSourceFile"]>,
  fontVariableNames: string[],
  fontUtilityClasses: string[]
) {
  const jsxElements = sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxOpeningElement
  )

  for (const element of jsxElements) {
    if (element.getTagNameNode().getText() !== "html") continue

    const newUtilityClasses = fontUtilityClasses.map((cls) => `"${cls}"`)
    const newVarExpressions = fontVariableNames.map(
      (name) => `${name}.variable`
    )
    const allNewArgs = [...newUtilityClasses, ...newVarExpressions]

    const classNameAttr = element.getAttribute("className")
    if (!classNameAttr) {
      element.addAttribute({
        name: "className",
        initializer: `{cn(${allNewArgs.join(", ")})}`,
      })
      ensureCnImport(sourceFile)
      return
    }

    if (classNameAttr.getKind() !== SyntaxKind.JsxAttribute) return

    const jsxAttr = classNameAttr.asKindOrThrow(SyntaxKind.JsxAttribute)
    const initializer = jsxAttr.getInitializer()
    if (!initializer) return

    if (initializer.getKind() === SyntaxKind.StringLiteral) {
      const currentValue = initializer.getText().slice(1, -1)
      ensureCnImport(sourceFile)
      jsxAttr.setInitializer(
        `{cn("${currentValue}", ${allNewArgs.join(", ")})}`
      )
    } else if (initializer.getKind() === SyntaxKind.JsxExpression) {
      const jsxExpr = initializer.asKindOrThrow(SyntaxKind.JsxExpression)
      const expr = jsxExpr.getExpression()
      if (!expr) return

      const exprText = expr.getText()

      if (exprText.startsWith("cn(")) {
        // Already using cn() -- check if we need to add new args.
        const hasAllFontVars = newVarExpressions.every((v) =>
          exprText.includes(v)
        )
        const hasAllUtilityClasses = fontUtilityClasses.every((cls) =>
          exprText.includes(`"${cls}"`)
        )
        if (hasAllFontVars && hasAllUtilityClasses) continue

        // Remove existing font variables, add new ones at the end.
        let cleanedExpr = exprText
        for (const varExpr of newVarExpressions) {
          cleanedExpr = cleanedExpr.replace(
            new RegExp(`,?\\s*${varExpr.replace(".", "\\.")}`, "g"),
            ""
          )
        }
        cleanedExpr = cleanedExpr.replace(/cn\(\s*,/, "cn(")
        const newExpr = cleanedExpr.replace(
          /\)$/,
          `, ${allNewArgs.join(", ")})`
        )
        jsxExpr.replaceWithText(`{${newExpr}}`)
      } else if (/^\w+\.variable$/.test(exprText)) {
        ensureCnImport(sourceFile)
        jsxExpr.replaceWithText(`{cn(${allNewArgs.join(", ")})}`)
      } else if (exprText.startsWith("`") && exprText.endsWith("`")) {
        const cnArgs = parseTemplateLiteralToCnArgs(exprText)
        ensureCnImport(sourceFile)
        const allNewArgsSet = new Set(allNewArgs)
        const fontFamilyLiterals = new Set(
          ["font-sans", "font-serif", "font-mono"].map((c) => `"${c}"`)
        )
        const cleanedCnArgs = cnArgs.filter(
          (arg) => !allNewArgsSet.has(arg) && !fontFamilyLiterals.has(arg)
        )
        jsxExpr.replaceWithText(
          `{cn(${[...cleanedCnArgs, ...allNewArgs].join(", ")})}`
        )
      } else {
        ensureCnImport(sourceFile)
        jsxExpr.replaceWithText(`{cn(${exprText}, ${allNewArgs.join(", ")})}`)
      }
    }
  }
}

function ensureCnImport(
  sourceFile: ReturnType<Project["createSourceFile"]>
) {
  const existingImport = sourceFile.getImportDeclaration((decl) =>
    decl.getNamedImports().some((imp) => imp.getName() === "cn")
  )

  if (!existingImport) {
    const utilsImport = sourceFile.getImportDeclaration((decl) =>
      decl.getModuleSpecifierValue().includes("/lib/utils")
    )

    if (utilsImport) {
      const namedImports = utilsImport.getNamedImports()
      if (!namedImports.some((imp) => imp.getName() === "cn")) {
        utilsImport.addNamedImport("cn")
      }
    } else {
      sourceFile.addImportDeclaration({
        moduleSpecifier: "@/lib/utils",
        namedImports: ["cn"],
      })
    }
  }
}

function parseTemplateLiteralToCnArgs(templateLiteral: string) {
  const staticArgs: string[] = []
  const variableArgs: string[] = []
  const content = templateLiteral.slice(1, -1)
  const parts = content.split(/(\$\{[^}]+\})/)

  for (const part of parts) {
    if (!part) continue
    if (part.startsWith("${") && part.endsWith("}")) {
      const expr = part.slice(2, -1).trim()
      if (expr) variableArgs.push(expr)
    } else {
      const staticParts = part.trim().split(/\s+/).filter(Boolean)
      for (const staticPart of staticParts) {
        staticArgs.push(`"${staticPart}"`)
      }
    }
  }

  return [...staticArgs, ...variableArgs]
}
