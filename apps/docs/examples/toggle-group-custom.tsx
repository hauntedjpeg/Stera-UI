import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function ToggleGroupCustom() {
  return (
    <ToggleGroup variant="outline" spacing={1}>
      <ToggleGroupItem value="light" className="gap-1.5 px-3 text-sm font-medium">
        Light
      </ToggleGroupItem>
      <ToggleGroupItem value="regular" className="gap-1.5 px-3 text-sm font-semibold">
        Regular
      </ToggleGroupItem>
      <ToggleGroupItem value="bold" className="gap-1.5 px-3 text-sm font-bold">
        Bold
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
