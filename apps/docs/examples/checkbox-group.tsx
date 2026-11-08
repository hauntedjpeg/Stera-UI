import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"

export default function CheckboxGroup() {
  return (
    <FieldSet>
      <FieldLegend variant="label">
        Show these items on the desktop:
      </FieldLegend>
      <FieldGroup className="gap-3">
        <Field orientation="horizontal">
          <Checkbox defaultChecked />
          <FieldLabel className="st-label-md">Hard disks</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox defaultChecked />
          <FieldLabel className="st-label-md">External disks</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox />
          <FieldLabel className="st-label-md">CDs, DVDs, and iPods</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox />
          <FieldLabel className="st-label-md">Connected servers</FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
