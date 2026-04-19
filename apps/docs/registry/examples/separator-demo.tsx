import { Separator } from "@/components/ui/separator"

export default function SeparatorDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-4 st-body-md-compact">
      <div className="flex flex-col gap-1.5">
        <div className="st-body-md-strong">Stera UI</div>
        <div className="text-text-secondary">The Foundation for your Design System</div>
      </div>
      <Separator />
      <div>A set of beautifully designed components that you can customize, extend, and build on.</div>
    </div>
  )
}
