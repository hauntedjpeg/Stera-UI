import "server-only"

import type { InferPageType } from "fumadocs-core/source"

import { readExampleSource } from "./read-file"
import { hasRegistryExample } from "./registry"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site"
import { source } from "./source"

type Page = InferPageType<typeof source>

const COMPONENT_PREVIEW = /<ComponentPreview\b([\s\S]*?)\/>/g
const INSTALL_SNIPPET = /<InstallSnippet\b([\s\S]*?)\/>/g
const DESIGN_GUIDELINES =
  /<DesignGuidelines>\n?([\s\S]*?)\n?<\/DesignGuidelines>/

function attr(attrs: string, name: string): string | undefined {
  return attrs.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]
}

/** Processed markdown indents a JSX element's children; strip the common indent. */
function dedent(text: string): string {
  const lines = text.split("\n")
  const indents = lines
    .filter((line) => line.trim())
    .map((line) => line.match(/^ */)![0].length)
  const min = Math.min(...indents)
  return lines.map((line) => line.slice(min)).join("\n")
}

/**
 * Site-relative markdown links become absolute, so an agent reading a .md
 * file can follow them. Code fences are left alone.
 */
function absoluteLinks(markdown: string): string {
  return markdown
    .split(/(^```[\s\S]*?^```)/m)
    .map((part, i) =>
      i % 2 ? part : part.replace(/\]\(\//g, `](${SITE_URL}/`)
    )
    .join("")
}

function designBlock(markdown: string): string | undefined {
  const match = markdown.match(DESIGN_GUIDELINES)
  return match ? dedent(match[1]).trim() : undefined
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
    .replace(DESIGN_GUIDELINES, (_, body: string) => dedent(body).trim())
    .replace(COMPONENT_PREVIEW, () => previews[i++])
    .replace(INSTALL_SNIPPET, (_, attrs: string) => {
      const slug = attr(attrs, "slug")
      return slug ? `\`\`\`bash\nnpx stera-ui@latest add ${slug}\n\`\`\`` : ""
    })
}

export function getPageMarkdownUrl(page: Page): string {
  return `${SITE_URL}${page.url === "/" ? "/index" : page.url}.md`
}

/** Design-only copy of a component page, served at /<page>/design.md. */
export function getDesignMarkdownUrl(page: Page): string {
  return `${SITE_URL}${page.url}/design.md`
}

export async function getDesignText(page: Page): Promise<string | undefined> {
  const block = designBlock(await page.data.getText("processed"))
  if (!block) return undefined

  // The block's h3s become h2s on their own page.
  const body = absoluteLinks(
    block.replace(/^(#{3,6}) /gm, (_, hashes: string) => `${hashes.slice(1)} `)
  )
  const description = page.data.description
    ? `\n\n${page.data.description}`
    : ""

  return `# ${page.data.title}: design guidelines\n\nSource: ${SITE_URL}${page.url}\nCode and API: ${getPageMarkdownUrl(page)}${description}\n\n${body}\n`
}

/** Pages that have a <DesignGuidelines> block. */
export async function getDesignPages(): Promise<Page[]> {
  const pages = source.getPages()
  const texts = await Promise.all(
    pages.map((page) => page.data.getText("processed"))
  )
  return pages.filter((_, i) => designBlock(texts[i]))
}

export async function getLLMText(page: Page): Promise<string> {
  const processed = await page.data.getText("processed")
  const body = absoluteLinks(await expandDocsTags(processed))
  const description = page.data.description
    ? `\n\n${page.data.description}`
    : ""

  return `# ${page.data.title}\n\nSource: ${SITE_URL}${page.url}${description}\n\n${body.trim()}\n`
}

const SECTIONS: { title: string; match: (page: Page) => boolean }[] = [
  { title: "Guidelines", match: (page) => page.slugs[0] === "guidelines" },
  { title: "Components", match: (page) => page.slugs[0] === "components" },
  { title: "Utilities", match: (page) => page.slugs[0] === "utilities" },
  { title: "Getting started", match: () => true },
]

export async function getLLMIndex(): Promise<string> {
  const groups = new Map<string, Page[]>(SECTIONS.map((s) => [s.title, []]))
  for (const page of source.getPages()) {
    const section = SECTIONS.find((s) => s.match(page))!
    groups.get(section.title)!.push(page)
  }

  const order = ["Getting started", "Guidelines", "Components", "Utilities"]
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

  const designLinks = (await getDesignPages())
    .map((page) => {
      const description = page.data.description
        ? `: ${page.data.description}`
        : ""
      return `- [${page.data.title}](${getDesignMarkdownUrl(page)})${description}`
    })
    .join("\n")
  sections.splice(
    order.indexOf("Guidelines") + 1,
    0,
    `## Component design guidelines\n\nWhen to use each component, when not to, and how. Design decisions only, no code.\n\n${designLinks}`
  )

  return `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

Stera UI is a copy-paste component registry, not an installable package. \`npx stera-ui@latest init\` writes a \`stera.config.json\` and a \`ui/\` folder of Tailwind CSS v4 style partials; \`npx stera-ui@latest add <component>\` copies component source into the project and rewrites its \`@/\` imports to the configured aliases. Components wrap Base UI primitives, compose classes with \`cn()\`, use \`stera-icons\`, and style with semantic tokens (\`text-ink-*\`, \`bg-surface-*\`, \`border-border-*\`) and \`st-*\` typography utilities.

Every page below is plain markdown. The full set is at ${SITE_URL}/llms-full.txt.

To decide which component to use and how, read the Guidelines pages and the component design guidelines. Those carry no code; the component pages carry the code and API.

${sections.join("\n\n")}
`
}
