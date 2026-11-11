"use client"

import { SiDocument } from "stera-icons"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { GitHubIcon } from "@/app/nav-links"

// Links shown beside a component page's title: the page's plain-markdown copy
// (see lib/llms.ts) and the component's source file on GitHub.
export function PageActions({
  markdownHref,
  sourceHref,
}: {
  markdownHref: string
  sourceHref?: string
}) {
  // cn() lets tailwind-merge drop the base border-transparent, as Button does
  const className = cn(buttonVariants({ variant: "outline", size: "sm" }))

  return (
    <div className="flex shrink-0 gap-2">
      <a href={markdownHref} className={className}>
        <SiDocument data-icon="inline-start" />
        View as Markdown
      </a>
      {sourceHref && (
        <a
          href={sourceHref}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          <GitHubIcon data-icon="inline-start" />
          View source
        </a>
      )}
    </div>
  )
}
