import { SiTextItalic } from "stera-icons"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle italic">
      <SiTextItalic />
      Italic
    </Toggle>
  )
}
