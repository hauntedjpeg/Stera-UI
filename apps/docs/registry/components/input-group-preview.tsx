"use client"

import { SiCopy, SiEye, SiMail, SiSearch } from "stera-icons"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Preview } from "@/components/preview"

export function InputGroupIcon() {
  return (
    <Preview>
      <div className="flex w-80 flex-col gap-4">
        <InputGroup>
          <InputGroupAddon align="inline-start"><SiSearch /></InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon align="inline-end"><SiSearch /></InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon align="inline-start"><SiMail /></InputGroupAddon>
          <InputGroupInput placeholder="Email" />
          <InputGroupAddon align="inline-end"><SiEye /></InputGroupAddon>
        </InputGroup>
      </div>
    </Preview>
  )
}

export function InputGroupTextAddon() {
  return (
    <Preview>
      <div className="flex w-80 flex-col gap-4">
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="0.00" />
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="0.00" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="username" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>@company.com</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </Preview>
  )
}

export function InputGroupWithButton() {
  return (
    <Preview>
      <div className="flex w-80 flex-col gap-4">
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Search</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput defaultValue="https://example.com/invite/abc123" readOnly />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" aria-label="Copy"><SiCopy /></InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </Preview>
  )
}

export function InputGroupWithKbd() {
  return (
    <Preview>
      <InputGroup className="w-80">
        <InputGroupAddon align="inline-start"><SiSearch /></InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-end"><Kbd>⌘K</Kbd></InputGroupAddon>
      </InputGroup>
    </Preview>
  )
}

export function InputGroupSizes() {
  return (
    <Preview>
      <div className="flex w-80 flex-col gap-4">
        <InputGroup>
          <InputGroupAddon align="inline-start"><SiSearch /></InputGroupAddon>
          <InputGroupInput size="sm" placeholder="Small" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon align="inline-start"><SiSearch /></InputGroupAddon>
          <InputGroupInput size="md" placeholder="Medium (default)" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon align="inline-start"><SiSearch /></InputGroupAddon>
          <InputGroupInput size="lg" placeholder="Large" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon align="inline-start"><SiSearch /></InputGroupAddon>
          <InputGroupInput size="xl" placeholder="Extra large" />
        </InputGroup>
      </div>
    </Preview>
  )
}

export function InputGroupTextareaAddon() {
  return (
    <Preview>
      <div className="flex w-80 flex-col gap-4">
        <InputGroup>
          <InputGroupTextarea placeholder="Enter your message..." rows={3} />
          <InputGroupAddon align="block-end">
            <InputGroupText>Line 1, Column 1</InputGroupText>
            <InputGroupButton className="ml-auto">Run</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </Preview>
  )
}

export function InputGroupWithLabel() {
  return (
    <Preview>
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
    </Preview>
  )
}
