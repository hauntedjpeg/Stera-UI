import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function ToggleGroupCustom() {
  return (
    <ToggleGroup spacing={1}>
      <ToggleGroupItem value="light" className="font-light">
        Light
      </ToggleGroupItem>
      <ToggleGroupItem value="regular" className="font-normal">
        Regular
      </ToggleGroupItem>
      <ToggleGroupItem value="bold" className="font-bold">
        Bold
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
