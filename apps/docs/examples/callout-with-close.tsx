import { SiInfoCircle, SiX } from "stera-icons"
import { Button } from "@/components/ui/button"
import {
  Callout,
  CalloutClose,
  CalloutContent,
  CalloutDescription,
  CalloutTitle,
} from "@/components/ui/callout"

export default function CalloutWithClose() {
  return (
    <Callout className="w-96">
      <SiInfoCircle />
      <CalloutContent>
        <CalloutTitle>Cookie policy</CalloutTitle>
        <CalloutDescription>
          We use cookies to improve your experience.
        </CalloutDescription>
      </CalloutContent>
      <CalloutClose>
        <Button variant="ghost" size="icon-xs">
          <SiX />
        </Button>
      </CalloutClose>
    </Callout>
  )
}
