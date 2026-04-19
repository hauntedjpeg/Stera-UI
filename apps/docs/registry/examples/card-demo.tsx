import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CardDemo() {
  return (
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
  )
}
