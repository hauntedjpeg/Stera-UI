import type { Meta, StoryObj } from "@storybook/react"

import { Badge } from "./badge"
import { Button } from "./button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Field, FieldLabel } from "./field"
import { Input } from "./input"

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area. Place your main content here.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="brand">Confirm</Button>
        <Button variant="outline">Cancel</Button>
      </CardFooter>
    </Card>
  ),
}

export const LoginForm: Story = {
  render: () => (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your credentials below to login.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" />
        </Field>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a href="#" className="arc-text-body-sm text-text-secondary underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" placeholder="••••••••" />
        </Field>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button variant="brand" className="w-full">Login</Button>
        <Button variant="outline" className="w-full">Continue with Google</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Card className="w-sm">
      <img
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop"
        alt="Design systems meetup"
        className="w-full object-cover h-48"
      />
      <CardHeader>
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>
          Join us for an evening of talks and discussions about design systems,
          component libraries, and the future of UI development.
        </CardDescription>
        <CardAction>
          <Badge variant="default">Featured</Badge>
        </CardAction>
      </CardHeader>
      <CardFooter>
        <Button variant="outline">View Event</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <Badge>3</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Manage your notification preferences and stay up to date with the latest activity.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">View all</Button>
      </CardFooter>
    </Card>
  ),
}

export const SmallSize: Story = {
  render: () => (
    <Card size="sm" className="w-sm">
      <CardHeader>
        <CardTitle>Scheduled reports</CardTitle>
        <CardDescription>
          Automate your reporting workflow with scheduled delivery.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-4 arc-text-body-sm text-text-secondary flex flex-col gap-1">
          <li>Daily, weekly, or monthly schedules</li>
          <li>Send via email, Slack, or webhook</li>
          <li>Include charts, tables, and summaries</li>
          <li>Filter by date range and segments</li>
        </ul>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm" variant="brand">Get started</Button>
        <Button size="sm" variant="outline">Learn more</Button>
      </CardFooter>
    </Card>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-start gap-6">
      <Card className="w-72">
        <CardHeader>
          <CardTitle>Default size</CardTitle>
          <CardDescription>Uses standard spacing and text sizes.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content with default padding and gap.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Action</Button>
        </CardFooter>
      </Card>
      <Card size="sm" className="w-72">
        <CardHeader>
          <CardTitle>Small size</CardTitle>
          <CardDescription>Uses reduced spacing and text sizes.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content with smaller padding and gap.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="outline">Action</Button>
        </CardFooter>
      </Card>
    </div>
  ),
}
