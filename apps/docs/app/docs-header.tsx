"use client"

import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-(--header-height) items-center gap-2 border-b bg-surface p-4">
      <SidebarTrigger size="icon-lg" className="md:hidden" />
      <Link href="/" className="st-body-md-strong text-text">
        Stera UI
      </Link>
    </header>
  )
}
