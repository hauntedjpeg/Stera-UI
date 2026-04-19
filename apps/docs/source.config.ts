import { defineConfig, defineDocs } from "fumadocs-mdx/config"

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light-default",
        dark: "github-dark",
      },
      defaultColor: false,
    },
  },
})

export const docs = defineDocs({
  dir: "content/docs",
})
