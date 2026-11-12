import { utimesSync, watch } from "node:fs"
import { createMDX } from "fumadocs-mdx/next"
import type { NextConfig } from "next"

// The Fumadocs dev watcher reloads the MDX config only when source.config.ts
// itself changes, not the modules it imports. Touch it when the syntax theme
// changes so MDX code blocks pick up the new pair. The env flag runs this once
// per dev session (Next loads this file in several processes), like Fumadocs'
// own `_FUMADOCS_MDX` guard.
if (
  process.env.NODE_ENV === "development" &&
  process.env._STERA_CODE_THEME_WATCH !== "1"
) {
  process.env._STERA_CODE_THEME_WATCH = "1"
  watch("lib/code-theme.ts", () => {
    const now = new Date()
    utimesSync("source.config.ts", now, now)
  }).unref()
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Plain-markdown copy of any docs page for AI agents (see lib/llms.ts).
      { source: "/:path*.md", destination: "/llms.mdx/:path*" },
    ]
  },
  async redirects() {
    return [
      {
        source: "/components-json",
        destination: "/stera-config",
        permanent: true,
      },
      {
        source: "/components/sheet",
        destination: "/components/drawer",
        permanent: true,
      },
      {
        source: "/components/notice",
        destination: "/components/toast",
        permanent: true,
      },
      {
        source: "/components/notice.md",
        destination: "/components/toast.md",
        permanent: true,
      },
      // The Design section became Guidelines, and its five group pages
      // merged into Choosing components.
      {
        source: "/design/theming",
        destination: "/guidelines/theming",
        permanent: true,
      },
      {
        source: "/design/theming.md",
        destination: "/guidelines/theming.md",
        permanent: true,
      },
      ...(
        [
          ["forms", "forms"],
          ["selection", "selection"],
          ["overlays", "overlays"],
          ["navigation", "menus-and-navigation"],
          ["loading", "loading-and-empty-states"],
        ] as const
      ).flatMap(([page, anchor]) => [
        {
          source: `/design/${page}`,
          destination: `/guidelines/choosing-components#${anchor}`,
          permanent: true,
        },
        {
          source: `/design/${page}.md`,
          destination: "/guidelines/choosing-components.md",
          permanent: true,
        },
      ]),
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
