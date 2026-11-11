import type { Metadata } from "next"
import { source } from "../../lib/source"
import { notFound } from "next/navigation"
import { useMDXComponents } from "@/mdx-components"
import { DocsToc } from "../docs-toc"
import { PageActions } from "@/components/page-actions"
import registry from "@/registry.json"
import { GITHUB_REPO_URL } from "../../lib/site"

// GitHub link to a registry item's first file. Undefined when no item has that
// name, so the page never links to a missing file.
function getSourceUrl(name: string | undefined) {
  const path = registry.items.find((item) => item.name === name)?.files?.[0]
    ?.path
  return path && `${GITHUB_REPO_URL}/blob/main/apps/docs/${path}`
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) notFound()

  const MDX = page.data.body
  const toc = page.data.toc
  const isComponentPage = page.slugs[0] === "components"

  return (
    <div className="lg:flex">
      <div className="flex min-w-0 flex-1 justify-center">
        <article className="w-full max-w-3xl min-w-0 px-4 py-10">
          <header className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
              <h1 className="st-display-sm text-ink">{page.data.title}</h1>
              {isComponentPage && (
                <PageActions
                  markdownHref={`${page.url}.md`}
                  sourceHref={getSourceUrl(page.slugs[1])}
                />
              )}
            </div>
            {page.data.description && (
              <p className="mt-2 st-body-lg text-ink-subtler">
                {page.data.description}
              </p>
            )}
          </header>
          {/* eslint-disable-next-line react-hooks/rules-of-hooks -- fumadocs helper, not a React hook */}
          <MDX components={useMDXComponents({})} />
        </article>
      </div>
      <aside className="hidden w-64 shrink-0 px-4 py-10 lg:block">
        <div className="sticky top-[calc(var(--header-height)+3rem)]">
          <DocsToc toc={toc} />
        </div>
      </aside>
    </div>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) notFound()

  return {
    title: `${page.data.title} - Stera UI`,
    description: page.data.description,
  }
}

export const dynamicParams = false
