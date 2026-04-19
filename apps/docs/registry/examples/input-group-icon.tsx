"use client"

import { SiEye, SiMail, SiSearch } from "stera-icons"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export default function InputGroupIcon() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <InputGroup>
        <InputGroupAddon align="inline-start"><SiSearch /></InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-end"><SiSearch /></InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start"><SiMail /></InputGroupAddon>
        <InputGroupInput placeholder="Email" />
        <InputGroupAddon align="inline-end"><SiEye /></InputGroupAddon>
      </InputGroup>
    </div>
  )
}
