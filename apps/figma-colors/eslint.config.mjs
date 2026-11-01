import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import reactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores([
    "node_modules/**",
    "dist/**",
    ".turbo/**",
    // Vendored verbatim from radix-ui/website; see src/core/radix/__vendor__.md.
    "src/core/radix/generate-radix-colors.ts",
  ]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/ui/**/*.{ts,tsx}"],
    extends: [reactHooks.configs.flat.recommended],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
