# stera-ui

## 0.1.3

### Patch Changes

- [`149a5f0`](https://github.com/hauntedjpeg/Stera-UI/commit/149a5f0f91561851f2ea8a6299af924af1a5cf8a) Thanks [@hauntedjpeg](https://github.com/hauntedjpeg)! - Fix package manager detection in monorepos and surface install errors
  - Use `@antfu/ni` for lock file detection, which walks up the directory tree to find lock files at the monorepo root
  - Add `npm_config_user_agent` fallback for cases like `pnpm dlx` where no lock file exists in the working directory
  - Replace `spawn` with `execa` so package manager errors are visible to the user instead of being swallowed

## 0.1.2

### Patch Changes

- [`3b5fc16`](https://github.com/hauntedjpeg/Stera-UI/commit/3b5fc163ac1854cedc27d063fd2924678ac44f60) Thanks [@hauntedjpeg](https://github.com/hauntedjpeg)! - Update registry and schema URLs from ui.stera.site to ui.stera.sh

## 0.1.1

### Patch Changes

- [`5a98702`](https://github.com/hauntedjpeg/Stera-UI/commit/5a987026adcbd8ca94afe99f47792aeccdec4a04) Thanks [@hauntedjpeg](https://github.com/hauntedjpeg)! - Fix CLI crash caused by duplicate shebang in dist/index.js. Split CLI entrypoint into separate dist/cli.js so the bin and library exports no longer conflict.
