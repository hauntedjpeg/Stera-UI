"use client"

import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Preview } from "@/components/preview"

export function ProgressDefault() {
  return (
    <Preview>
      <Progress value={33} className="w-80" />
    </Preview>
  )
}

export function ProgressWithLabel() {
  return (
    <Preview>
      <Progress value={66} className="w-80">
        <ProgressLabel>Uploading...</ProgressLabel>
        <ProgressValue />
      </Progress>
    </Preview>
  )
}
