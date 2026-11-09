import { displayHex, isLightColor } from "../src/core/color/hex.js"
import { hexToOklch, wcag } from "../src/core/scale/gamut.js"
import { STEP_ROLES } from "../src/core/scale/roles.js"
import {
  SCALE_STEPS,
  type ScaleEntry,
  type ScaleStep,
} from "../src/core/scale/steps.js"
import type { Mode } from "../src/core/scale/targets.js"

export type Row = {
  name: string
  entries: ScaleEntry[]
  notes: string[]
  /** Standard and Neutral ramps do not drive the demo strips. */
  semantic: boolean
  /** Rows the active generator produces; the rest are dimmed for context. */
  active: boolean
}

type Props = {
  rows: Row[]
  mode: Mode
  page: string
  numbers: boolean
  selectedStep: ScaleStep
  onSelectStep: (step: ScaleStep) => void
}

export function hexOf(entries: ScaleEntry[], step: ScaleStep, mode: Mode) {
  const entry = entries.find((e) => e.step === step)
  return entry ? entry[mode] : "#ff00ff"
}

/** The first role of a step, for the column header; the full list is the tooltip. */
function shortRole(step: ScaleStep): string {
  return STEP_ROLES[step].split(",")[0]
}

export function Grid({
  rows,
  mode,
  page,
  numbers,
  selectedStep,
  onSelectStep,
}: Props) {
  return (
    <div className="grid">
      <div className="grid-row grid-head">
        <div className="grid-name" />
        {SCALE_STEPS.map((step) => (
          <button
            key={step}
            type="button"
            className={`grid-step ${step === selectedStep ? "is-selected" : ""}`}
            title={STEP_ROLES[step]}
            aria-pressed={step === selectedStep}
            onClick={() => onSelectStep(step)}
          >
            <strong>{step}</strong>
            <span>{shortRole(step)}</span>
          </button>
        ))}
      </div>
      {rows.map((row) => (
        <div
          key={row.name}
          className={`grid-row ${row.active ? "" : "is-inactive"}`}
        >
          <div className="grid-name">
            <strong>{row.name}</strong>
            {row.notes.length > 0 && (
              <span
                className="row-note"
                title={row.notes.join("\n\n")}
                aria-label={`${row.notes.length} notes`}
              >
                {row.notes.length}
              </span>
            )}
          </div>
          {SCALE_STEPS.map((step) => {
            const hex = hexOf(row.entries, step, mode)
            const { L, C } = hexToOklch(hex)
            const ratio = wcag(hex, page)
            const classes = [
              "cell",
              isLightColor(hex) ? "on-light" : "on-dark",
              row.semantic && step === 500 ? "cell-seed" : "",
              step === selectedStep ? "is-selected" : "",
            ]
            return (
              <button
                key={step}
                type="button"
                className={classes.join(" ")}
                style={{ background: hex }}
                title={`${displayHex(hex)} · L ${(L * 100).toFixed(0)} · C ${C.toFixed(3)} · ${ratio.toFixed(1)}:1 vs page. Click to select, double-click to copy.`}
                onClick={() => onSelectStep(step)}
                onDoubleClick={() =>
                  void navigator.clipboard?.writeText(displayHex(hex))
                }
              >
                {numbers ? (
                  <>
                    <span>{(L * 100).toFixed(0)}</span>
                    <span>{C.toFixed(3).slice(1)}</span>
                    <span>{ratio.toFixed(1)}</span>
                  </>
                ) : (
                  <span>{displayHex(hex).slice(1)}</span>
                )}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
