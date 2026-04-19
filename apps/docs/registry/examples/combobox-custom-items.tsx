"use client"

import * as React from "react"
import { SiCheckCircle, SiCircle, SiCircleDash, SiXCircle } from "stera-icons"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

interface Status {
  value: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

const statuses: Status[] = [
  { value: "backlog", label: "Backlog", icon: SiCircle, description: "Not yet started" },
  { value: "in-progress", label: "In Progress", icon: SiCircleDash, description: "Currently being worked on" },
  { value: "done", label: "Done", icon: SiCheckCircle, description: "Completed" },
  { value: "cancelled", label: "Cancelled", icon: SiXCircle, description: "Will not be completed" },
]

export default function ComboboxCustomItems() {
  return (
    <div className="w-72">
      <Combobox items={statuses} itemToStringLabel={(s: Status) => s.label}>
        <ComboboxInput placeholder="Set status..." />
        <ComboboxContent>
          <ComboboxEmpty>No status found.</ComboboxEmpty>
          <ComboboxList>
            {(status: Status) => (
              <ComboboxItem key={status.value} value={status}>
                <status.icon className="size-4 text-text-secondary" />
                <div className="flex flex-col">
                  <span>{status.label}</span>
                  <span className="text-xs text-text-secondary">{status.description}</span>
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
