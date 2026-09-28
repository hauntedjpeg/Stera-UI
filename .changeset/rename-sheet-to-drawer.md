---
"stera-ui": minor
---

Rename **Sheet** to **Drawer** and move the gutter into a padded container.

- **Renamed** — the component is now `drawer`, matching the Base UI primitive it wraps. Install it with `stera-ui add drawer`; `sheet` is no longer in the registry. Every export follows the rename (`Sheet` → `Drawer`, `SheetPopup` → `DrawerPopup`, `createSheetHandle` → `createDrawerHandle`, …), as do the `data-slot` values (`sheet-*` → `drawer-*`). A `sheet.tsx` you already installed is your own copy and keeps working.
- **New structure** — `DrawerPopup` now renders an invisible container that sits flush against the screen edge, with the visible panel inside it. The container carries the gutter (`p-2`) and is what slides, so the drawer fully leaves the screen on close and the gutter can be changed in one place without touching the animation. `className` styles the panel.
- **Sizing** — default sizes are plain classes, so a consumer `w-*` or `max-h-*` now reliably overrides them. Side drawers should use a fixed or viewport-based width rather than a percentage.
- **Sidebar** — the mobile sidebar now depends on `drawer` and opens at its intended width.
