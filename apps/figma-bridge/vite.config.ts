import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { viteSingleFile } from "vite-plugin-singlefile"
import { resolve } from "node:path"

export default defineConfig({
  root: resolve(__dirname, "src/ui"),
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, "src/ui/index.html"),
    },
    target: "es2020",
  },
})
