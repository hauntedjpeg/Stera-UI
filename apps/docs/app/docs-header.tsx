"use client"

import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { buttonVariants } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
import { SiAsteriskAlt } from "stera-icons"

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-(--header-height) items-center gap-2 easing-fade px-6 py-4">
      <SidebarTrigger size="icon-lg" className="md:hidden" />
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost", size: "md" }),
          "glass-brand backdrop-blur-md rounded-full"
        )}
      >
        <SiAsteriskAlt data-icon="inline-start" />
        UI
      </Link>
    </header>
  )
}
