import { SiChevronDown } from "stera-icons"
import type { CollectionSummary } from "../../shared/messages.js"

type Props = {
  /** Only collections that hold at least one ramp group. */
  collections: CollectionSummary[]
  /** `${collectionId}|${group}`. */
  value: string
  onChange: (target: string) => void
}

export function GroupSelect({ collections, value, onChange }: Props) {
  return (
    <div className="relative">
      <select
        aria-label="Target group"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={collections.length === 0}
        className="h-6 w-full appearance-none rounded-md border border-surface-secondary bg-surface-secondary px-2 text-text hover:border-border focus-visible:border-border-selected focus-visible:outline-none disabled:opacity-50"
      >
        {collections.length === 0 ? (
          <option value="">No color groups found</option>
        ) : (
          collections.map((c) => (
            <optgroup key={c.id} label={c.name}>
              {c.groups.map((g) => (
                <option key={g} value={`${c.id}|${g}`}>
                  {g}
                </option>
              ))}
            </optgroup>
          ))
        )}
      </select>
      <SiChevronDown
        size={10}
        className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2 text-icon-secondary"
      />
    </div>
  )
}
