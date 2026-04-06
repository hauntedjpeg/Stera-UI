import type { Meta, StoryObj } from "@storybook/react-vite"
import { SiTextBold, SiTextItalic, SiTextUnderline } from "stera-icons"

import { Toggle } from "./toggle"

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
  },
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic">
      <SiTextBold />
    </Toggle>
  ),
}

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle italic">
      <SiTextBold />
    </Toggle>
  ),
}

export const WithText: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic">
      <SiTextItalic />
      Italic
    </Toggle>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle size="sm" aria-label="Toggle italic">
        <SiTextBold />
      </Toggle>
      <Toggle size="md" aria-label="Toggle italic">
        <SiTextBold />
      </Toggle>
      <Toggle size="lg" aria-label="Toggle italic">
        <SiTextBold />
      </Toggle>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Toggle disabled aria-label="Toggle italic">
      <SiTextUnderline />
    </Toggle>
  ),
}
