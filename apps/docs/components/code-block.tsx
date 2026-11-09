import * as React from "react"

import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

function extractText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode }
    return extractText(props.children)
  }
  return ""
}

/**
 * The Shiki `<pre>`. Both highlight paths (MDX fences and ComponentSource)
 * render through this so their layout can't drift. Token colors, line numbers
 * and highlight/diff lines are styled in app/code.css.
 */
export function CodeBlockPre({
  className,
  ...props
}: React.ComponentProps<"pre">) {
  return (
    <pre
      className={cn(
        "m-0 overflow-auto p-4 font-mono text-xs leading-[1.5em]",
        "[&>code]:block [&>code]:min-w-max",
        className
      )}
      {...props}
    />
  )
}

export function CodeBlock({
  children,
  title,
  embedded,
  hideCopyButton,
  className,
  ...rest
}: React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
  /** File name shown above the code, from a fence's `title="…"` meta. */
  title?: string
  embedded?: boolean
  hideCopyButton?: boolean
}) {
  const raw = extractText(children).replace(/\n$/, "")

  return (
    <figure
      data-slot="code-block"
      data-embedded={embedded ? "" : undefined}
      className={cn(
        "relative rounded-xl bg-surface-subtle",
        embedded ? "my-0 overflow-auto" : "my-4 overflow-hidden",
        className
      )}
      {...rest}
    >
      {title && (
        <figcaption className="border-b border-border px-3.5 py-2 font-mono text-xs text-ink-subtler">
          {title}
        </figcaption>
      )}
      {!hideCopyButton && (
        <CopyButton value={raw} className="absolute top-2.25 right-2.25 z-10" />
      )}
      {children}
    </figure>
  )
}
