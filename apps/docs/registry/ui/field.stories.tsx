import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox } from "./checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./field"
import { Input } from "./input"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { Slider } from "./slider"
import { Switch } from "./switch"
import { Textarea } from "./textarea"

const meta: Meta<typeof Field> = {
  title: "UI/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Field>

export const Default: Story = {
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="default-email">Email address</FieldLabel>
      <Input id="default-email" type="email" placeholder="you@example.com" />
      <FieldDescription>We will never share your email.</FieldDescription>
    </Field>
  ),
}

export const WithTextarea: Story = {
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="textarea-bio">Bio</FieldLabel>
      <Textarea id="textarea-bio" placeholder="Tell us about yourself..." />
      <FieldDescription>Max 250 characters.</FieldDescription>
    </Field>
  ),
}

export const WithSelect: Story = {
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="select-role">Role</FieldLabel>
      <Select defaultValue="viewer">
        <SelectTrigger id="select-role" className="w-full">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
      <FieldDescription>Controls what this user can access.</FieldDescription>
    </Field>
  ),
}

export const WithSlider: Story = {
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel>Opacity</FieldLabel>
      <Slider defaultValue={[75]} min={0} max={100} />
      <FieldDescription>
        Adjust the opacity level from 0 to 100.
      </FieldDescription>
    </Field>
  ),
}

export const Horizontal: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <Field orientation="horizontal" className="max-w-md">
      <FieldContent>
        <FieldTitle>Marketing emails</FieldTitle>
        <FieldDescription>
          Receive emails about new products, features, and more.
        </FieldDescription>
      </FieldContent>
      <Switch />
    </Field>
  ),
}

export const Responsive: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <FieldGroup className="max-w-2xl">
      <Field orientation="responsive">
        <FieldLabel htmlFor="responsive-first">First name</FieldLabel>
        <Input id="responsive-first" placeholder="Jane" />
      </Field>
      <Field orientation="responsive">
        <FieldLabel htmlFor="responsive-last">Last name</FieldLabel>
        <Input id="responsive-last" placeholder="Doe" />
      </Field>
      <Field orientation="responsive">
        <FieldLabel htmlFor="responsive-email">Email</FieldLabel>
        <Input
          id="responsive-email"
          type="email"
          placeholder="jane@example.com"
        />
      </Field>
    </FieldGroup>
  ),
}

export const WithError: Story = {
  render: () => (
    <Field data-invalid="true" className="max-w-sm">
      <FieldLabel htmlFor="error-email">Email address</FieldLabel>
      <Input
        id="error-email"
        type="email"
        aria-invalid="true"
        defaultValue="not-an-email"
      />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  ),
}

export const WithMultipleErrors: Story = {
  render: () => (
    <Field data-invalid="true" className="max-w-sm">
      <FieldLabel htmlFor="multi-error-password">Password</FieldLabel>
      <Input
        id="multi-error-password"
        type="password"
        aria-invalid="true"
        defaultValue="abc"
      />
      <FieldError
        errors={[
          { message: "Password must be at least 8 characters." },
          { message: "Password must contain a number." },
          { message: "Password must contain a special character." },
        ]}
      />
    </Field>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Field data-disabled="true" className="max-w-sm">
      <FieldLabel htmlFor="disabled-email">Email address</FieldLabel>
      <Input
        id="disabled-email"
        type="email"
        disabled
        defaultValue="disabled@example.com"
      />
      <FieldDescription>This field cannot be edited.</FieldDescription>
    </Field>
  ),
}

export const CheckboxGroup: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <FieldSet className="max-w-sm">
      <FieldLegend variant="label">Notifications</FieldLegend>
      <FieldDescription>
        Select which notifications you would like to receive.
      </FieldDescription>
      <FieldGroup className="gap-3">
        <Field orientation="horizontal">
          <Checkbox
            id="notif-email"
            name="notif-email"
            defaultChecked
          />
          <FieldLabel htmlFor="notif-email" className="font-normal">
            Email notifications
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="notif-sms" name="notif-sms" />
          <FieldLabel htmlFor="notif-sms" className="font-normal">
            SMS notifications
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox
            id="notif-push"
            name="notif-push"
            defaultChecked
          />
          <FieldLabel htmlFor="notif-push" className="font-normal">
            Push notifications
          </FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}

export const RadioGroupExample: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <FieldSet className="max-w-sm">
      <FieldLegend variant="label">Plan</FieldLegend>
      <FieldDescription>Select your subscription plan.</FieldDescription>
      <RadioGroup defaultValue="pro">
        <Field orientation="horizontal">
          <RadioGroupItem id="plan-free" value="free" />
          <FieldLabel htmlFor="plan-free" className="font-normal">
            Free
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem id="plan-pro" value="pro" />
          <FieldLabel htmlFor="plan-pro" className="font-normal">
            Pro
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem id="plan-enterprise" value="enterprise" />
          <FieldLabel htmlFor="plan-enterprise" className="font-normal">
            Enterprise
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  ),
}

export const ChoiceCards: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <FieldGroup className="max-w-sm">
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox name="feature-analytics" defaultChecked />
          <FieldContent>
            <FieldTitle>Analytics</FieldTitle>
            <FieldDescription>
              Track page views, clicks, and conversions.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox name="feature-api" />
          <FieldContent>
            <FieldTitle>API access</FieldTitle>
            <FieldDescription>
              Programmatic access to your data via REST API.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox name="feature-sso" />
          <FieldContent>
            <FieldTitle>Single sign-on</FieldTitle>
            <FieldDescription>
              Enable SSO with your identity provider.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  ),
}

export const WithSeparator: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="sep-email">Email address</FieldLabel>
        <Input id="sep-email" type="email" placeholder="you@example.com" />
      </Field>
      <FieldSeparator>or</FieldSeparator>
      <Field>
        <FieldLabel htmlFor="sep-phone">Phone number</FieldLabel>
        <Input id="sep-phone" type="tel" placeholder="+1 (555) 000-0000" />
      </Field>
      <FieldSeparator />
      <Field>
        <FieldLabel htmlFor="sep-username">Username</FieldLabel>
        <Input id="sep-username" placeholder="johndoe" />
      </Field>
    </FieldGroup>
  ),
}

export const FormExample: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <FieldGroup className="max-w-lg">
      <Field>
        <FieldLabel htmlFor="form-name">Full name</FieldLabel>
        <Input id="form-name" placeholder="Jane Doe" />
      </Field>

      <Field data-invalid="true">
        <FieldLabel htmlFor="form-email">Email address</FieldLabel>
        <Input
          id="form-email"
          type="email"
          aria-invalid="true"
          defaultValue="invalid-email"
        />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="form-role">Role</FieldLabel>
        <Select defaultValue="editor">
          <SelectTrigger id="form-role" className="w-full">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel htmlFor="form-bio">Bio</FieldLabel>
        <Textarea id="form-bio" placeholder="Tell us about yourself..." />
        <FieldDescription>Brief description for your profile.</FieldDescription>
      </Field>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend variant="label">Notifications</FieldLegend>
        <FieldDescription>
          Choose how you want to be notified.
        </FieldDescription>
        <FieldGroup className="gap-3">
          <Field orientation="horizontal">
            <Checkbox
              id="form-notif-email"
              name="form-notif-email"
              defaultChecked
            />
            <FieldLabel htmlFor="form-notif-email" className="font-normal">
              Email
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="form-notif-sms" name="form-notif-sms" />
            <FieldLabel htmlFor="form-notif-sms" className="font-normal">
              SMS
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator />

      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Marketing emails</FieldTitle>
          <FieldDescription>
            Receive emails about new products and features.
          </FieldDescription>
        </FieldContent>
        <Switch />
      </Field>
    </FieldGroup>
  ),
}
