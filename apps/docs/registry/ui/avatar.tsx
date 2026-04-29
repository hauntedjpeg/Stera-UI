import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  size = "default",
  shape = "circle",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg"
  shape?: "circle" | "square"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-shape={shape}
      className={cn(
        // Base
        "flex rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten",
        // Position
        "relative after:absolute after:inset-0",
        // Sizing
        "size-8 shrink-0",
        // Variants
        "data-[size=lg]:size-10 data-[size=sm]:size-6",
        // Shape
        "data-[shape=square]:rounded-md data-[shape=square]:after:rounded-lg",
        // Other
        "group/avatar select-none after:rounded-full",
        className,
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        // Base
        "rounded-full",
        // Sizing
        "aspect-square size-full",
        // Shape
        "group-data-[shape=square]/avatar:rounded-lg",
        // Other
        "object-cover",
        className,
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        // Base
        "flex rounded-full bg-surface-inverse st-body-sm-strong text-text-oninverse",
        // Sizing
        "size-full",
        // Variants
        "group-data-[size=sm]/avatar:text-xs",
        // Shape
        "group-data-[shape=square]/avatar:rounded-md",
        // Other
        "items-center justify-center",
        className,
      )}
      {...props}
    />
  )
}

function AvatarIconFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-icon-fallback"
      className={cn(
        // Base
        "flex items-center justify-center rounded-full bg-surface-inverse text-text-oninverse",
        // Sizing
        "size-full",
        // Icon sizing
        "[&>svg]:size-5 group-data-[size=sm]/avatar:[&>svg]:size-4 group-data-[size=lg]/avatar:[&>svg]:size-6",
        // Shape
        "group-data-[shape=square]/avatar:rounded-md",
        className,
      )}
      {...props}
    />
  )
}

const avatarBadgeVariants = cva(
  [
    // Base
    "inline-flex rounded-full bg-blend-color ring-2 ring-surface",
    // Position
    "absolute right-0 bottom-0",
    // Dot sizing (overridden by icon variant)
    "group-data-[size=sm]/avatar:size-2.5 group-data-[size=sm]/avatar:[&>svg]:size-2",
    "group-data-[size=default]/avatar:size-3 group-data-[size=default]/avatar:[&>svg]:size-2",
    "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
    // Other
    "z-10 items-center justify-center select-none",
  ],
  {
    variants: {
      variant: {
        subtle: "bg-surface-tertiary-hover text-text",
        danger: "bg-surface-danger text-text-ondanger",
        success: "bg-surface-success text-text-onsuccess",
        warning: "bg-surface-warning text-text-onwarning",
        icon: [
          "bg-surface-inverse text-text-oninverse",
        ],
      },
    },
    defaultVariants: {
      variant: "subtle",
    },
  }
)

function AvatarBadge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof avatarBadgeVariants>) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(avatarBadgeVariants({ variant }), className)}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        // Base
        "flex *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-surface",
        // Sizing
        "-space-x-2",
        // Other
        "group/avatar-group",
        className,
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        // Base
        "relative flex bg-surface-tertiary st-body-sm-strong text-text-subtle rounded-full ring-2 ring-surface",
        // Sizing
        "size-8 shrink-0",
        // Variants
        "group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        // Shape
        "group-has-data-[shape=square]/avatar-group:rounded-md",
        // Other
        "items-center justify-center [&>svg]:size-4",
        className,
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarIconFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
