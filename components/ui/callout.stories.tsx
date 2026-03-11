import type { Meta, StoryObj } from "@storybook/react"
import { SiInfoCircle, SiX } from "stera-icons"
import {
  Callout,
  CalloutContent,
  CalloutTitle,
  CalloutDescription,
  CalloutAction,
  CalloutClose,
} from "./callout"
import { Button } from "./button"

const meta: Meta<typeof Callout> = {
  title: "UI/Callout",
  component: Callout,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "brand", "accent", "danger", "success", "warning"],
    },
  },
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Callout>

export const Default: Story = {
  render: () => (
    <Callout className="w-96">
      <CalloutContent>
        <CalloutTitle>Heads up!</CalloutTitle>
        <CalloutDescription>You can change your email in your account settings.</CalloutDescription>
      </CalloutContent>
    </Callout>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Callout variant="danger" className="w-96">
      <CalloutContent>
        <CalloutTitle>Something went wrong</CalloutTitle>
        <CalloutDescription>Your session has expired. Please sign in again.</CalloutDescription>
      </CalloutContent>
    </Callout>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Callout className="w-96">
      <SiInfoCircle />
      <CalloutContent>
        <CalloutTitle>New update available</CalloutTitle>
        <CalloutDescription>A new version of the app is ready to install.</CalloutDescription>
      </CalloutContent>
    </Callout>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Callout className="w-96">
      <CalloutContent>
        <CalloutTitle>Cookie policy</CalloutTitle>
        <CalloutDescription>We use cookies to improve your experience.</CalloutDescription>
        <CalloutAction>
          <Button size="sm">Learn more</Button>
        </CalloutAction>
      </CalloutContent>
    </Callout>
  ),
}

export const WithClose: Story = {
  render: () => (
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
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Callout>
        <SiInfoCircle />
        <CalloutContent>
          <CalloutTitle>Default</CalloutTitle>
          <CalloutDescription>This is a default callout message.</CalloutDescription>
          <CalloutAction><Button size="sm">Actions</Button></CalloutAction>
        </CalloutContent>
        <CalloutClose>
          <Button variant="ghost" size="icon-sm"><SiX /></Button>
        </CalloutClose>
      </Callout>
      <Callout variant="brand">
        <SiInfoCircle />
        <CalloutContent>
          <CalloutTitle>Brand</CalloutTitle>
          <CalloutDescription>This is a brand callout message.</CalloutDescription>
        </CalloutContent>
        <CalloutClose>
          <Button variant="ghost" size="icon-sm"><SiX /></Button>
        </CalloutClose>
      </Callout>
      <Callout variant="accent">
        <SiInfoCircle />
        <CalloutContent>
          <CalloutTitle>Accent</CalloutTitle>
          <CalloutDescription>This is an accent callout message.</CalloutDescription>
        </CalloutContent>
        <CalloutClose>
          <Button variant="ghost" size="icon-sm"><SiX /></Button>
        </CalloutClose>
      </Callout>
      <Callout variant="danger">
        <SiInfoCircle />
        <CalloutContent>
          <CalloutTitle>Danger</CalloutTitle>
          <CalloutDescription>This is a danger callout message.</CalloutDescription>
        </CalloutContent>
        <CalloutClose>
          <Button variant="ghost" size="icon-sm"><SiX /></Button>
        </CalloutClose>
      </Callout>
      <Callout variant="success">
        <SiInfoCircle />
        <CalloutContent>
          <CalloutTitle>Success</CalloutTitle>
          <CalloutDescription>This is a success callout message.</CalloutDescription>
        </CalloutContent>
        <CalloutClose>
          <Button variant="ghost" size="icon-sm"><SiX /></Button>
        </CalloutClose>
      </Callout>
      <Callout variant="warning">
        <SiInfoCircle />
        <CalloutContent>
          <CalloutTitle>Warning</CalloutTitle>
          <CalloutDescription>This is a warning callout message.</CalloutDescription>
        </CalloutContent>
        <CalloutClose>
          <Button variant="ghost" size="icon-sm"><SiX /></Button>
        </CalloutClose>
      </Callout>
    </div>
  ),
}
