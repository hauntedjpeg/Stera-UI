import type { ReactNode } from "react"

/**
 * Marks a component page's design guidance: which component to use when, and
 * how to use it, for designers and design agents. It renders like any other
 * section and adds no styling; the tag is there so lib/llms.ts can find the
 * block and serve it on its own at /<page>/design.md. See
 * content/writing-design-docs.md.
 */
export function DesignGuidelines({ children }: { children: ReactNode }) {
  return <>{children}</>
}
