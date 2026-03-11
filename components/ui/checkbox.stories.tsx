import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Checkbox } from "./checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
  FieldSet,
  FieldLegend
} from "./field"
import { Label } from "./label"

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {},
}

export const Demo: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <FieldGroup>
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" />
        <Label htmlFor="terms-checkbox">Accept terms and conditions</Label>
      </Field>
      <Field orientation="horizontal">
        <Checkbox
          id="terms-checkbox-2"
          name="terms-checkbox-2"
          defaultChecked
        />
        <FieldContent>
          <FieldLabel htmlFor="terms-checkbox-2">
            Accept terms and conditions
          </FieldLabel>
          <FieldDescription>
            By clicking this checkbox, you agree to the terms.
          </FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="toggle-checkbox" name="toggle-checkbox" disabled />
        <FieldLabel htmlFor="toggle-checkbox">Enable notifications</FieldLabel>
      </Field>
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              You can enable or disable notifications at any time.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
      <FieldLabel>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              You can enable or disable notifications at any time.
            </FieldDescription>
          </FieldContent>
          <Checkbox id="toggle-checkbox-3" name="toggle-checkbox-3" />
        </Field>
      </FieldLabel>
    </FieldGroup>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <Label className="">
      <Checkbox />
      Accept terms and conditions
    </Label>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Label className="">
      <Checkbox className="mt-0.5 self-start" />
      <FieldContent>
        <span className="text-sm font-medium leading-none">
          Accept terms and conditions
        </span>
        <FieldDescription>
          By clicking this checkbox, you agree to the terms and conditions.
        </FieldDescription>
      </FieldContent>
    </Label>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Label className="">
      <Checkbox disabled />
      Enable notifications
    </Label>
  ),
}

export const CheckboxGroup: Story = {
  render: () => (
    <FieldSet className="gap-2">
      <FieldLegend variant="label">Show these items on the desktop</FieldLegend>
      <Label className="">
        <Checkbox defaultChecked />
        Hard disks
      </Label>
      <Label className="">
        <Checkbox defaultChecked />
        External disks
      </Label>
      <Label className="">
        <Checkbox />
        CDs, DVDs, and iPods
      </Label>
      <Label className="">
        <Checkbox />
        Connected servers
      </Label>
    </FieldSet>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <Label className="">
        <Checkbox
          checked={checked}
          onCheckedChange={(c) => setChecked(c === true)}
        />
        {checked ? "Checked" : "Unchecked"}
      </Label>
    )
  },
}
