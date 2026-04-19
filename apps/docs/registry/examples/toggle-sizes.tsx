import { SiTextBold } from "stera-icons"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle size="sm" aria-label="Toggle bold">
        <SiTextBold />
      </Toggle>
      <Toggle size="md" aria-label="Toggle bold">
        <SiTextBold />
      </Toggle>
      <Toggle size="lg" aria-label="Toggle bold">
        <SiTextBold />
      </Toggle>
    </div>
  )
}
