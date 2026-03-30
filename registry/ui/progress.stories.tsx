import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "./progress"

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  render: () => <Progress value={33} className="w-80" />,
}

export const Label: Story = {
  render: () => (
    <Progress value={66} className="w-80">
      <ProgressLabel>Uploading...</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(0)

    useEffect(() => {
      const timer = setTimeout(() => setValue(66), 500)
      return () => clearTimeout(timer)
    }, [])

    return <Progress value={value} className="w-80" />
  },
}
