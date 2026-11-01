import { notFound } from "next/navigation"

import { getLLMText } from "../../../lib/llms"
import { source } from "../../../lib/source"

export const revalidate = false

// Served at /<page>.md via the rewrite in next.config.ts.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params
  const page = source.getPage(slug?.join("/") === "index" ? [] : slug)
  if (!page) notFound()

  return new Response(await getLLMText(page), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}

export function generateStaticParams() {
  return [{ slug: ["index"] }, ...source.generateParams()]
}
