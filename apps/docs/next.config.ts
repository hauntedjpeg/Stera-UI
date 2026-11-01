import { createMDX } from "fumadocs-mdx/next"
import type { NextConfig } from "next"

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
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
