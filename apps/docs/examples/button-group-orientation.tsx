import { SiArchive, SiForward, SiReply } from "stera-icons"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function ButtonGroupOrientation() {
  return (
    <div className="flex items-start gap-12">
      <div className="flex flex-col items-center gap-3">
        <span className="text-sm text-text-subtle">Horizontal</span>
        <ButtonGroup orientation="horizontal">
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
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="text-sm text-text-subtle">Vertical</span>
        <ButtonGroup orientation="vertical">
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
      </div>
    </div>
  )
}
