import { useEffect } from "react"
import type { SandboxToUi } from "../../shared/messages.js"

export function useFigmaMessages(handler: (msg: SandboxToUi) => void): void {
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const msg = event.data?.pluginMessage as SandboxToUi | undefined
      if (!msg || typeof msg !== "object" || !("type" in msg)) return
      handler(msg)
    }
    window.addEventListener("message", listener)
    return () => window.removeEventListener("message", listener)
  }, [handler])
}
