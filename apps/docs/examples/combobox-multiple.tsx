"use client"

import * as React from "react"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  useComboboxAnchor,
} from "@/components/ui/combobox"

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

export default function ComboboxMultiple() {
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
