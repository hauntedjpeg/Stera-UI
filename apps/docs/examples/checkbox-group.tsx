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
      <FieldLegend variant="label">Show these items on the desktop:</FieldLegend>
      <FieldGroup className="gap-3">
        <Field orientation="horizontal">
          <Checkbox id="hard-disks" defaultChecked />
          <FieldLabel htmlFor="hard-disks" className="font-normal">Hard disks</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="external-disks" defaultChecked />
          <FieldLabel htmlFor="external-disks" className="font-normal">External disks</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="cds" />
          <FieldLabel htmlFor="cds" className="font-normal">CDs, DVDs, and iPods</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="servers" />
          <FieldLabel htmlFor="servers" className="font-normal">Connected servers</FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
