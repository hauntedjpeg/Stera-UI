"use client"

import { Button } from "@/components/ui/button"
import { Notice, noticeManager } from "@/components/ui/notice"

export default function NoticeDemo() {
  return (
    <>
      <Notice />
      <Button
        variant="outline"
        onClick={() =>
          noticeManager.add({
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
