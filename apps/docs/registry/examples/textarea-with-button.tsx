import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaWithButton() {
  return (
    <div className="flex w-sm flex-col gap-2">
      <Textarea placeholder="Type your message here." />
      <Button variant="brand" className="self-end">
        Send message
      </Button>
    </div>
  )
}
