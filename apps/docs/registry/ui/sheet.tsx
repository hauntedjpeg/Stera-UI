"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SiX } from "stera-icons"

type SheetSide = "top" | "right" | "bottom" | "left"

const SIDE_TO_SWIPE_DIRECTION = {
  top: "up",
  right: "right",
  bottom: "down",
  left: "left",
} as const satisfies Record<SheetSide, "up" | "right" | "down" | "left">

const SheetContext = React.createContext<{ side: SheetSide }>({ side: "right" })

function useSheetSide() {
  return React.useContext(SheetContext).side
}

function Sheet({
  side = "right",
  swipeDirection,
  ...props
}: DrawerPrimitive.Root.Props & { side?: SheetSide }) {
  const value = React.useMemo(() => ({ side }), [side])
  return (
    <SheetContext.Provider value={value}>
      <DrawerPrimitive.Root
        data-slot="sheet"
        swipeDirection={swipeDirection ?? SIDE_TO_SWIPE_DIRECTION[side]}
        {...props}
      />
    </SheetContext.Provider>
  )
}

function SheetTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetBackdrop({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="sheet-backdrop"
      className={cn(
        // Base
        "fixed inset-0 z-50 bg-black/20 dark:bg-black/60",
        // Blur
        "supports-backdrop-filter:backdrop-blur-xs",
        // Swipe-driven opacity
        "opacity-[calc(1-var(--drawer-swipe-progress,0))]",
        // Open/close transition
        "transition-opacity duration-200 ease-out",
        "data-starting-style:opacity-0 data-ending-style:opacity-0",
        "data-swiping:duration-0",
        "data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*400ms)]",
        className
      )}
      {...props}
    />
  )
}

function SheetViewport({
  className,
  ...props
}: DrawerPrimitive.Viewport.Props) {
  const side = useSheetSide()
  return (
    <DrawerPrimitive.Viewport
      data-slot="sheet-viewport"
      data-side={side}
      className={cn(
        // Base
        "fixed inset-0 z-50 flex p-2",
        // Position by side
        "data-[side=right]:items-stretch data-[side=right]:justify-end",
        "data-[side=left]:items-stretch data-[side=left]:justify-start",
        "data-[side=top]:items-start data-[side=top]:justify-stretch",
        "data-[side=bottom]:items-end data-[side=bottom]:justify-stretch",
        className
      )}
      {...props}
    />
  )
}

function SheetPopup({ className, ...props }: DrawerPrimitive.Popup.Props) {
  const side = useSheetSide()
  return (
    <DrawerPrimitive.Popup
      data-slot="sheet-popup"
      data-side={side}
      className={cn(
        // Group
        "group/sheet",
        // Base
        "relative flex flex-col bg-surface text-sm text-text ring-1 ring-border rounded-xl shadow-lg outline-none",
        // Sizing per side
        "data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:sm:max-w-sm",
        "data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:sm:max-w-sm",
        "data-[side=top]:w-full data-[side=top]:max-h-[80vh]",
        "data-[side=bottom]:w-full data-[side=bottom]:max-h-[80vh]",
        // Scrolling
        "overflow-y-auto overscroll-contain touch-auto",
        // Swipe-driven transform (bottom adds snap-point offset)
        "data-[side=right]:transform-[translateX(var(--drawer-swipe-movement-x))]",
        "data-[side=left]:transform-[translateX(var(--drawer-swipe-movement-x))]",
        "data-[side=top]:transform-[translateY(var(--drawer-swipe-movement-y))]",
        "data-[side=bottom]:transform-[translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)))]",
        // Transition
        "transition-[transform,opacity] duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform",
        "data-swiping:duration-0 data-swiping:select-none",
        "data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*400ms)]",
        // Starting/ending — slide off-screen
        "data-[side=right]:data-starting-style:transform-[translateX(100%)] data-[side=right]:data-ending-style:transform-[translateX(100%)]",
        "data-[side=left]:data-starting-style:transform-[translateX(-100%)] data-[side=left]:data-ending-style:transform-[translateX(-100%)]",
        "data-[side=top]:data-starting-style:transform-[translateY(-100%)] data-[side=top]:data-ending-style:transform-[translateY(-100%)]",
        "data-[side=bottom]:data-starting-style:transform-[translateY(100%)] data-[side=bottom]:data-ending-style:transform-[translateY(100%)]",
        // Light nested-drawer affordance
        "data-nested-drawer-open:opacity-90",
        className
      )}
      {...props}
    />
  )
}

function SheetHandle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-handle"
      aria-hidden
      className={cn(
        "mx-auto mt-2 h-1 w-12 shrink-0 rounded-full bg-surface-secondary",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DrawerPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  const side = useSheetSide()
  return (
    <SheetPortal>
      <SheetBackdrop />
      <SheetViewport>
        <SheetPopup className={className} {...props}>
          {side === "bottom" && <SheetHandle />}
          {children}
          {showCloseButton && (
            <SheetClose
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2.5 right-2.5"
                />
              }
            >
              <SiX />
              <span className="sr-only">Close</span>
            </SheetClose>
          )}
        </SheetPopup>
      </SheetViewport>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        // Base
        "flex flex-col p-4",
        // Sizing
        "gap-1.5",
        // Pad right when the corner close button (a direct child of SheetPopup) is present
        "group-has-[>[data-slot=sheet-close]]/sheet:pr-14",
        className
      )}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        // Base
        "flex p-4",
        // Position
        "mt-auto",
        // Sizing
        "gap-2 *:flex-1",
        className
      )}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        // Other
        "font-medium text-text",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="sheet-description"
      className={cn(
        // Other
        "text-sm text-text-subtle",
        className
      )}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetBackdrop,
  SheetViewport,
  SheetPopup,
  SheetHandle,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
