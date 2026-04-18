---
"stera-ui": patch
---

Show a loading spinner while the CLI fetches from the registry

- `stera-ui add`, `stera-ui list`, and `stera-ui init` now display the existing `• ✦ ✶ ✻` spinner during registry network calls, closing the 0.5–2s silent window where users couldn't tell if the command was running
- Network failures transition the spinner to `✗ Failed to fetch registry` instead of leaking an in-progress animation
- Moved the globals-CSS warning in `add` to after the spinner resolves so it no longer corrupts the single-line render
