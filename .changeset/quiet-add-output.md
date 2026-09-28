---
"stera-ui": patch
---

Quieter `add` output. The "Installing components" and "npm packages" preview lists are gone — `add` now prints the registry status followed by one line per file. When packages are installed, the install line names them (`Installed clsx, tailwind-merge with pnpm`), which also applies to `init`.
