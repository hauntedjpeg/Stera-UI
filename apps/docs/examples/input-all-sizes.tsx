import { Input } from "@/components/ui/input"

export default function InputAllSizes() {
  return (
    <div className="flex w-64 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-text-subtlest">sm</span>
        <Input size="sm" placeholder="Small" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-text-subtlest">md</span>
        <Input size="md" placeholder="Medium (default)" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-text-subtlest">lg</span>
        <Input size="lg" placeholder="Large" />
      </div>
    </div>
  )
}
