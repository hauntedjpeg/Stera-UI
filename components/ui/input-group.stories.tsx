import type { Meta, StoryObj } from "@storybook/react"
import { ChevronDownIcon } from "lucide-react"
import {
  SiCopy,
  SiEye,
  SiGlobe,
  SiMail,
  SiSearch,
} from "stera-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Field, FieldDescription, FieldLabel } from "./field"
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

export const Sizes: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SiSearch />
        </InputGroupAddon>
        <InputGroupInput disabled size="sm" placeholder="Small" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SiSearch />
        </InputGroupAddon>
        <InputGroupInput size="md" placeholder="Medium (default)" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SiSearch />
        </InputGroupAddon>
        <InputGroupInput size="lg" placeholder="Large" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SiSearch />
        </InputGroupAddon>
        <InputGroupInput size="xl" placeholder="Extra large" />
      </InputGroup>
    </div>
  ),
}

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
      <InputGroupInput placeholder="Enter search query" />
      <InputGroupAddon align="inline-end">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <InputGroupButton variant="ghost" className="pr-1.5! text-xs">
                Search In... <ChevronDownIcon className="size-3" />
              </InputGroupButton>
            }
          />
          <DropdownMenuContent align="end" sideOffset={8} alignOffset={-4}>
            <DropdownMenuGroup>
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Blog Posts</DropdownMenuItem>
              <DropdownMenuItem>Changelog</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithSpinner: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupInput defaultValue="Saving..." />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Spinner />
        </InputGroupAddon>
        <InputGroupInput placeholder="Please wait..." />
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

export const WithLabel: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-sm flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="email">Email address</FieldLabel>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <SiMail />
          </InputGroupAddon>
          <InputGroupInput id="email" placeholder="you@example.com" />
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="website">Website</FieldLabel>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput id="website" placeholder="example.com" />
        </InputGroup>
        <FieldDescription>Your public-facing URL.</FieldDescription>
      </Field>
    </div>
  ),
}

export const CustomInput: Story = {
  render: () => (
    <InputGroup className="w-sm">
      <textarea
        data-slot="input-group-control"
        className="field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
        placeholder="Autoresize textarea..."
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton className="ml-auto" size="sm" variant="brand">
          Submit
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}
