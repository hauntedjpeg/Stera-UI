import { docs } from "../.source/server"
import { loader } from "fumadocs-core/source"
import type { DocsCollectionEntry } from "fumadocs-mdx/runtime/server"

export const source = loader({
  baseUrl: "/",
  source: (docs as unknown as DocsCollectionEntry).toFumadocsSource(),
})
