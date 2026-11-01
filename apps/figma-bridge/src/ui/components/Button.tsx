import type { ButtonHTMLAttributes, ReactNode } from "react"

const VARIANTS = {
  primary: "bg-brand text-brand-text hover:bg-brand-hover",
  secondary: "border border-border text-text hover:bg-surface-hover",
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof VARIANTS
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex h-6 shrink-0 items-center gap-1 rounded-[5px] px-2 font-medium transition-colors disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  )
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  children: ReactNode
}

export function IconButton({
  label,
  className = "",
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex size-6 shrink-0 items-center justify-center rounded-[5px] text-icon-secondary transition-colors hover:bg-surface-hover hover:text-text ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
