"use client"

import { Button } from "@/components/ui/button"
import { Toast, toastManager } from "@/components/ui/toast"

export default function ToastDemo() {
  return (
    <>
      <Toast />
      <Button
        variant="outline"
        onClick={() =>
          toastManager.add({
            title: "Event has been created",
            description: "Sunday, December 03, 2023 at 9:00 AM",
            actionProps: {
              children: "Undo",
              onClick: () => {},
            },
          })
        }
      >
        Toast
      </Button>
    </>
  )
}
