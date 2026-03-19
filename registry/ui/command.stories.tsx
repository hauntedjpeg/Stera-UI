import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  SiUser,
  SiSettings,
  SiCreditCard,
  SiBell,
  SiFolder,
  SiCode,
  SiCopy,
  SiTrash,
  SiPencil,
  SiDownload,
  SiEye,
  SiMail,
  SiPlus,
  SiSliders,
  SiLayoutGrid,
  SiKeyboard,
  SiLink,
  SiArchive,
  SiSave,
  SiShare,
} from "stera-icons"

import { Button } from "./button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandItemContent,
  CommandItemDescription,
  CommandItemTitle,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command"

const meta: Meta<typeof Command> = {
  title: "UI/Command",
  component: Command,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Command>

export const Basic: Story = {
  render: () => (
    <Command className="max-w-sm rounded-lg border">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <SiBell />
            <span>Notifications</span>
          </CommandItem>
          <CommandItem>
            <SiMail />
            <span>Messages</span>
          </CommandItem>
          <CommandItem disabled>
            <SiSliders />
            <span>Integrations</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <SiUser />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SiCreditCard />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SiSettings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

function ShortcutsDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setOpen(true)} variant="outline" className="w-fit">
        Open Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Settings">
              <CommandItem>
                <SiUser />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SiCreditCard />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SiSettings />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}

export const Shortcuts: Story = {
  render: () => <ShortcutsDemo />,
}

function GroupsDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setOpen(true)} variant="outline" className="w-fit">
        Open Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <SiBell />
                <span>Notifications</span>
              </CommandItem>
              <CommandItem>
                <SiMail />
                <span>Messages</span>
              </CommandItem>
              <CommandItem>
                <SiSliders />
                <span>Integrations</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <SiUser />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SiCreditCard />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SiSettings />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}

export const Groups: Story = {
  render: () => <GroupsDemo />,
}

function ScrollableDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setOpen(true)} variant="outline" className="w-fit">
        Open Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem>
                <SiLayoutGrid />
                <span>Dashboard</span>
              </CommandItem>
              <CommandItem>
                <SiFolder />
                <span>Projects</span>
              </CommandItem>
              <CommandItem>
                <SiMail />
                <span>Inbox</span>
              </CommandItem>
              <CommandItem>
                <SiBell />
                <span>Notifications</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem>
                <SiPlus />
                <span>New File</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SiCopy />
                <span>Copy</span>
                <CommandShortcut>⌘C</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SiSave />
                <span>Save</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SiShare />
                <span>Share</span>
              </CommandItem>
              <CommandItem>
                <SiDownload />
                <span>Export</span>
                <CommandShortcut>⇧⌘E</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="View">
              <CommandItem>
                <SiEye />
                <span>Preview</span>
              </CommandItem>
              <CommandItem>
                <SiCode />
                <span>Source</span>
              </CommandItem>
              <CommandItem>
                <SiSliders />
                <span>Settings Panel</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Account">
              <CommandItem>
                <SiUser />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SiCreditCard />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SiSettings />
                <span>Settings</span>
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Tools">
              <CommandItem>
                <SiLink />
                <span>Copy Link</span>
              </CommandItem>
              <CommandItem>
                <SiPencil />
                <span>Rename</span>
              </CommandItem>
              <CommandItem>
                <SiArchive />
                <span>Archive</span>
              </CommandItem>
              <CommandItem>
                <SiKeyboard />
                <span>Keyboard Shortcuts</span>
                <CommandShortcut>⌘K</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SiTrash />
                <span>Delete</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}

export const Scrollable: Story = {
  render: () => <ScrollableDemo />,
}

export const TitleDescription: Story = {
  render: () => (
    <Command className="max-w-sm rounded-lg border">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Settings">
          <CommandItem>
            <SiUser />
            <CommandItemContent>
              <CommandItemTitle>Profile</CommandItemTitle>
              <CommandItemDescription>
                View and edit your profile
              </CommandItemDescription>
            </CommandItemContent>
            <CommandShortcut>⇧⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SiCreditCard />
            <CommandItemContent>
              <CommandItemTitle>Billing</CommandItemTitle>
              <CommandItemDescription>
                Manage your subscription
              </CommandItemDescription>
            </CommandItemContent>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SiSettings />
            <CommandItemContent>
              <CommandItemTitle>Settings</CommandItemTitle>
              <CommandItemDescription>
                Configure preferences
              </CommandItemDescription>
            </CommandItemContent>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandSeparator />
          <CommandItem disabled>
            <SiSliders />
            <CommandItemContent>
              <CommandItemTitle>Integrations</CommandItemTitle>
              <CommandItemDescription>
                Connect third-party services
              </CommandItemDescription>
            </CommandItemContent>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
