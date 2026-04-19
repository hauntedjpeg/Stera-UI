import { SiInfoCircle } from "stera-icons"
import {
  Callout,
  CalloutContent,
  CalloutDescription,
  CalloutTitle,
} from "@/components/ui/callout"

export default function CalloutWithIcon() {
  return (
    <Callout className="w-96">
      <SiInfoCircle />
      <CalloutContent>
        <CalloutTitle>New update available</CalloutTitle>
        <CalloutDescription>
          A new version of the app is ready to install.
        </CalloutDescription>
      </CalloutContent>
    </Callout>
  )
}
