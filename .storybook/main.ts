import type { StorybookConfig } from "@storybook/react-vite"
import path from "node:path"

const config: StorybookConfig = {
  staticDirs: ["../public"],
  stories: ["../components/ui/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-themes"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve ??= {}
    config.resolve.alias = {
      ...config.resolve.alias,
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
