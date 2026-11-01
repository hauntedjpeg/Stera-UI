import type { ReactNode } from "react"

type Props = {
  label: string
  children: ReactNode
}

export function Field({ label, children }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px]/3.5 font-medium tracking-wide text-text-secondary">
        {label}
      </span>
      {children}
    </div>
  )
}
