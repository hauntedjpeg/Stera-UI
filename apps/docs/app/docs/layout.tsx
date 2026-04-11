import type { ReactNode } from "react"
import "./code-blocks.css"
import { source } from "../../lib/source"
import { DocsSidebar } from "./docs-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <DocsSidebar tree={source.pageTree} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
