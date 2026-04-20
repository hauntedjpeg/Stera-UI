import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function LabelDisabled() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms-disabled" disabled />
      <Label
        htmlFor="terms-disabled"
        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
      >
        Accept terms and conditions
      </Label>
    </div>
  )
}
