"use client"

import { Slider } from "@/components/ui/slider"

export default function SliderRange() {
  return (
    <Slider
      defaultValue={[25, 75]}
      step={5}
      getAriaLabel={(index) =>
        index === 0 ? "Minimum price" : "Maximum price"
      }
      className="w-80"
    />
  )
}
