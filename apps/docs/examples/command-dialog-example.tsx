"use client"

import { SiBell, SiCreditCard, SiMail, SiSettings, SiSliders, SiUser } from "stera-icons"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandDialogTrigger,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export default function CommandDialogExample() {
  return (
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
  )
}
