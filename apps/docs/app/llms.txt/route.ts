import { getLLMIndex } from "../../lib/llms"

export const revalidate = false

export function GET() {
  return new Response(getLLMIndex(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
