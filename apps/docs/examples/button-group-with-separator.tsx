import {
  SiCopy,
  SiDelete,
  SiForward,
  SiReply,
  SiShare,
} from "stera-icons"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"

export default function ButtonGroupWithSeparator() {
  return (
    <ButtonGroup>
      <Button variant="ghost" size="icon" aria-label="Reply">
        <SiReply />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Forward">
        <SiForward />
      </Button>
      <ButtonGroupSeparator />
      <Button variant="ghost" size="icon" aria-label="Copy">
        <SiCopy />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Share">
        <SiShare />
      </Button>
      <ButtonGroupSeparator />
      <Button variant="ghost" size="icon" aria-label="Delete">
        <SiDelete />
      </Button>
    </ButtonGroup>
  )
}
