import { Badge } from "@/components/ui/badge"

export default function BadgeColors() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="brand">Brand</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  )
}
