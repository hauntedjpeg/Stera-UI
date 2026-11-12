import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins"

// Relative import: fumadocs-mdx bundles this file, so `@/` aliases don't resolve.
// The theme can't live here: this file may only export collections.
import { codeThemeOptions } from "./lib/code-theme"

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      // Defaults bring the `// [!code highlight]` / diff / focus notation
      // transformers and `title="…"` / `lineNumbers` meta parsing.
      ...rehypeCodeDefaultOptions,
      ...codeThemeOptions,
      icon: false,
    },
  },
})

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    // Exposes page.data.getText("processed") for the llms.txt routes.
    postprocess: {
      // Keeps headings as plain `## Title`, without the `[#id]` suffix.
      includeProcessedMarkdown: { headingIds: false },
    },
  },
})
