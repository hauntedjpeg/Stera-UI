import { Chip } from "@/components/ui/chip"

export default function ChipDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Chip variant="subtle">Subtle</Chip>
      <Chip variant="outline">Outline</Chip>
      <Chip variant="solid">Solid</Chip>
    </div>
  )
}
