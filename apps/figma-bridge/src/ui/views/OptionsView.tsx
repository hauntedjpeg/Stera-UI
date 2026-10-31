import type { UnitChoice, VariableDoc } from "../../shared/messages.js"
import { selectExportedCollections } from "../../core/css/model.js"

type Props = {
  doc: VariableDoc
  unitByCollectionName: Record<string, UnitChoice>
  darkModeIdByCollectionId: Record<string, string>
  prefix: string
  onUnitChange: (collectionName: string, unit: UnitChoice) => void
  onDarkModeChange: (collectionId: string, modeId: string) => void
  onPrefixChange: (prefix: string) => void
}

export function OptionsView({
  doc,
  unitByCollectionName,
  darkModeIdByCollectionId,
  prefix,
  onUnitChange,
  onDarkModeChange,
  onPrefixChange,
}: Props) {
  // Ignored collections never reach the CSS, so a control for one would be a no-op.
  const exported = selectExportedCollections(doc.collections)
  const numberCollections = exported.filter((c) =>
    c.variables.some((v) => v.type === "FLOAT")
  )
  // Only multi-mode collections are worth mapping — since light/dark moved to
  // the semantic layer, the primitive Color collection is mode-less and would
  // otherwise render a one-option dropdown.
  const colorCollections = exported.filter(
    (c) => c.modes.length > 1 && c.variables.some((v) => v.type === "COLOR")
  )

  return (
    <div className="flex flex-col gap-4 p-4">
      <section>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
          CSS variable prefix
        </div>
        <input
          type="text"
          value={prefix}
          onChange={(e) => onPrefixChange(e.target.value)}
          placeholder="(none)"
          className="w-full rounded border border-[var(--color-border)] bg-transparent px-2 py-1.5"
        />
        <div className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
          Optional. Example: <code>stera</code> → <code>--stera-surface</code>.
        </div>
      </section>

      <section>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Number units
        </div>
        {numberCollections.length === 0 ? (
          <div className="text-[var(--color-text-secondary)]">
            No numeric collections detected.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {numberCollections.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded border border-[var(--color-border)] px-3 py-2"
              >
                <div className="font-medium">{c.name}</div>
                <div className="flex gap-1">
                  {(["rem", "px"] as UnitChoice[]).map((u) => (
                    <button
                      key={u}
                      onClick={() => onUnitChange(c.name, u)}
                      className={`rounded border px-2 py-1 text-[10px] ${
                        (unitByCollectionName[c.name] ?? "rem") === u
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-[var(--color-brand-text)]"
                          : "border-[var(--color-border)]"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Dark mode mapping
        </div>
        {colorCollections.map((c) => {
          const autoDetected = c.modes.find((m) => /dark/i.test(m.name))
          const current =
            darkModeIdByCollectionId[c.id] ?? autoDetected?.id ?? ""
          return (
            <div
              key={c.id}
              className="mb-2 flex items-center justify-between rounded border border-[var(--color-border)] px-3 py-2"
            >
              <div className="font-medium">{c.name}</div>
              <select
                value={current}
                onChange={(e) => onDarkModeChange(c.id, e.target.value)}
                className="rounded border border-[var(--color-border)] bg-transparent px-2 py-1"
              >
                {c.modes.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          )
        })}
      </section>
    </div>
  )
}
