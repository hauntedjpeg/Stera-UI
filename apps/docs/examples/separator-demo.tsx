import { Separator } from "@/components/ui/separator"

export default function SeparatorDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <div className="st-label-md-medium">Stera UI</div>
        <div className="st-label-md text-ink-subtler">
          The foundation for your design system
        </div>
      </div>
      <Separator />
      <div className="st-body-md">
        Components you copy into your project and own from then on. Change them,
        extend them, build on them.
      </div>
    </div>
  )
}
