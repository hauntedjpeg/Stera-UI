"use client"

import { SiHash, SiX } from "stera-icons"
import { Chip } from "@/components/ui/chip"
import { Preview } from "@/components/preview"

export function ChipAllVariants() {
  return (
    <Preview>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Chip variant="subtle">Subtle</Chip>
        <Chip variant="outline">Outline</Chip>
        <Chip variant="solid">Solid</Chip>
      </div>
    </Preview>
  )
}

export function ChipAllSizes() {
  return (
    <Preview>
      <div className="flex items-center gap-2">
        <Chip size="xs">Extra Small</Chip>
        <Chip size="sm">Small</Chip>
        <Chip size="md">Medium</Chip>
        <Chip size="lg">Large</Chip>
      </div>
    </Preview>
  )
}

export function ChipWithIcons() {
  return (
    <Preview>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Chip variant="subtle" size="sm">
          <SiHash data-icon="inline-start" />
          Tag
        </Chip>
        <Chip variant="outline" size="sm">
          <SiHash data-icon="inline-start" />
          Tag
        </Chip>
        <Chip variant="solid" size="sm">
          <SiHash data-icon="inline-start" />
          Tag
        </Chip>
        <Chip variant="subtle" size="sm">
          Label
          <SiX data-icon="inline-end" />
        </Chip>
        <Chip variant="outline" size="sm">
          Label
          <SiX data-icon="inline-end" />
        </Chip>
        <Chip variant="solid" size="sm">
          Label
          <SiX data-icon="inline-end" />
        </Chip>
      </div>
    </Preview>
  )
}

export function ChipActiveState() {
  return (
    <Preview>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <Chip variant="subtle">Default</Chip>
          <Chip variant="subtle" active>Active</Chip>
        </div>
        <div className="flex items-center gap-2">
          <Chip variant="outline">Default</Chip>
          <Chip variant="outline" active>Active</Chip>
        </div>
        <div className="flex items-center gap-2">
          <Chip variant="solid">Default</Chip>
          <Chip variant="solid" active>Active</Chip>
        </div>
      </div>
    </Preview>
  )
}
