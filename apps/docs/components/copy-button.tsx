"use client"

import * as React from "react"
import { SiCheck, SiCopy } from "stera-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
    <Button
      variant="outline"
      size="icon-sm"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
      }}
      className={cn("absolute top-3 right-3 z-10", className)}
    >
      {copied ? <SiCheck /> : <SiCopy />}
    </Button>
  )
}
