"use client"

import { Button } from "@/components/ui/button"
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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Preview } from "@/components/preview"

export function DialogDefault() {
  return (
    <Preview>
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
                <Label htmlFor="dialog-name">Name</Label>
                <Input id="dialog-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dialog-username">Username</Label>
                <Input id="dialog-username" defaultValue="@peduarte" />
              </div>
            </div>
          </DialogContent>
          <DialogFooter showCloseButton>
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </Preview>
  )
}

export function DialogConfirm() {
  return (
    <Preview>
      <Dialog>
        <DialogTrigger render={<Button variant="outline">Delete Account</Button>} />
        <DialogPopup scroll={false} showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button variant="danger">Delete</Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </Preview>
  )
}

export function DialogScrollable() {
  const loremParagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."

  return (
    <Preview>
      <Dialog>
        <DialogTrigger render={<Button variant="outline">Open</Button>} />
        <DialogPopup scroll="content">
          <DialogHeader>
            <DialogTitle>Sticky Footer</DialogTitle>
            <DialogDescription>The footer stays visible while the content scrolls.</DialogDescription>
          </DialogHeader>
          <DialogContent scroll>
            {Array.from({ length: 6 }).map((_, i) => (
              <p key={i} className="mb-4 text-sm text-muted-foreground">{loremParagraph}</p>
            ))}
          </DialogContent>
          <DialogFooter showCloseButton>
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </Preview>
  )
}
