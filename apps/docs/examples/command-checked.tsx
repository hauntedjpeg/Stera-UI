"use client"

import { useState } from "react"
import { SiBrightnessHigh, SiMonitor, SiMoonCrescent } from "stera-icons"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const themes = [
  { value: "light", label: "Light", icon: SiBrightnessHigh },
  { value: "dark", label: "Dark", icon: SiMoonCrescent },
  { value: "system", label: "System", icon: SiMonitor },
]

export default function CommandChecked() {
  const [theme, setTheme] = useState("system")

  return (
    <Command className="max-w-sm rounded-xl bg-surface ring-1 ring-border forced-stroke">
      <CommandInput placeholder="Change theme..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Theme">
          {themes.map(({ value, label, icon: Icon }) => (
            <CommandItem
              key={value}
              checked={theme === value}
              onSelect={() => setTheme(value)}
            >
              <Icon />
              <span>{label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
