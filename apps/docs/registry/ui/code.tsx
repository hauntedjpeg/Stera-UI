import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const codeVariants = cva(
  [
    // Base
    "bg-surface-muted st-mono-sm text-ink",
    // Other
    "box-decoration-clone break-words",
  ],
  {
    variants: {
      size: {
        sm: "rounded-sm px-1 py-0",
        md: "rounded-md px-1.5 py-0.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

function Code({
  className,
  size = "md",
  ...props
}: React.ComponentProps<"code"> & VariantProps<typeof codeVariants>) {
  return (
    <code
      data-slot="code"
      className={cn(codeVariants({ size }), className)}
      {...props}
    />
  )
}

export { Code, codeVariants }
