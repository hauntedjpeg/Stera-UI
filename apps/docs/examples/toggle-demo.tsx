import { SiTextBold } from "stera-icons"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleDemo() {
  return (
    <Toggle size="icon" aria-label="Toggle bold">
      <SiTextBold />
    </Toggle>
  )
}
