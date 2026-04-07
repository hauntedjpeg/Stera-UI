"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Preview } from "@/components/preview"

export function SelectDefault() {
  return (
    <Preview>
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
    </Preview>
  )
}

export function SelectGroups() {
  return (
    <Preview>
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
    </Preview>
  )
}

export function SelectAllSizes() {
  return (
    <Preview>
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
    </Preview>
  )
}

export function SelectDisabled() {
  return (
    <Preview>
      <Select disabled>
        <SelectTrigger className="w-48">
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
    </Preview>
  )
}

export function SelectInvalid() {
  return (
    <Preview>
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
    </Preview>
  )
}
