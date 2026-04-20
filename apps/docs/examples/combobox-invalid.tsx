"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

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

export default function ComboboxInvalid() {
  return (
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
  )
}
