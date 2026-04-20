import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"

export default function ProgressWithLabel() {
  return (
    <Progress value={66} className="w-80">
      <ProgressLabel>Uploading...</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}
