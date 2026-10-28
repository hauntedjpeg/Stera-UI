import fs from "node:fs"
import path from "node:path"
import type { ProjectInfo } from "./detect-project.js"
import type { TsConfigLookup } from "./tsconfig.js"
import { CROSS, dim } from "./format.js"

const DOCS = "https://ui.stera.sh/docs/installation"

const VITE_CONFIG_FILES = [
  "vite.config.ts",
  "vite.config.mts",
  "vite.config.js",
  "vite.config.mjs",
]

function indent(block: string, spaces = 5): string {
  const pad = " ".repeat(spaces)
  return block
    .split("\n")
    .map((line) => (line ? pad + line : line))
    .join("\n")
}

/**
 * Explain, for this project's framework and tsconfig layout, how to add the
 * `@/*` import alias Stera UI needs. Names the file that actually holds
 * compilerOptions (tsconfig.app.json on create-vite projects, not the
 * solution-style root) and shows snippets that work on TypeScript 7, where
 * `baseUrl` no longer exists.
 */
export function formatAliasGuidance(
  cwd: string,
  project: ProjectInfo,
  lookup: TsConfigLookup
): string {
  const aliasTarget = project.hasSrc ? "./src/*" : "./*"
  const pathsBlock = `"paths": {\n  "@/*": ["${aliasTarget}"]\n}`

  const lines: string[] = []
  lines.push(`${CROSS} No import alias found.`)
  lines.push("")

  if (!lookup.rootConfigPath) {
    lines.push(
      `Stera UI writes components to "@/components/ui", so it needs a path`,
      `mapping, but there is no tsconfig.json or jsconfig.json in ${cwd}.`,
      "",
      "Create tsconfig.json containing:",
      "",
      indent(`{\n  "compilerOptions": {\n${indent(pathsBlock, 4)}\n  }\n}`),
      ""
    )
  } else {
    const tsconfigFile = path.relative(
      cwd,
      lookup.suggestedConfigPath ?? lookup.rootConfigPath
    )
    lines.push(
      `Stera UI writes components to "@/components/ui", so your TypeScript config`,
      `needs a path mapping. Checked: ${lookup.inspected.join(", ")}.`,
      "",
      `1. Add this to "compilerOptions" in ${tsconfigFile}:`,
      "",
      indent(pathsBlock),
      ""
    )
  }

  if (project.framework === "vite") {
    const viteConfig =
      VITE_CONFIG_FILES.find((f) => fs.existsSync(path.join(cwd, f))) ??
      "vite.config.ts"
    const step = lookup.rootConfigPath ? "2." : "Then"

    if (project.viteMajor !== null && project.viteMajor >= 8) {
      lines.push(
        `${step} Let Vite resolve it in ${viteConfig}:`,
        "",
        indent(
          `export default defineConfig({\n  resolve: { tsconfigPaths: true },\n})`
        ),
        ""
      )
    } else {
      lines.push(
        `${step} Let Vite resolve it in ${viteConfig}:`,
        "",
        indent(
          [
            `import { fileURLToPath } from "node:url"`,
            ``,
            `export default defineConfig({`,
            `  resolve: {`,
            `    alias: { "@": fileURLToPath(new URL("${aliasTarget.replace(/\/\*$/, "")}", import.meta.url)) },`,
            `  },`,
            `})`,
          ].join("\n")
        ),
        ""
      )
    }
  }

  const anchor =
    project.framework === "vite"
      ? "#vite"
      : project.framework === "next"
        ? "#nextjs"
        : "#other-frameworks"

  lines.push("Then run `stera-ui init` again.")
  lines.push(dim(`Docs: ${DOCS}${anchor}`))
  lines.push("")

  return lines.join("\n")
}
