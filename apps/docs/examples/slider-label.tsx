"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function SliderLabel() {
  const [opacity, setOpacity] = React.useState(60)

  return (
    <div className="flex w-80 flex-col gap-3">
      <div className="flex items-center justify-between">
        <Label id="slider-label-opacity">Opacity</Label>
        <span className="st-label-md text-ink-subtle tabular-nums">
          {opacity}%
        </span>
      </div>
      <Slider
        value={opacity}
        onValueChange={setOpacity}
        aria-labelledby="slider-label-opacity"
      />
    </div>
  )
}
