import type { MetadataRoute } from "next"
import { source } from "../lib/source"
import { SITE_URL } from "../lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages().map((page) => ({
    url: `${SITE_URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page.url === "/" ? 1 : 0.7,
  }))

  return pages
}
