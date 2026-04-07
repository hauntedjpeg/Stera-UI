import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "./label"
import { Slider } from "./slider"

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => (
    <Slider defaultValue={[75]} max={100} step={1} className="w-80" />
  ),
}

export const Range: Story = {
  render: () => (
    <Slider defaultValue={[25, 50]} max={100} step={5} className="w-80" />
  ),
}

export const Multiple: Story = {
  render: () => (
    <Slider defaultValue={[10, 20, 70]} max={100} step={10} className="w-80" />
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-6">
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        orientation="vertical"
        className="h-40"
      />
      <Slider
        defaultValue={[25]}
        max={100}
        step={1}
        orientation="vertical"
        className="h-40"
      />
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([0.3, 0.7])
    return (
      <div className="grid w-80 gap-3">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="slider-temperature">Temperature</Label>
          <span className="text-text-secondary text-sm">
            {value.join(", ")}
          </span>
        </div>
        <Slider
          id="slider-temperature"
          value={value}
          onValueChange={(value) => setValue(value as number[])}
          min={0}
          max={1}
          step={0.1}
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <Slider defaultValue={[50]} max={100} step={1} disabled className="w-80" />
  ),
}
