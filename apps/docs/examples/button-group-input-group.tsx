"use client"

import { SiSearch } from "stera-icons"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export default function ButtonGroupInputGroup() {
  return (
    <ButtonGroup className="w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SiSearch />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
      <Button variant="outline">Search</Button>
    </ButtonGroup>
  )
}
