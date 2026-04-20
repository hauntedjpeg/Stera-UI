"use client"

import * as React from "react"
import { SiCheck, SiCopy } from "stera-icons"
import { cn } from "@/lib/utils"

export function CopyButton({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(id)
  }, [copied])

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
      }}
      className={cn(
        "absolute top-3 right-3 z-10 inline-flex size-7 items-center justify-center rounded-md border border-border bg-bg-surface text-text-secondary transition-colors hover:text-text",
        className
      )}
    >
      {copied ? <SiCheck className="size-3.5" /> : <SiCopy className="size-3.5" />}
    </button>
  )
}
