"use client"

import { SiSearch } from "stera-icons"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

export default function InputGroupWithKbd() {
  return (
    <InputGroup className="w-80">
      <InputGroupAddon align="inline-start"><SiSearch /></InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end"><Kbd>⌘K</Kbd></InputGroupAddon>
    </InputGroup>
  )
}
