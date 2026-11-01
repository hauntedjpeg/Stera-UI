type Props<T extends string> = {
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
  label: string
}

export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  label,
}: Props<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex overflow-hidden rounded-md bg-surface-secondary"
    >
      {options.map((o) => {
        const selected = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.value)}
            className={`h-6 flex-1 rounded-md border font-medium ${
              selected
                ? "border-border bg-surface text-text"
                : "border-transparent text-text-secondary hover:text-text"
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
