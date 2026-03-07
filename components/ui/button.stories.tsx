import type { Meta, StoryObj } from "@storybook/react"
import { Download, Plus } from "lucide-react"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
    },
  },
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
}

export const Outline: Story = {
  args: {
    children: "Button",
    variant: "outline",
    size: "default",
  },
}

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
    size: "default",
  },
}

export const Ghost: Story = {
  args: {
    children: "Button",
    variant: "ghost",
    size: "default",
  },
}

export const Destructive: Story = {
  args: {
    children: "Button",
    variant: "destructive",
    size: "default",
  },
}

export const Link: Story = {
  args: {
    children: "Button",
    variant: "link",
    size: "default",
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Plus />
        New item
      </>
    ),
    variant: "default",
    size: "default",
  },
}

export const IconOnly: Story = {
  args: {
    children: <Download />,
    variant: "outline",
    size: "icon",
    "aria-label": "Download",
  },
}

export const Disabled: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}
