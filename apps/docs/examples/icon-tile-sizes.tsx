import { SiSquareDashed } from "stera-icons"

import { IconTile } from "@/components/ui/icon-tile"

export default function IconTileSizes() {
  return (
    <div className="flex items-center gap-4">
      <IconTile size="xs">
        <SiSquareDashed />
      </IconTile>
      <IconTile size="sm">
        <SiSquareDashed />
      </IconTile>
      <IconTile size="md">
        <SiSquareDashed />
      </IconTile>
      <IconTile size="lg">
        <SiSquareDashed />
      </IconTile>
    </div>
  )
}
