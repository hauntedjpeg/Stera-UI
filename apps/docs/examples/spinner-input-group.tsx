"use client"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerInputGroup() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <InputGroup>
        <InputGroupInput defaultValue="stera-ui" aria-label="Username" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Checking…</InputGroupText>
          <Spinner aria-hidden />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
