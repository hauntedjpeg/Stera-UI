"use client"

import {
  SiBell,
  SiCreditCard,
  SiMail,
  SiSettings,
  SiSliders,
  SiUser,
} from "stera-icons"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandDialogTrigger,
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
} from "@/components/ui/command"
import { Preview } from "@/components/preview"

export function CommandDefault() {
  return (
    <Preview>
      <Command className="max-w-sm rounded-lg border">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem><SiBell /><span>Notifications</span></CommandItem>
            <CommandItem><SiMail /><span>Messages</span></CommandItem>
            <CommandItem disabled><SiSliders /><span>Integrations</span></CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem><SiUser /><span>Profile</span><CommandShortcut>⌘P</CommandShortcut></CommandItem>
            <CommandItem><SiCreditCard /><span>Billing</span><CommandShortcut>⌘B</CommandShortcut></CommandItem>
            <CommandItem><SiSettings /><span>Settings</span><CommandShortcut>⌘S</CommandShortcut></CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </Preview>
  )
}

export function CommandDialogExample() {
  return (
    <Preview>
      <CommandDialog>
        <CommandDialogTrigger render={<Button variant="outline">Open Command Menu</Button>} />
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem><SiBell /><span>Notifications</span></CommandItem>
              <CommandItem><SiMail /><span>Messages</span></CommandItem>
              <CommandItem><SiSliders /><span>Integrations</span></CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem><SiUser /><span>Profile</span><CommandShortcut>⌘P</CommandShortcut></CommandItem>
              <CommandItem><SiCreditCard /><span>Billing</span><CommandShortcut>⌘B</CommandShortcut></CommandItem>
              <CommandItem><SiSettings /><span>Settings</span><CommandShortcut>⌘S</CommandShortcut></CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </Preview>
  )
}

export function CommandTitleDescription() {
  return (
    <Preview>
      <Command className="max-w-sm rounded-lg border">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Settings">
            <CommandItem>
              <SiUser />
              <CommandItemContent>
                <CommandItemTitle>Profile</CommandItemTitle>
                <CommandItemDescription>View and edit your profile</CommandItemDescription>
              </CommandItemContent>
              <CommandShortcut>⇧⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <SiCreditCard />
              <CommandItemContent>
                <CommandItemTitle>Billing</CommandItemTitle>
                <CommandItemDescription>Manage your subscription</CommandItemDescription>
              </CommandItemContent>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <SiSettings />
              <CommandItemContent>
                <CommandItemTitle>Settings</CommandItemTitle>
                <CommandItemDescription>Configure preferences</CommandItemDescription>
              </CommandItemContent>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandSeparator />
            <CommandItem disabled>
              <SiSliders />
              <CommandItemContent>
                <CommandItemTitle>Integrations</CommandItemTitle>
                <CommandItemDescription>Connect third-party services</CommandItemDescription>
              </CommandItemContent>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </Preview>
  )
}
