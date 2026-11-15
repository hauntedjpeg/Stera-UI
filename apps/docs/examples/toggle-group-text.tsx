"use client"

import * as React from "react"
import { SiGrid, SiList } from "stera-icons"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function ToggleGroupText() {
  const [range, setRange] = React.useState(["week"])
  const [layout, setLayout] = React.useState(["grid"])

  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup
        value={range}
        onValueChange={(next) => next.length > 0 && setRange(next)}
        aria-label="Range"
      >
        <ToggleGroupItem value="day">Day</ToggleGroupItem>
        <ToggleGroupItem value="week">Week</ToggleGroupItem>
        <ToggleGroupItem value="month">Month</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        value={layout}
        onValueChange={(next) => next.length > 0 && setLayout(next)}
        aria-label="Layout"
      >
        <ToggleGroupItem value="grid">
          <SiGrid data-icon="inline-start" />
          Grid
        </ToggleGroupItem>
        <ToggleGroupItem value="list">
          <SiList data-icon="inline-start" />
          List
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
