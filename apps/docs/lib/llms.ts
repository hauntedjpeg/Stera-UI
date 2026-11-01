import "server-only"

import type { InferPageType } from "fumadocs-core/source"

import { readExampleSource } from "./read-file"
import { hasRegistryExample } from "./registry"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site"
import { source } from "./source"

type Page = InferPageType<typeof source>

const COMPONENT_PREVIEW = /<ComponentPreview\b([\s\S]*?)\/>/g
const INSTALL_SNIPPET = /<InstallSnippet\b([\s\S]*?)\/>/g

function attr(attrs: string, name: string): string | undefined {
  return attrs.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]
}

/**
 * Processed markdown still carries the docs-only MDX tags. Swap them for what
 * they render, so an agent reading the page gets the example source and the
 * install command instead of a tag it can't resolve.
 */
async function expandDocsTags(markdown: string): Promise<string> {
  const previews = await Promise.all(
    Array.from(markdown.matchAll(COMPONENT_PREVIEW), async (match) => {
      const name = attr(match[1], "name")
      if (!name || !hasRegistryExample(name)) return ""
      const code = await readExampleSource(name)
      return `\`\`\`tsx title="examples/${name}.tsx"\n${code.trimEnd()}\n\`\`\``
    })
  )

  let i = 0
  return markdown
    .replace(COMPONENT_PREVIEW, () => previews[i++])
    .replace(INSTALL_SNIPPET, (_, attrs: string) => {
      const slug = attr(attrs, "slug")
      return slug ? `\`\`\`bash\nnpx stera-ui@latest add ${slug}\n\`\`\`` : ""
    })
}

export function getPageMarkdownUrl(page: Page): string {
  return `${SITE_URL}${page.url === "/" ? "/index" : page.url}.md`
}

export async function getLLMText(page: Page): Promise<string> {
  const processed = await page.data.getText("processed")
  const body = await expandDocsTags(processed)
  const description = page.data.description
    ? `\n\n${page.data.description}`
    : ""

  return `# ${page.data.title}\n\nSource: ${SITE_URL}${page.url}${description}\n\n${body.trim()}\n`
}

const SECTIONS: { title: string; match: (page: Page) => boolean }[] = [
  { title: "Components", match: (page) => page.slugs[0] === "components" },
  { title: "Utilities", match: (page) => page.slugs[0] === "utilities" },
  { title: "Getting started", match: () => true },
]

export function getLLMIndex(): string {
  const groups = new Map<string, Page[]>(SECTIONS.map((s) => [s.title, []]))
  for (const page of source.getPages()) {
    const section = SECTIONS.find((s) => s.match(page))!
    groups.get(section.title)!.push(page)
  }

  const order = ["Getting started", "Components", "Utilities"]
  const sections = order.map((title) => {
    const links = groups
      .get(title)!
      .map((page) => {
        const description = page.data.description
          ? `: ${page.data.description}`
          : ""
        return `- [${page.data.title}](${getPageMarkdownUrl(page)})${description}`
      })
      .join("\n")
    return `## ${title}\n\n${links}`
  })

  return `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

Stera UI is a copy-paste component registry, not an installable package. \`npx stera-ui@latest init\` writes a \`stera.config.json\` and a \`ui/\` folder of Tailwind CSS v4 style partials; \`npx stera-ui@latest add <component>\` copies component source into the project and rewrites its \`@/\` imports to the configured aliases. Components wrap Base UI primitives, compose classes with \`cn()\`, use \`stera-icons\`, and style with semantic tokens (\`text-ink-*\`, \`bg-surface-*\`, \`border-border-*\`) and \`st-*\` typography utilities.

Every page below is plain markdown. The full set is at ${SITE_URL}/llms-full.txt.

${sections.join("\n\n")}
`
}
