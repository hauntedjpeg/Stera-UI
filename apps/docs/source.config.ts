import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins"

/**
 * Opt out of line numbers on a fence with the `noLineNumbers` meta flag:
 *
 *   ```bash noLineNumbers
 *   your-project/
 *   ├── components.json
 *   ```
 */
const transformerNoLineNumbers = {
  name: "stera:no-line-numbers",
  pre(this: { options: { meta?: { __raw?: string } } }, node: { properties: Record<string, unknown> }) {
    const meta = this.options.meta?.__raw ?? ""
    if (/\bnoLineNumbers\b/.test(meta)) {
      node.properties["data-line-numbers"] = "false"
    }
  },
}

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      ...rehypeCodeDefaultOptions,
      themes: {
        light: "github-light-default",
        dark: "github-dark",
      },
      defaultColor: false,
      icon: false,
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerNoLineNumbers,
      ],
    },
  },
})

export const docs = defineDocs({
  dir: "content/docs",
})
