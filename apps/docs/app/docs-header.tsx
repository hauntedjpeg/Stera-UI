"use client"

import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function MobileHeader() {
  return (
    <header className="flex items-center gap-2 border-b p-4">
      <SidebarTrigger size="icon-lg" className="md:hidden" />
      <Link href="/" className="st-body-md-strong text-text">
        Stera UI
      </Link>
    </header>
  )
}
