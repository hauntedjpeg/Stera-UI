import { defineConfig } from "tsup"

export default defineConfig([
  {
    entry: { index: "src/index.ts" },
    format: ["esm"],
    target: "node18",
    dts: true,
    clean: true,
    banner: { js: "#!/usr/bin/env node" },
  },
  {
    entry: {
      "registry/index": "src/registry/index.ts",
      "schema/index": "src/schema/index.ts",
      "utils/index": "src/utils/index.ts",
    },
    format: ["esm"],
    target: "node18",
    dts: true,
    splitting: true,
  },
])
