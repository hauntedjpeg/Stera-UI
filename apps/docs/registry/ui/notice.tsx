"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import {
  SiAlertOctagonFill,
  SiAlertTriangleFill,
  SiCheckCircleFill,
  SiCircleNotch,
  SiInfoCircleFill,
  SiX,
} from "stera-icons"

import { cn } from "@/lib/utils"

type NoticePosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

const noticeManager = ToastPrimitive.createToastManager()
const useNoticeManager = ToastPrimitive.useToastManager

function NoticeProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />
}

function NoticePortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal {...props} />
}

function NoticeViewport({
  className,
  position = "bottom-right",
  ...props
}: ToastPrimitive.Viewport.Props & { position?: NoticePosition }) {
  return (
    <ToastPrimitive.Viewport
      data-slot="notice-viewport"
      data-position={position}
      className={cn(
        "fixed z-50 mx-auto flex w-[20rem] outline-none",
        // Bottom variants
        "data-[position=bottom-right]:right-4 data-[position=bottom-right]:bottom-4 data-[position=bottom-right]:left-auto data-[position=bottom-right]:top-auto",
        "data-[position=bottom-left]:left-4 data-[position=bottom-left]:bottom-4 data-[position=bottom-left]:right-auto data-[position=bottom-left]:top-auto",
        "data-[position=bottom-center]:left-0 data-[position=bottom-center]:right-0 data-[position=bottom-center]:bottom-4 data-[position=bottom-center]:top-auto",
        // Top variants
        "data-[position=top-right]:right-4 data-[position=top-right]:top-4 data-[position=top-right]:left-auto data-[position=top-right]:bottom-auto",
        "data-[position=top-left]:left-4 data-[position=top-left]:top-4 data-[position=top-left]:right-auto data-[position=top-left]:bottom-auto",
        "data-[position=top-center]:left-0 data-[position=top-center]:right-0 data-[position=top-center]:top-4 data-[position=top-center]:bottom-auto",
        className,
      )}
      {...props}
    />
  )
}

function NoticeRoot({
  className,
  position = "bottom-right",
  ...props
}: ToastPrimitive.Root.Props & { position?: NoticePosition }) {
  const isTop = position.startsWith("top")
  return (
    <ToastPrimitive.Root
      data-slot="notice-root"
      data-position={position}
      swipeDirection={isTop ? "up" : "down"}
      className={cn(
        // Layout
        "absolute left-auto right-0 mr-0 ml-auto box-border w-full p-4 select-none cursor-default",
        // Visual chrome
        "rounded-xl bg-surface text-text ring-1 ring-border shadow-md bg-clip-padding",
        // Transition
        "[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]",
        // Z-index based on stack position
        "z-[calc(1000-var(--toast-index))]",
        // Stacked-toast CSS variables
        "[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))]",
        // Bottom-anchored variants
        "data-[position^=bottom]:bottom-0 data-[position^=bottom]:top-auto data-[position^=bottom]:origin-bottom",
        "data-[position^=bottom]:[--offset-y:calc(var(--toast-offset-y)*-1+(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
        "data-[position^=bottom]:h-(--height)",
        "data-[position^=bottom]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
        "data-[position^=bottom]:data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
        "`data-[position^=bottom]:data-expanded:h-(--toast-height)",
        "data-[position^=bottom]:data-starting-style:transform-[translateY(150%)]",
        "data-[position^=bottom]:[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)]",
        // Top-anchored variants
        "data-[position^=top]:top-0 data-[position^=top]:bottom-auto data-[position^=top]:origin-top",
        "data-[position^=top]:[--offset-y:calc(var(--toast-offset-y)+(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))]",
        "data-[position^=top]:h-(--height)",
        "data-[position^=top]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))]",
        "data-[position^=top]:data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
        "data-[position^=top]:data-expanded:h-(--toast-height)",
        "`data-[position^=top]:data-starting-style:transform-[translateY(-150%)]",
        "data-[position^=top]:[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(-150%)]",
        // Limit / ending opacity
        "data-limited:opacity-0",
        "data-ending-style:opacity-0",
        // Swipe-out transforms
        "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        // Hover hit-area between stacked toasts
        "after:absolute after:left-0 after:w-full after:h-[calc(var(--gap)+1px)] after:content-['']",
        "data-[position^=bottom]:after:top-full data-[position^=top]:after:bottom-full",
        className,
      )}
      {...props}
    />
  )
}

function NoticeContent({
  className,
  ...props
}: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="notice-content"
      className={cn(
        "overflow-hidden transition-opacity duration-250",
        "data-behind:opacity-0 data-expanded:opacity-100",
        className,
      )}
      {...props}
    />
  )
}

function NoticeTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="notice-title"
      className={cn("st-body-md-strong m-0", className)}
      {...props}
    />
  )
}

function NoticeDescription({
  className,
  ...props
}: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="notice-description"
      className={cn("st-body-md text-text-subtle m-0", className)}
      {...props}
    />
  )
}

function NoticeAction({
  className,
  ...props
}: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="notice-action"
      className={cn(
        "st-body-sm-strong inline-flex items-center justify-center whitespace-nowrap",
        "h-9 px-3 mt-2 rounded-xl border border-border bg-surface text-text",
        "hover:bg-surface-hover transition-all",
        "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring-brand",
        className,
      )}
      {...props}
    />
  )
}

function NoticeClose({ className, ...props }: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="notice-close"
      aria-label="Close"
      className={cn(
        "absolute top-2 right-2 inline-flex items-center justify-center",
        "size-5 rounded-md border-none bg-transparent text-text-subtle",
        "hover:bg-surface-hover hover:text-text",
        className,
      )}
      {...props}
    >
      <SiX className="size-3.5" />
    </ToastPrimitive.Close>
  )
}

const NOTICE_TYPE_ICONS: Record<string, React.ReactNode> = {
  success: <SiCheckCircleFill className="size-4 text-text-success" />,
  info: <SiInfoCircleFill className="size-4 text-text-subtle" />,
  warning: <SiAlertTriangleFill className="size-4 text-text-warning" />,
  error: <SiAlertOctagonFill className="size-4 text-text-danger" />,
  loading: <SiCircleNotch className="size-4 animate-spin" />,
}

interface NoticeProps {
  position?: NoticePosition
  limit?: ToastPrimitive.Provider.Props["limit"]
  timeout?: ToastPrimitive.Provider.Props["timeout"]
}

function NoticeList({ position }: { position: NoticePosition }) {
  const { toasts } = useNoticeManager()
  return (
    <>
      {toasts.map((toast) => {
        const icon = toast.type ? NOTICE_TYPE_ICONS[toast.type] : null
        return (
          <NoticeRoot key={toast.id} toast={toast} position={position}>
            <NoticeContent>
              <div className={cn("flex items-start", icon && "gap-2")}>
                {icon && <div className="pt-0.5 shrink-0">{icon}</div>}
                <div className="flex-1 min-w-0 pr-4">
                  <NoticeTitle />
                  <NoticeDescription />
                  {toast.actionProps && <NoticeAction />}
                </div>
              </div>
              <NoticeClose />
            </NoticeContent>
          </NoticeRoot>
        )
      })}
    </>
  )
}

function Notice({
  position = "bottom-right",
  limit,
  timeout,
}: NoticeProps) {
  return (
    <NoticeProvider
      toastManager={noticeManager}
      limit={limit}
      timeout={timeout}
    >
      <NoticePortal>
        <NoticeViewport position={position}>
          <NoticeList position={position} />
        </NoticeViewport>
      </NoticePortal>
    </NoticeProvider>
  )
}

export {
  Notice,
  NoticeAction,
  NoticeClose,
  NoticeContent,
  NoticeDescription,
  noticeManager,
  NoticePortal,
  NoticeProvider,
  NoticeRoot,
  NoticeTitle,
  NoticeViewport,
  useNoticeManager,
}
export type { NoticePosition, NoticeProps }
