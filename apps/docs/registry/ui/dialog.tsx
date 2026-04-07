import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SiX } from "stera-icons"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        // Base
        "bg-black/10",
        // Position
        "fixed inset-0",
        // Animation
        "data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        // Other
        "isolate z-50 duration-100 supports-backdrop-filter:backdrop-blur-xs",
        className,
      )}
      {...props}
    />
  )
}

const dialogPopupVariants = cva([], {
  variants: {
    scroll: {
      true: "max-h-[80vh] overflow-y-auto scrollbar-hide",
      content: "max-h-[80vh] flex flex-col overflow-hidden",
      false: "",
    },
  },
  defaultVariants: {
    scroll: true,
  },
})

function DialogPopup({
  className,
  children,
  showCloseButton = true,
  scroll = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
} & VariantProps<typeof dialogPopupVariants>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-popup"
        className={cn(
          // Base
          "grid rounded-xl bg-bg-surface p-6 text-sm ring-1 ring-border outline-none",
          // Position
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          // Sizing
          "w-full max-w-[calc(100%-2rem)] gap-6 sm:max-w-md",
          // Animation
          "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          // Other
          "z-50 duration-100",
          dialogPopupVariants({ scroll, className }),
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-4 right-4"
                size="icon-sm"
              />
            }
          >
            <SiX
            />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

const dialogContentVariants = cva([], {
  variants: {
    scroll: {
      true: "overflow-y-auto scrollbar-hide flex-1 min-h-0",
      false: "",
    },
  },
  defaultVariants: {
    scroll: false,
  },
})

function DialogContent({
  className,
  scroll = false,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof dialogContentVariants>) {
  return (
    <div
      data-slot="dialog-content"
      className={cn(dialogContentVariants({ scroll, className }))}
      {...props}
    />
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        // Base
        "flex flex-col",
        // Sizing
        "gap-2",
        className,
      )}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        // Base
        "flex flex-col-reverse",
        // Sizing
        "gap-2",
        // Other
        "sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        // Other
        "leading-none font-medium",
        className,
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        // Base
        "text-sm",
        // Other
        "text-text-secondary *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-text",
        className,
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  dialogContentVariants,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPopup,
  dialogPopupVariants,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
