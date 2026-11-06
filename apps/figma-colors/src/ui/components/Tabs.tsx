type Props<T extends string> = {
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
  label: string
}

/** Styled to match the tabs in Stera UI Bridge: no track, the active tab
 *  filled. For picking a view, where `SegmentedControl` sets a value. */
export function Tabs<T extends string>({
  value,
  options,
  onChange,
  label,
}: Props<T>) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="flex items-center gap-0.5"
    >
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={`h-6 rounded-[5px] px-2 transition-colors ${
              active
                ? "bg-surface-secondary font-medium text-text"
                : "text-text-secondary hover:bg-surface-secondary"
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
