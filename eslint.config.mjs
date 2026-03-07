import { defineConfig, globalIgnores } from "eslint/config"

const eslintConfig = defineConfig([
  globalIgnores(["node_modules/**", "storybook-static/**"]),
])

export default eslintConfig
