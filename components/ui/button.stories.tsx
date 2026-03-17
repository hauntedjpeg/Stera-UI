import type { Meta, StoryObj } from "@storybook/react"
import { SiDownload, SiPlus } from "stera-icons"
import { Button } from "./button"
import { Kbd } from "./kbd"

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
        "md",
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

export const Brand: Story = {
  render: () => <Button variant="brand">Button</Button>,
}

export const Outline: Story = {
  render: () => <Button variant="outline">Button</Button>,
}

export const Secondary: Story = {
  render: () => <Button variant="subtle">Button</Button>,
}

export const Ghost: Story = {
  render: () => <Button variant="ghost">Button</Button>,
}

export const Destructive: Story = {
  render: () => <Button variant="danger">Button</Button>,
}

export const Link: Story = {
  render: () => <Button variant="link">Button</Button>,
}

export const WithIcon: Story = {
  render: () => (
    <Button variant="outline">
      <SiPlus data-icon="inline-start" />
      New item
    </Button>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <Button variant="outline" size="icon" aria-label="Download">
      <SiDownload />
    </Button>
  ),
}

export const WithKbd: Story = {
  render: () => (
    <Button variant="outline">
      Open command menu
      <Kbd data-kbd="inline-end">⌘K</Kbd>
    </Button>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Button variant="outline" disabled>
      Button
    </Button>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="brand">Brand</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="subtle">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      <Button size="xs"><SiPlus data-icon="inline-start" />Extra Small</Button>
      <Button size="sm"><SiPlus data-icon="inline-start" />Small</Button>
      <Button size="md"><SiPlus data-icon="inline-start" />Default</Button>
      <Button size="lg"><SiPlus data-icon="inline-start" />Large</Button>
      <Button size="icon-xs"><SiPlus data-icon="inline-start" /></Button>
      <Button size="icon-sm"><SiPlus data-icon="inline-start" /></Button>
      <Button size="icon"><SiPlus data-icon="inline-start" /></Button>
      <Button size="icon-lg"><SiPlus data-icon="inline-start" /></Button>
    </div>
  ),
}
