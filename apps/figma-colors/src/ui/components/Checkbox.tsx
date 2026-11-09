import { useId } from "react"
import { SiCheckBold } from "stera-icons"

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}

/** A Figma-style checkbox: a bordered square with a check, label to the right. */
export function Checkbox({ checked, onChange, label }: Props) {
  const id = useId()
  return (
    <label
      htmlFor={id}
      className="group flex h-6 w-fit cursor-pointer items-center gap-2 text-text"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="flex size-4 items-center justify-center rounded-[4px] border border-icon-secondary bg-surface group-hover:border-text peer-focus-visible:border-border-selected peer-focus-visible:ring-2 peer-focus-visible:ring-border-selected/40"
      >
        {checked && <SiCheckBold size={12} />}
      </span>
      <span>{label}</span>
    </label>
  )
}
