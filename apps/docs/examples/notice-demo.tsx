"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Notice } from "@/components/ui/notice"

export default function NoticeDemo() {
  return (
    <>
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
    </>
  )
}
