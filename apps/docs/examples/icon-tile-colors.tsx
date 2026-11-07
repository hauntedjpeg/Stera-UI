import { SiSquareDashed } from "stera-icons"

import { IconTile } from "@/components/ui/icon-tile"

const rows = [
  ["default", "brand", "accent", "success", "warning", "danger"],
  [
    "solid",
    "brand-solid",
    "accent-solid",
    "success-solid",
    "warning-solid",
    "danger-solid",
  ],
  [
    "outline",
    "brand-outline",
    "accent-outline",
    "success-outline",
    "warning-outline",
    "danger-outline",
  ],
] as const

export default function IconTileColors() {
  return (
    <div className="flex flex-col gap-4">
      {rows.map((row) => (
        <div key={row[0]} className="flex items-center gap-4">
          {row.map((variant) => (
            <IconTile key={variant} variant={variant}>
              <SiSquareDashed />
            </IconTile>
          ))}
        </div>
      ))}
    </div>
  )
}
