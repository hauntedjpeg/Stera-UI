---
"stera-ui": minor
---

Rename the CLI config file from `components.json` to `stera.config.json`.

`stera-ui init` now writes `stera.config.json`. Existing projects don't need to do anything — the CLI still reads `components.json` and prints a one-time deprecation warning telling you to rename. Running `stera-ui init` in a project that has the legacy filename will offer an inline rename. Legacy filename support will be removed in a future release.

The hosted JSON schema URL (`https://ui.stera.sh/schema.json`) is unchanged.
