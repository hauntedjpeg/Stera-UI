import { cn } from "@/lib/utils"

export function Preview({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "not-prose flex min-h-32 items-center justify-center rounded-xl border border-border bg-surface p-8",
        className
      )}
    >
      {children}
    </div>
  )
}
