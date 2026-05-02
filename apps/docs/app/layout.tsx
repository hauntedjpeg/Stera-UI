import type { Metadata } from "next"
import type { ReactNode } from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/registry/components/theme-provider"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { source } from "../lib/source"
import { DocsSidebar } from "./docs-sidebar"
import { MobileHeader } from "./docs-header"
import "../registry/styles/globals.css"
import "./code.css"
import "./docs.css"

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
          <SidebarProvider>
            <DocsSidebar tree={source.pageTree} />
            <SidebarInset>
              <MobileHeader />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
