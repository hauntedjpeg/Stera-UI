"use client"

import { SiCreditCard, SiSettings, SiSliders, SiUser } from "stera-icons"
import {
  Command,
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

export default function CommandTitleDescription() {
  return (
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
  )
}
