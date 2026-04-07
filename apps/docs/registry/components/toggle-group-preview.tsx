"use client"

import { SiTextBold, SiTextItalic, SiTextUnderline } from "stera-icons"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Preview } from "@/components/preview"

export function ToggleGroupDefault() {
  return (
    <Preview>
      <ToggleGroup multiple>
        <ToggleGroupItem value="bold" aria-label="Toggle bold"><SiTextBold /></ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic"><SiTextItalic /></ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline"><SiTextUnderline /></ToggleGroupItem>
      </ToggleGroup>
    </Preview>
  )
}

export function ToggleGroupOutline() {
  return (
    <Preview>
      <ToggleGroup variant="outline" multiple>
        <ToggleGroupItem value="bold" aria-label="Toggle bold"><SiTextBold /></ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic"><SiTextItalic /></ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline"><SiTextUnderline /></ToggleGroupItem>
      </ToggleGroup>
    </Preview>
  )
}

export function ToggleGroupSizes() {
  return (
    <Preview>
      <div className="flex flex-col items-center gap-4">
        <ToggleGroup size="sm" multiple>
          <ToggleGroupItem value="bold" aria-label="Toggle bold"><SiTextBold /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic"><SiTextItalic /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline"><SiTextUnderline /></ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup size="md" multiple>
          <ToggleGroupItem value="bold" aria-label="Toggle bold"><SiTextBold /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic"><SiTextItalic /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline"><SiTextUnderline /></ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup size="lg" multiple>
          <ToggleGroupItem value="bold" aria-label="Toggle bold"><SiTextBold /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic"><SiTextItalic /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline"><SiTextUnderline /></ToggleGroupItem>
        </ToggleGroup>
      </div>
    </Preview>
  )
}

export function ToggleGroupVertical() {
  return (
    <Preview>
      <ToggleGroup orientation="vertical" multiple>
        <ToggleGroupItem value="bold" aria-label="Toggle bold"><SiTextBold /></ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic"><SiTextItalic /></ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline"><SiTextUnderline /></ToggleGroupItem>
      </ToggleGroup>
    </Preview>
  )
}

export function ToggleGroupDisabled() {
  return (
    <Preview>
      <ToggleGroup multiple disabled>
        <ToggleGroupItem value="bold" aria-label="Toggle bold"><SiTextBold /></ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic"><SiTextItalic /></ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline"><SiTextUnderline /></ToggleGroupItem>
      </ToggleGroup>
    </Preview>
  )
}

export function ToggleGroupCustom() {
  return (
    <Preview>
      <ToggleGroup variant="outline" spacing={1}>
        <ToggleGroupItem value="light" className="gap-1.5 px-3 text-sm font-medium">Light</ToggleGroupItem>
        <ToggleGroupItem value="regular" className="gap-1.5 px-3 text-sm font-semibold">Regular</ToggleGroupItem>
        <ToggleGroupItem value="bold" className="gap-1.5 px-3 text-sm font-bold">Bold</ToggleGroupItem>
      </ToggleGroup>
    </Preview>
  )
}
