"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/ui/command"
import { SiComponentFill, SiSearch } from "stera-icons"

interface PageItem {
  type: "page"
  name: ReactNode
  url: string
  external?: boolean
}

interface SeparatorItem {
  type: "separator"
  name?: ReactNode
}

interface FolderItem {
  type: "folder"
  name: ReactNode
  index?: PageItem
  children: TreeNode[]
}

type TreeNode = PageItem | SeparatorItem | FolderItem

export interface PageTree {
  children: TreeNode[]
}

interface FlatItem {
  url: string
  label: string
  section: string
}

const nodeText = (n: ReactNode) => (typeof n === "string" ? n : String(n ?? ""))

function flatten(
  nodes: TreeNode[],
  section = "Docs",
  out: FlatItem[] = [],
): FlatItem[] {
  for (const n of nodes) {
    if (n.type === "separator") {
      section = nodeText(n.name) || section
    } else if (n.type === "page" && !n.external) {
      out.push({ url: n.url, label: nodeText(n.name), section })
    } else if (n.type === "folder") {
      if (n.index) {
        out.push({ url: n.index.url, label: nodeText(n.name), section })
      }
      flatten(n.children, section, out)
    }
  }
  return out
}

export function DocsSearch({ tree }: { tree: PageTree }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const groups = useMemo(() => {
    const items = flatten(tree.children)
    const map = new Map<string, FlatItem[]>()
    for (const it of items) {
      const list = map.get(it.section) ?? []
      list.push(it)
      map.set(it.section, list)
    }
    return [...map.entries()]
  }, [tree])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          buttonVariants({ variant: "ghost", size: "lg" }),
          "glass-brand backdrop-blur-md rounded-full md:h-9 md:gap-2 w-11 sm:w-auto px-3! md:has-data-[icon=inline-end]:pr-2.5 md:has-data-[icon=inline-start]:pl-2.5 md:has-data-[kbd=inline-end]:pr-2.5 md:has-data-[kbd=inline-start]:pl-2.5",
        )}
      >
        <SiSearch data-icon="inline-start" />
        <span className="hidden sm:inline">Search docs</span>
        <kbd className="hidden md:inline text-xs/4 text-text-subtlest tracking-wide">
          ⌘K
        </kbd>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search docs"
        description="Find pages in the documentation"
        className="glass-brand rounded-3xl [&_.group\/input-group]:border-none [&_.group\/input-group]:bg-transparent **:data-[slot='command-input-wrapper']:pb-2"
      >
        <Command>
          <CommandInput placeholder="Search docs"/>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {groups.map(([section, items]) => (
              <CommandGroup key={section} heading={section}>
                {items.map((it) => (
                  <CommandItem
                    key={it.url}
                    value={`${section} ${it.label}`}
                    onSelect={() => {
                      setOpen(false)
                      router.push(it.url)
                    }}
                  >
                    {section === "Components" && <SiComponentFill />}
                    <span>{it.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
