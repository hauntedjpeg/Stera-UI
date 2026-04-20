import { SiTextBold } from "stera-icons"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bold">
      <SiTextBold />
    </Toggle>
  )
}
