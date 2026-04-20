"use client"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export default function InputGroupTextareaAddon() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <InputGroup>
        <InputGroupTextarea placeholder="Enter your message..." rows={3} />
        <InputGroupAddon align="block-end">
          <InputGroupText>Line 1, Column 1</InputGroupText>
          <InputGroupButton className="ml-auto">Run</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
