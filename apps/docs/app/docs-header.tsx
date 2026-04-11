"use client"

import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function MobileHeader() {
  return (
    <header className="flex h-12 items-center gap-2 border-b px-4 md:hidden">
      <SidebarTrigger />
      <Link href="/" className="st-body-md-strong text-text">
        Stera UI
      </Link>
    </header>
  )
}
