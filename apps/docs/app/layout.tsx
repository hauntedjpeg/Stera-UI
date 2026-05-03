import type { Metadata } from "next"
import type { CSSProperties, ReactNode } from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/registry/components/theme-provider"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { source } from "../lib/source"
import { DocsSidebar } from "./docs-sidebar"
import { DocsHeader } from "./docs-header"
import "./globals.css"

export const metadata: Metadata = {
  title: "Stera UI",
  description:
    "A component registry for React, built on Base UI and Tailwind CSS.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SidebarProvider
            className="flex-col"
            style={{ "--header-height": "4rem" } as CSSProperties}
          >
            <DocsHeader />
            <div className="flex flex-1">
              <DocsSidebar tree={source.pageTree} />
              <SidebarInset>{children}</SidebarInset>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
