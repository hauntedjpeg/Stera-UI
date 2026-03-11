import type { Meta, StoryObj } from "@storybook/react"
import { SiDownload, SiPlus } from "stera-icons"
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
  args: {
    children: "Button",
    variant: "brand",
    size: "md",
  },
}

export const Outline: Story = {
  args: {
    children: "Button",
    variant: "outline",
    size: "md",
  },
}

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "subtle",
    size: "md",
  },
}

export const Ghost: Story = {
  args: {
    children: "Button",
    variant: "ghost",
    size: "md",
  },
}

export const Destructive: Story = {
  args: {
    children: "Button",
    variant: "danger",
    size: "md",
  },
}

export const Link: Story = {
  args: {
    children: "Button",
    variant: "link",
    size: "md",
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <SiPlus data-icon="inline-start" />
        New item
      </>
    ),
    variant: "outline",
    size: "md",
  },
}

export const IconOnly: Story = {
  args: {
    children: <SiDownload />,
    variant: "outline",
    size: "icon",
    "aria-label": "Download",
  },
}

export const Disabled: Story = {
  args: {
    children: "Button",
    variant: "outline",
    size: "md",
    disabled: true,
  },
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
