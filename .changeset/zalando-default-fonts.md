---
"stera-ui": minor
---

Default fonts are now Zalando Sans SemiExpanded (headings), Zalando Sans (body) and Geist Mono.

- Font variables are named after the family (`--font-zalando-sans`), matching what `ui/typography.css` references, so `--font-heading` no longer points at an undefined variable after `init`.
- On Next.js, `init` no longer rewrites `ui/typography.css` to a self-referencing `--font-sans: var(--font-sans)`, which broke fonts when the `next/font` stylesheet loaded first.
