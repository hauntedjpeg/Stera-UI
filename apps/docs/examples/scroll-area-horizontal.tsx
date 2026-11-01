import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const swatches = Array.from({ length: 16 }, (_, i) => i + 1)

export default function ScrollAreaHorizontal() {
  return (
    <ScrollArea className="w-80 rounded-xl border border-border">
      <div className="flex gap-3 p-4">
        {swatches.map((swatch) => (
          <div
            key={swatch}
            className="flex size-24 shrink-0 items-center justify-center rounded-lg bg-surface-subtle st-body-sm text-ink-subtler"
          >
            {swatch}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
