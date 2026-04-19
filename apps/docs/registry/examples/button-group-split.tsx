import { SiChevronDown, SiPlus } from "stera-icons"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="brand">
        <SiPlus data-icon="inline-start" />
        New message
      </Button>
      <ButtonGroupSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="brand" size="icon" aria-label="More options">
              <SiChevronDown />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem>New draft</DropdownMenuItem>
          <DropdownMenuItem>Schedule send</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
