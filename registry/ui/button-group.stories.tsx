import type { Meta, StoryObj } from "@storybook/react"
import {
  SiArchive,
  SiChevronDown,
  SiCopy,
  SiDelete,
  SiForward,
  SiPlus,
  SiReply,
  SiSearch,
  SiSettings,
  SiShare,
} from "stera-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Input } from "./input"
import {
  InputGroup,
  InputGroupInput,
  InputGroupText,
} from "./input-group"
import { Button } from "./button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "./button-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

const meta: Meta<typeof ButtonGroup> = {
  title: "UI/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">
        <SiReply data-icon="inline-start" />
        Reply
      </Button>
      <Button variant="outline">
        <SiForward data-icon="inline-start" />
        Forward
      </Button>
      <Button variant="outline">
        <SiArchive data-icon="inline-start" />
        Archive
      </Button>
    </ButtonGroup>
  ),
}

export const Orientation: Story = {
  render: () => (
    <div className="flex items-start gap-8">
      <div className="flex flex-col items-center gap-3">
        <span className="text-sm text-muted-foreground">Horizontal</span>
        <ButtonGroup orientation="horizontal">
          <Button variant="outline">
            <SiReply data-icon="inline-start" />
            Reply
          </Button>
          <Button variant="outline">
            <SiForward data-icon="inline-start" />
            Forward
          </Button>
          <Button variant="outline">
            <SiArchive data-icon="inline-start" />
            Archive
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="text-sm text-muted-foreground">Vertical</span>
        <ButtonGroup orientation="vertical">
          <Button variant="outline">
            <SiReply data-icon="inline-start" />
            Reply
          </Button>
          <Button variant="outline">
            <SiForward data-icon="inline-start" />
            Forward
          </Button>
          <Button variant="outline">
            <SiArchive data-icon="inline-start" />
            Archive
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
}

export const Size: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <Button variant="outline" size="sm">Reply</Button>
        <Button variant="outline" size="sm">Forward</Button>
        <Button variant="outline" size="sm">Archive</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="md">Reply</Button>
        <Button variant="outline" size="md">Forward</Button>
        <Button variant="outline" size="md">Archive</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="lg">Reply</Button>
        <Button variant="outline" size="lg">Forward</Button>
        <Button variant="outline" size="lg">Archive</Button>
      </ButtonGroup>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <Button variant="outline">Reply</Button>
        <Button variant="outline">Forward</Button>
        <Button variant="outline">Archive</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="subtle">Reply</Button>
        <ButtonGroupSeparator />
        <Button variant="subtle">Forward</Button>
        <ButtonGroupSeparator />
        <Button variant="subtle">Archive</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="brand">Reply</Button>
        <ButtonGroupSeparator />
        <Button variant="brand">Forward</Button>
        <ButtonGroupSeparator />
        <Button variant="brand">Archive</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="accent">Reply</Button>
        <ButtonGroupSeparator />
        <Button variant="accent">Forward</Button>
        <ButtonGroupSeparator />
        <Button variant="accent">Archive</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="ghost">Reply</Button>
        <ButtonGroupSeparator />
        <Button variant="ghost">Forward</Button>
        <ButtonGroupSeparator />
        <Button variant="ghost">Archive</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="danger">Reply</Button>
        <ButtonGroupSeparator />
        <Button variant="danger">Forward</Button>
        <ButtonGroupSeparator />
        <Button variant="danger">Archive</Button>
      </ButtonGroup>
    </div>
  ),
}

export const Nested: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">
          <SiReply data-icon="inline-start" />
          Reply
        </Button>
        <Button variant="outline">
          <SiForward data-icon="inline-start" />
          Forward
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">
          <SiArchive data-icon="inline-start" />
          Archive
        </Button>
        <Button variant="outline">
          <SiDelete data-icon="inline-start" />
          Delete
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  ),
}

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="ghost" size="icon" aria-label="Reply">
        <SiReply />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Forward">
        <SiForward />
      </Button>
      <ButtonGroupSeparator />
      <Button variant="ghost" size="icon" aria-label="Copy">
        <SiCopy />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Share">
        <SiShare />
      </Button>
      <ButtonGroupSeparator />
      <Button variant="ghost" size="icon" aria-label="Delete">
        <SiDelete />
      </Button>
    </ButtonGroup>
  ),
}

export const Split: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="brand">
        <SiPlus data-icon="inline-start" />
        New message
      </Button>
      <ButtonGroupSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="brand" size="icon" aria-label="More options">
              <SiChevronDown />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem>New draft</DropdownMenuItem>
          <DropdownMenuItem>Schedule send</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  ),
}

export const WithInput: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon" aria-label="Search">
        <SiSearch />
      </Button>
      <Input className="w-48" placeholder="Search..." />
      <Button variant="outline">Go</Button>
    </ButtonGroup>
  ),
}

export const WithInputGroup: Story = {
  render: () => (
    <ButtonGroup>
      <InputGroup>
        <InputGroupText>https://</InputGroupText>
        <InputGroupInput placeholder="example.com" className="w-48" />
      </InputGroup>
      <Button variant="outline">Copy</Button>
    </ButtonGroup>
  ),
}

export const WithDropdownMenu: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">
        <SiArchive data-icon="inline-start" />
        Archive
      </Button>
      <Button variant="outline">
        <SiReply data-icon="inline-start" />
        Reply
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon" aria-label="More actions">
              <SiChevronDown />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Mark as unread</DropdownMenuItem>
          <DropdownMenuItem>Snooze</DropdownMenuItem>
          <DropdownMenuItem>Move to folder</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  ),
}

export const WithSelect: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">
        <SiSearch data-icon="inline-start" />
        Search
      </Button>
      <Select defaultValue="all">
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="unread">Unread</SelectItem>
          <SelectItem value="starred">Starred</SelectItem>
        </SelectContent>
      </Select>
    </ButtonGroup>
  ),
}

export const WithPopover: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">
        <SiArchive data-icon="inline-start" />
        Archive
      </Button>
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline">
              <SiSettings data-icon="inline-start" />
              Options
            </Button>
          }
        />
        <PopoverContent className="w-48 p-3">
          <p className="text-sm text-muted-foreground">Configure archive settings.</p>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  ),
}
