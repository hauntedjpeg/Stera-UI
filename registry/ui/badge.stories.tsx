import type { Meta, StoryObj } from "@storybook/react-vite"
import { SiCircleFill } from "stera-icons"

import { Badge } from "./badge"

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "solid",
        "brand",
        "brand-outline",
        "brand-solid",
        "accent",
        "accent-outline",
        "accent-solid",
        "danger",
        "danger-outline",
        "danger-solid",
        "success",
        "success-outline",
        "success-solid",
        "warning",
        "warning-outline",
        "warning-solid",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
    size: "sm",
  },
}

export const SubtleOutline: Story = {
  args: {
    children: "Badge",
    variant: "outline",
    size: "sm",
  },
}

export const SubtleSolid: Story = {
  args: {
    children: "Badge",
    variant: "solid",
    size: "sm",
  },
}

export const Brand: Story = {
  args: {
    children: "Badge",
    variant: "brand",
    size: "sm",
  },
}

export const BrandOutline: Story = {
  args: {
    children: "Badge",
    variant: "brand-outline",
    size: "sm",
  },
}

export const BrandSolid: Story = {
  args: {
    children: "Badge",
    variant: "brand-solid",
    size: "sm",
  },
}

export const Accent: Story = {
  args: {
    children: "Badge",
    variant: "accent",
    size: "sm",
  },
}

export const AccentOutline: Story = {
  args: {
    children: "Badge",
    variant: "accent-outline",
    size: "sm",
  },
}

export const AccentSolid: Story = {
  args: {
    children: "Badge",
    variant: "accent-solid",
    size: "sm",
  },
}

export const Danger: Story = {
  args: {
    children: "Badge",
    variant: "danger",
    size: "sm",
  },
}

export const DangerOutline: Story = {
  args: {
    children: "Badge",
    variant: "danger-outline",
    size: "sm",
  },
}

export const DangerSolid: Story = {
  args: {
    children: "Badge",
    variant: "danger-solid",
    size: "sm",
  },
}

export const Success: Story = {
  args: {
    children: "Badge",
    variant: "success",
    size: "sm",
  },
}

export const SuccessOutline: Story = {
  args: {
    children: "Badge",
    variant: "success-outline",
    size: "sm",
  },
}

export const SuccessSolid: Story = {
  args: {
    children: "Badge",
    variant: "success-solid",
    size: "sm",
  },
}

export const Warning: Story = {
  args: {
    children: "Badge",
    variant: "warning",
    size: "sm",
  },
}

export const WarningOutline: Story = {
  args: {
    children: "Badge",
    variant: "warning-outline",
    size: "sm",
  },
}

export const WarningSolid: Story = {
  args: {
    children: "Badge",
    variant: "warning-solid",
    size: "sm",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">Subtle</Badge>
      <Badge variant="outline">Subtle Outline</Badge>
      <Badge variant="solid">Subtle Solid</Badge>
      <Badge variant="brand">Brand</Badge>
      <Badge variant="brand-outline">Brand Outline</Badge>
      <Badge variant="brand-solid">Brand Solid</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="accent-outline">Accent Outline</Badge>
      <Badge variant="accent-solid">Accent Solid</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="danger-outline">Danger Outline</Badge>
      <Badge variant="danger-solid">Danger Solid</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="success-outline">Success Outline</Badge>
      <Badge variant="success-solid">Success Solid</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="warning-outline">Warning Outline</Badge>
      <Badge variant="warning-solid">Warning Solid</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" size="sm">
        <SiCircleFill data-icon="inline-start" />
        Active
      </Badge>
      <Badge variant="success" size="md">
        <SiCircleFill data-icon="inline-start" />
        Active
      </Badge>
      <Badge variant="success" size="lg">
        <SiCircleFill data-icon="inline-start" />
        Active
      </Badge>
      <Badge variant="danger" size="sm">
        Offline
        <SiCircleFill data-icon="inline-end" />
      </Badge>
      <Badge variant="danger" size="md">
        Offline
        <SiCircleFill data-icon="inline-end" />
      </Badge>
      <Badge variant="danger" size="lg">
        Offline
        <SiCircleFill data-icon="inline-end" />
      </Badge>
    </div>
  ),
}
