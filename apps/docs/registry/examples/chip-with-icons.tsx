import { SiHash, SiX } from "stera-icons"
import { Chip } from "@/components/ui/chip"

export default function ChipWithIcons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Chip variant="subtle" size="sm">
        <SiHash data-icon="inline-start" />
        Tag
      </Chip>
      <Chip variant="outline" size="sm">
        <SiHash data-icon="inline-start" />
        Tag
      </Chip>
      <Chip variant="solid" size="sm">
        <SiHash data-icon="inline-start" />
        Tag
      </Chip>
      <Chip variant="subtle" size="sm">
        Label
        <SiX data-icon="inline-end" />
      </Chip>
      <Chip variant="outline" size="sm">
        Label
        <SiX data-icon="inline-end" />
      </Chip>
      <Chip variant="solid" size="sm">
        Label
        <SiX data-icon="inline-end" />
      </Chip>
    </div>
  )
}
