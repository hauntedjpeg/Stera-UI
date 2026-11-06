import { ROLE_BANDS } from "../src/core/scale/roles.js"
import {
  FIXED_STEPS,
  type FixedStep,
  type Mode,
  type Targets,
} from "../src/core/scale/targets.js"

type Props = {
  targets: Targets
  onChange: (targets: Targets) => void
}

type NumProps = {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}

function Num({ label, value, min, max, step, onChange }: NumProps) {
  const digits = Math.max(0, -Math.floor(Math.log10(step)))
  return (
    <label className="num">
      <span className="num-label">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={Number(value.toFixed(digits))}
        onChange={(e) => {
          const next = Number(e.target.value)
          if (Number.isFinite(next)) onChange(next)
        }}
      />
    </label>
  )
}

// The seed band has no fixed targets, so it gets its own section below.
const BANDS: { title: string; steps: readonly FixedStep[] }[] =
  ROLE_BANDS.filter((band) => band.name !== "solid").map((band) => ({
    title: band.name[0].toUpperCase() + band.name.slice(1),
    steps: band.steps as readonly FixedStep[],
  }))

export function Controls({ targets, onChange }: Props) {
  const setMode = (mode: Mode, patch: Partial<Targets[Mode]>) =>
    onChange({ ...targets, [mode]: { ...targets[mode], ...patch } })
  const setL = (mode: Mode, step: FixedStep, value: number) =>
    setMode(mode, { L: { ...targets[mode].L, [step]: value } })
  const setK = (mode: Mode, step: FixedStep, value: number) =>
    setMode(mode, { K: { ...targets[mode].K, [step]: value } })
  const setOffset = (mode: Mode, step: FixedStep, value: number) =>
    setMode(mode, { offsets: { ...targets[mode].offsets, [step]: value } })

  return (
    <div className="controls">
      {(["light", "dark"] as const).map((mode) => (
        <details key={mode} open>
          <summary>{mode === "light" ? "Light" : "Dark"} fixed steps</summary>
          {BANDS.map((band) => (
            <fieldset key={band.title}>
              <legend>{band.title}</legend>
              {band.steps.map((step) => (
                <div key={step} className="step-controls">
                  <Num
                    label={`${step} L`}
                    value={targets[mode].L[step]}
                    min={0}
                    max={1}
                    step={0.005}
                    onChange={(v) => setL(mode, step, v)}
                  />
                  <Num
                    label={`${step} C`}
                    value={targets[mode].K[step]}
                    min={0}
                    max={0.2}
                    step={0.001}
                    onChange={(v) => setK(mode, step, v)}
                  />
                </div>
              ))}
            </fieldset>
          ))}
          <fieldset>
            <legend>Page offsets (min distance from the background)</legend>
            {FIXED_STEPS.filter(
              (s) => targets[mode].offsets[s] !== undefined
            ).map((step) => (
              <Num
                key={step}
                label={`${step}`}
                value={targets[mode].offsets[step] ?? 0}
                min={0}
                max={0.3}
                step={0.005}
                onChange={(v) => setOffset(mode, step, v)}
              />
            ))}
          </fieldset>
          <fieldset>
            <legend>Solid reference (vividness curve point)</legend>
            <Num
              label="L"
              value={targets[mode].solidRef.L}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) =>
                setMode(mode, { solidRef: { ...targets[mode].solidRef, L: v } })
              }
            />
            <Num
              label="C"
              value={targets[mode].solidRef.K}
              min={0}
              max={0.3}
              step={0.005}
              onChange={(v) =>
                setMode(mode, { solidRef: { ...targets[mode].solidRef, K: v } })
              }
            />
          </fieldset>
        </details>
      ))}

      <details open>
        <summary>Seed band and rules</summary>
        <fieldset>
          <legend>States (lightness away from the seed)</legend>
          <Num
            label="600"
            value={targets.stateDelta[0]}
            min={0}
            max={0.3}
            step={0.005}
            onChange={(v) =>
              onChange({ ...targets, stateDelta: [v, targets.stateDelta[1]] })
            }
          />
          <Num
            label="700"
            value={targets.stateDelta[1]}
            min={0}
            max={0.4}
            step={0.005}
            onChange={(v) =>
              onChange({ ...targets, stateDelta: [targets.stateDelta[0], v] })
            }
          />
        </fieldset>
        <fieldset>
          <legend>Rules</legend>
          <Num
            label="Min gap"
            value={targets.minGap}
            min={0}
            max={0.1}
            step={0.005}
            onChange={(v) => onChange({ ...targets, minGap: v })}
          />
          <Num
            label="Dark solid min contrast"
            value={targets.darkSolidMinContrast}
            min={1}
            max={7}
            step={0.1}
            onChange={(v) => onChange({ ...targets, darkSolidMinContrast: v })}
          />
        </fieldset>
        <fieldset>
          <legend>Yellow hue shift</legend>
          <Num
            label="Hue from"
            value={targets.hueShift.range[0]}
            min={0}
            max={180}
            step={1}
            onChange={(v) =>
              onChange({
                ...targets,
                hueShift: {
                  ...targets.hueShift,
                  range: [v, targets.hueShift.range[1]],
                },
              })
            }
          />
          <Num
            label="Hue to"
            value={targets.hueShift.range[1]}
            min={0}
            max={180}
            step={1}
            onChange={(v) =>
              onChange({
                ...targets,
                hueShift: {
                  ...targets.hueShift,
                  range: [targets.hueShift.range[0], v],
                },
              })
            }
          />
          <Num
            label="Target hue"
            value={targets.hueShift.target}
            min={0}
            max={180}
            step={1}
            onChange={(v) =>
              onChange({
                ...targets,
                hueShift: { ...targets.hueShift, target: v },
              })
            }
          />
          <Num
            label="Starts below L"
            value={targets.hueShift.from}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) =>
              onChange({
                ...targets,
                hueShift: { ...targets.hueShift, from: v },
              })
            }
          />
          <Num
            label="Full at L"
            value={targets.hueShift.to}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) =>
              onChange({ ...targets, hueShift: { ...targets.hueShift, to: v } })
            }
          />
          <Num
            label="Max share"
            value={targets.hueShift.max}
            min={0}
            max={1}
            step={0.05}
            onChange={(v) =>
              onChange({
                ...targets,
                hueShift: { ...targets.hueShift, max: v },
              })
            }
          />
        </fieldset>
      </details>
    </div>
  )
}
