import { SiArchive, SiForward, SiReply } from "stera-icons"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <SiReply data-icon="inline-start" />
        Reply
      </Button>
      <Button variant="outline">
        <SiForward data-icon="inline-start" />
        Forward
      </Button>
      <Button variant="outline">
        <SiArchive data-icon="inline-start" />
        Archive
      </Button>
    </ButtonGroup>
  )
}
