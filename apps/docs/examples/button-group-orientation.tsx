import { SiArchive, SiForward, SiReply } from "stera-icons"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function ButtonGroupOrientation() {
  return (
    <div className="flex items-start gap-12">
      <div className="flex flex-col items-center gap-3">
        <ButtonGroup orientation="horizontal">
          <Button size="icon" variant="outline">
            <SiReply />
          </Button>
          <Button size="icon" variant="outline">
            <SiForward />
          </Button>
          <Button size="icon" variant="outline">
            <SiArchive />
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col items-center gap-3">
        <ButtonGroup orientation="vertical">
          <Button size="icon" variant="outline">
            <SiReply />
          </Button>
          <Button size="icon" variant="outline">
            <SiForward />
          </Button>
          <Button size="icon" variant="outline">
            <SiArchive />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
