"use client"

import { Button } from "@/components/ui/button"
import { Notice, noticeManager } from "@/components/ui/notice"

export default function NoticeTypes() {
  return (
    <>
      <Notice />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() =>
            noticeManager.add({ title: "Event has been created" })
          }
        >
          Default
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            noticeManager.add({
              type: "success",
              title: "Event has been created",
            })
          }
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            noticeManager.add({
              type: "info",
              title: "Be at the area 10 minutes before the event time",
            })
          }
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            noticeManager.add({
              type: "warning",
              title: "Event start time cannot be earlier than 8am",
            })
          }
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            noticeManager.add({
              type: "error",
              title: "Event has not been created",
            })
          }
        >
          Error
        </Button>
      </div>
    </>
  )
}
