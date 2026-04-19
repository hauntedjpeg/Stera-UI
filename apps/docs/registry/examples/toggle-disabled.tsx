import { SiTextUnderline } from "stera-icons"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleDisabled() {
  return (
    <Toggle disabled aria-label="Toggle underline">
      <SiTextUnderline />
    </Toggle>
  )
}
