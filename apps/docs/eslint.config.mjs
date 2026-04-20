import { defineConfig, globalIgnores } from "eslint/config";
import next from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  globalIgnores([
    "node_modules/**",
    ".next/**",
    ".source/**",
    "public/r/**",
    ".turbo/**",
    "next-env.d.ts",
  ]),
  ...next,
  ...nextTs,
  {
    files: ["registry/**/*.{ts,tsx}"],
    rules: {
      "react/no-unescaped-entities": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);
