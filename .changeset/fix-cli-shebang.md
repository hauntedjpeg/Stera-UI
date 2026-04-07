---
"stera-ui": patch
---

Fix CLI crash caused by duplicate shebang in dist/index.js. Split CLI entrypoint into separate dist/cli.js so the bin and library exports no longer conflict.
