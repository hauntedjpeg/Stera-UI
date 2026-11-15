"use client"

import * as React from "react"
import { SiBrightnessHigh, SiMonitor, SiMoonCrescent } from "stera-icons"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const sizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const

function ThemeToggleGroup({ size }: { size: (typeof sizes)[number] }) {
  const [value, setValue] = React.useState(["system"])

  return (
    <ToggleGroup
      size={size}
      value={value}
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

export default function ToggleGroupSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      {sizes.map((size) => (
        <ThemeToggleGroup key={size} size={size} />
      ))}
    </div>
  )
}
