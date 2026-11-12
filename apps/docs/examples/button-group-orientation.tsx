import { SiMinus, SiPlus } from "stera-icons"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      className="h-fit"
    >
      <Button variant="outline" size="icon" aria-label="Increase">
        <SiPlus />
      </Button>
      <Button variant="outline" size="icon" aria-label="Decrease">
        <SiMinus />
      </Button>
    </ButtonGroup>
  )
}
