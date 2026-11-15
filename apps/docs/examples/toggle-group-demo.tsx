"use client"

import * as React from "react"
import { SiBrightnessHigh, SiMonitor, SiMoonCrescent } from "stera-icons"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function ToggleGroupDemo() {
  const [value, setValue] = React.useState(["system"])

  return (
    <ToggleGroup
      size="icon"
      value={value}
      // Keep one theme active: ignore a press that would clear it
      onValueChange={(next) => next.length > 0 && setValue(next)}
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
