import { SiHeart, SiHeartFill } from "stera-icons"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleDemo() {
  return (
    <Toggle>
      <SiHeart
        data-icon="inline-start"
        className="group-data-pressed/toggle:hidden"
      />
      <SiHeartFill
        data-icon="inline-start"
        className="not-group-data-pressed/toggle:hidden"
      />
      Like
    </Toggle>
  )
}
