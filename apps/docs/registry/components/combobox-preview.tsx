"use client"

import * as React from "react"
import {
  SiCheckCircle,
  SiCircle,
  SiCircleDash,
  SiXCircle,
} from "stera-icons"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Preview } from "@/components/preview"

interface Framework {
  value: string
  label: string
}

const frameworks: Framework[] = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
  { value: "svelte", label: "SvelteKit" },
  { value: "angular", label: "Angular" },
]

const groupedFrameworks = [
  {
    label: "React-based",
    items: [
      { value: "next", label: "Next.js" },
      { value: "remix", label: "Remix" },
    ],
  },
  {
    label: "Vue-based",
    items: [
      { value: "nuxt", label: "Nuxt" },
      { value: "vue", label: "Vue.js" },
    ],
  },
  {
    label: "Other",
    items: [
      { value: "astro", label: "Astro" },
      { value: "svelte", label: "SvelteKit" },
      { value: "angular", label: "Angular" },
    ],
  },
]

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

export function ComboboxDefault() {
  return (
    <Preview>
      <div className="w-64">
        <Combobox items={frameworks} itemToStringLabel={(fw: Framework) => fw.label}>
          <ComboboxInput placeholder="Select framework..." />
          <ComboboxContent>
            <ComboboxEmpty>No framework found.</ComboboxEmpty>
            <ComboboxList>
              {(fw: Framework) => (
                <ComboboxItem key={fw.value} value={fw}>{fw.label}</ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </Preview>
  )
}

function MultipleDemo() {
  const anchor = useComboboxAnchor()
  const [value, setValue] = React.useState<Framework[]>([])

  return (
    <div className="w-72">
      <Combobox
        multiple
        items={frameworks}
        itemToStringLabel={(fw: Framework) => fw.label}
        value={value}
        onValueChange={setValue}
      >
        <ComboboxChips ref={anchor}>
          {value.map((fw) => (
            <ComboboxChip key={fw.value}>{fw.label}</ComboboxChip>
          ))}
          <ComboboxChipsInput placeholder="Select frameworks..." />
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxList>
            {(fw: Framework) => (
              <ComboboxItem key={fw.value} value={fw}>{fw.label}</ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

export function ComboboxMultiple() {
  return (
    <Preview>
      <MultipleDemo />
    </Preview>
  )
}

export function ComboboxGroups() {
  return (
    <Preview>
      <div className="w-64">
        <Combobox items={groupedFrameworks} itemToStringLabel={(fw: Framework) => fw.label}>
          <ComboboxInput placeholder="Select framework..." />
          <ComboboxContent>
            <ComboboxEmpty>No framework found.</ComboboxEmpty>
            <ComboboxList>
              <ComboboxCollection>
                {(group: (typeof groupedFrameworks)[number], index: number) => (
                  <ComboboxGroup key={group.label}>
                    {index > 0 && <ComboboxSeparator />}
                    <ComboboxLabel>{group.label}</ComboboxLabel>
                    {group.items.map((fw) => (
                      <ComboboxItem key={fw.value} value={fw}>{fw.label}</ComboboxItem>
                    ))}
                  </ComboboxGroup>
                )}
              </ComboboxCollection>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </Preview>
  )
}

export function ComboboxCustomItems() {
  return (
    <Preview>
      <div className="w-72">
        <Combobox items={statuses} itemToStringLabel={(s: Status) => s.label}>
          <ComboboxInput placeholder="Set status..." />
          <ComboboxContent>
            <ComboboxEmpty>No status found.</ComboboxEmpty>
            <ComboboxList>
              {(status: Status) => (
                <ComboboxItem key={status.value} value={status}>
                  <status.icon className="size-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span>{status.label}</span>
                    <span className="text-xs text-muted-foreground">{status.description}</span>
                  </div>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </Preview>
  )
}

function PopupDemo() {
  return (
    <div className="w-64">
      <Combobox
        items={frameworks}
        itemToStringLabel={(fw: Framework) => fw.label}
        defaultValue={frameworks[0]}
      >
        <ComboboxTrigger
          render={
            <Button variant="outline" className="w-full justify-between font-normal" />
          }
        >
          <ComboboxValue />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput showTrigger={false} placeholder="Search" />
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxList>
            {(fw: Framework) => (
              <ComboboxItem key={fw.value} value={fw}>{fw.label}</ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

export function ComboboxPopup() {
  return (
    <Preview>
      <PopupDemo />
    </Preview>
  )
}

export function ComboboxInvalid() {
  return (
    <Preview>
      <div className="w-64">
        <Field data-invalid="true">
          <FieldLabel>Framework</FieldLabel>
          <Combobox items={frameworks} itemToStringLabel={(fw: Framework) => fw.label}>
            <ComboboxInput aria-invalid="true" placeholder="Select framework..." />
            <ComboboxContent>
              <ComboboxEmpty>No framework found.</ComboboxEmpty>
              <ComboboxList>
                {(fw: Framework) => (
                  <ComboboxItem key={fw.value} value={fw}>{fw.label}</ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldError>Please select a framework.</FieldError>
        </Field>
      </div>
    </Preview>
  )
}
