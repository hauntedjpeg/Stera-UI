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

export default function ComboboxClear() {
  return (
    <div className="w-64">
      <Combobox
        items={frameworks}
        itemToStringLabel={(fw: Framework) => fw.label}
        defaultValue={frameworks[0]}
      >
        <ComboboxInput placeholder="Select framework..." showClear />
        <ComboboxContent>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxList>
            {(fw: Framework) => (
              <ComboboxItem key={fw.value} value={fw}>
                {fw.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
