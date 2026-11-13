import { SiTextBold } from "stera-icons"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleGhost() {
  return (
    <Toggle variant="ghost" size="icon" aria-label="Toggle bold">
      <SiTextBold />
    </Toggle>
  )
}
