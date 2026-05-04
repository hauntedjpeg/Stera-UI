import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectAllSizes() {
  return (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <span className="text-text-subtlest text-xs">{size}</span>
          <Select>
            <SelectTrigger size={size} className="w-48">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Apple">Apple</SelectItem>
                <SelectItem value="Banana">Banana</SelectItem>
                <SelectItem value="Blueberry">Blueberry</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  )
}
