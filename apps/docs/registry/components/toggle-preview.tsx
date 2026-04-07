"use client"

import { SiTextBold, SiTextItalic, SiTextUnderline } from "stera-icons"
import { Toggle } from "@/components/ui/toggle"
import { Preview } from "@/components/preview"

export function ToggleDefault() {
  return (
    <Preview>
      <Toggle aria-label="Toggle bold">
        <SiTextBold />
      </Toggle>
    </Preview>
  )
}

export function ToggleOutline() {
  return (
    <Preview>
      <Toggle variant="outline" aria-label="Toggle bold">
        <SiTextBold />
      </Toggle>
    </Preview>
  )
}

export function ToggleWithText() {
  return (
    <Preview>
      <Toggle aria-label="Toggle italic">
        <SiTextItalic />
        Italic
      </Toggle>
    </Preview>
  )
}

export function ToggleSizes() {
  return (
    <Preview>
      <div className="flex flex-wrap items-center gap-2">
        <Toggle size="sm" aria-label="Toggle bold">
          <SiTextBold />
        </Toggle>
        <Toggle size="md" aria-label="Toggle bold">
          <SiTextBold />
        </Toggle>
        <Toggle size="lg" aria-label="Toggle bold">
          <SiTextBold />
        </Toggle>
      </div>
    </Preview>
  )
}

export function ToggleDisabled() {
  return (
    <Preview>
      <Toggle disabled aria-label="Toggle underline">
        <SiTextUnderline />
      </Toggle>
    </Preview>
  )
}
