import { Badge } from "@/components/ui/badge"

export default function BadgeSizes() {
  return (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  )
}
