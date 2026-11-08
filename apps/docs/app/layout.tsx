import type { Metadata, Viewport } from "next"
import type { CSSProperties, ReactNode } from "react"
import {
  Geist_Mono,
  Zalando_Sans,
  Zalando_Sans_SemiExpanded,
} from "next/font/google"
import { ThemeProvider } from "@/registry/components/theme-provider"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { source } from "../lib/source"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "../lib/site"
import { DocsSidebar } from "./docs-sidebar"
import { DocsHeader } from "./docs-header"
import "./globals.css"

// next/font has no size metrics for Zalando Sans, so it can't build an
// adjusted fallback. Fall back to the generic family instead.
const zalandoSans = Zalando_Sans({
  subsets: ["latin"],
  variable: "--font-zalando-sans",
  fallback: ["sans-serif"],
  adjustFontFallback: false,
})

const zalandoSansSemiExpanded = Zalando_Sans_SemiExpanded({
  subsets: ["latin"],
  variable: "--font-zalando-sans-semiexpanded",
  fallback: ["sans-serif"],
  adjustFontFallback: false,
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

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
    <html
      lang="en"
      className={`${zalandoSans.variable} ${zalandoSansSemiExpanded.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <SidebarProvider
            className="flex-col"
            style={{ "--header-height": "4.5rem" } as CSSProperties}
          >
            <DocsHeader tree={source.pageTree} />
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
