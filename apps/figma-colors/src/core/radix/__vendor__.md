# Vendored: generateRadixColors

`generate-radix-colors.ts` is copied verbatim (apart from the file name and the attribution header at the top of the file) from the radix-ui/website repo.

- Source: https://github.com/radix-ui/website/blob/main/components/generateRadixColors.tsx
- License: MIT (Radix UI authors)
- The file is pure TypeScript (no JSX) despite the `.tsx` extension upstream.

The file is excluded from Prettier (`.prettierignore`) and ESLint (`eslint.config.mjs`) so it stays byte-identical to upstream and diffs cleanly when re-vendored.

## Re-vendoring

To pull a fresher version:

1. Replace `generate-radix-colors.ts` with the upstream file.
2. Re-add the attribution header at the top of the file.
3. Run `pnpm typecheck` and `pnpm test`, and compare a few scales against radix-ui.com/colors/custom.

Do not modify the algorithm in this file. All Stera-specific behavior lives in `../scale/bi-modal.ts`.
