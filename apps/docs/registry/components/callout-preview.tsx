"use client"

import { SiInfoCircle, SiX } from "stera-icons"
import { Button } from "@/components/ui/button"
import {
  Callout,
  CalloutAction,
  CalloutClose,
  CalloutContent,
  CalloutDescription,
  CalloutTitle,
} from "@/components/ui/callout"
import { Preview } from "@/components/preview"

export function CalloutDefault() {
  return (
    <Preview>
      <Callout className="w-96">
        <CalloutContent>
          <CalloutTitle>Heads up!</CalloutTitle>
          <CalloutDescription>You can change your email in your account settings.</CalloutDescription>
        </CalloutContent>
      </Callout>
    </Preview>
  )
}

export function CalloutWithIcon() {
  return (
    <Preview>
      <Callout className="w-96">
        <SiInfoCircle />
        <CalloutContent>
          <CalloutTitle>New update available</CalloutTitle>
          <CalloutDescription>A new version of the app is ready to install.</CalloutDescription>
        </CalloutContent>
      </Callout>
    </Preview>
  )
}

export function CalloutWithAction() {
  return (
    <Preview>
      <Callout className="w-96">
        <CalloutContent>
          <CalloutTitle>Cookie policy</CalloutTitle>
          <CalloutDescription>We use cookies to improve your experience.</CalloutDescription>
          <CalloutAction>
            <Button size="sm">Learn more</Button>
          </CalloutAction>
        </CalloutContent>
      </Callout>
    </Preview>
  )
}

export function CalloutWithClose() {
  return (
    <Preview>
      <Callout className="w-96">
        <SiInfoCircle />
        <CalloutContent>
          <CalloutTitle>Cookie policy</CalloutTitle>
          <CalloutDescription>We use cookies to improve your experience.</CalloutDescription>
        </CalloutContent>
        <CalloutClose>
          <Button variant="ghost" size="icon-xs">
            <SiX />
          </Button>
        </CalloutClose>
      </Callout>
    </Preview>
  )
}

export function CalloutAllVariants() {
  return (
    <Preview>
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
    </Preview>
  )
}
