import { SiPlus } from "stera-icons"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"

export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="subtle">Button</Button>
      <ButtonGroupSeparator />
      <Button variant="subtle" size="icon" aria-label="Add">
        <SiPlus />
      </Button>
    </ButtonGroup>
  )
}
