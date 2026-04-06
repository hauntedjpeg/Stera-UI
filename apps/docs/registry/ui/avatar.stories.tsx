import type { Meta, StoryObj } from "@storybook/react-vite"
import { SiPlusFill, SiUser } from "stera-icons"
import {
  Avatar,
  AvatarFallback,
  AvatarIconFallback,
  AvatarImage,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "./avatar"

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    shape: {
      control: "select",
      options: ["circle", "square"],
    },
  },
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
      <AvatarFallback>CG</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/broken-image.png" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
      <AvatarFallback>CG</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const AllSizesWithBadge: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar size="default">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge />
      </Avatar>
    </div>
  ),
}

export const BadgeVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge variant="subtle" />
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge variant="danger" />
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge variant="success" />
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge variant="warning" />
      </Avatar>
    </div>
  ),
}

export const BadgeVariantSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar size="sm">
          <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
          <AvatarFallback>CG</AvatarFallback>
          <AvatarBadge variant="danger" />
        </Avatar>
        <Avatar size="default">
          <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
          <AvatarFallback>CG</AvatarFallback>
          <AvatarBadge variant="danger" />
        </Avatar>
        <Avatar size="lg">
          <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
          <AvatarFallback>CG</AvatarFallback>
          <AvatarBadge variant="danger" />
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar size="sm">
          <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
          <AvatarFallback>CG</AvatarFallback>
          <AvatarBadge variant="success" />
        </Avatar>
        <Avatar size="default">
          <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
          <AvatarFallback>CG</AvatarFallback>
          <AvatarBadge variant="success" />
        </Avatar>
        <Avatar size="lg">
          <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
          <AvatarFallback>CG</AvatarFallback>
          <AvatarBadge variant="success" />
        </Avatar>
      </div>
    </div>
  ),
}

export const BadgeIcon: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge variant="icon"><SiPlusFill /></AvatarBadge>
      </Avatar>
      <Avatar size="default">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge variant="icon"><SiPlusFill /></AvatarBadge>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge variant="icon"><SiPlusFill /></AvatarBadge>
      </Avatar>
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  ),
}

export const IconFallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarIconFallback><SiUser /></AvatarIconFallback>
    </Avatar>
  ),
}

export const IconFallbackSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarIconFallback><SiUser /></AvatarIconFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarIconFallback><SiUser /></AvatarIconFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarIconFallback><SiUser /></AvatarIconFallback>
      </Avatar>
    </div>
  ),
}

export const IconFallbackAllShapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar shape="circle">
        <AvatarIconFallback><SiUser /></AvatarIconFallback>
      </Avatar>
      <Avatar shape="square">
        <AvatarIconFallback><SiUser /></AvatarIconFallback>
      </Avatar>
    </div>
  ),
}

export const IconFallbackWithImage: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarIconFallback><SiUser /></AvatarIconFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/broken-image.png" alt="@hauntedjpeg" />
        <AvatarIconFallback><SiUser /></AvatarIconFallback>
      </Avatar>
    </div>
  ),
}

export const SquareShape: Story = {
  render: (args) => (
    <Avatar shape="square" {...args}>
      <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
      <AvatarFallback>CG</AvatarFallback>
    </Avatar>
  ),
}

export const AllShapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar shape="circle">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>
      <Avatar shape="square">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const SquareWithBadge: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar shape="square">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge variant="success" />
      </Avatar>
      <Avatar shape="square">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
        <AvatarBadge variant="danger" />
      </Avatar>
    </div>
  ),
}

export const SquareGroup: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar shape="square">
        <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>
      <Avatar shape="square">
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar shape="square">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  ),
}

export const GroupSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AvatarGroup>
        <Avatar size="sm">
          <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
          <AvatarFallback>CG</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+2</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup>
        <Avatar size="default">
          <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
          <AvatarFallback>CG</AvatarFallback>
        </Avatar>
        <Avatar size="default">
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar size="default">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+2</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup>
        <Avatar size="lg">
          <AvatarImage src="https://github.com/hauntedjpeg.png" alt="@hauntedjpeg" />
          <AvatarFallback>CG</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+2</AvatarGroupCount>
      </AvatarGroup>
    </div>
  ),
}
