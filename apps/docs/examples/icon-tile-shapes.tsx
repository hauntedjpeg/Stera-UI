import { SiSquareDashed } from "stera-icons"

import { IconTile } from "@/components/ui/icon-tile"

export default function IconTileShapes() {
  return (
    <div className="flex items-center gap-4">
      <IconTile shape="square">
        <SiSquareDashed />
      </IconTile>
      <IconTile shape="circle">
        <SiSquareDashed />
      </IconTile>
    </div>
  )
}
