"use client"

import * as React from "react"
import type { TableOfContents } from "fumadocs-core/toc"

import { cn } from "@/lib/utils"

export function DocsToc({ toc }: { toc: TableOfContents }) {
  const items = React.useMemo(
    () => toc.filter((item) => item.depth === 2 || item.depth === 3),
    [toc]
  )
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (items.length === 0) return

    const ids = items.map((item) => item.url.replace(/^#/, "")).filter(Boolean)
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const threshold = 120
    const update = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      if (atBottom) {
        setActiveId(elements[elements.length - 1].id)
        return
      }
      let current = elements[0].id
      for (const el of elements) {
        if (el.getBoundingClientRect().top - threshold <= 0) current = el.id
        else break
      }
      setActiveId(current)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [items])

  if (items.length === 0) return null

  return (
    // Full height and sticky at the top, so the list scrolls under the header
    // and its gradient fades the top edge, like the sidebar
    <nav
      aria-label="Content outline"
      className="sticky top-0 h-dvh scroll-fade-b overflow-y-auto pt-[calc(var(--header-height)+2.5rem)] pb-12 text-ink-subtler"
    >
      <ul className="space-y-1.5">
        {items.map((item) => {
          const id = item.url.replace(/^#/, "")
          const isActive = activeId === id
          return (
            <li key={item.url}>
              <a
                href={item.url}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block st-label-md transition-colors hover:text-ink",
                  item.depth === 3 && "pl-4",
                  isActive ? "text-ink" : "text-ink-subtlest"
                )}
              >
                {item.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
