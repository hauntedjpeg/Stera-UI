import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LabelDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Your email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  )
}
