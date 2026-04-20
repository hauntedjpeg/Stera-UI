import { Kbd } from "@/components/ui/kbd"

export default function KbdSizes() {
  return (
    <div className="flex items-center gap-3">
      <Kbd size="sm">⌘K</Kbd>
      <Kbd size="md">⌘K</Kbd>
    </div>
  )
}
