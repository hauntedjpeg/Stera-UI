import { SiDownload, SiPlus } from "stera-icons"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="outline">
        <SiPlus data-icon="inline-start" />
        New item
      </Button>
      <Button variant="outline" size="icon" aria-label="Download">
        <SiDownload size={16} />
      </Button>
      <Button variant="outline">
        Open command menu
        <Kbd data-kbd="inline-end">⌘K</Kbd>
      </Button>
    </div>
  )
}
