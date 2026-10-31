import type { FontStrategy, NextFontConvention } from "../../shared/messages.js"
import type { FontAssignment } from "../../core/fonts/strategy.js"

type Props = {
  strategy: FontStrategy
  nextConvention: NextFontConvention
  onStrategyChange: (s: FontStrategy) => void
  onConventionChange: (c: NextFontConvention) => void
  fontAssignments: FontAssignment[]
}

const STRATEGIES: { id: FontStrategy; label: string; blurb: string }[] = [
  {
    id: "next-font",
    label: "Next.js (next/font)",
    blurb:
      "Emits var() references. Works with next/font/google and the geist package.",
  },
  {
    id: "fontsource-variable",
    label: "@fontsource-variable",
    blurb:
      "Vite, Remix, and other React setups. Adds @import for the font package.",
  },
  {
    id: "raw",
    label: "Raw family name",
    blurb: "Self-hosted. Emits the literal family name with a fallback stack.",
  },
]

export function FontStrategyView({
  strategy,
  nextConvention,
  onStrategyChange,
  onConventionChange,
  fontAssignments,
}: Props) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <section>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Strategy
        </div>
        <div className="flex flex-col gap-2">
          {STRATEGIES.map((s) => (
            <label
              key={s.id}
              className={`flex cursor-pointer items-start gap-3 rounded border px-3 py-2 ${
                strategy === s.id
                  ? "border-[var(--color-brand)] bg-[color-mix(in_srgb,var(--color-brand)_6%,transparent)]"
                  : "border-[var(--color-border)]"
              }`}
            >
              <input
                type="radio"
                name="strategy"
                checked={strategy === s.id}
                onChange={() => onStrategyChange(s.id)}
                className="mt-0.5"
              />
              <div>
                <div className="font-medium">{s.label}</div>
                <div className="text-[10px] text-[var(--color-text-secondary)]">
                  {s.blurb}
                </div>
              </div>
            </label>
          ))}
        </div>
      </section>

      {strategy === "next-font" && (
        <section>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
            Variable naming
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex cursor-pointer items-start gap-3 rounded border border-[var(--color-border)] px-3 py-2">
              <input
                type="radio"
                name="convention"
                checked={nextConvention === "family-named"}
                onChange={() => onConventionChange("family-named")}
                className="mt-0.5"
              />
              <div>
                <div className="font-medium">Family-named (recommended)</div>
                <div className="text-[10px] text-[var(--color-text-secondary)]">
                  <code>--font-sans: var(--font-geist-sans)</code>. Set{" "}
                  <code>
                    Geist(&#123; variable: '--font-geist-sans' &#125;)
                  </code>{" "}
                  in layout.tsx.
                </div>
              </div>
            </label>
            <label className="flex cursor-pointer items-start gap-3 rounded border border-[var(--color-border)] px-3 py-2">
              <input
                type="radio"
                name="convention"
                checked={nextConvention === "match-init"}
                onChange={() => onConventionChange("match-init")}
                className="mt-0.5"
              />
              <div>
                <div className="font-medium">Match stera-ui init</div>
                <div className="text-[10px] text-[var(--color-text-secondary)]">
                  <code>--font-sans: var(--font-sans)</code>. Drop-in for
                  projects that ran <code>stera-ui init</code>.
                </div>
              </div>
            </label>
          </div>
        </section>
      )}

      <section>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Font assignments
        </div>
        <div className="rounded border border-[var(--color-border)]">
          {fontAssignments.length === 0 && (
            <div className="px-3 py-2 text-[var(--color-text-secondary)]">
              No font variables detected in Figma.
            </div>
          )}
          {fontAssignments.map((a, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-2 last:border-b-0"
            >
              <code className="text-[10px]">{a.role}</code>
              <div>
                {a.family || <span className="opacity-50">(empty)</span>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
