import "server-only"

import { codeToHtml } from "shiki"

export async function highlightCode(code: string, lang = "tsx"): Promise<string> {
  return codeToHtml(code, {
    lang,
    themes: {
      dark: "github-dark",
      light: "github-light-default",
    },
    defaultColor: false,
  })
}
