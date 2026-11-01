import { SiChevronDown } from "stera-icons"

type Props<T extends string> = {
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
  label: string
}

export function Select<T extends string>({
  value,
  options,
  onChange,
  label,
}: Props<T>) {
  return (
    <div className="relative w-30 shrink-0">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-6 w-full appearance-none rounded-[5px] bg-surface-secondary pr-6 pl-2 text-text outline-none focus-visible:ring-1 focus-visible:ring-brand"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <SiChevronDown
        size={12}
        className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-icon-secondary"
      />
    </div>
  )
}
