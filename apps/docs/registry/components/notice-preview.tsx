"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Notice } from "@/components/ui/notice"
import { Preview } from "@/components/preview"

export function NoticeDefault() {
  return (
    <Preview>
      <Notice />
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: { label: "Undo", onClick: () => {} },
          })
        }
      >
        Show Toast
      </Button>
    </Preview>
  )
}

export function NoticeTypes() {
  return (
    <Preview>
      <Notice />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => toast("Event has been created")}>
          Default
        </Button>
        <Button variant="outline" onClick={() => toast.success("Event has been created")}>
          Success
        </Button>
        <Button variant="outline" onClick={() => toast.info("Be at the area 10 minutes before the event time")}>
          Info
        </Button>
        <Button variant="outline" onClick={() => toast.warning("Event start time cannot be earlier than 8am")}>
          Warning
        </Button>
        <Button variant="outline" onClick={() => toast.error("Event has not been created")}>
          Error
        </Button>
      </div>
    </Preview>
  )
}
