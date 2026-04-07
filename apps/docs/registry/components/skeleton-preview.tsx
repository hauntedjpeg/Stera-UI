"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Preview } from "@/components/preview"

export function SkeletonAvatar() {
  return (
    <Preview>
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </Preview>
  )
}

export function SkeletonCard() {
  return (
    <Preview>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </Preview>
  )
}

export function SkeletonText() {
  return (
    <Preview>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[300px]" />
        <Skeleton className="h-4 w-[280px]" />
        <Skeleton className="h-4 w-[260px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </Preview>
  )
}
