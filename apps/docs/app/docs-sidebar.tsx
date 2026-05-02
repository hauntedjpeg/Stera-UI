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

export function DocsSidebar({ tree }: { tree: PageTreeRoot }) {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()

  useEffect(() => {
    if (isMobile) setOpenMobile(false)
  }, [pathname, isMobile, setOpenMobile])

  return (
    <Sidebar className="group-data-[side=left]:border-r-0">
      <SidebarContent className="pb-16">
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
        <SidebarGroup key={i}>
          {group.separator?.name && (
            <SidebarGroupLabel>{group.separator.name}</SidebarGroupLabel>
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
          className="w-fit data-active:bg-surface-tertiary"
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
            className="w-fit data-active:bg-surface-tertiary"
            isActive={pathname === node.index.url}
            render={<Link href={node.index.url} />}
          >
            {node.name}
          </SidebarMenuButton>
        ) : (
          <SidebarMenuButton className="w-fit" isActive={false}>
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
                      className="w-fit data-active:bg-surface-tertiary"
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
