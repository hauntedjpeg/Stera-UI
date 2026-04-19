import { Separator } from "@/components/ui/separator"

export default function SeparatorVertical() {
  return (
    <div className="flex h-5 items-center gap-4 st-body-md">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  )
}
