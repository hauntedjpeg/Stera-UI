import { source } from "../../../lib/source"
import { notFound } from "next/navigation"
import { useMDXComponents } from "../../../mdx-components"

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) notFound()

  const MDX = page.data.body

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-10">
      <header className="mb-8">
        <h1 className="st-display-sm text-text">{page.data.title}</h1>
        {page.data.description && (
          <p className="mt-2 st-body-lg text-text-secondary">
            {page.data.description}
          </p>
        )}
      </header>
      <div className="prose">
        <MDX components={useMDXComponents({})} />
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) notFound()

  return {
    title: `${page.data.title} - Stera UI`,
    description: page.data.description,
  }
}

export const dynamicParams = false
