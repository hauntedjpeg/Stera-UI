import { defineConfig } from "tsup"

const library = {
  index: "src/index.ts",
  "registry/index": "src/registry/index.ts",
  "schema/index": "src/schema/index.ts",
  "utils/index": "src/utils/index.ts",
}

// Dependencies are bundled so the published package installs as a single
// tarball — `pnpm dlx stera-ui` has nothing else to resolve. The CLI and the
// library entries build together so they share chunks (ts-morph embeds all of
// TypeScript; it should only ship once).
export default defineConfig({
  entry: { cli: "src/cli.ts", ...library },
  format: ["esm"],
  target: "node20",
  dts: { entry: library },
  clean: true,
  splitting: true,
  minify: true,
  noExternal: [/.*/],
  // Bundled CommonJS code still expects __filename/__dirname and calls
  // require() for Node built-ins, none of which ESM output has.
  shims: true,
  // Prefer CommonJS entries: a bundled require("json5") that resolves to the
  // package's ESM build gets a namespace object instead of the module.
  esbuildOptions(options) {
    options.mainFields = ["main", "module"]
  },
  banner: {
    js: 'import { createRequire as __createRequire } from "node:module"; const require = __createRequire(import.meta.url);',
  },
})
