import { SiCopy } from "stera-icons"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

export default function ButtonGroupInput() {
  return (
    <ButtonGroup className="w-full max-w-sm">
      <Input defaultValue="https://example.com/invite/abc123" readOnly />
      <Button variant="outline" size="icon" aria-label="Copy">
        <SiCopy />
      </Button>
    </ButtonGroup>
  )
}
