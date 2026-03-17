import type { Meta, StoryObj } from "@storybook/react"
import { SiSearch } from "stera-icons"

import { Button } from "./button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group"
import { Kbd, KbdGroup } from "./kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

const meta: Meta<typeof Kbd> = {
  title: "UI/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Kbd>

export const Default: Story = {
  args: {
    children: "⌘K",
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Kbd size="sm">⌘K</Kbd>
      <Kbd size="md">⌘K</Kbd>
    </div>
  ),
}

export const KeyCombination: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>B</Kbd>
    </KbdGroup>
  ),
}

export const WithButton: Story = {
  render: () => (
    <Button>
      Accept <Kbd data-kbd="inline-end">⏎</Kbd>
    </Button>
  ),
}

export const WithTooltip: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger>Save</TooltipTrigger>
          <TooltipContent>
            Save <Kbd size="sm">⌘S</Kbd>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>Print</TooltipTrigger>
          <TooltipContent>
            Print <Kbd>⌘P</Kbd>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}

export const WithInputGroup: Story = {
  render: () => (
    <InputGroup className="w-sm">
      <InputGroupAddon align="inline-start">
        <SiSearch />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  ),
}
