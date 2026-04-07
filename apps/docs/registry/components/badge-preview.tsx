"use client"

import { SiCircleFill } from "stera-icons"
import { Badge } from "@/components/ui/badge"
import { Preview } from "@/components/preview"

export function BadgeAllVariants() {
  return (
    <Preview>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="default">Subtle</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="solid">Solid</Badge>
        <Badge variant="brand">Brand</Badge>
        <Badge variant="brand-outline">Brand Outline</Badge>
        <Badge variant="brand-solid">Brand Solid</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="accent-outline">Accent Outline</Badge>
        <Badge variant="accent-solid">Accent Solid</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="danger-outline">Danger Outline</Badge>
        <Badge variant="danger-solid">Danger Solid</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="success-outline">Success Outline</Badge>
        <Badge variant="success-solid">Success Solid</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="warning-outline">Warning Outline</Badge>
        <Badge variant="warning-solid">Warning Solid</Badge>
      </div>
    </Preview>
  )
}

export function BadgeAllSizes() {
  return (
    <Preview>
      <div className="flex items-center gap-2">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Default</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    </Preview>
  )
}

export function BadgeWithIcon() {
  return (
    <Preview>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="success" size="sm">
          <SiCircleFill data-icon="inline-start" />
          Active
        </Badge>
        <Badge variant="success" size="md">
          <SiCircleFill data-icon="inline-start" />
          Active
        </Badge>
        <Badge variant="success" size="lg">
          <SiCircleFill data-icon="inline-start" />
          Active
        </Badge>
        <Badge variant="danger" size="sm">
          Offline
          <SiCircleFill data-icon="inline-end" />
        </Badge>
        <Badge variant="danger" size="md">
          Offline
          <SiCircleFill data-icon="inline-end" />
        </Badge>
        <Badge variant="danger" size="lg">
          Offline
          <SiCircleFill data-icon="inline-end" />
        </Badge>
      </div>
    </Preview>
  )
}
