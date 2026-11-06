import type { ReactNode } from "react"

/**
 * Wraps a component page's design guidance: which component to use when, and
 * how to use it, for designers and design agents. lib/llms.ts also serves the
 * contents on their own at /<page>/design.md. See content/writing-design-docs.md.
 */
export function DesignGuidelines({ children }: { children: ReactNode }) {
  return (
    <section
      data-slot="design-guidelines"
      className="my-6 rounded-xl border border-border bg-surface-subtle px-5 [&>*:last-child]:mb-5 [&>h3:first-child]:mt-5"
    >
      {children}
    </section>
  )
}
