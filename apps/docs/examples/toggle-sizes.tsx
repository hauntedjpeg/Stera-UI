import { SiTextBold } from "stera-icons"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle size="icon-xs" aria-label="Toggle bold">
        <SiTextBold />
      </Toggle>
      <Toggle size="icon-sm" aria-label="Toggle bold">
        <SiTextBold />
      </Toggle>
      <Toggle size="icon" aria-label="Toggle bold">
        <SiTextBold />
      </Toggle>
      <Toggle size="icon-lg" aria-label="Toggle bold">
        <SiTextBold />
      </Toggle>
    </div>
  )
}
