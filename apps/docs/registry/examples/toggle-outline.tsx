import { SiTextBold } from "stera-icons"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Toggle bold">
      <SiTextBold />
    </Toggle>
  )
}
