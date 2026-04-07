import { defineConfig } from "tsup"

export default defineConfig([
  {
    entry: { cli: "src/cli.ts" },
    format: ["esm"],
    target: "node18",
    dts: false,
    clean: true,
    banner: { js: "#!/usr/bin/env node" },
  },
  {
    entry: {
      index: "src/index.ts",
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
