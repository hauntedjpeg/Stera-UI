import { SiTextBold, SiTextItalic, SiTextUnderline } from "stera-icons"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function ToggleGroupSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup size="sm" multiple>
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
      <ToggleGroup size="md" multiple>
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
      <ToggleGroup size="lg" multiple>
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
    </div>
  )
}
