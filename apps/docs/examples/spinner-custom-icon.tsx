import { SiSpinner, SiSpinnerDuotone } from "stera-icons"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerCustomIcon() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-6" />
      <Spinner icon={SiSpinner} className="size-6" />
      <Spinner icon={SiSpinnerDuotone} className="size-6" />
    </div>
  )
}
