import type { MDXComponents } from "mdx/types"
import type { ReactNode } from "react"
import Link from "next/link"
import Image, { type ImageProps } from "next/image"
import { Preview } from "@/components/preview"
import { ComponentPreview } from "@/components/component-preview"
import { CodeBlock } from "@/components/code-block"
import { InstallSnippet } from "@/components/install-snippet"
import { DesignGuidelines } from "@/components/design-guidelines"
import { SiInfoCircle } from "stera-icons"

function Callout({ children }: { type?: string; children: ReactNode }) {
  return (
    <div className="my-4 flex gap-3 rounded-xl border border-border bg-surface-subtle p-4 st-body-md text-ink-subtler [&_p]:mb-0 [&_p]:st-body-md [&_svg]:mt-0.5 [&_svg]:size-4 [&_svg]:shrink-0">
      <SiInfoCircle />
      {children}
    </div>
  )
}

function Steps({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 [counter-reset:step] [&>h3]:mt-6 [&>h3]:before:mr-3 [&>h3]:before:inline-flex [&>h3]:before:size-7 [&>h3]:before:items-center [&>h3]:before:justify-center [&>h3]:before:rounded-full [&>h3]:before:border [&>h3]:before:border-border [&>h3]:before:st-label-sm-medium [&>h3]:before:text-ink [&>h3]:before:content-[counter(step)] [&>h3]:before:[counter-increment:step]">
      {children}
    </div>
  )
}

const mdxDefaults: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-8 mb-4 scroll-mt-[calc(var(--header-height)+2rem)] st-display-sm text-ink first:mt-0"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-12 mb-3 scroll-mt-[calc(var(--header-height)+2rem)] st-heading-md text-ink"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-2 flex scroll-mt-[calc(var(--header-height)+2rem)] st-heading-sm text-ink [h2+&]:mt-4"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="mt-4 mb-2 scroll-mt-[calc(var(--header-height)+2rem)] st-heading-sm text-ink"
      {...props}
    />
  ),
  p: (props) => <p className="mb-4 st-body-lg text-ink-subtler" {...props} />,
  a: (props) => {
    const href = props.href ?? ""
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link
          href={href}
          className="text-ink-accent underline underline-offset-4 hover:text-ink-accent"
          {...props}
        />
      )
    }
    return (
      <a
        className="text-ink underline underline-offset-4 hover:text-ink-subtler"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    )
  },
  table: (props) => (
    <div className="my-6 overflow-auto rounded-xl border border-border">
      <table className="w-full text-left st-body-md" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-border bg-surface-subtle px-4 py-2 st-label-sm-medium text-ink"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-b border-border px-4 py-2 text-ink-subtler"
      {...props}
    />
  ),
  code: (props) => <code {...props} />,
  pre: (props) => <CodeBlock>{<pre {...props} />}</CodeBlock>,
  ul: (props) => (
    <ul
      className="my-4 ml-6 list-disc st-body-lg text-ink-subtler [&>li]:mt-1"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-4 ml-6 list-decimal st-body-lg text-ink-subtler [&>li]:mt-1"
      {...props}
    />
  ),
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
  blockquote: (props) => (
    <blockquote
      className="my-4 border-l-2 border-border-brand pl-4 text-ink-subtler italic"
      {...props}
    />
  ),
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxDefaults,
    Callout,
    Steps,
    Preview,
    ComponentPreview,
    InstallSnippet,
    DesignGuidelines,
    ...components,
  }
}
