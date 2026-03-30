"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  SiCheckCircleFill,
  SiInfoCircleFill,
  SiAlertTriangleFill,
  SiAlertOctagonFill,
  SiCircleNotch,
} from "stera-icons"

const Notice = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group select-none"
      icons={{
        success: (
          <SiCheckCircleFill className="size-4 text-text-success" />
        ),
        info: (
          <SiInfoCircleFill className="size-4 text-text-secondary" />
        ),
        warning: (
          <SiAlertTriangleFill className="size-4 text-text-warning" />
        ),
        error: (
          <SiAlertOctagonFill className="size-4 text-text-danger" />
        ),
        loading: (
          <SiCircleNotch className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--bg-surface)",
          "--normal-text": "var(--text)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius-xl)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
          title: "!arc-text-body-md-strong",
          icon: "!ml-0",
          description: "!arc-text-body-md !text-text-secondary",
          actionButton: "!arc-text-body-sm-strong !inline-flex !items-center !justify-center !rounded-xl !border !border-border !bg-bg-surface hover:!bg-bg-surface-hover !h-9 !px-3 !text-text arc-text-body-md-strong !whitespace-nowrap !transition-all",
        },
      }}
      {...props}
    />
  )
}

export { Notice }
