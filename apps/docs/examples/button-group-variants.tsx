import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"

export default function ButtonGroupVariants() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <Button variant="outline">Reply</Button>
        <Button variant="outline">Forward</Button>
        <Button variant="outline">Archive</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="subtle">Reply</Button>
        <ButtonGroupSeparator />
        <Button variant="subtle">Forward</Button>
        <ButtonGroupSeparator />
        <Button variant="subtle">Archive</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="brand">Reply</Button>
        <ButtonGroupSeparator />
        <Button variant="brand">Forward</Button>
        <ButtonGroupSeparator />
        <Button variant="brand">Archive</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="ghost">Reply</Button>
        <ButtonGroupSeparator />
        <Button variant="ghost">Forward</Button>
        <ButtonGroupSeparator />
        <Button variant="ghost">Archive</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="danger">Reply</Button>
        <ButtonGroupSeparator />
        <Button variant="danger">Forward</Button>
        <ButtonGroupSeparator />
        <Button variant="danger">Archive</Button>
      </ButtonGroup>
    </div>
  )
}
