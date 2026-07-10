---
"stera-ui": minor
---

Performance and modernization pass on the CLI:

- Registry items now resolve their dependency graph from the cached index and fetch all component files in parallel instead of one at a time.
- Registry responses are validated against the zod schemas, with a 15s network timeout and clear error messages.
- Commands load lazily, so `list` and `add` no longer pay the cost of loading the font tooling (ts-morph) used only by `init`.
- `--version` now reports the real package version.
- Missing components are reported all at once, and skipped files distinguish "unchanged" from "overwrite declined". Overwrite confirmation uses the same prompt UI as init.
- Async errors exit with a clean one-line message instead of an unhandled rejection stack trace.
- Node.js 20 is now the minimum supported version (Node 18 is end-of-life).
