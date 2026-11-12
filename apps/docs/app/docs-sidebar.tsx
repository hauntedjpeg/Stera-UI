"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, type ReactNode } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar"

interface PageTreeRoot {
  name: ReactNode
  children: PageTreeNode[]
}

type PageTreeNode = PageTreeItem | PageTreeSeparator | PageTreeFolder

interface PageTreeItem {
  type: "page"
  name: ReactNode
  url: string
  external?: boolean
}

interface PageTreeSeparator {
  type: "separator"
  name?: ReactNode
}

interface PageTreeFolder {
  type: "folder"
  name: ReactNode
  index?: PageTreeItem
  children: PageTreeNode[]
  defaultOpen?: boolean
}

// Full-width pill rows as on the Stera Icons site: hover only brightens the text, the
// current page gets a subtle fill. The bg-* overrides replace the registry hovers.
const rowClassName =
  "h-8 w-full gap-3 rounded-full p-3 st-label-md text-ink-subtle hover:bg-surface-hover hover:text-ink active:bg-transparent active:text-ink data-active:bg-surface-pressed data-active:st-label-md data-active:text-ink"

export function DocsSidebar({ tree }: { tree: PageTreeRoot }) {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()

  useEffect(() => {
    if (isMobile) setOpenMobile(false)
  }, [pathname, isMobile, setOpenMobile])

  return (
    // Transparent and full height, so the list scrolls under the header and its
    // gradient fades the top edge, like the Stera Icons category sidebar
    <Sidebar className="bg-transparent group-data-[side=left]:border-r-0">
      <SidebarContent className="scroll-fade-b scrollbar-hide pt-4 pb-12 md:scroll-pt-(--header-height) md:pt-(--header-height)">
        <TreeNodes nodes={tree.children} pathname={pathname} />
      </SidebarContent>
    </Sidebar>
  )
}

function TreeNodes({
  nodes,
  pathname,
}: {
  nodes: PageTreeNode[]
  pathname: string
}) {
  const groups: { separator?: PageTreeSeparator; items: PageTreeNode[] }[] = []
  let current: { separator?: PageTreeSeparator; items: PageTreeNode[] } = {
    items: [],
  }

  for (const node of nodes) {
    if (node.type === "separator") {
      if (current.items.length > 0 || current.separator) {
        groups.push(current)
      }
      current = { separator: node, items: [] }
    } else {
      current.items.push(node)
    }
  }
  if (current.items.length > 0 || current.separator) {
    groups.push(current)
  }

  return (
    <>
      {groups.map((group, i) => (
        <SidebarGroup key={i} className="px-4 py-2">
          {group.separator?.name && (
            <SidebarGroupLabel className="h-auto p-3 pb-4 st-label-sm text-ink-subtlest">
              {group.separator.name}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((node, j) => (
                <TreeNode key={j} node={node} pathname={pathname} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}

function TreeNode({
  node,
  pathname,
}: {
  node: PageTreeNode
  pathname: string
}) {
  if (node.type === "page") {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          className={rowClassName}
          isActive={pathname === node.url}
          render={<Link href={node.url} />}
        >
          {node.name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  if (node.type === "folder") {
    return (
      <SidebarMenuItem>
        {node.index ? (
          <SidebarMenuButton
            className={rowClassName}
            isActive={pathname === node.index.url}
            render={<Link href={node.index.url} />}
          >
            {node.name}
          </SidebarMenuButton>
        ) : (
          <SidebarMenuButton className={rowClassName} isActive={false}>
            {node.name}
          </SidebarMenuButton>
        )}
        {node.children.length > 0 && (
          <SidebarMenuSub>
            {node.children.map((child, i) => {
              if (child.type === "page") {
                return (
                  <SidebarMenuSubItem key={i}>
                    <SidebarMenuSubButton
                      className={rowClassName}
                      isActive={pathname === child.url}
                      render={<Link href={child.url} />}
                    >
                      {child.name}
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                )
              }
              return <TreeNode key={i} node={child} pathname={pathname} />
            })}
          </SidebarMenuSub>
        )}
      </SidebarMenuItem>
    )
  }

  return null
}
