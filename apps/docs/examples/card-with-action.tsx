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

export default function CardWithAction() {
  return (
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
  )
}
