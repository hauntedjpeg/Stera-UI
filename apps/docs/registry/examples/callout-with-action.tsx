import { Button } from "@/components/ui/button"
import {
  Callout,
  CalloutAction,
  CalloutContent,
  CalloutDescription,
  CalloutTitle,
} from "@/components/ui/callout"

export default function CalloutWithAction() {
  return (
    <Callout className="w-96">
      <CalloutContent>
        <CalloutTitle>Cookie policy</CalloutTitle>
        <CalloutDescription>
          We use cookies to improve your experience.
        </CalloutDescription>
        <CalloutAction>
          <Button size="sm">Learn more</Button>
        </CalloutAction>
      </CalloutContent>
    </Callout>
  )
}
