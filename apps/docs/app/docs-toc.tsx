"use client"

import * as React from "react"
import type { TableOfContents } from "fumadocs-core/toc"

import { ScrollArea } from "@/components/ui/scroll-area"
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

  // Keep the active link visible when the outline is taller than the screen.
  // Scrolls only the outline's own viewport, never the page.
  const navRef = React.useRef<HTMLElement>(null)
  React.useEffect(() => {
    const viewport = navRef.current?.querySelector<HTMLElement>(
      "[data-slot=scroll-area-viewport]"
    )
    const link = viewport?.querySelector<HTMLElement>("[aria-current]")
    if (!viewport || !link) return

    const margin = 32
    const top = link.offsetTop - viewport.offsetTop
    const bottom = top + link.offsetHeight
    if (top - margin < viewport.scrollTop) {
      viewport.scrollTo({ top: top - margin })
    } else if (bottom + margin > viewport.scrollTop + viewport.clientHeight) {
      viewport.scrollTo({ top: bottom + margin - viewport.clientHeight })
    }
  }, [activeId])

  if (items.length === 0) return null

  return (
    <nav ref={navRef} aria-label="Content outline" className="text-ink-subtler">
      {/* The viewport inherits the root's max height. Without it, the
          viewport's size-full has no definite height and never scrolls. */}
      <ScrollArea className="max-h-[calc(100dvh-var(--header-height)-4rem)] *:data-[slot=scroll-area-viewport]:max-h-[inherit]">
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
      </ScrollArea>
    </nav>
  )
}
