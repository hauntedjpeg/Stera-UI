import * as React from "react"
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

export function CodeBlock({
  children,
  embedded,
  hideCopyButton,
  className,
  ...rest
}: React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
  embedded?: boolean
  hideCopyButton?: boolean
}) {
  const raw = extractText(children).replace(/\n$/, "")

  const preProps = React.isValidElement(children)
    ? (children.props as Record<string, unknown>)
    : undefined
  const title = preProps?.["data-title"] as string | undefined
  const language = preProps?.["data-language"] as string | undefined

  return (
    <figure
      className={className ? `st-code-block ${className}` : "st-code-block"}
      data-language={language}
      data-embedded={embedded ? "" : undefined}
      {...rest}
    >
      {title && <figcaption className="st-code-block__title">{title}</figcaption>}
      {!hideCopyButton && (
        <CopyButton value={raw} className="absolute top-3 right-3 z-10" />
      )}
      {children}
    </figure>
  )
}
