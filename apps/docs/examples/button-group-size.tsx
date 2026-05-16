import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function ButtonGroupSize() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <Button variant="outline" size="sm">Reply</Button>
        <Button variant="outline" size="sm">Forward</Button>
        <Button variant="outline" size="sm">Archive</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="md">Reply</Button>
        <Button variant="outline" size="md">Forward</Button>
        <Button variant="outline" size="md">Archive</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="lg">Reply</Button>
        <Button variant="outline" size="lg">Forward</Button>
        <Button variant="outline" size="lg">Archive</Button>
      </ButtonGroup>
    </div>
  )
}
