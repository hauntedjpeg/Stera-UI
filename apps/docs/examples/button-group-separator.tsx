import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"

export default function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="subtle" size="sm">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button variant="subtle" size="sm">
        Paste
      </Button>
    </ButtonGroup>
  )
}
