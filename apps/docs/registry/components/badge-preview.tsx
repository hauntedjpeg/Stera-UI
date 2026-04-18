"use client"

import {
  SiCircle,
  SiCheck
} from "stera-icons"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { Preview } from "@/components/preview"

export function BadgePreview() {
  return (
    <Preview>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge>Badge</Badge>
        <Badge variant="solid">Solid</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </Preview>
  )
}

export function BadgeWithIcon() {
  return (
    <Preview>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge><SiCircle data-icon="inline-start" />Offline</Badge>
        <Badge>Copied<SiCheck data-icon="inline-end" /></Badge>
      </div>
    </Preview>
  )
}

export function BadgeWithSpinner() {
  return (
    <Preview>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge><Spinner data-icon="inline-start" />Processing</Badge>
        <Badge>Thinking<Spinner data-icon="inline-end" /></Badge>
      </div>
    </Preview>
  )
}

export function BadgeAllColors() {
  return (
    <Preview>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="brand">Brand</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
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
