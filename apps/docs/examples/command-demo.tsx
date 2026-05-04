"use client"

import { SiBell, SiCreditCard, SiMail, SiSettings, SiSliders, SiUser } from "stera-icons"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export default function CommandDemo() {
  return (
    <Command className="max-w-sm rounded-lg border bg-surface">
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
  )
}
