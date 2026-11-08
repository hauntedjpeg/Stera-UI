"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function PopoverWithForm() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Dimensions
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <FieldGroup>
          <Field>
            <FieldLabel>Width</FieldLabel>
            <Input defaultValue="100%" />
          </Field>
          <Field>
            <FieldLabel>Height</FieldLabel>
            <Input defaultValue="25px" />
          </Field>
        </FieldGroup>
      </PopoverContent>
    </Popover>
  )
}
