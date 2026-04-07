"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Preview } from "@/components/preview"

export function CardDefault() {
  return (
    <Preview>
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
    </Preview>
  )
}

export function CardWithAction() {
  return (
    <Preview>
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
    </Preview>
  )
}

export function CardSizes() {
  return (
    <Preview>
      <div className="flex items-start gap-6">
        <Card className="w-64">
          <CardHeader>
            <CardTitle>Default size</CardTitle>
            <CardDescription>Standard spacing and text sizes.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content with default padding.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Action</Button>
          </CardFooter>
        </Card>
        <Card size="sm" className="w-64">
          <CardHeader>
            <CardTitle>Small size</CardTitle>
            <CardDescription>Reduced spacing and text sizes.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content with smaller padding.</p>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="outline">Action</Button>
          </CardFooter>
        </Card>
      </div>
    </Preview>
  )
}
