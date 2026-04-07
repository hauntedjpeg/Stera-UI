"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Preview } from "@/components/preview"

export function LabelWithInput() {
  return (
    <Preview>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email-preview">Your email address</Label>
        <Input id="email-preview" type="email" placeholder="you@example.com" />
      </div>
    </Preview>
  )
}

export function LabelWithCheckbox() {
  return (
    <Preview>
      <div className="flex items-center gap-2">
        <Checkbox id="terms-preview" />
        <Label htmlFor="terms-preview">Accept terms and conditions</Label>
      </div>
    </Preview>
  )
}

export function LabelDisabled() {
  return (
    <Preview>
      <div className="flex items-center gap-2">
        <Checkbox id="terms-disabled-preview" disabled />
        <Label
          htmlFor="terms-disabled-preview"
          className="peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        >
          Accept terms and conditions
        </Label>
      </div>
    </Preview>
  )
}
