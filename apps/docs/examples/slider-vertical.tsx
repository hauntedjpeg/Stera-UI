import { Slider } from "@/components/ui/slider"

export default function SliderVertical() {
  return (
    <div className="flex items-center justify-center gap-6">
      <Slider
        defaultValue={50}
        orientation="vertical"
        aria-label="Bass"
        className="h-40"
      />
      <Slider
        defaultValue={25}
        orientation="vertical"
        aria-label="Treble"
        className="h-40"
      />
    </div>
  )
}
