---
"stera-ui": minor
---

Rename **Notice** to **Toast**.

- **Renamed** — the component is now `toast`, matching the Base UI primitive it wraps and the name the design system uses. Install it with `stera-ui add toast`; `notice` is no longer in the registry. Every export follows the rename (`Notice` → `Toast`, `NoticeViewport` → `ToastViewport`, `noticeManager` → `toastManager`, `createNoticeManager` → `createToastManager`, `useNoticeManager` → `useToastManager`, …), as do the `data-slot` values (`notice-*` → `toast-*`). A `notice.tsx` you already installed is your own copy and keeps working.
- **Naming follows Base UI** — the manager exports now read the same as Base UI's own: `createToastManager()`, `toastManager`, `useToastManager()`. The `toastManager` prop is unchanged.
- **Fixed** — the registry item never declared `button` as a dependency, so installing it on its own left an unresolved `@/components/ui/button` import. `stera-ui add toast` now pulls Button in.
