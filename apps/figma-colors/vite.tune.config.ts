import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "node:path"

/** The tuning playground (`pnpm tune`): dev only, never built. */
export default defineConfig({
  root: resolve(__dirname, "tune"),
  plugins: [react()],
})
