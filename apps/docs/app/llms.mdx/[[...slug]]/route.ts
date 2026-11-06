import { notFound } from "next/navigation"

import { getDesignPages, getDesignText, getLLMText } from "../../../lib/llms"
import { source } from "../../../lib/source"

export const revalidate = false

// Served at /<page>.md via the rewrite in next.config.ts.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params
  const page = source.getPage(slug?.join("/") === "index" ? [] : slug)
  const text = page ? await getLLMText(page) : await getDesignTextFor(slug)
  if (!text) notFound()

  return new Response(text, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}

// /<page>/design.md serves only that page's <DesignGuidelines> block.
async function getDesignTextFor(slug: string[] | undefined) {
  if (slug?.at(-1) !== "design") return undefined
  const page = source.getPage(slug.slice(0, -1))
  return page ? getDesignText(page) : undefined
}

export async function generateStaticParams() {
  const designPages = await getDesignPages()
  return [
    { slug: ["index"] },
    ...source.generateParams(),
    ...designPages.map((page) => ({ slug: [...page.slugs, "design"] })),
  ]
}
