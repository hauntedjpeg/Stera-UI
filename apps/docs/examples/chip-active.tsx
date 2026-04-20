import { Chip } from "@/components/ui/chip"

export default function ChipActive() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <Chip variant="subtle">Default</Chip>
        <Chip variant="subtle" active>
          Active
        </Chip>
      </div>
      <div className="flex items-center gap-2">
        <Chip variant="outline">Default</Chip>
        <Chip variant="outline" active>
          Active
        </Chip>
      </div>
      <div className="flex items-center gap-2">
        <Chip variant="solid">Default</Chip>
        <Chip variant="solid" active>
          Active
        </Chip>
      </div>
    </div>
  )
}
