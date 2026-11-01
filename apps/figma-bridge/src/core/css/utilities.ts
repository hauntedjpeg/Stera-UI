/**
 * Fallback typography utilities, used only when the Figma file exposes no local
 * text styles (e.g. they live in a published library). Normally these blocks are
 * generated from the text styles themselves — see `text-styles.ts`. A copy of
 * the utilities in the registry's `ui/typography.css`; keep the two in sync.
 */
export const STERA_UTILITIES = `@utility st-body-sm {
  font-family: var(--font-sans);
  font-size: var(--font-size-body-sm);
  line-height: var(--line-height-snug);
  font-weight: var(--font-weight-regular);
  letter-spacing: var(--tracking-wide);
}

@utility st-body-sm-strong {
  font-family: var(--font-sans);
  font-size: var(--font-size-body-sm);
  line-height: var(--line-height-snug);
  font-weight: var(--font-weight-strong);
  letter-spacing: var(--tracking-wide);
}

@utility st-body-md {
  font-family: var(--font-sans);
  font-size: var(--font-size-body-md);
  line-height: var(--line-height-normal);
  font-weight: var(--font-weight-regular);
  letter-spacing: var(--tracking-normal);
}

@utility st-body-md-compact {
  font-family: var(--font-sans);
  font-size: var(--font-size-body-md);
  line-height: var(--line-height-snug);
  font-weight: var(--font-weight-regular);
  letter-spacing: var(--tracking-normal);
}

@utility st-body-md-strong {
  font-family: var(--font-sans);
  font-size: var(--font-size-body-md);
  line-height: var(--line-height-snug);
  font-weight: var(--font-weight-strong);
  letter-spacing: var(--tracking-normal);
}

@utility st-body-lg {
  font-family: var(--font-sans);
  font-size: var(--font-size-body-lg);
  line-height: var(--line-height-relaxed);
  font-weight: var(--font-weight-regular);
  letter-spacing: var(--tracking-normal);
}

@utility st-body-lg-strong {
  font-family: var(--font-sans);
  font-size: var(--font-size-body-lg);
  line-height: var(--line-height-relaxed);
  font-weight: var(--font-weight-strong);
  letter-spacing: var(--tracking-normal);
}

@utility st-heading-sm {
  font-family: var(--font-sans);
  font-size: var(--font-size-heading-sm);
  line-height: var(--line-height-28);
  font-weight: var(--font-weight-strong);
  letter-spacing: var(--tracking-tight);
}

@utility st-heading-md {
  font-family: var(--font-sans);
  font-size: var(--font-size-heading-md);
  line-height: var(--line-height-32);
  font-weight: var(--font-weight-strong);
  letter-spacing: var(--tracking-tight);
}

@utility st-heading-lg {
  font-family: var(--font-sans);
  font-size: var(--font-size-heading-lg);
  line-height: var(--line-height-40);
  font-weight: var(--font-weight-strong);
  letter-spacing: var(--tracking-tight);
}

@utility st-display-sm {
  font-family: var(--font-heading);
  font-size: var(--font-size-display-sm);
  line-height: var(--line-height-40);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-tighter);
}

@utility st-display-md {
  font-family: var(--font-heading);
  font-size: var(--font-size-display-md);
  line-height: var(--line-height-48);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-tighter);
}

@utility st-display-lg {
  font-family: var(--font-heading);
  font-size: var(--font-size-display-lg);
  line-height: var(--line-height-56);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-tighter);
}

@utility st-hero-sm {
  font-family: var(--font-heading);
  font-size: var(--font-size-hero-sm);
  line-height: var(--line-height-72);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-tighter);
}

@utility st-hero-md {
  font-family: var(--font-heading);
  font-size: var(--font-size-hero-md);
  line-height: var(--line-height-80);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-tighter);
}

@utility st-hero-lg {
  font-family: var(--font-heading);
  font-size: var(--font-size-hero-lg);
  line-height: var(--line-height-104);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-tighter);
}

@utility st-hero-xl {
  font-family: var(--font-heading);
  font-size: var(--font-size-hero-xl);
  line-height: var(--line-height-120);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-tighter);
}

@utility st-mono-sm {
  font-family: var(--font-mono);
  font-size: var(--font-size-body-sm);
  line-height: var(--line-height-snug);
  font-weight: var(--font-weight-regular);
  letter-spacing: var(--tracking-wide);
}

@utility st-mono-md {
  font-family: var(--font-mono);
  font-size: var(--font-size-body-md);
  line-height: var(--line-height-snug);
  font-weight: var(--font-weight-regular);
  letter-spacing: var(--tracking-normal);
}

@utility st-mono-lg {
  font-family: var(--font-mono);
  font-size: var(--font-size-body-lg);
  line-height: var(--line-height-relaxed);
  font-weight: var(--font-weight-regular);
  letter-spacing: var(--tracking-normal);
}`
