import {
  SiTextAlignCenter,
  SiTextAlignLeft,
  SiTextAlignRight,
  SiTextBold,
  SiTextItalic,
  SiTextUnderline,
} from "stera-icons"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Bold">
          <SiTextBold />
        </Button>
        <Button variant="outline" size="icon" aria-label="Italic">
          <SiTextItalic />
        </Button>
        <Button variant="outline" size="icon" aria-label="Underline">
          <SiTextUnderline />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Align left">
          <SiTextAlignLeft />
        </Button>
        <Button variant="outline" size="icon" aria-label="Align center">
          <SiTextAlignCenter />
        </Button>
        <Button variant="outline" size="icon" aria-label="Align right">
          <SiTextAlignRight />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
