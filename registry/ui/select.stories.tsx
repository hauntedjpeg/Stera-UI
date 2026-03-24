import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"
import { Switch } from "./switch"

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="Apple">Apple</SelectItem>
          <SelectItem value="Banana">Banana</SelectItem>
          <SelectItem value="Blueberry">Blueberry</SelectItem>
          <SelectItem value="Grapes">Grapes</SelectItem>
          <SelectItem value="Pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const AlignItemWithTrigger: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => {
    const [alignItemWithTrigger, setAlignItemWithTrigger] = useState(true)
    return (
      <FieldGroup className="w-full max-w-xs">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="align-item">Align Item</FieldLabel>
            <FieldDescription>
              Toggle to align the item with the trigger.
            </FieldDescription>
          </FieldContent>
          <Switch
            id="align-item"
            checked={alignItemWithTrigger}
            onCheckedChange={setAlignItemWithTrigger}
          />
        </Field>
        <Field>
          <Select defaultValue="Banana">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={alignItemWithTrigger}>
              <SelectGroup>
                <SelectItem value="Apple">Apple</SelectItem>
                <SelectItem value="Banana">Banana</SelectItem>
                <SelectItem value="Blueberry">Blueberry</SelectItem>
                <SelectItem value="Grapes">Grapes</SelectItem>
                <SelectItem value="Pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>
    )
  },
}

export const Groups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a food" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="Apple">Apple</SelectItem>
          <SelectItem value="Banana">Banana</SelectItem>
          <SelectItem value="Blueberry">Blueberry</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="Carrot">Carrot</SelectItem>
          <SelectItem value="Broccoli">Broccoli</SelectItem>
          <SelectItem value="Spinach">Spinach</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const Scrollable: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="EST">Eastern Standard Time</SelectItem>
          <SelectItem value="CST">Central Standard Time</SelectItem>
          <SelectItem value="MST">Mountain Standard Time</SelectItem>
          <SelectItem value="PST">Pacific Standard Time</SelectItem>
          <SelectItem value="AKST">Alaska Standard Time</SelectItem>
          <SelectItem value="HST">Hawaii Standard Time</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Europe & Africa</SelectLabel>
          <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
          <SelectItem value="CET">Central European Time</SelectItem>
          <SelectItem value="EET">Eastern European Time</SelectItem>
          <SelectItem value="WEST">Western European Summer Time</SelectItem>
          <SelectItem value="CAT">Central Africa Time</SelectItem>
          <SelectItem value="EAT">East Africa Time</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="msk">Moscow Time</SelectItem>
          <SelectItem value="ist">India Standard Time</SelectItem>
          <SelectItem value="cst_china">China Standard Time</SelectItem>
          <SelectItem value="jst">Japan Standard Time</SelectItem>
          <SelectItem value="kst">Korea Standard Time</SelectItem>
          <SelectItem value="ist_indonesia">Indonesia Central Standard Time</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Australia & Pacific</SelectLabel>
          <SelectItem value="awst">Australian Western Standard Time</SelectItem>
          <SelectItem value="acst">Australian Central Standard Time</SelectItem>
          <SelectItem value="aest">Australian Eastern Standard Time</SelectItem>
          <SelectItem value="nzst">New Zealand Standard Time</SelectItem>
          <SelectItem value="fjt">Fiji Time</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>South America</SelectLabel>
          <SelectItem value="art">Argentina Time</SelectItem>
          <SelectItem value="bot">Bolivia Time</SelectItem>
          <SelectItem value="brt">Brasilia Time</SelectItem>
          <SelectItem value="clt">Chile Standard Time</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Apple">Apple</SelectItem>
          <SelectItem value="Banana">Banana</SelectItem>
          <SelectItem value="Blueberry">Blueberry</SelectItem>
          <SelectItem value="Grapes" disabled>Grapes</SelectItem>
          <SelectItem value="Pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <span className="text-text-tertiary text-xs">{size}</span>
          <Select>
            <SelectTrigger size={size} className="w-48">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Apple">Apple</SelectItem>
                <SelectItem value="Banana">Banana</SelectItem>
                <SelectItem value="Blueberry">Blueberry</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <Field data-invalid className="w-48">
      <FieldLabel>Fruit</FieldLabel>
      <Select>
        <SelectTrigger aria-invalid>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Apple">Apple</SelectItem>
            <SelectItem value="Banana">Banana</SelectItem>
            <SelectItem value="Blueberry">Blueberry</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldError>Please select a fruit.</FieldError>
    </Field>
  ),
}
