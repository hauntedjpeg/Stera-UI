"use client"

import { SiSearch } from "stera-icons"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Preview } from "@/components/preview"

export function KbdDefault() {
  return (
    <Preview>
      <Kbd>⌘K</Kbd>
    </Preview>
  )
}

export function KbdSizes() {
  return (
    <Preview>
      <div className="flex items-center gap-3">
        <Kbd size="sm">⌘K</Kbd>
        <Kbd size="md">⌘K</Kbd>
      </div>
    </Preview>
  )
}

export function KbdKeyCombination() {
  return (
    <Preview>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>B</Kbd>
      </KbdGroup>
    </Preview>
  )
}

export function KbdWithButton() {
  return (
    <Preview>
      <Button>
        Accept <Kbd data-kbd="inline-end">⏎</Kbd>
      </Button>
    </Preview>
  )
}

export function KbdWithInput() {
  return (
    <Preview>
      <InputGroup className="w-sm">
        <InputGroupAddon align="inline-start">
          <SiSearch />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </Preview>
  )
}
