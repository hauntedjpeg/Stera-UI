import { defineConfig, globalIgnores } from "eslint/config";
import next from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import storybook from "eslint-plugin-storybook";

export default defineConfig([
  globalIgnores([
    "node_modules/**",
    "storybook-static/**",
    ".next/**",
    ".source/**",
    "public/r/**",
    ".turbo/**",
  ]),
  ...next,
  ...nextTs,
  ...storybook.configs["flat/recommended"],
  {
    files: ["registry/**/*.{ts,tsx}"],
    rules: {
      "react/no-unescaped-entities": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);
