---
"stera-ui": patch
---

Next.js font setup now passes `fallback` and `adjustFontFallback` from the registry to `next/font`. Fonts `next/font` has no size data for, like Zalando Sans, get a `sans-serif` fallback instead of a build warning and a flash of serif text. Layouts `init` already set up are not rewritten. Add `fallback: ["sans-serif"]` and `adjustFontFallback: false` to the Zalando Sans calls yourself.
