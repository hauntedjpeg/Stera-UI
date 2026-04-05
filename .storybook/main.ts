// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite"
import path, { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  staticDirs: ["../public"],
  stories: ["../registry/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-themes", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve ??= {}
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/components/ui": path.resolve(__dirname, "../registry/ui"),
      "@/components": path.resolve(__dirname, "../registry/components"),
      "@/lib": path.resolve(__dirname, "../registry/lib"),
      "@/hooks": path.resolve(__dirname, "../registry/hooks"),
      "@": path.resolve(__dirname, ".."),
    }

    config.build ??= {}
    config.build.chunkSizeWarningLimit = 1000
    config.build.rollupOptions ??= {}
    config.build.rollupOptions.onwarn = (warning, warn) => {
      if (warning.code === "MODULE_LEVEL_DIRECTIVE") return
      if (warning.code === "EVAL" && warning.id?.includes("@storybook")) return
      warn(warning)
    }

    return config
  },
}

export default config
