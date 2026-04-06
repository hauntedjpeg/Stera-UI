import type { Meta, StoryObj } from "@storybook/react-vite"
import { SiTextBold, SiTextItalic, SiTextUnderline } from "stera-icons"

import { ToggleGroup, ToggleGroupItem } from "./toggle-group"

const meta: Meta<typeof ToggleGroup> = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
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
type Story = StoryObj<typeof ToggleGroup>

export const Default: Story = {
  render: () => (
    <ToggleGroup multiple>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <SiTextBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <SiTextItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <SiTextUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Outline: Story = {
  render: () => (
    <ToggleGroup variant="outline" multiple>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <SiTextBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <SiTextItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <SiTextUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup size="sm" multiple>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <SiTextBold />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <SiTextItalic />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <SiTextUnderline />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup size="md" multiple>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <SiTextBold />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <SiTextItalic />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <SiTextUnderline />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup size="lg" multiple>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <SiTextBold />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <SiTextItalic />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <SiTextUnderline />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
}

export const Spacing: Story = {
  render: () => (
    <ToggleGroup spacing={1} multiple>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <SiTextBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <SiTextItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <SiTextUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ToggleGroup orientation="vertical" multiple>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <SiTextBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <SiTextItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <SiTextUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <ToggleGroup multiple disabled>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <SiTextBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <SiTextItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <SiTextUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Custom: Story = {
  render: () => (
    <ToggleGroup variant="outline" spacing={1}>
      <ToggleGroupItem value="left" className="gap-1.5 px-3 text-sm font-medium">
        Light
      </ToggleGroupItem>
      <ToggleGroupItem value="center" className="gap-1.5 px-3 text-sm font-semibold">
        Regular
      </ToggleGroupItem>
      <ToggleGroupItem value="right" className="gap-1.5 px-3 text-sm font-bold">
        Bold
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}
