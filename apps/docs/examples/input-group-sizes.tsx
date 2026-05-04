"use client"

import { SiSearch } from "stera-icons"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export default function InputGroupSizes() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <InputGroup>
        <InputGroupAddon align="inline-start"><SiSearch /></InputGroupAddon>
        <InputGroupInput size="sm" placeholder="Small" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start"><SiSearch /></InputGroupAddon>
        <InputGroupInput size="md" placeholder="Medium (default)" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start"><SiSearch /></InputGroupAddon>
        <InputGroupInput size="lg" placeholder="Large" />
      </InputGroup>
    </div>
  )
}
