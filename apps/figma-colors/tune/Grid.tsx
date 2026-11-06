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
  /** Standard ramps do not follow the role table. */
  semantic: boolean
}

type Props = {
  rows: Row[]
  mode: Mode
  page: string
  numbers: boolean
}

export function hexOf(entries: ScaleEntry[], step: ScaleStep, mode: Mode) {
  const entry = entries.find((e) => e.step === step)
  return entry ? entry[mode] : "#ff00ff"
}

export function Grid({ rows, mode, page, numbers }: Props) {
  return (
    <div className="grid">
      <div className="grid-row grid-head">
        <div className="grid-name" />
        {SCALE_STEPS.map((step) => (
          <div key={step} className="grid-step" title={STEP_ROLES[step]}>
            <strong>{step}</strong>
            <span>{STEP_ROLES[step]}</span>
          </div>
        ))}
      </div>
      {rows.map((row) => (
        <div key={row.name} className="grid-row">
          <div className="grid-name">
            <strong>{row.name}</strong>
            {row.notes.map((note) => (
              <span key={note} className="note">
                {note}
              </span>
            ))}
          </div>
          {SCALE_STEPS.map((step) => {
            const hex = hexOf(row.entries, step, mode)
            const { L, C } = hexToOklch(hex)
            const ratio = wcag(hex, page)
            return (
              <button
                key={step}
                type="button"
                className={`cell ${isLightColor(hex) ? "on-light" : "on-dark"} ${
                  row.semantic && step === 500 ? "cell-seed" : ""
                }`}
                style={{ background: hex }}
                title={`${displayHex(hex)} · L ${(L * 100).toFixed(0)} · C ${C.toFixed(3)} · ${ratio.toFixed(1)}:1 vs page`}
                onClick={() =>
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
