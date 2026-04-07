"use client"

import * as React from "react"
import {
  SiBell,
  SiCreditCard,
  SiMail,
  SiPencil,
  SiSettings,
  SiSignOut,
  SiTrash,
  SiUser,
  SiArchive,
  SiShare,
} from "stera-icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemContent,
  DropdownMenuItemDescription,
  DropdownMenuItemShortcut,
  DropdownMenuItemTitle,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Preview } from "@/components/preview"

export function DropdownMenuDefault() {
  return (
    <Preview>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Preview>
  )
}

export function DropdownMenuWithIcons() {
  return (
    <Preview>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem><SiUser />Profile</DropdownMenuItem>
          <DropdownMenuItem><SiCreditCard />Billing</DropdownMenuItem>
          <DropdownMenuItem><SiSettings />Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="danger"><SiSignOut />Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Preview>
  )
}

export function DropdownMenuWithShortcuts() {
  return (
    <Preview>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile<DropdownMenuItemShortcut>⇧⌘P</DropdownMenuItemShortcut></DropdownMenuItem>
            <DropdownMenuItem>Billing<DropdownMenuItemShortcut>⌘B</DropdownMenuItemShortcut></DropdownMenuItem>
            <DropdownMenuItem>Settings<DropdownMenuItemShortcut>⌘S</DropdownMenuItemShortcut></DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out<DropdownMenuItemShortcut>⇧⌘Q</DropdownMenuItemShortcut></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Preview>
  )
}

export function DropdownMenuWithSubmenu() {
  return (
    <Preview>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>New Team<DropdownMenuItemShortcut>⌘+T</DropdownMenuItemShortcut></DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Preview>
  )
}

export function DropdownMenuDestructive() {
  return (
    <Preview>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
          Actions
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem><SiPencil />Edit</DropdownMenuItem>
          <DropdownMenuItem><SiShare />Share</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem><SiArchive />Archive</DropdownMenuItem>
          <DropdownMenuItem variant="danger"><SiTrash />Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Preview>
  )
}

function CheckboxesDemo() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Checkboxes
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar} disabled>
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownMenuCheckboxes() {
  return (
    <Preview>
      <CheckboxesDemo />
    </Preview>
  )
}

function RadioGroupDemo() {
  const [position, setPosition] = React.useState("bottom")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Radio Group
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right" disabled>Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownMenuRadioItems() {
  return (
    <Preview>
      <RadioGroupDemo />
    </Preview>
  )
}

export function DropdownMenuTitleDescription() {
  return (
    <Preview>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-56">
          <DropdownMenuItem>
            <SiUser />
            <DropdownMenuItemContent>
              <DropdownMenuItemTitle>Profile</DropdownMenuItemTitle>
              <DropdownMenuItemDescription>View and edit your profile</DropdownMenuItemDescription>
            </DropdownMenuItemContent>
            <DropdownMenuItemShortcut>⇧⌘P</DropdownMenuItemShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SiCreditCard />
            <DropdownMenuItemContent>
              <DropdownMenuItemTitle>Billing</DropdownMenuItemTitle>
              <DropdownMenuItemDescription>Manage your subscription</DropdownMenuItemDescription>
            </DropdownMenuItemContent>
            <DropdownMenuItemShortcut>⌘B</DropdownMenuItemShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="danger">
            <SiSignOut />
            <DropdownMenuItemContent>
              <DropdownMenuItemTitle>Log out</DropdownMenuItemTitle>
              <DropdownMenuItemDescription>Sign out of your account</DropdownMenuItemDescription>
            </DropdownMenuItemContent>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Preview>
  )
}
