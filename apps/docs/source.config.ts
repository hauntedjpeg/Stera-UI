import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import rehypePrettyCode from "rehype-pretty-code"

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      // Remove default code highlighter in favor of rehype-pretty-code
      plugins.shift()
      plugins.push([
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light-default",
          },
        },
      ])
      return plugins
    },
  },
})

export const docs = defineDocs({
  dir: "content/docs",
})
