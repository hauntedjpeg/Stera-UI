import type { Meta, StoryObj } from "@storybook/react"

import { Badge } from "./badge"
import { Button } from "./button"
import { ButtonGroup } from "./button-group"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./field"
import { Input } from "./input"
import {
  InputGroup,
  InputGroupInput,
  InputGroupText,
} from "./input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => <Input placeholder="Email" />,
}

export const WithField: Story = {
  render: () => (
    <Field className="w-sm">
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" placeholder="johndoe" />
      <FieldDescription>Choose a unique username for your account.</FieldDescription>
    </Field>
  ),
}

export const WithFieldGroup: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <FieldGroup className="w-sm">
      <Field>
        <FieldLabel htmlFor="fg-name">Name</FieldLabel>
        <Input id="fg-name" placeholder="Jane Doe" />
      </Field>
      <Field>
        <FieldLabel htmlFor="fg-email">Email</FieldLabel>
        <Input id="fg-email" type="email" placeholder="jane@example.com" />
        <FieldDescription>We'll send updates to this address.</FieldDescription>
      </Field>
      <div className="flex justify-end gap-2">
        <Button variant="outline" type="reset">Reset</Button>
        <Button variant="brand" type="submit">Submit</Button>
      </div>
    </FieldGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Field data-disabled="true" className="w-sm">
      <FieldLabel htmlFor="disabled-email">Email</FieldLabel>
      <Input id="disabled-email" type="email" disabled defaultValue="jane@example.com" />
      <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
  ),
}

export const Invalid: Story = {
  render: () => (
    <Field data-invalid="true" className="w-sm">
      <FieldLabel htmlFor="invalid-input">Invalid Input</FieldLabel>
      <Input id="invalid-input" aria-invalid="true" defaultValue="bad value" />
      <FieldError>This field contains validation errors.</FieldError>
    </Field>
  ),
}

export const File: Story = {
  render: () => (
    <Field className="w-sm">
      <FieldLabel htmlFor="picture">Picture</FieldLabel>
      <Input id="picture" type="file" />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field>
  ),
}

export const Inline: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <Field orientation="horizontal" className="w-sm">
      <FieldLabel htmlFor="inline-search" className="shrink-0">Search</FieldLabel>
      <Input id="inline-search" placeholder="Search..." />
      <Button variant="outline">Search</Button>
    </Field>
  ),
}

export const Grid: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div className="grid w-sm grid-cols-2 gap-4">
      <Field>
        <FieldLabel htmlFor="grid-first">First Name</FieldLabel>
        <Input id="grid-first" placeholder="Jane" />
      </Field>
      <Field>
        <FieldLabel htmlFor="grid-last">Last Name</FieldLabel>
        <Input id="grid-last" placeholder="Doe" />
      </Field>
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <Field className="w-sm">
      <FieldLabel htmlFor="required-field">Required Field *</FieldLabel>
      <Input id="required-field" required placeholder="Enter a value" />
      <FieldDescription>This field must be filled out.</FieldDescription>
    </Field>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <Field className="w-sm">
      <FieldLabel htmlFor="webhook-url" className="flex items-center gap-2">
        Webhook URL
        <Badge variant="default" className="ml-auto">Beta</Badge>
      </FieldLabel>
      <Input id="webhook-url" placeholder="https://example.com/webhook" />
    </Field>
  ),
}

export const WithInputGroup: Story = {
  render: () => (
    <Field className="w-sm">
      <FieldLabel htmlFor="website-url">Website URL</FieldLabel>
      <InputGroup>
        <InputGroupText>https://</InputGroupText>
        <InputGroupInput id="website-url" placeholder="example.com" />
      </InputGroup>
    </Field>
  ),
}

export const WithButtonGroup: Story = {
  render: () => (
    <ButtonGroup>
      <Input placeholder="Search..." className="w-48" />
      <Button variant="outline">Search</Button>
    </ButtonGroup>
  ),
}

export const Form: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <FieldGroup className="w-sm">
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="form-first">First Name</FieldLabel>
          <Input id="form-first" placeholder="Jane" />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-last">Last Name</FieldLabel>
          <Input id="form-last" placeholder="Doe" />
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor="form-email">Email</FieldLabel>
        <Input id="form-email" type="email" placeholder="jane@example.com" />
      </Field>
      <Field>
        <FieldLabel htmlFor="form-country">Country</FieldLabel>
        <Select>
          <SelectTrigger id="form-country" className="w-full">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="gb">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <div className="flex justify-end gap-2">
        <Button variant="outline" type="reset">Cancel</Button>
        <Button variant="brand" type="submit">Save</Button>
      </div>
    </FieldGroup>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-xs">sm</span>
        <Input size="sm" placeholder="Small" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-xs">md</span>
        <Input size="md" placeholder="Medium (default)" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-xs">lg</span>
        <Input size="lg" placeholder="Large" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-xs">xl</span>
        <Input size="xl" placeholder="Extra Large" />
      </div>
    </div>
  ),
}
