import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonText() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[280px]" />
      <Skeleton className="h-4 w-[260px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  )
}
