import { SiSearch } from "stera-icons"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

export default function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" size="icon" aria-label="Search">
        <SiSearch />
      </Button>
    </ButtonGroup>
  )
}
