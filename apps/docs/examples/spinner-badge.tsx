import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerBadge() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>
        <Spinner data-icon="inline-start" aria-hidden />
        Syncing
      </Badge>
      <Badge variant="brand">
        <Spinner data-icon="inline-start" aria-hidden />
        Updating
      </Badge>
      <Badge variant="outline">
        Processing
        <Spinner data-icon="inline-end" aria-hidden />
      </Badge>
    </div>
  )
}
