import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export default function BadgeWithSpinner() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>
        <Spinner data-icon="inline-start" />
        Processing
      </Badge>
      <Badge>
        Thinking
        <Spinner data-icon="inline-end" />
      </Badge>
    </div>
  )
}
