import { Button } from "@/components/ui/button"

export default function ButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="brand" disabled>
        Brand
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="danger" disabled>
        Danger
      </Button>
    </div>
  )
}
