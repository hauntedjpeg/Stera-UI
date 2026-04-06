import type { Metadata } from "next"
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
      <body>{children}</body>
    </html>
  )
}
