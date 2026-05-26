"use client"

import { Button } from "@/components/ui/button"
import { createNoticeManager, Notice } from "@/components/ui/notice"

const typesManager = createNoticeManager()

export default function NoticeTypes() {
  return (
    <>
      <Notice toastManager={typesManager} />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => typesManager.add({ title: "Event has been created" })}
        >
          Default
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            typesManager.add({
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
            typesManager.add({
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
            typesManager.add({
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
            typesManager.add({
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
