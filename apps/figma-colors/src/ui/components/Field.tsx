import type { ReactNode } from "react"

type Props = {
  label: string
  children: ReactNode
  className?: string
}

export function Field({ label, children, className = "" }: Props) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className="text-[9px]/3.5 font-medium tracking-wide text-text-secondary">
        {label}
      </span>
      {children}
    </div>
  )
}
