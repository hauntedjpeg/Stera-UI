import { SiBrightnessHigh, SiMonitor, SiMoonCrescent } from "stera-icons"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const defaultValue = ["system"]

export default function ToggleGroupDisabled() {
  return (
    <ToggleGroup
      size="icon"
      defaultValue={defaultValue}
      disabled
      aria-label="Theme"
    >
      <ToggleGroupItem value="system" aria-label="System">
        <SiMonitor />
      </ToggleGroupItem>
      <ToggleGroupItem value="light" aria-label="Light">
        <SiBrightnessHigh />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark">
        <SiMoonCrescent />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
