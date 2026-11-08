import { Slider } from "@/components/ui/slider"

export default function SliderDisabled() {
  return (
    <Slider defaultValue={50} aria-label="Volume" disabled className="w-80" />
  )
}
