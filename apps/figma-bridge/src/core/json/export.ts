import type { RawVariablesPayload } from "../../shared/messages.js"

export function generateRawJson(payload: RawVariablesPayload): string {
  return JSON.stringify(payload, null, 2) + "\n"
}
