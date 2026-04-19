import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CardSizes() {
  return (
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
          <Button size="sm" variant="outline">
            Action
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
