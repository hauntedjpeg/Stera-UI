import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "./dialog"

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Edit Profile</Button>} />
      <DialogPopup scroll={false}>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </div>
        </DialogContent>
        <DialogFooter showCloseButton>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
}

export const CustomCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Open</Button>} />
      <DialogPopup scroll={false} showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
}

export const NoCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Open</Button>} />
      <DialogPopup scroll={false} showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog has no close button. Click outside the dialog to
            dismiss it.
          </DialogDescription>
        </DialogHeader>
      </DialogPopup>
    </Dialog>
  ),
}

const loremParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

export const StickyFooter: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Open</Button>} />
      <DialogPopup scroll="content">
        <DialogHeader>
          <DialogTitle>Sticky Footer</DialogTitle>
          <DialogDescription>
            The footer stays visible while the content scrolls.
          </DialogDescription>
        </DialogHeader>
        <DialogContent scroll>
          {Array.from({ length: 8 }).map((_, i) => (
            <p key={i} className="mb-4 text-sm text-text-secondary">
              {loremParagraph}
            </p>
          ))}
        </DialogContent>
        <DialogFooter showCloseButton>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
}

export const ScrollableContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Open</Button>} />
      <DialogPopup initialFocus={false}>
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>
            Long content can scroll while the header stays in view.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          {Array.from({ length: 8 }).map((_, i) => (
            <p key={i} className="mb-4 text-sm text-text-secondary">
              {loremParagraph}
            </p>
          ))}
        </DialogContent>
        <DialogFooter showCloseButton>
          <Button>Accept</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
}
