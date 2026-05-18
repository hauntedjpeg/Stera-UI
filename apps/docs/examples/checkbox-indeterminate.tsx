"use client"

import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

const items = [
  { id: "indet-hard-disks", label: "Hard disks" },
  { id: "indet-external-disks", label: "External disks" },
  { id: "indet-servers", label: "Connected servers" },
]

export default function CheckboxIndeterminate() {
  const [selected, setSelected] = React.useState<Set<string>>(
    new Set([items[0].id])
  )

  const allChecked = selected.size === items.length
  const someChecked = selected.size > 0 && !allChecked

  const handleParentChange = (checked: boolean) => {
    if (checked) {
      setSelected(new Set(items.map((item) => item.id)))
    } else {
      setSelected(new Set())
    }
  }

  const handleItemChange = (id: string, checked: boolean) => {
    const next = new Set(selected)
    if (checked) {
      next.add(id)
    } else {
      next.delete(id)
    }
    setSelected(next)
  }

  return (
    <FieldGroup className="w-56">
      <Field orientation="horizontal">
        <Checkbox
          id="indet-parent"
          checked={allChecked}
          indeterminate={someChecked}
          onCheckedChange={handleParentChange}
        />
        <FieldLabel htmlFor="indet-parent">Show on desktop</FieldLabel>
      </Field>
      <FieldGroup className="gap-3 pl-6">
        {items.map((item) => (
          <Field key={item.id} orientation="horizontal">
            <Checkbox
              id={item.id}
              checked={selected.has(item.id)}
              onCheckedChange={(checked) => handleItemChange(item.id, checked)}
            />
            <FieldLabel htmlFor={item.id} className="font-normal">
              {item.label}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldGroup>
  )
}
