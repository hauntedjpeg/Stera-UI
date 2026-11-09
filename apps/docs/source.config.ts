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
      includeProcessedMarkdown: {
        handlers: {
          // The default handler drops the `#` markers and appends `[#id]`.
          heading(node, _parent, state, info) {
            const text = state.containerPhrasing(node, info)
            return `${"#".repeat(node.depth)} ${text}`
          },
        },
      },
    },
  },
})
