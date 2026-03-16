import type { Meta, StoryObj } from "@storybook/react"
import {
  SiCopy,
  SiEye,
  SiGlobe,
  SiMail,
  SiSearch,
} from "stera-icons"

import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./input-group"
import { Kbd } from "./kbd"
import { Spinner } from "./spinner"

const meta: Meta<typeof InputGroup> = {
  title: "UI/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof InputGroup>

export const Icon: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SiSearch />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-end">
          <SiSearch />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SiMail />
        </InputGroupAddon>
        <InputGroupInput placeholder="Email" />
        <InputGroupAddon align="inline-end">
          <SiEye />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const Text: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="0.00" />
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="0.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="domain" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="username" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@company.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Type a message..." />
        <InputGroupAddon align="inline-end">
          <InputGroupText>120 characters left</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const WithButton: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput
          defaultValue="https://example.com/invite/abc123"
          readOnly
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Copy">
            <SiCopy />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const WithKbd: Story = {
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

export const WithDropdown: Story = {
  render: () => (
    <InputGroup className="w-sm">
      <InputGroupAddon align="inline-start">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <InputGroupButton>
              Search In...
            </InputGroupButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Posts</DropdownMenuItem>
            <DropdownMenuItem>Comments</DropdownMenuItem>
            <DropdownMenuItem>Users</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
}

export const WithSpinner: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupInput defaultValue="Saving..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Spinner />
        </InputGroupAddon>
        <InputGroupInput placeholder="Please wait..." disabled />
      </InputGroup>
    </div>
  ),
}

export const Textarea: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupTextarea placeholder="Enter your message..." rows={3} />
        <InputGroupAddon align="block-end">
          <InputGroupText>Line 1, Column 1</InputGroupText>
          <InputGroupButton className="ml-auto">Run</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="block-start">
          <SiGlobe />
          <InputGroupText>Public</InputGroupText>
        </InputGroupAddon>
        <InputGroupTextarea placeholder="What's happening?" rows={3} />
        <InputGroupAddon align="block-end">
          <InputGroupText>0/280</InputGroupText>
          <InputGroupButton className="ml-auto">Post</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const CustomInput: Story = {
  render: () => (
    <InputGroup className="w-sm">
      <textarea
        data-slot="input-group-control"
        className="flex-1 resize-none rounded-none border-0 bg-transparent py-2 px-3 text-sm shadow-none ring-0 outline-none placeholder:text-muted-foreground focus-visible:ring-0"
        placeholder="Custom resizable textarea..."
        rows={3}
      />
      <InputGroupAddon align="block-end">
        <InputGroupText>Custom element</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
}
