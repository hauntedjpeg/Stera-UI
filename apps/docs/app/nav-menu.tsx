"use client"

import { Menu } from "@base-ui/react/menu"
import { Button } from "@/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { SiMore } from "stera-icons"
import { NAV_LINKS, navGhost } from "./nav-links"

// The registry DropdownMenu has no link item, so links use Base UI's Menu.LinkItem
// directly, styled like the Stera Icons site's menu rows.
const itemClassName =
  "relative flex cursor-default items-center gap-2 overflow-hidden rounded-2xl px-3.5 py-2.5 st-body-lg text-ink-subtler outline-hidden select-none focus:bg-surface-muted-hover focus:text-ink [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5"

// Collapses the top bar links into a menu below the sm breakpoint
export function NavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            className={navGhost}
            aria-label="Menu"
          />
        }
      >
        <SiMore />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="min-w-52 rounded-3xl p-1.5"
      >
        {NAV_LINKS.map(({ label, href, icon: Icon }) => (
          <Menu.LinkItem
            key={href}
            closeOnClick
            className={itemClassName}
            render={<a href={href} target="_blank" rel="noopener noreferrer" />}
          >
            <Icon />
            {label}
          </Menu.LinkItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
