"use client"

import * as React from "react"
import { SiCheck, SiCopy } from "stera-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MANAGERS = [
  { value: "pnpm", command: (slug: string) => `pnpm dlx stera-ui@latest add ${slug}` },
  { value: "npm", command: (slug: string) => `npx stera-ui@latest add ${slug}` },
  { value: "bun", command: (slug: string) => `bunx stera-ui@latest add ${slug}` },
  { value: "yarn", command: (slug: string) => `yarn dlx stera-ui@latest add ${slug}` },
] as const

type ManagerValue = (typeof MANAGERS)[number]["value"]

export function InstallSnippet({
  slug,
  className,
}: {
  slug: string
  className?: string
}) {
  const [value, setValue] = React.useState<ManagerValue>("pnpm")
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(id)
  }, [copied])

  const activeCommand =
    MANAGERS.find((m) => m.value === value)?.command(slug) ?? ""

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <h3 className="st-body-md-strong text-text">Installation</h3>
      <Tabs
        value={value}
        onValueChange={(v) => setValue(v as ManagerValue)}
        className="overflow-hidden rounded-xl border border-border bg-bg-surface"
      >
        <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
          <div className="flex items-center gap-2 text-text-secondary">
            <span className="font-mono text-sm select-none" aria-hidden>
              {">_"}
            </span>
            <TabsList>
              {MANAGERS.map((m) => (
                <TabsTrigger key={m.value} value={m.value}>
                  {m.value}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label={copied ? "Copied" : "Copy command"}
            onClick={async () => {
              await navigator.clipboard.writeText(activeCommand)
              setCopied(true)
            }}
          >
            {copied ? <SiCheck /> : <SiCopy />}
          </Button>
        </div>
        {MANAGERS.map((m) => (
          <TabsContent
            key={m.value}
            value={m.value}
            className="px-4 py-3 font-mono text-sm text-text"
          >
            {m.command(slug)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
