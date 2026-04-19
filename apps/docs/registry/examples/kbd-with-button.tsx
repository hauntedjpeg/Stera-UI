import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"

export default function KbdWithButton() {
  return (
    <Button>
      Accept <Kbd data-kbd="inline-end">⏎</Kbd>
    </Button>
  )
}
