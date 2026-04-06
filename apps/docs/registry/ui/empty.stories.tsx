import type { Meta, StoryObj } from "@storybook/react-vite"
import { SiFolderOpen, SiSearch, SiUsers, SiArrowUpRight } from "stera-icons"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./empty"
import { Button } from "./button"
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "./avatar"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group"

const meta: Meta<typeof Empty> = {
  title: "UI/Empty",
  component: Empty,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Empty>

export const Default: Story = {
  render: () => (
    <Empty className="w-96">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SiFolderOpen />
        </EmptyMedia>
        <EmptyTitle>No projects found</EmptyTitle>
        <EmptyDescription>
          You don&apos;t have any projects yet. Create your first project to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create project</Button>
      </EmptyContent>
      <Button variant="link" size="sm" className="text-text-secondary">Learn more<SiArrowUpRight /></Button>
    </Empty>
  ),
}

export const Outline: Story = {
  render: () => (
    <Empty className="w-96 border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SiFolderOpen />
        </EmptyMedia>
        <EmptyTitle>No projects found</EmptyTitle>
        <EmptyDescription>
          You don&apos;t have any projects yet. Create your first project to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create project</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const Background: Story = {
  render: () => (
    <Empty className="w-96 bg-bg-surface-secondary">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SiFolderOpen />
        </EmptyMedia>
        <EmptyTitle>No projects found</EmptyTitle>
        <EmptyDescription>
          You don&apos;t have any projects yet. Create your first project to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create project</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const WithAvatar: Story = {
  render: () => (
    <Empty className="w-96">
      <EmptyHeader>
        <EmptyMedia>
          <Avatar size="lg">
            <AvatarImage src="public/images/demo-image.png" alt="demo" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>User unavailable</EmptyTitle>
        <EmptyDescription>
          This user is currently offline or unavailable. Try again later.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const WithAvatarGroup: Story = {
  render: () => (
    <Empty className="w-96">
      <EmptyHeader>
        <EmptyMedia>
          <AvatarGroup>
            <Avatar>
              <AvatarImage src="/images/demo-image.png" alt="demo" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>TK</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </EmptyMedia>
        <EmptyTitle>No team members</EmptyTitle>
        <EmptyDescription>
          Your team doesn&apos;t have any members yet. Invite people to collaborate.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <SiUsers />
          Invite members
        </Button>
      </EmptyContent>
    </Empty>
  ),
}

export const WithInputGroup: Story = {
  render: () => (
    <Empty className="w-96">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SiSearch />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          We couldn&apos;t find anything matching your search. Try different keywords.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <SiSearch />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search again..." />
        </InputGroup>
      </EmptyContent>
    </Empty>
  ),
}
