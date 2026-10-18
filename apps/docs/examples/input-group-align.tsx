"use client"

import { SiSearch } from "stera-icons"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

export default function InputGroupAlign() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SiSearch />
        </InputGroupAddon>
        <InputGroupInput placeholder="inline-start" />
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="inline-end" />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="block-start">
          <InputGroupText>block-start</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput size="lg" placeholder="Large input" />
      </InputGroup>
      <InputGroup>
        <InputGroupInput size="sm" placeholder="Small input" />
        <InputGroupAddon align="block-end">
          <InputGroupText>block-end</InputGroupText>
          <InputGroupButton className="ml-auto">Send</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
