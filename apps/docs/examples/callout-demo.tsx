import {
  Callout,
  CalloutContent,
  CalloutDescription,
  CalloutTitle,
} from "@/components/ui/callout"

export default function CalloutDemo() {
  return (
    <Callout className="w-96">
      <CalloutContent>
        <CalloutTitle>Heads up!</CalloutTitle>
        <CalloutDescription>
          You can change your email in your account settings.
        </CalloutDescription>
      </CalloutContent>
    </Callout>
  )
}
