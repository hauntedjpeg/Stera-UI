"use client"

import * as React from "react"
import {
  SiTextAlignCenter,
  SiTextAlignLeft,
  SiTextAlignRight,
} from "stera-icons"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function ToggleGroupVertical() {
  const [value, setValue] = React.useState(["left"])

  return (
    <ToggleGroup
      size="icon"
      orientation="vertical"
      value={value}
      onValueChange={(next) => next.length > 0 && setValue(next)}
      aria-label="Text alignment"
    >
      <ToggleGroupItem value="left" aria-label="Align left">
        <SiTextAlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <SiTextAlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <SiTextAlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
