---
"stera-ui": patch
---

Fix package manager detection in monorepos and surface install errors

- Use `@antfu/ni` for lock file detection, which walks up the directory tree to find lock files at the monorepo root
- Add `npm_config_user_agent` fallback for cases like `pnpm dlx` where no lock file exists in the working directory
- Replace `spawn` with `execa` so package manager errors are visible to the user instead of being swallowed
