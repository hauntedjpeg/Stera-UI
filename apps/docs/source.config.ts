import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins"

/**
 * Opt in to line numbers on a fence with the `showLineNumbers` meta flag:
 *
 *   ```bash showLineNumbers
 *   your-project/
 *   ├── stera.config.json
 *   ```
 */
const transformerLineNumbers = {
  name: "stera:line-numbers",
  pre(
    this: { options: { meta?: { __raw?: string } } },
    node: { properties: Record<string, unknown> }
  ) {
    const meta = this.options.meta?.__raw ?? ""
    if (/\bshowLineNumbers\b/.test(meta)) {
      node.properties["data-line-numbers"] = "true"
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
        transformerLineNumbers,
      ],
    },
  },
})

export const docs = defineDocs({
  dir: "content/docs",
})
