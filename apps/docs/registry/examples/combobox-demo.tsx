"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
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

export default function ComboboxDemo() {
  return (
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
  )
}
