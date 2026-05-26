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

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type NoticePosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

const createNoticeManager = ToastPrimitive.createToastManager
const noticeManager = createNoticeManager()
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
        "data-[position=bottom-right]:top-auto data-[position=bottom-right]:right-4 data-[position=bottom-right]:bottom-4 data-[position=bottom-right]:left-auto",
        "data-[position=bottom-left]:top-auto data-[position=bottom-left]:right-auto data-[position=bottom-left]:bottom-4 data-[position=bottom-left]:left-4",
        "data-[position=bottom-center]:top-auto data-[position=bottom-center]:right-0 data-[position=bottom-center]:bottom-4 data-[position=bottom-center]:left-0",
        // Top variants
        "data-[position=top-right]:top-4 data-[position=top-right]:right-4 data-[position=top-right]:bottom-auto data-[position=top-right]:left-auto",
        "data-[position=top-left]:top-4 data-[position=top-left]:right-auto data-[position=top-left]:bottom-auto data-[position=top-left]:left-4",
        "data-[position=top-center]:top-4 data-[position=top-center]:right-0 data-[position=top-center]:bottom-auto data-[position=top-center]:left-0",
        className
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
        "absolute right-0 left-auto mr-0 ml-auto box-border w-full cursor-default p-4 select-none",
        // Visual chrome
        "rounded-xl bg-surface bg-clip-padding text-text shadow-md ring-1 ring-border",
        // Transition
        "[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]",
        // Z-index based on stack position
        "z-[calc(1000-var(--toast-index))]",
        // Stacked-toast CSS variables
        "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]",
        // Bottom-anchored variants
        "data-[position^=bottom]:top-auto data-[position^=bottom]:bottom-0 data-[position^=bottom]:origin-bottom",
        "data-[position^=bottom]:[--offset-y:calc(var(--toast-offset-y)*-1+(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
        "data-[position^=bottom]:h-(--height)",
        "data-[position^=bottom]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
        "data-[position^=bottom]:data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
        "data-[position^=bottom]:data-expanded:h-(--toast-height)",
        "data-[position^=bottom]:data-starting-style:transform-[translateY(150%)]",
        "data-[position^=bottom]:[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)]",
        // Top-anchored variants
        "data-[position^=top]:top-0 data-[position^=top]:bottom-auto data-[position^=top]:origin-top",
        "data-[position^=top]:[--offset-y:calc(var(--toast-offset-y)+(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))]",
        "data-[position^=top]:h-(--height)",
        "data-[position^=top]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))]",
        "data-[position^=top]:data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
        "data-[position^=top]:data-expanded:h-(--toast-height)",
        "data-[position^=top]:data-starting-style:transform-[translateY(-150%)]",
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
        "after:absolute after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        "data-[position^=bottom]:after:top-full data-[position^=top]:after:bottom-full",
        className
      )}
      {...props}
    />
  )
}

function NoticeContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="notice-content"
      className={cn(
        "overflow-hidden transition-opacity duration-250",
        "data-behind:opacity-0 data-expanded:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function NoticeTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="notice-title"
      className={cn("mb-0 st-body-md-strong", className)}
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
      className={cn("m-0 st-body-md text-text-subtle", className)}
      {...props}
    />
  )
}

function NoticeAction({ className, ...props }: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="notice-action"
      render={
        <Button variant="outline" size="sm" className={cn("mt-2", className)} />
      }
      {...props}
    />
  )
}

function NoticeClose({ className, ...props }: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="notice-close"
      aria-label="Close"
      render={
        <Button
          variant="ghost"
          size="icon-sm"
          className={cn("absolute top-2 right-2", className)}
        />
      }
      {...props}
    >
      <SiX />
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
  toastManager?: ToastPrimitive.Provider.Props["toastManager"]
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
                {icon && <div className="shrink-0">{icon}</div>}
                <div className="min-w-0 flex-1 pr-4">
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
  toastManager = noticeManager,
}: NoticeProps) {
  return (
    <NoticeProvider toastManager={toastManager} limit={limit} timeout={timeout}>
      <NoticePortal>
        <NoticeViewport position={position}>
          <NoticeList position={position} />
        </NoticeViewport>
      </NoticePortal>
    </NoticeProvider>
  )
}

export {
  createNoticeManager,
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
