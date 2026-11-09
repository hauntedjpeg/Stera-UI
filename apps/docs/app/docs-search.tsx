"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/registry/ui/button"
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
  out: FlatItem[] = []
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
      {/* Styled like the search pill on the Stera Icons site; opens the command dialog */}
      <Button
        type="button"
        variant="ghost"
        size="lg"
        onClick={() => setOpen(true)}
        className="w-full justify-start gap-0 rounded-full glass bg-alpha-2 px-0 shadow-none hover:bg-alpha-3 active:bg-alpha-3 aria-expanded:bg-alpha-3 sm:w-72"
      >
        {/* Fixed-width slot so the icon lines up with the Icons site's pill */}
        <span className="flex w-11 shrink-0 justify-center text-ink">
          <SiSearch />
        </span>
        <span className="min-w-0 flex-1 truncate text-left st-body-md text-ink-subtlest">
          Search docs
        </span>
        <kbd className="hidden pr-4 text-xs/4 tracking-wide text-ink-subtlest md:inline">
          ⌘K
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search docs"
        description="Find pages in the documentation"
        className="rounded-3xl glass **:data-[slot='command-input-wrapper']:pb-2 [&_.group\/input-group]:border-none [&_.group\/input-group]:bg-transparent"
      >
        <Command>
          <CommandInput placeholder="Search docs" />
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
