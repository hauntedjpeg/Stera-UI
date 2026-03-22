import type { Meta, StoryObj } from "@storybook/react"
import { SiHash, SiX } from "stera-icons"

import { Chip } from "./chip"

const meta: Meta<typeof Chip> = {
  title: "UI/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["subtle", "outline", "solid"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    active: {
      control: "boolean",
    },
  },
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = {
  args: {
    children: "Chip",
    variant: "subtle",
    size: "xs",
  },
}

export const Outline: Story = {
  args: {
    children: "Chip",
    variant: "outline",
    size: "xs",
  },
}

export const Solid: Story = {
  args: {
    children: "Chip",
    variant: "solid",
    size: "xs",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Chip variant="subtle">Subtle</Chip>
      <Chip variant="outline">Outline</Chip>
      <Chip variant="solid">Solid</Chip>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Chip size="xs">Extra Small</Chip>
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Chip variant="subtle" size="sm">
        <SiHash data-icon="inline-start" />
        Tag
      </Chip>
      <Chip variant="outline" size="sm">
        <SiHash data-icon="inline-start" />
        Tag
      </Chip>
      <Chip variant="solid" size="sm">
        <SiHash data-icon="inline-start" />
        Tag
      </Chip>
      <Chip variant="subtle" size="sm">
        Label
        <SiX data-icon="inline-end" />
      </Chip>
      <Chip variant="outline" size="sm">
        Label
        <SiX data-icon="inline-end" />
      </Chip>
      <Chip variant="solid" size="sm">
        Label
        <SiX data-icon="inline-end" />
      </Chip>
    </div>
  ),
}

export const Dismissible: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Chip variant="subtle" size="xs">
        Tag
        <SiX data-icon="inline-end" />
      </Chip>
      <Chip variant="outline" size="sm">
        Filter
        <SiX data-icon="inline-end" />
      </Chip>
      <Chip variant="solid" size="md">
        Category
        <SiX data-icon="inline-end" />
      </Chip>
    </div>
  ),
}

export const ActiveState: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Chip variant="subtle">Default</Chip>
        <Chip variant="subtle" active>Active</Chip>
      </div>
      <div className="flex items-center gap-2">
        <Chip variant="outline">Default</Chip>
        <Chip variant="outline" active>Active</Chip>
      </div>
      <div className="flex items-center gap-2">
        <Chip variant="solid">Default</Chip>
        <Chip variant="solid" active>Active</Chip>
      </div>
    </div>
  ),
}
