import { Fragment } from "react"

import { Separator } from "@/components/ui/separator"

const items = [
  { title: "Settings", description: "Manage preferences" },
  { title: "Account", description: "Profile and security" },
  { title: "Help", description: "Support and docs" },
]

export default function SeparatorMenu() {
  return (
    <div className="flex items-center gap-4">
      {items.map((item, index) => (
        <Fragment key={item.title}>
          {index > 0 && <Separator orientation="vertical" />}
          <div className="flex flex-col gap-1">
            <div className="st-label-md-medium">{item.title}</div>
            <div className="st-label-sm text-ink-subtler">
              {item.description}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
