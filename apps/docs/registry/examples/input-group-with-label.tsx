"use client"

import { SiMail } from "stera-icons"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"

export default function InputGroupWithLabel() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="ig-email">Email address</FieldLabel>
        <InputGroup>
          <InputGroupAddon align="inline-start"><SiMail /></InputGroupAddon>
          <InputGroupInput id="ig-email" placeholder="you@example.com" />
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="ig-website">Website</FieldLabel>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput id="ig-website" placeholder="example.com" />
        </InputGroup>
        <FieldDescription>Your public-facing URL.</FieldDescription>
      </Field>
    </div>
  )
}
