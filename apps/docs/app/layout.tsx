import type { Metadata, Viewport } from "next"
import type { CSSProperties, ReactNode } from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/registry/components/theme-provider"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { source } from "../lib/source"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "../lib/site"
import { DocsSidebar } from "./docs-sidebar"
import { DocsHeader } from "./docs-header"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0C0C" },
  ],
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
