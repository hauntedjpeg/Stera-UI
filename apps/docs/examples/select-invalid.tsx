import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

export default function SelectInvalid() {
  return (
    <Field invalid className="w-48">
      <FieldLabel nativeLabel={false}>Fruit</FieldLabel>
      <Select>
        <SelectTrigger>
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
  )
}
