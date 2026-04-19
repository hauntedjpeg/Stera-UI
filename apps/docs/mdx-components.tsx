import type { MDXComponents } from "mdx/types"
import type { ReactNode } from "react"
import Link from "next/link"
import Image, { type ImageProps } from "next/image"
import { Preview } from "@/components/preview"
import { ComponentPreview } from "@/components/component-preview"

function Callout({ children }: { type?: string; children: ReactNode }) {
  return (
    <div className="my-4 rounded-lg border border-border-brand bg-bg-brand-tertiary p-4 st-body-md text-text-secondary">
      {children}
    </div>
  )
}

function Steps({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 ml-4 border-l-2 border-border pl-6 [counter-reset:step] [&>h3]:mt-6 [&>h3]:before:mr-3 [&>h3]:before:inline-flex [&>h3]:before:size-7 [&>h3]:before:items-center [&>h3]:before:justify-center [&>h3]:before:rounded-full [&>h3]:before:border [&>h3]:before:border-border-brand [&>h3]:before:st-body-sm-strong [&>h3]:before:text-text-brand [&>h3]:before:[counter-increment:step] [&>h3]:before:content-[counter(step)]">
      {children}
    </div>
  )
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

const mdxDefaults: MDXComponents = {
  h1: (props) => (
    <h1 id={typeof props.children === "string" ? slugify(props.children) : undefined} className="st-display-sm text-text mt-8 mb-4 first:mt-0" {...props} />
  ),
  h2: (props) => (
    <h2 id={typeof props.children === "string" ? slugify(props.children) : undefined} className="st-heading-lg text-text mt-8 mb-3 first:mt-0" {...props} />
  ),
  h3: (props) => (
    <h3 id={typeof props.children === "string" ? slugify(props.children) : undefined} className="st-heading-md text-text mt-6 mb-2" {...props} />
  ),
  h4: (props) => (
    <h4 id={typeof props.children === "string" ? slugify(props.children) : undefined} className="st-heading-sm text-text mt-4 mb-2" {...props} />
  ),
  p: (props) => <p className="st-body-lg text-text-secondary mb-4 leading-relaxed" {...props} />,
  a: (props) => {
    const href = props.href ?? ""
    if (href.startsWith("/") || href.startsWith("#")) {
      return <Link href={href} className="text-text-accent underline underline-offset-4 hover:text-text-accent" {...props} />
    }
    return <a className="text-text underline underline-offset-4 hover:text-text-secondary" target="_blank" rel="noopener noreferrer" {...props} />
  },
  table: (props) => (
    <div className="my-6 overflow-auto">
      <table className="w-full st-body-md text-left" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b border-border-secondary px-4 py-2 st-body-md-strong text-text" {...props} />,
  td: (props) => <td className="border-b border-border px-4 py-2 text-text-secondary" {...props} />,
  code: (props) => {
    // Inline code has string children; shiki-rendered block code has span children
    const isInline = typeof props.children === "string"
    if (!isInline) return <code {...props} />
    return <code className="rounded bg-bg-surface-secondary px-1.5 py-0.5" {...props} />
  },
  ul: (props) => <ul className="my-4 ml-6 list-disc st-body-lg text-text-secondary [&>li]:mt-1" {...props} />,
  ol: (props) => <ol className="my-4 ml-6 list-decimal st-body-lg text-text-secondary [&>li]:mt-1" {...props} />,
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
  blockquote: (props) => <blockquote className="my-4 border-l-2 border-border-brand pl-4 text-text-secondary italic" {...props} />,
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxDefaults,
    Callout,
    Steps,
    Preview,
    ComponentPreview,
    ...components,
  }
}
