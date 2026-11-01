import { SiChevronDown } from "stera-icons"
import type { CollectionSummary } from "../../shared/messages.js"
import { DEFAULT_COLLECTION_NAME } from "../../core/naming/variable-names.js"

type Props = {
  collections: CollectionSummary[]
  value: string
  onChange: (collectionId: string) => void
}

export function CollectionSelect({ collections, value, onChange }: Props) {
  return (
    <div className="relative">
      <select
        aria-label="Collection"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-6 w-full appearance-none rounded-md border border-surface-secondary bg-surface-secondary px-2 text-text hover:border-border focus-visible:border-border-selected focus-visible:outline-none"
      >
        {/* Written to the Color collection, created if the file has none. */}
        <option value="">{DEFAULT_COLLECTION_NAME} (default)</option>
        {collections.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <SiChevronDown
        size={10}
        className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2 text-icon-secondary"
      />
    </div>
  )
}
