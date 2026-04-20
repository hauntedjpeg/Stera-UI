import { SiInfoCircle } from "stera-icons"
import {
  Callout,
  CalloutContent,
  CalloutDescription,
  CalloutTitle,
} from "@/components/ui/callout"

export default function CalloutVariants() {
  return (
    <div className="flex flex-col gap-4 w-96">
      <Callout>
        <SiInfoCircle />
        <CalloutContent>
          <CalloutTitle>Default</CalloutTitle>
          <CalloutDescription>This is a default callout message.</CalloutDescription>
        </CalloutContent>
      </Callout>
      <Callout variant="brand">
        <SiInfoCircle />
        <CalloutContent>
          <CalloutTitle>Brand</CalloutTitle>
          <CalloutDescription>This is a brand callout message.</CalloutDescription>
        </CalloutContent>
      </Callout>
      <Callout variant="accent">
        <SiInfoCircle />
        <CalloutContent>
          <CalloutTitle>Accent</CalloutTitle>
          <CalloutDescription>This is an accent callout message.</CalloutDescription>
        </CalloutContent>
      </Callout>
      <Callout variant="danger">
        <SiInfoCircle />
        <CalloutContent>
          <CalloutTitle>Danger</CalloutTitle>
          <CalloutDescription>This is a danger callout message.</CalloutDescription>
        </CalloutContent>
      </Callout>
      <Callout variant="success">
        <SiInfoCircle />
        <CalloutContent>
          <CalloutTitle>Success</CalloutTitle>
          <CalloutDescription>This is a success callout message.</CalloutDescription>
        </CalloutContent>
      </Callout>
      <Callout variant="warning">
        <SiInfoCircle />
        <CalloutContent>
          <CalloutTitle>Warning</CalloutTitle>
          <CalloutDescription>This is a warning callout message.</CalloutDescription>
        </CalloutContent>
      </Callout>
    </div>
  )
}
