import { SiCircle, SiCheck } from "stera-icons"
import { Badge } from "@/components/ui/badge"

export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>
        <SiCircle data-icon="inline-start" />
        Offline
      </Badge>
      <Badge>
        Copied
        <SiCheck data-icon="inline-end" />
      </Badge>
    </div>
  )
}
