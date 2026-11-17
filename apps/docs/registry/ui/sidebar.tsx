"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Drawer,
  DrawerDescription,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SiSidebarLeft } from "stera-icons"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

// Which edge the surrounding `Sidebar` sits on, so tooltips open away from it.
const SidebarSideContext = React.createContext<"left" | "right">("left")

/** Access the surrounding `SidebarProvider`'s state and toggle helpers. */
function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

/** Top-level wrapper that owns sidebar open/closed state, writes the cookie, and registers the keyboard shortcut. */
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // Internal state; `openProp`/`setOpenProp` allow external control.
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = openProp ?? uncontrolledOpen
  // `openRef` lets `setOpen` resolve updater functions against the latest value
  // without re-creating the callback on every toggle. Synced via effect because
  // React 19 forbids mutating refs during render.
  const openRef = React.useRef(open)
  React.useEffect(() => {
    openRef.current = open
  })
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState =
        typeof value === "function" ? value(openRef.current) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        setUncontrolledOpen(openState)
      }
      // Read it back on the server to set `defaultOpen`, so a reload keeps the state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; samesite=lax`
    },
    [setOpenProp]
  )

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((open) => !open)
    } else {
      setOpen((open) => !open)
    }
  }, [isMobile, setOpen])

  // ⌘B / Ctrl+B toggles the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== SIDEBAR_KEYBOARD_SHORTCUT ||
        !(event.metaKey || event.ctrlKey) ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }
      // Don't steal ⌘B / Ctrl+B from text editors and form fields where it
      // commonly means "bold" or is otherwise expected input.
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return
      }
      event.preventDefault()
      toggleSidebar()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // Exposed as data-state="expanded" | "collapsed" for styling.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          // Group
          "group/sidebar-wrapper",
          // Base
          "flex min-h-svh w-full",
          // Inset — the sidebar sits on the app background, the content on a card
          "has-data-[variant=inset]:bg-surface-app",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

/** Renders the sidebar shell: a Drawer on mobile, a fixed panel on desktop, or a static panel when `collapsible="none"`. */
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  // Static panel — `variant` and `side` don't apply because nothing collapses, floats, or insets.
  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-surface text-ink",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <SidebarSideContext.Provider value={side}>
        <Drawer open={openMobile} onOpenChange={setOpenMobile} side={side}>
          <DrawerPopup
            data-sidebar="sidebar"
            data-slot="sidebar"
            data-mobile="true"
            className="w-(--sidebar-width)"
            showCloseButton={false}
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
          >
            <DrawerHeader className="sr-only">
              <DrawerTitle>Sidebar</DrawerTitle>
              <DrawerDescription>
                Displays the mobile sidebar.
              </DrawerDescription>
            </DrawerHeader>
            {/* Consumer-supplied div props (className, style, dir, ...) land here so they aren't dropped on mobile. */}
            <div
              className={cn("flex size-full flex-col", className)}
              {...props}
            >
              {children}
            </div>
          </DrawerPopup>
        </Drawer>
      </SidebarSideContext.Provider>
    )
  }

  return (
    <SidebarSideContext.Provider value={side}>
      <div
        className="group peer hidden text-ink md:block"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
        data-slot="sidebar"
      >
        {/* Holds the sidebar's space in the layout, since the panel itself is fixed */}
        <div
          data-slot="sidebar-gap"
          className={cn(
            "w-(--sidebar-width) transition-[width] duration-200 ease-linear motion-reduce:transition-none",
            "group-data-[collapsible=offcanvas]:w-0",
            variant === "sidebar"
              ? "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
              : "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
          )}
        />
        <div
          data-slot="sidebar-container"
          data-side={side}
          className={cn(
            // Base
            "fixed inset-y-0 z-10 flex w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear motion-reduce:transition-none",
            // Position — collapsing offcanvas slides it off its own edge
            "data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:-left-(--sidebar-width)",
            "data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:-right-(--sidebar-width)",
            // Variants — floating and inset keep a gutter around the panel
            variant === "sidebar"
              ? "bg-surface group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l"
              : "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            data-slot="sidebar-inner"
            className={cn(
              "flex size-full flex-col",
              variant === "floating" &&
                "rounded-xl bg-surface shadow-sm ring-1 ring-border forced-stroke"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </SidebarSideContext.Provider>
  )
}

/** Icon button that toggles the sidebar. Place anywhere inside `SidebarProvider`. */
function SidebarTrigger({
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <SiSidebarLeft />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}

/** A thin strip along the sidebar's inner edge that toggles it on click. A pointer shortcut; `SidebarTrigger` stays the keyboard path. */
function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { isMobile, toggleSidebar } = useSidebar()

  // The mobile Drawer has its own dismissal.
  if (isMobile) {
    return null
  }

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle sidebar"
      className={cn(
        // Base — straddles the sidebar's inner edge
        "absolute inset-y-0 z-20 flex w-4 -translate-x-1/2 transition-[translate,background-color] ease-linear",
        "group-data-[side=left]:-right-4 group-data-[side=right]:left-0",
        // Line — shows down the middle on hover
        "after:absolute after:inset-y-0 after:inset-s-1/2 after:w-0.5 hover:after:bg-border",
        // Cursor — points the way the sidebar will move
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        // Offcanvas — once hidden, the rail hugs the screen edge
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-surface",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2 [[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

/** Main content area next to the sidebar. Becomes a card for the `inset` variant. */
function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        // Base
        "relative flex w-full flex-1 flex-col",
        // Inset
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:bg-surface md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

/** `Input` sized for the sidebar, such as a search field. */
function SidebarInput({
  size = "sm",
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      size={size}
      {...props}
    />
  )
}

/** Header region at the top of the sidebar. */
function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

/** Footer region at the bottom of the sidebar. */
function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

/** Horizontal divider between sidebar regions. */
function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("mx-2 w-auto", className)}
      {...props}
    />
  )
}

/** Scrollable middle region between header and footer. */
function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 scrollbar-hide flex-col gap-2 overflow-auto",
        "group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

/** Container that clusters a label, optional action, and a menu. */
function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

// Shared by the small icon buttons pinned inside a group or menu item.
const actionClassName = [
  // Base
  "absolute flex size-5 items-center justify-center rounded-md text-ink outline-none hover:bg-surface-hover",
  // Focus
  "forced-focus focus-visible:ring-3 focus-visible:ring-ring",
  // Touch target — a larger hit area on small screens
  "after:absolute after:-inset-2 md:after:hidden",
  // Collapsed to icons
  "group-data-[collapsible=icon]:hidden",
  // Other
  "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
]

/** Section heading inside a `SidebarGroup`. Polymorphic via `render`. Hidden in icon-collapsed mode. */
function SidebarGroupLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          // Base
          "flex h-8 shrink-0 items-center rounded-md px-2 st-body-sm text-ink-subtler outline-none",
          // Focus — when rendered as a trigger
          "forced-focus focus-visible:ring-3 focus-visible:ring-ring",
          // Collapsed to icons — slides up and fades so the menu closes the gap
          "transition-[margin,opacity] duration-200 ease-linear motion-reduce:transition-none",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          // Other
          "[&>svg]:size-4 [&>svg]:shrink-0",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-label",
      sidebar: "group-label",
    },
  })
}

/** Icon button pinned to the top-right of a group, such as an "add" control. */
function SidebarGroupAction({
  className,
  render,
  ...props
}: useRender.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(actionClassName, "top-3.5 right-3", className),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-action",
      sidebar: "group-action",
    },
  })
}

/** Body slot for the group, below `SidebarGroupLabel`. */
function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full", className)}
      {...props}
    />
  )
}

/** Vertical list of `SidebarMenuItem`s. Renders as `<ul>`. */
function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

/** A single row in `SidebarMenu`. Wraps a button, and optionally an action or badge. Renders as `<li>`. */
function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

// Shared by menu buttons and sub-menu buttons.
const itemClassName = [
  // States — the active item keeps its own hover and press, so it never reads as plain hover
  "text-ink hover:bg-surface-hover active:bg-surface-pressed data-popup-open:bg-surface-hover",
  "data-active:bg-surface-muted data-active:hover:bg-surface-muted-hover data-active:active:bg-surface-muted-pressed",
  // Focus
  "forced-focus focus-visible:ring-3 focus-visible:ring-ring",
  // Disabled
  "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
]

const menuButtonDefaults = { variant: "ghost", size: "md" } as const

/** cva variants shared by every `SidebarMenuButton`. Exported for consumers building custom menu items. */
const sidebarMenuButtonVariants = cva(
  [
    // Group
    "peer/menu-button",
    // Base
    "flex w-full items-center gap-2 overflow-hidden rounded-lg p-2 text-start transition-[width,height,padding] outline-none",
    ...itemClassName,
    // An adjacent action reserves space so the label never runs under it
    "group-has-data-[sidebar=menu-action]/menu-item:pr-8",
    // Collapsed to icons
    "group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-2",
    // Other
    "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&>span:last-child]:truncate",
  ],
  {
    variants: {
      variant: {
        ghost: "",
        outline: "bg-surface inset-ring inset-ring-border forced-stroke",
      },
      size: {
        sm: "h-7 st-label-sm data-active:st-label-sm-medium",
        md: "h-8 st-label-md data-active:st-label-md-medium",
        lg: "h-12 st-label-md group-data-[collapsible=icon]:p-0 data-active:st-label-md-medium",
      },
    },
    defaultVariants: menuButtonDefaults,
  }
)

/** Primary clickable row in `SidebarMenu`. Polymorphic via `render`. Pass `tooltip` to show a label when collapsed to icons. */
function SidebarMenuButton({
  render,
  isActive = false,
  variant = menuButtonDefaults.variant,
  size = menuButtonDefaults.size,
  tooltip,
  className,
  ...props
}: useRender.ComponentProps<"button"> & {
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const { isMobile, state } = useSidebar()
  const side = React.useContext(SidebarSideContext)
  const comp = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      },
      props
    ),
    render: !tooltip ? render : <TooltipTrigger render={render} />,
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
      active: isActive,
    },
  })

  if (!tooltip) {
    return comp
  }

  const tooltipProps =
    typeof tooltip === "string" ? { children: tooltip } : tooltip

  return (
    // Only needed while the labels are hidden.
    <Tooltip disabled={state !== "collapsed" || isMobile}>
      {comp}
      <TooltipContent
        side={side === "left" ? "right" : "left"}
        {...tooltipProps}
      />
    </Tooltip>
  )
}

/** Icon button pinned to the right of a `SidebarMenuButton`, such as a "more" menu. Set `showOnHover` to reveal it on hover or focus. */
function SidebarMenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}: useRender.ComponentProps<"button"> & {
  showOnHover?: boolean
}) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          actionClassName,
          // Position — centered on the button at each size
          "top-1.5 right-1 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1",
          // Touch screens can't hover, so it only hides from md up
          showOnHover &&
            "md:opacity-0 md:group-focus-within/menu-item:opacity-100 md:group-hover/menu-item:opacity-100 md:aria-expanded:opacity-100",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-action",
      sidebar: "menu-action",
    },
  })
}

/** Small count or status anchored to the right of a `SidebarMenuButton`. Place it after the button. */
function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        // Base
        "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 st-label-sm-medium text-ink tabular-nums select-none",
        // Position — centered on the button at each size
        "peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=md]/menu-button:top-1.5 peer-data-[size=sm]/menu-button:top-1",
        // Collapsed to icons
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

/** Loading placeholder shaped like a `SidebarMenuButton`. Pass `showIcon` to include a square icon skeleton. */
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 and 90%. Starts at a fixed default so the SSR
  // markup matches the first client render, then randomizes after mount.
  const [width, setWidth] = React.useState("70%")
  React.useEffect(() => {
    setWidth(`${Math.floor(Math.random() * 40) + 50}%`)
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

/** Indented `<ul>` for nested menu items inside a `SidebarMenuItem`. Hidden in icon-collapsed mode. */
function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        // Base — the 1px shift lines the stroke up with the parent's icon
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-border px-2.5 py-0.5",
        // Collapsed to icons
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

/** A row inside `SidebarMenuSub`. Renders as `<li>`. */
function SidebarMenuSubItem({ ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      {...props}
    />
  )
}

/** Clickable row inside `SidebarMenuSub`. Defaults to `<a>`; pass `render` to swap (e.g. Next.js `<Link>`). */
function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  className,
  ...props
}: useRender.ComponentProps<"a"> & {
  size?: "sm" | "md"
  isActive?: boolean
}) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          // Base — undoes the sub-menu's 1px shift
          "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-none",
          ...itemClassName,
          // Text
          size === "sm"
            ? "st-label-sm data-active:st-label-sm-medium"
            : "st-label-md data-active:st-label-md-medium",
          // Collapsed to icons
          "group-data-[collapsible=icon]:hidden",
          // Other
          "[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-ink-subtler",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
      active: isActive,
    },
  })
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  sidebarMenuButtonVariants,
  useSidebar,
}
