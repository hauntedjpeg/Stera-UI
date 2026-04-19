"use client"

import { SiSearch } from "stera-icons"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

export default function KbdWithInput() {
  return (
    <InputGroup className="w-sm">
      <InputGroupAddon align="inline-start">
        <SiSearch />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}
