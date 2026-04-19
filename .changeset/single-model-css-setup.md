---
"stera-ui": minor
---

Unified CSS handling in the CLI around a single ownership model: the CLI writes CSS exactly once, at `init`, and hands it over to you.

**What changed**

- `stera-ui init` now always writes two files, regardless of whether you had an existing globals.css:
  - `stera-ui.css` — design tokens and typography utilities, written next to your globals.css. Yours to customize.
  - `globals.css` — either your existing file (touched once to add the `@import "./stera-ui.css";` line and any peer imports like `tw-animate-css`), or a minimal new file if you had none.
- `stera-ui add <component>` never touches any CSS file. No warnings, no merges. Your customizations to `stera-ui.css` are preserved across component adds.
- `stera-ui add globals` is now an explicit "refresh" command: it overwrites `stera-ui.css` with the latest registry content and does not prompt (use `git diff` to review). It does not touch `globals.css`.
- `stera-ui add globals <other>` is rejected — run them separately.

**Why**

The previous flow had two init branches and a runtime warning in `add` when tokens were missing. Under the new model, `init` is the one and only moment the CLI writes CSS; from then on the file is yours. This makes customization safe and the mental model uniform.

**Upgrade notes**

- Existing projects with `components.json` are unaffected — `init` still short-circuits when already initialized.
- Projects that were initialized under the old "no existing globals.css" branch have tokens inline in `globals.css` with no separate `stera-ui.css`. If you want to adopt the new layout, run `stera-ui add globals` to generate `stera-ui.css`, then move/remove the inline tokens from `globals.css` and add `@import "./stera-ui.css";`.
