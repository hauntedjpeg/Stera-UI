import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonText() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-75" />
      <Skeleton className="h-4 w-70" />
      <Skeleton className="h-4 w-65" />
      <Skeleton className="h-4 w-50" />
    </div>
  )
}
