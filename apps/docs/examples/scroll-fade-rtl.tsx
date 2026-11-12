const swatches = Array.from({ length: 16 }, (_, i) => i + 1)

export default function ScrollFadeRtl() {
  return (
    <div dir="rtl" className="w-80 rounded-xl border border-border">
      <div className="flex scroll-fade-x scrollbar-hide gap-3 overflow-x-auto p-4">
        {swatches.map((swatch) => (
          <div
            key={swatch}
            className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-surface-muted st-body-sm text-ink-subtler"
          >
            {swatch}
          </div>
        ))}
      </div>
    </div>
  )
}
