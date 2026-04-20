"use client"

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "@/components/ui/combobox"

interface Framework {
  value: string
  label: string
}

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

export default function ComboboxGroups() {
  return (
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
  )
}
