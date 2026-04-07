import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  SiCircle,
  SiCircleDash,
  SiCheckCircle,
  SiXCircle,
  SiSearch,
} from "stera-icons"

import { Button } from "./button"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "./combobox"
import { Field, FieldError, FieldLabel } from "./field"
import { InputGroupAddon } from "./input-group"

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
  { value: "vue", label: "Vue.js" },
  { value: "solid", label: "SolidStart" },
]

interface Status {
  value: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
    icon: SiCircle,
    description: "Not yet started",
  },
  {
    value: "in-progress",
    label: "In Progress",
    icon: SiCircleDash,
    description: "Currently being worked on",
  },
  {
    value: "done",
    label: "Done",
    icon: SiCheckCircle,
    description: "Completed",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: SiXCircle,
    description: "Will not be completed",
  },
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
      { value: "solid", label: "SolidStart" },
    ],
  },
]

const meta: Meta<typeof Combobox> = {
  title: "UI/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Combobox>

export const Basic: Story = {
  render: () => (
    <div className="w-64">
      <Combobox items={frameworks} itemToStringLabel={(fw: Framework) => fw.label}>
        <ComboboxInput placeholder="Select framework..." />
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
  ),
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
            <ComboboxChip key={fw.value}>
              {fw.label}
            </ComboboxChip>
          ))}
          <ComboboxChipsInput placeholder="Select frameworks..." />
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
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

export const Multiple: Story = {
  render: () => <MultipleDemo />,
}

export const ClearButton: Story = {
  render: () => (
    <div className="w-64">
      <Combobox
        items={frameworks}
        itemToStringLabel={(fw: Framework) => fw.label}
        defaultValue={frameworks[0]}
      >
        <ComboboxInput showClear placeholder="Select framework..." />
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
  ),
}

export const Groups: Story = {
  render: () => (
    <div className="w-64">
      <Combobox
        items={groupedFrameworks}
        itemToStringLabel={(fw: Framework) => fw.label}
      >
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
                    <ComboboxItem key={fw.value} value={fw}>
                      {fw.label}
                    </ComboboxItem>
                  ))}
                </ComboboxGroup>
              )}
            </ComboboxCollection>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
}

export const CustomItems: Story = {
  render: () => (
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
                  <span className="text-xs text-text-secondary">
                    {status.description}
                  </span>
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="w-64">
      <Field data-invalid="true">
        <FieldLabel>Framework</FieldLabel>
        <Combobox items={frameworks} itemToStringLabel={(fw: Framework) => fw.label}>
          <ComboboxInput
            aria-invalid="true"
            placeholder="Select framework..."
          />
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
        <FieldError>Please select a framework.</FieldError>
      </Field>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-64">
      <Combobox
        items={frameworks}
        itemToStringLabel={(fw: Framework) => fw.label}
        defaultValue={frameworks[0]}
      >
        <ComboboxInput disabled placeholder="Select framework..." />
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
  ),
}

export const AutoHighlight: Story = {
  render: () => (
    <div className="w-64">
      <Combobox
        items={frameworks}
        itemToStringLabel={(fw: Framework) => fw.label}
        autoHighlight={"always" as unknown as boolean}
      >
        <ComboboxInput placeholder="Select framework..." />
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
  ),
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
            <Button
              variant="outline"
              className="w-full justify-between font-normal"
            />
          }
        >
          <ComboboxValue />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput showTrigger={false} placeholder="Search" />
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

export const Popup: Story = {
  render: () => <PopupDemo />,
}

function InputGroupDemo() {
  const anchor = useComboboxAnchor()

  return (
    <div className="w-64">
      <Combobox items={frameworks} itemToStringLabel={(fw: Framework) => fw.label}>
        <div ref={anchor}>
          <ComboboxInput placeholder="Search framework...">
            <InputGroupAddon align="inline-start">
              <SiSearch />
            </InputGroupAddon>
          </ComboboxInput>
        </div>
        <ComboboxContent anchor={anchor}>
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

export const WithInputGroup: Story = {
  render: () => <InputGroupDemo />,
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <span className="text-text-secondary text-xs">{size}</span>
          <div className="w-64">
            <Combobox items={frameworks} itemToStringLabel={(fw: Framework) => fw.label}>
              <ComboboxInput size={size} placeholder={`Size ${size}...`} />
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
        </div>
      ))}
    </div>
  ),
}
