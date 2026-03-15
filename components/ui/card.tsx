import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        // Base
        "flex flex-col overflow-hidden rounded-xl bg-bg-surface py-6 arc-text-body-md text-text shadow-sm border border-border",
        // Sizing
        "gap-6",
        // Variants
        "data-[size=sm]:gap-4 data-[size=sm]:py-4",
        // Other
        "group/card has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        // Base
        "grid items-start rounded-t-xl px-6",
        // Sizing
        "gap-1 auto-rows-min",
        // Variants
        "group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:[.border-b]:pb-4",
        // Other
        "group/card-header @container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        // Base
        "arc-text-body-lg-strong",
        // Variants
        "group-data-[size=sm]/card:arc-text-body-md-strong",
        className,
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        // Base
        "arc-text-body-md text-text-secondary",
        className,
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        // Position
        "col-start-2 row-span-2 row-start-1",
        // Base
        "self-start justify-self-end",
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        // Base
        "px-6",
        // Variants
        "group-data-[size=sm]/card:px-4",
        className,
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        // Base
        "flex items-center rounded-b-xl px-6",
        // Variants
        "group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:[.border-t]:pt-4",
        // Other
        "[.border-t]:pt-6",
        className,
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
