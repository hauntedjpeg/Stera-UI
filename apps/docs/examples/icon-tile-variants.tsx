import { SiSquareDashed } from "stera-icons"

import { IconTile } from "@/components/ui/icon-tile"

export default function IconTileVariants() {
  return (
    <div className="flex items-center gap-4">
      <IconTile variant="default">
        <SiSquareDashed />
      </IconTile>
      <IconTile variant="solid">
        <SiSquareDashed />
      </IconTile>
      <IconTile variant="outline">
        <SiSquareDashed />
      </IconTile>
    </div>
  )
}
