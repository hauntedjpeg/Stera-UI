import { normalizeHex } from "../src/core/color/hex.js"
import {
  DEFAULT_NEUTRAL_TARGETS,
  type NeutralTargets,
} from "../src/core/scale/neutral-targets.js"
import { ROLE_BANDS, STEP_ROLES } from "../src/core/scale/roles.js"
import { backgroundError } from "../src/core/scale/semantic.js"
import { DEFAULT_STANDARD_TARGETS } from "../src/core/scale/standard-targets.js"
import type { ScaleStep } from "../src/core/scale/steps.js"
import {
  DEFAULT_TARGETS,
  isFixedStep,
  type FixedStep,
  type Mode,
  type Targets,
} from "../src/core/scale/targets.js"
import {
  DEFAULT_SEEDS,
  type Generator,
  type Panel,
  type TuneState,
} from "./state.js"

type Props = {
  state: TuneState
  update: (patch: Partial<TuneState>) => void
  generator: Generator
  step: ScaleStep
  /** The appearances on screen; "both" shows a group per mode. */
  modes: Mode[]
  panel: Panel
}

const MODE_LABEL: Record<Mode, string> = { light: "Light", dark: "Dark" }

/**
 * The right-hand panel. Step shows the controls of the selected step for the
 * active generator and nothing else; Rules the generator-wide numbers; Seeds
 * the pages and seed colors. Every slider knows its shipped default, shows a
 * dot when it differs and resets on a double-click of its label.
 */
export function Inspector({
  state,
  update,
  generator,
  step,
  modes,
  panel,
}: Props) {
  if (panel === "seeds") return <SeedsPanel state={state} update={update} />
  if (panel === "rules") {
    return <RulesPanel state={state} update={update} generator={generator} />
  }
  return (
    <StepPanel
      state={state}
      update={update}
      generator={generator}
      step={step}
      modes={modes}
    />
  )
}

type NumProps = {
  label: string
  value: number
  defaultValue?: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}

function Num({
  label,
  value,
  defaultValue,
  min,
  max,
  step,
  onChange,
}: NumProps) {
  const digits = Math.max(0, -Math.floor(Math.log10(step)))
  const changed =
    defaultValue !== undefined && Math.abs(value - defaultValue) > 1e-9
  return (
    <label className={`num ${changed ? "is-changed" : ""}`}>
      <span
        className="num-label"
        title={
          changed
            ? `Default ${defaultValue}. Double-click to reset.`
            : undefined
        }
        onDoubleClick={() => {
          if (defaultValue !== undefined) onChange(defaultValue)
        }}
      >
        {label}
        {changed && <i className="dot" aria-label="changed" />}
      </span>
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

/* ---------------------------------------------------------------- Step */

type StepProps = Omit<Props, "panel">

function StepPanel({ state, update, generator, step, modes }: StepProps) {
  const band = ROLE_BANDS.find((b) =>
    (b.steps as readonly number[]).includes(step)
  )
  const role =
    generator === "standard"
      ? "no role: Standard is a plain ladder"
      : STEP_ROLES[step]
  return (
    <>
      <div className="step-head">
        <strong>{step}</strong>
        <span>{role}</span>
        {generator !== "standard" && band && (
          <span className="band-tag">{band.name} band</span>
        )}
      </div>
      {generator === "semantic" && (
        <SemanticStep state={state} update={update} step={step} modes={modes} />
      )}
      {generator === "neutral" && (
        <NeutralStep state={state} update={update} step={step} modes={modes} />
      )}
      {generator === "standard" && (
        <StandardStep state={state} update={update} step={step} modes={modes} />
      )}
      <p className="hint">
        ← → select the previous or next step. Double-click a label to reset that
        number.
      </p>
    </>
  )
}

type GenStepProps = {
  state: TuneState
  update: (patch: Partial<TuneState>) => void
  step: ScaleStep
  modes: Mode[]
}

function SemanticStep({ state, update, step, modes }: GenStepProps) {
  const targets = state.targets
  const set = (next: Targets) => update({ targets: next })
  const setMode = (mode: Mode, patch: Partial<Targets[Mode]>) =>
    set({ ...targets, [mode]: { ...targets[mode], ...patch } })

  if (!isFixedStep(step)) {
    return (
      <fieldset>
        <legend>Seed band, both modes</legend>
        <p className="hint">
          500 is the seed verbatim. 600 and 700 are its hover and pressed
          states, these offsets away from it and at least the minimum contrast
          apart. Nothing here is per step.
        </p>
        <Num
          label="600 offset"
          value={targets.stateDelta[0]}
          defaultValue={DEFAULT_TARGETS.stateDelta[0]}
          min={0}
          max={0.3}
          step={0.005}
          onChange={(v) =>
            set({ ...targets, stateDelta: [v, targets.stateDelta[1]] })
          }
        />
        <Num
          label="700 offset"
          value={targets.stateDelta[1]}
          defaultValue={DEFAULT_TARGETS.stateDelta[1]}
          min={0}
          max={0.4}
          step={0.005}
          onChange={(v) =>
            set({ ...targets, stateDelta: [targets.stateDelta[0], v] })
          }
        />
        <Num
          label="Min contrast"
          value={targets.stateMinContrast}
          defaultValue={DEFAULT_TARGETS.stateMinContrast}
          min={1}
          max={1.4}
          step={0.01}
          onChange={(v) => set({ ...targets, stateMinContrast: v })}
        />
      </fieldset>
    )
  }

  const fixed: FixedStep = step
  return (
    <>
      {modes.map((mode) => (
        <fieldset key={mode}>
          <legend>{modes.length > 1 ? MODE_LABEL[mode] : "Targets"}</legend>
          <Num
            label="Lightness"
            value={targets[mode].L[fixed]}
            defaultValue={DEFAULT_TARGETS[mode].L[fixed]}
            min={0}
            max={1}
            step={0.005}
            onChange={(v) =>
              setMode(mode, { L: { ...targets[mode].L, [fixed]: v } })
            }
          />
          <Num
            label="Chroma"
            value={targets[mode].K[fixed]}
            defaultValue={DEFAULT_TARGETS[mode].K[fixed]}
            min={0}
            max={0.2}
            step={0.001}
            onChange={(v) =>
              setMode(mode, { K: { ...targets[mode].K, [fixed]: v } })
            }
          />
          {targets[mode].offsets[fixed] !== undefined && (
            <Num
              label="Page offset"
              value={targets[mode].offsets[fixed] ?? 0}
              defaultValue={DEFAULT_TARGETS[mode].offsets[fixed]}
              min={0}
              max={0.3}
              step={0.005}
              onChange={(v) =>
                setMode(mode, {
                  offsets: { ...targets[mode].offsets, [fixed]: v },
                })
              }
            />
          )}
        </fieldset>
      ))}
    </>
  )
}

function NeutralStep({ state, update, step, modes }: GenStepProps) {
  const targets = state.neutralTargets
  const setMode = (mode: Mode, key: "L" | "K" | "offsets", value: number) =>
    update({
      neutralTargets: {
        ...targets,
        [mode]: {
          ...targets[mode],
          [key]: { ...targets[mode][key], [step]: value },
        },
      },
    })
  return (
    <>
      {modes.map((mode) => (
        <fieldset key={mode}>
          <legend>{modes.length > 1 ? MODE_LABEL[mode] : "Targets"}</legend>
          <Num
            label="Lightness"
            value={targets[mode].L[step]}
            defaultValue={DEFAULT_NEUTRAL_TARGETS[mode].L[step]}
            min={0}
            max={1}
            step={0.005}
            onChange={(v) => setMode(mode, "L", v)}
          />
          <Num
            label="Chroma"
            value={targets[mode].K[step]}
            defaultValue={DEFAULT_NEUTRAL_TARGETS[mode].K[step]}
            min={0}
            max={0.2}
            step={0.001}
            onChange={(v) => setMode(mode, "K", v)}
          />
          {targets[mode].offsets[step] !== undefined && (
            <Num
              label="Page offset"
              value={targets[mode].offsets[step] ?? 0}
              defaultValue={DEFAULT_NEUTRAL_TARGETS[mode].offsets[step]}
              min={0}
              max={0.3}
              step={0.005}
              onChange={(v) => setMode(mode, "offsets", v)}
            />
          )}
        </fieldset>
      ))}
      {step <= 100 && (
        <p className="hint">
          25 sits exactly its offset from the page. 50 and 100 sit at least
          their offset from the page and never nearer it than their lightness
          target, so on white and black the target wins.
        </p>
      )}
    </>
  )
}

function StandardStep({ state, update, step, modes }: GenStepProps) {
  const targets = state.standardTargets
  const setMode = (mode: Mode, key: "L" | "K", value: number) =>
    update({
      standardTargets: {
        ...targets,
        [mode]: {
          ...targets[mode],
          [key]: { ...targets[mode][key], [step]: value },
        },
      },
    })
  return (
    <>
      {modes.map((mode) => (
        <fieldset key={mode}>
          <legend>{modes.length > 1 ? MODE_LABEL[mode] : "Targets"}</legend>
          <Num
            label="Lightness"
            value={targets[mode].L[step]}
            defaultValue={DEFAULT_STANDARD_TARGETS[mode].L[step]}
            min={0}
            max={1}
            step={0.005}
            onChange={(v) => setMode(mode, "L", v)}
          />
          <Num
            label="Chroma"
            value={targets[mode].K[step]}
            defaultValue={DEFAULT_STANDARD_TARGETS[mode].K[step]}
            min={0}
            max={0.3}
            step={0.001}
            onChange={(v) => setMode(mode, "K", v)}
          />
        </fieldset>
      ))}
    </>
  )
}

/* --------------------------------------------------------------- Rules */

type RulesProps = {
  state: TuneState
  update: (patch: Partial<TuneState>) => void
  generator: Generator
}

function RulesPanel({ state, update, generator }: RulesProps) {
  if (generator === "standard") {
    return (
      <p className="hint">
        Standard has no rules: all twelve steps are fixed targets. Pick a step
        to edit it.
      </p>
    )
  }
  if (generator === "neutral") {
    const targets: NeutralTargets = state.neutralTargets
    return (
      <fieldset>
        <legend>Order</legend>
        <Num
          label="Min gap"
          value={targets.minGap}
          defaultValue={DEFAULT_NEUTRAL_TARGETS.minGap}
          min={0}
          max={0.1}
          step={0.005}
          onChange={(v) =>
            update({ neutralTargets: { ...targets, minGap: v } })
          }
        />
        <p className="hint">
          Every step sits at least this far from the one before, so the ramp
          stays strictly ordered whatever the page or the targets.
        </p>
      </fieldset>
    )
  }

  const targets = state.targets
  const set = (next: Targets) => update({ targets: next })
  const setMode = (mode: Mode, patch: Partial<Targets[Mode]>) =>
    set({ ...targets, [mode]: { ...targets[mode], ...patch } })
  const setShift = (patch: Partial<Targets["hueShift"]>) =>
    set({ ...targets, hueShift: { ...targets.hueShift, ...patch } })
  const shift = targets.hueShift
  const defaults = DEFAULT_TARGETS
  return (
    <>
      <fieldset>
        <legend>Bands</legend>
        <Num
          label="Min gap"
          value={targets.minGap}
          defaultValue={defaults.minGap}
          min={0}
          max={0.1}
          step={0.005}
          onChange={(v) => set({ ...targets, minGap: v })}
        />
        <Num
          label="Dark solid min contrast"
          value={targets.darkSolidMinContrast}
          defaultValue={defaults.darkSolidMinContrast}
          min={1}
          max={7}
          step={0.1}
          onChange={(v) => set({ ...targets, darkSolidMinContrast: v })}
        />
      </fieldset>
      {(["light", "dark"] as const).map((mode) => (
        <fieldset key={mode}>
          <legend>{MODE_LABEL[mode]} solid reference (vividness curve)</legend>
          <Num
            label="Lightness"
            value={targets[mode].solidRef.L}
            defaultValue={defaults[mode].solidRef.L}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) =>
              setMode(mode, { solidRef: { ...targets[mode].solidRef, L: v } })
            }
          />
          <Num
            label="Chroma"
            value={targets[mode].solidRef.K}
            defaultValue={defaults[mode].solidRef.K}
            min={0}
            max={0.3}
            step={0.005}
            onChange={(v) =>
              setMode(mode, { solidRef: { ...targets[mode].solidRef, K: v } })
            }
          />
        </fieldset>
      ))}
      <fieldset>
        <legend>Yellow hue shift</legend>
        <Num
          label="Hue from"
          value={shift.range[0]}
          defaultValue={defaults.hueShift.range[0]}
          min={0}
          max={180}
          step={1}
          onChange={(v) => setShift({ range: [v, shift.range[1]] })}
        />
        <Num
          label="Hue to"
          value={shift.range[1]}
          defaultValue={defaults.hueShift.range[1]}
          min={0}
          max={180}
          step={1}
          onChange={(v) => setShift({ range: [shift.range[0], v] })}
        />
        <Num
          label="Target hue"
          value={shift.target}
          defaultValue={defaults.hueShift.target}
          min={0}
          max={180}
          step={1}
          onChange={(v) => setShift({ target: v })}
        />
        <Num
          label="Starts below L"
          value={shift.from}
          defaultValue={defaults.hueShift.from}
          min={0}
          max={1}
          step={0.01}
          onChange={(v) => setShift({ from: v })}
        />
        <Num
          label="Full at L"
          value={shift.to}
          defaultValue={defaults.hueShift.to}
          min={0}
          max={1}
          step={0.01}
          onChange={(v) => setShift({ to: v })}
        />
        <Num
          label="Max share"
          value={shift.max}
          defaultValue={defaults.hueShift.max}
          min={0}
          max={1}
          step={0.05}
          onChange={(v) => setShift({ max: v })}
        />
      </fieldset>
    </>
  )
}

/* --------------------------------------------------------------- Seeds */

type SeedsProps = {
  state: TuneState
  update: (patch: Partial<TuneState>) => void
}

function SeedsPanel({ state, update }: SeedsProps) {
  const pageError = backgroundError(state.pages.light, state.pages.dark)
  return (
    <>
      <fieldset>
        <legend>Pages</legend>
        <HexRow
          label="Light"
          value={state.pages.light}
          onChange={(light) => update({ pages: { ...state.pages, light } })}
        />
        <HexRow
          label="Dark"
          value={state.pages.dark}
          onChange={(dark) => update({ pages: { ...state.pages, dark } })}
        />
        {pageError && <p className="error">{pageError}</p>}
      </fieldset>
      <fieldset>
        <legend>Neutral and Standard seed</legend>
        <HexRow
          label="Seed"
          value={state.neutral}
          onChange={(neutral) => update({ neutral })}
        />
      </fieldset>
      <fieldset>
        <legend>Family seeds</legend>
        {state.seeds.map((seed, i) => (
          <div key={i} className="seed">
            <input
              className="seed-name"
              aria-label="Family name"
              value={seed.name}
              onChange={(e) =>
                update({
                  seeds: state.seeds.map((s, j) =>
                    j === i ? { ...s, name: e.target.value } : s
                  ),
                })
              }
            />
            <input
              aria-label={`${seed.name} hex`}
              value={seed.hex}
              style={{
                borderLeft: `12px solid ${normalizeHex(seed.hex) ?? "transparent"}`,
              }}
              onChange={(e) =>
                update({
                  seeds: state.seeds.map((s, j) =>
                    j === i ? { ...s, hex: e.target.value } : s
                  ),
                })
              }
            />
            <button
              type="button"
              aria-label={`Remove ${seed.name}`}
              onClick={() =>
                update({ seeds: state.seeds.filter((_, j) => j !== i) })
              }
            >
              ×
            </button>
          </div>
        ))}
        <div className="seed-actions">
          <button
            type="button"
            className="btn"
            onClick={() =>
              update({
                seeds: [...state.seeds, { name: "New", hex: "#888888" }],
              })
            }
          >
            Add seed
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => update({ seeds: DEFAULT_SEEDS })}
          >
            Reset seeds
          </button>
        </div>
      </fieldset>
    </>
  )
}

function HexRow({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="hex">
      <span>{label}</span>
      <input
        value={value}
        style={{
          borderLeft: `12px solid ${normalizeHex(value) ?? "transparent"}`,
        }}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}
