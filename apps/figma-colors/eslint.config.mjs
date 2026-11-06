import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import reactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(["node_modules/**", "dist/**", ".turbo/**"]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/ui/**/*.{ts,tsx}", "tune/**/*.{ts,tsx}"],
    extends: [reactHooks.configs.flat.recommended],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
