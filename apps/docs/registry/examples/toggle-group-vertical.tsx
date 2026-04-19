import { SiTextBold, SiTextItalic, SiTextUnderline } from "stera-icons"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function ToggleGroupVertical() {
  return (
    <ToggleGroup orientation="vertical" multiple>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <SiTextBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <SiTextItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <SiTextUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
