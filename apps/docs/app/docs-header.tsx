"use client"

import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { buttonVariants } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
import { SiAsteriskAlt } from "stera-icons"
import { DocsSearch, type PageTree } from "./docs-search"
import { NAV_LINKS, navGhost } from "./nav-links"
import { NavMenu } from "./nav-menu"

export function DocsHeader({ tree }: { tree: PageTree }) {
  return (
    // The ::before gradient fades page content as it scrolls under the header.
    // It sits at a negative z-index inside the sticky header's stacking context, so it
    // stays behind the header's controls but above the page.
    <header className="sticky top-0 z-20 h-(--header-height) before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-linear-to-b before:from-surface-app before:to-transparent">
      {/* From sm up, three columns keep the search pill centered regardless of the
          outer groups' widths. Below sm the pill takes the leftover space instead. */}
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 p-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex gap-2 justify-self-start">
          <SidebarTrigger
            size="icon-lg"
            className={cn(navGhost, "md:hidden")}
          />
          <HomeLink />
        </div>

        <DocsSearch tree={tree} />

        <div className="flex justify-self-end max-sm:hidden">
          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-lg" }),
                navGhost
              )}
            >
              <Icon />
            </a>
          ))}
        </div>

        <div className="justify-self-end sm:hidden">
          <NavMenu />
        </div>
      </div>
    </header>
  )
}

// Hidden on phones, where the sidebar drawer's trigger takes its place
function HomeLink() {
  return (
    <Link
      href="/"
      className={cn(
        buttonVariants({ variant: "ghost", size: "lg" }),
        navGhost,
        "gap-3 max-sm:hidden [&_svg:not([class*='size-'])]:size-5"
      )}
    >
      <SiAsteriskAlt data-icon="inline-start" />
      Stera UI
    </Link>
  )
}
