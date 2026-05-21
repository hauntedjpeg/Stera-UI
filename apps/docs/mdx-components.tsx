import type { MDXComponents } from "mdx/types"
import type { ReactNode } from "react"
import Link from "next/link"
import Image, { type ImageProps } from "next/image"
import { Preview } from "@/components/preview"
import { ComponentPreview } from "@/components/component-preview"
import { CodeBlock } from "@/components/code-block"
import { InstallSnippet } from "@/components/install-snippet"
import { SiInfoCircle } from "stera-icons"

function Callout({ children }: { type?: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 my-4 rounded-xl border border-border bg-surface-secondary p-4 st-body-md text-text-subtle [&_p]:mb-0 [&_p]:st-body-md [&_svg]:size-4 [&_svg]:mt-0.5 [&_svg]:shrink-0">
      <SiInfoCircle />
      {children}
    </div>
  )
}

function Steps({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 [counter-reset:step] [&>h3]:mt-6 [&>h3]:before:mr-3 [&>h3]:before:inline-flex [&>h3]:before:size-7 [&>h3]:before:items-center [&>h3]:before:justify-center [&>h3]:before:rounded-full [&>h3]:before:border [&>h3]:before:border-border [&>h3]:before:st-body-sm-strong [&>h3]:before:text-text [&>h3]:before:[counter-increment:step] [&>h3]:before:content-[counter(step)]">
      {children}
    </div>
  )
}

const mdxDefaults: MDXComponents = {
  h1: (props) => (
    <h1 className="st-display-sm text-text mt-8 mb-4 first:mt-0 scroll-mt-[calc(var(--header-height)+2rem)]" {...props} />
  ),
  h2: (props) => (
    <h2 className="st-heading-md text-text mt-12 mb-3 scroll-mt-[calc(var(--header-height)+2rem)]" {...props} />
  ),
  h3: (props) => (
    <h3 className="st-heading-sm text-text mt-8 mb-2 [h2+&]:mt-4 flex scroll-mt-[calc(var(--header-height)+2rem)]" {...props} />
  ),
  h4: (props) => (
    <h4 className="st-heading-sm text-text mt-4 mb-2 scroll-mt-[calc(var(--header-height)+2rem)]" {...props} />
  ),
  p: (props) => <p className="st-body-lg text-text-subtle mb-4" {...props} />,
  a: (props) => {
    const href = props.href ?? ""
    if (href.startsWith("/") || href.startsWith("#")) {
      return <Link href={href} className="text-text-accent underline underline-offset-4 hover:text-text-accent" {...props} />
    }
    return <a className="text-text underline underline-offset-4 hover:text-text-subtle" target="_blank" rel="noopener noreferrer" {...props} />
  },
  table: (props) => (
    <div className="my-6 overflow-auto border border-border rounded-xl">
      <table className="w-full st-body-md text-left" {...props} />
    </div>
  ),
  th: (props) => <th className="bg-surface-secondary border-b border-border px-4 py-2 st-body-sm-strong text-text" {...props} />,
  td: (props) => <td className="border-b border-border px-4 py-2 text-text-subtle" {...props} />,
  code: (props) => <code {...props} />,
  pre: (props) => <CodeBlock>{<pre {...props} />}</CodeBlock>,
  ul: (props) => <ul className="my-4 ml-6 list-disc st-body-lg text-text-subtle [&>li]:mt-1" {...props} />,
  ol: (props) => <ol className="my-4 ml-6 list-decimal st-body-lg text-text-subtle [&>li]:mt-1" {...props} />,
  img: (props: ImageProps) => (
    <Image
      className="my-4 rounded-lg"
      width={800}
      height={450}
      {...props}
      alt={props.alt ?? ""}
    />
  ),
  hr: () => <hr className="my-8 border-border" />,
  blockquote: (props) => <blockquote className="my-4 border-l-2 border-border-brand pl-4 text-text-subtle italic" {...props} />,
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxDefaults,
    Callout,
    Steps,
    Preview,
    ComponentPreview,
    InstallSnippet,
    ...components,
  }
}
