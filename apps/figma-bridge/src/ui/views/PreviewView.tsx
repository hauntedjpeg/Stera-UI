import type { VariableDoc } from "../../shared/messages.js"
import type { GenerateResult } from "../../core/css/generate.js"
import { selectExportedCollections } from "../../core/css/model.js"

type Props = {
  doc: VariableDoc
  output: GenerateResult | null
  onAdvance: () => void
}

export function PreviewView({ doc, output, onAdvance }: Props) {
  const exported = selectExportedCollections(doc.collections)
  const ignoredCount = doc.collections.length - exported.length
  const totalVars = exported.reduce((n, c) => n + c.variables.length, 0)
  return (
    <div className="flex flex-col gap-4 p-4">
      <section>
        <div className="mb-2 text-[10px] font-semibold tracking-wide text-[var(--color-text-secondary)] uppercase">
          Detected
        </div>
        <div className="rounded border border-[var(--color-border)]">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-2">
            <div>Collections</div>
            <div className="font-mono">{exported.length}</div>
          </div>
          <div className="flex items-center justify-between px-3 py-2">
            <div>Variables</div>
            <div className="font-mono">{totalVars}</div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-2 text-[10px] font-semibold tracking-wide text-[var(--color-text-secondary)] uppercase">
          Collections
        </div>
        <div className="flex flex-col gap-1">
          {exported.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between rounded border border-[var(--color-border)] px-3 py-2"
            >
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-[10px] text-[var(--color-text-secondary)]">
                  {c.modes.map((m) => m.name).join(" / ")} ·{" "}
                  {c.variables.length} variables
                </div>
              </div>
            </div>
          ))}
        </div>
        {ignoredCount > 0 && (
          <div className="mt-2 text-[10px] text-[var(--color-text-secondary)]">
            {ignoredCount} other collection{ignoredCount === 1 ? "" : "s"}{" "}
            ignored — only Color, Theme, and Typography are exported.
          </div>
        )}
      </section>

      {output && output.errors.length > 0 && (
        <section className="rounded border border-[var(--color-danger)] bg-[color-mix(in_srgb,var(--color-danger)_8%,transparent)] p-3">
          <div className="mb-1 font-semibold text-[var(--color-danger)]">
            Cannot export yet
          </div>
          <ul className="list-inside list-disc text-[var(--color-text)]">
            {output.errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </section>
      )}

      {output && output.warnings.length > 0 && (
        <section className="rounded border border-[var(--color-warning)] bg-[color-mix(in_srgb,var(--color-warning)_8%,transparent)] p-3">
          <div className="mb-1 font-semibold">Warnings</div>
          <ul className="list-inside list-disc">
            {output.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </section>
      )}

      <button
        onClick={onAdvance}
        disabled={!!output && output.errors.length > 0}
        className="mt-2 rounded bg-[var(--color-brand)] px-3 py-2 font-semibold text-[var(--color-brand-text)] transition-opacity disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  )
}
