import { Chip } from "@/components/ui/chip"

export default function ChipSizes() {
  return (
    <div className="flex items-center gap-2">
      <Chip size="xs">Extra Small</Chip>
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </div>
  )
}
