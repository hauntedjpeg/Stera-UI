"use client"

import { SiDownload, SiPlus } from "stera-icons"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Preview } from "@/components/preview"

export function ButtonAllVariants() {
  return (
    <Preview>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="brand">Brand</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="link">Link</Button>
      </div>
    </Preview>
  )
}

export function ButtonAllSizes() {
  return (
    <Preview>
      <div className="flex flex-wrap items-end justify-center gap-3">
        <Button size="xs">
          <SiPlus data-icon="inline-start" />
          Extra Small
        </Button>
        <Button size="sm">
          <SiPlus data-icon="inline-start" />
          Small
        </Button>
        <Button size="md">
          <SiPlus data-icon="inline-start" />
          Default
        </Button>
        <Button size="lg">
          <SiPlus data-icon="inline-start" />
          Large
        </Button>
        <Button size="icon-xs" aria-label="Add">
          <SiPlus />
        </Button>
        <Button size="icon-sm" aria-label="Add">
          <SiPlus />
        </Button>
        <Button size="icon" aria-label="Add">
          <SiPlus />
        </Button>
        <Button size="icon-lg" aria-label="Add">
          <SiPlus />
        </Button>
      </div>
    </Preview>
  )
}

export function ButtonWithIcon() {
  return (
    <Preview>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="outline">
          <SiPlus data-icon="inline-start" />
          New item
        </Button>
        <Button variant="outline" size="icon" aria-label="Download">
          <SiDownload size={16} />
        </Button>
        <Button variant="outline">
          Open command menu
          <Kbd data-kbd="inline-end">⌘K</Kbd>
        </Button>
      </div>
    </Preview>
  )
}

export function ButtonDisabled() {
  return (
    <Preview>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="brand" disabled>
          Brand
        </Button>
        <Button variant="outline" disabled>
          Outline
        </Button>
        <Button variant="danger" disabled>
          Danger
        </Button>
      </div>
    </Preview>
  )
}
