---
"stera-ui": patch
---

Prevent duplicate `@import` declarations when initializing in a project with an existing CSS file

- `stera-ui.css` no longer contains `@import` lines; required imports (e.g. `tw-animate-css`) are added to the user's main CSS instead
- `insertImportLine` now skips imports that already exist, preventing duplicates across init and font setup
