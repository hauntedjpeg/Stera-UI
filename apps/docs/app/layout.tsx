import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import "../registry/styles/globals.css"

export const metadata: Metadata = {
  title: "Stera UI",
  description:
    "A component registry for React, built on Base UI and Tailwind CSS.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
