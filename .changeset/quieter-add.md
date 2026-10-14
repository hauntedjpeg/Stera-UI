---
"stera-ui": minor
---

`add` no longer asks about components you didn't name. Dependencies that already exist in your project are kept as they are and listed as `(kept)`; only a component you asked for by name prompts before being replaced. `--overwrite` still replaces everything.

- **`--yes` now works.** It was accepted but ignored; it now means "never prompt, keep existing files that differ" for both `add` and `init`.
- **One status line at a time.** `Resolving` and `Downloading N components` replace each other in place and clear when done, instead of leaving a `Registry resolved` line behind. The spinner no longer animates over a prompt, hides the cursor while running, and writes to stderr so piped output stays clean.
- **Flush-left output.** Status lines are no longer indented, so they line up with prompts.
- **Faster `pnpm dlx` / `npx`.** The CLI now ships as a single self-contained package with no runtime dependencies, so there is one package to fetch instead of 75.
