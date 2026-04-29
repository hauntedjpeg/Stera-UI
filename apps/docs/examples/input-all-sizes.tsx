import { Input } from "@/components/ui/input"

export default function InputAllSizes() {
  return (
    <div className="flex flex-col gap-4 w-64">
      <div className="flex flex-col gap-1">
        <span className="text-text-subtlest text-xs">sm</span>
        <Input size="sm" placeholder="Small" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-text-subtlest text-xs">md</span>
        <Input size="md" placeholder="Medium (default)" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-text-subtlest text-xs">lg</span>
        <Input size="lg" placeholder="Large" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-text-subtlest text-xs">xl</span>
        <Input size="xl" placeholder="Extra Large" />
      </div>
    </div>
  )
}
