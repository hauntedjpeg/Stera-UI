import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox } from "./checkbox"
import { Input } from "./input"
import { Label } from "./label"
import { Textarea } from "./textarea"

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    children: "Your email address",
  },
}

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Your email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const AcceptTerms: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms-disabled" disabled />
      <Label
        htmlFor="terms-disabled"
        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
      >
        Accept terms and conditions
      </Label>
    </div>
  ),
}

export const PaymentForm: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name on Card</Label>
        <Input id="name" placeholder="Jane Doe" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="card-number">Card Number</Label>
        <Input id="card-number" placeholder="0000 0000 0000 0000" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="expiry">Expiry</Label>
          <Input id="expiry" placeholder="MM / YY" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input id="cvc" placeholder="CVC" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="billing-address">Billing Address</Label>
        <Input id="billing-address" placeholder="123 Main St" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="comments">Comments</Label>
        <Textarea id="comments" placeholder="Any special instructions..." />
      </div>
    </div>
  ),
}
