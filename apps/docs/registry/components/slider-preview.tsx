"use client"

import { Slider } from "@/components/ui/slider"
import { Preview } from "@/components/preview"

export function SliderDefault() {
  return (
    <Preview>
      <Slider defaultValue={[75]} max={100} step={1} className="w-80" />
    </Preview>
  )
}

export function SliderRange() {
  return (
    <Preview>
      <Slider defaultValue={[25, 75]} max={100} step={5} className="w-80" />
    </Preview>
  )
}

export function SliderVertical() {
  return (
    <Preview>
      <div className="flex items-center justify-center gap-6">
        <Slider defaultValue={[50]} max={100} step={1} orientation="vertical" className="h-40" />
        <Slider defaultValue={[25]} max={100} step={1} orientation="vertical" className="h-40" />
      </div>
    </Preview>
  )
}

export function SliderDisabled() {
  return (
    <Preview>
      <Slider defaultValue={[50]} max={100} step={1} disabled className="w-80" />
    </Preview>
  )
}
