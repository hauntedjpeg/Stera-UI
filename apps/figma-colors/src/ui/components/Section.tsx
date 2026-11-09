import type { ReactNode } from "react"

type Props = {
  title: string
  children: ReactNode
  className?: string
}

export function Section({ title, children, className = "" }: Props) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <h2 className="pt-3 font-semibold text-text">{title}</h2>
      {children}
    </div>
  )
}
