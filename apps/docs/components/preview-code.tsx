"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { CopyButton } from "./copy-button"

/**
 * Example source under a component preview. Closed, it shows the first few
 * lines behind a fade and the whole area opens it. Open, it shows everything
 * with a "Hide code" pill that sticks to the bottom of the screen.
 * Matches Base UI's docs demos (docs/src/components/Demo in mui/base-ui).
 */
export function PreviewCode({
  code,
  children,
}: {
  code: string
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  // Assume overflow until measured, so long blocks don't flash open.
  const [overflow, setOverflow] = React.useState(true)
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const pillRef = React.useRef<HTMLSpanElement>(null)
  const panelId = React.useId()

  React.useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || open || !overflow) return

    // Overflow that's only the <pre>'s bottom padding (1rem) doesn't count,
    // so a 5-line example shows in full with no toggle.
    const measure = () =>
      setOverflow(viewport.scrollHeight - viewport.clientHeight > 16)
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [open, overflow])

  const closed = !open && overflow

  // Closing a long block from the sticky pill would leave the pill far above
  // the screen. Keep it where it was by scrolling up by however far it moved,
  // but only if it ended up off the top; if it's still visible, don't scroll.
  const toggle = () => {
    const pill = pillRef.current
    if (!open || !pill) {
      setOpen(!open)
      return
    }

    const topBefore = pill.getBoundingClientRect().top
    ReactDOM.flushSync(() => setOpen(false))
    const topAfter = pill.getBoundingClientRect().top

    if (topAfter < 0) {
      window.scrollBy({ top: topAfter - topBefore, behavior: "instant" })
    }
  }

  return (
    <div
      data-slot="preview-code"
      data-open={open ? "" : undefined}
      data-closed={closed ? "" : undefined}
      // isolate keeps the fade/toggle/copy layers from stacking over the
      // sticky site header.
      className="relative isolate flex flex-col border-t border-border bg-surface-subtle"
    >
      <CopyButton value={code} className="absolute top-2.25 right-2.25 z-30" />
      <div
        ref={viewportRef}
        id={panelId}
        inert={closed}
        className={cn(
          "text-xs leading-[1.5em]",
          "**:data-[slot=code-block]:rounded-none **:data-[slot=code-block]:bg-transparent",
          closed && "max-h-[calc(5.7lh+1rem)] overflow-hidden"
        )}
      >
        {children}
      </div>
      {closed && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-transparent to-surface-subtle/95"
        />
      )}
      {overflow && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
          className={cn(
            "group/toggle z-20 flex cursor-default justify-center outline-none select-none",
            open
              ? "sticky bottom-3 -mt-11 mb-3 self-center"
              : "absolute inset-0 items-end pb-3"
          )}
        >
          <span
            ref={pillRef}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "pointer-events-none rounded-full shadow-sm",
              "group-hover/toggle:border-border-muted group-active/toggle:bg-surface-pressed",
              "group-focus-visible/toggle:ring-3 group-focus-visible/toggle:ring-ring"
            )}
          >
            {open ? "Hide code" : "Show code"}
          </span>
        </button>
      )}
    </div>
  )
}
