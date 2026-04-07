import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import { Kbd } from "./kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>
        Hover
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const Sides: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Top
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Top tooltip</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Right
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Right tooltip</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Bottom
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Bottom tooltip</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Left
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Left tooltip</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

export const WithKeyboardShortcut: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>
        Open
      </TooltipTrigger>
      <TooltipContent>
        Open dialog <Kbd size="sm">⌘K</Kbd>
      </TooltipContent>
    </Tooltip>
  ),
}

export const DisabledButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<span tabIndex={0} />}>
        <Button variant="outline" disabled>
          Disabled button
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>You don&apos;t have permission to do this</p>
      </TooltipContent>
    </Tooltip>
  ),
}
