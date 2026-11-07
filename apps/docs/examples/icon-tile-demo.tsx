import {
  SiAlertTriangle,
  SiCheckCircle,
  SiFolder,
  SiSparkle,
} from "stera-icons"

import { IconTile } from "@/components/ui/icon-tile"

export default function IconTileDemo() {
  return (
    <div className="flex items-center gap-4">
      <IconTile>
        <SiFolder />
      </IconTile>
      <IconTile variant="brand">
        <SiSparkle />
      </IconTile>
      <IconTile variant="success">
        <SiCheckCircle />
      </IconTile>
      <IconTile variant="warning-solid">
        <SiAlertTriangle />
      </IconTile>
    </div>
  )
}
