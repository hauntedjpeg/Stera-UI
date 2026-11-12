import { Fragment } from "react"

import { Separator } from "@/components/ui/separator"

const rows = [
  { label: "Plan", value: "Team" },
  { label: "Seats", value: "12 of 20" },
  { label: "Renews", value: "March 1, 2027" },
]

export default function SeparatorList() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 st-label-md">
      {rows.map((row, index) => (
        <Fragment key={row.label}>
          {index > 0 && <Separator />}
          <div className="flex items-center justify-between gap-4">
            <span className="text-ink-subtler">{row.label}</span>
            <span>{row.value}</span>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
