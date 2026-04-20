import { SiPlus } from "stera-icons"
import { Button } from "@/components/ui/button"

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-3">
      <Button size="xs">
        <SiPlus data-icon="inline-start" />
        Extra Small
      </Button>
      <Button size="sm">
        <SiPlus data-icon="inline-start" />
        Small
      </Button>
      <Button size="md">
        <SiPlus data-icon="inline-start" />
        Default
      </Button>
      <Button size="lg">
        <SiPlus data-icon="inline-start" />
        Large
      </Button>
      <Button size="icon-xs" aria-label="Add">
        <SiPlus />
      </Button>
      <Button size="icon-sm" aria-label="Add">
        <SiPlus />
      </Button>
      <Button size="icon" aria-label="Add">
        <SiPlus />
      </Button>
      <Button size="icon-lg" aria-label="Add">
        <SiPlus />
      </Button>
    </div>
  )
}
