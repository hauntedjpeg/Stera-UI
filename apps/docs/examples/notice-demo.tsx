"use client"

import { Button } from "@/components/ui/button"
import { createNoticeManager, Notice } from "@/components/ui/notice"

const demoManager = createNoticeManager()

export default function NoticeDemo() {
  return (
    <>
      <Notice toastManager={demoManager} />
      <Button
        variant="outline"
        onClick={() =>
          demoManager.add({
            title: "Event has been created",
            description: "Sunday, December 03, 2023 at 9:00 AM",
            actionProps: {
              children: "Undo",
              onClick: () => {},
            },
          })
        }
      >
        Show Toast
      </Button>
    </>
  )
}
