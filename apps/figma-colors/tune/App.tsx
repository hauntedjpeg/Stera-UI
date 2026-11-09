import { useEffect, useMemo, useState } from "react"
import { normalizeHex } from "../src/core/color/hex.js"
import { generateNeutralScale } from "../src/core/scale/neutral.js"
import { DEFAULT_NEUTRAL_TARGETS } from "../src/core/scale/neutral-targets.js"
import {
  backgroundError,
  generateSemanticScale,
} from "../src/core/scale/semantic.js"
import { generateStandardScale } from "../src/core/scale/standard.js"
import { DEFAULT_STANDARD_TARGETS } from "../src/core/scale/standard-targets.js"
import { SCALE_STEPS, type ScaleStep } from "../src/core/scale/steps.js"
import { DEFAULT_TARGETS, type Mode } from "../src/core/scale/targets.js"
import { Demos } from "./Demos.js"
import { Grid, type Row } from "./Grid.js"
import { Inspector } from "./Inspector.js"
import {
  countChanges,
  loadState,
  loadUi,
  saveState,
  saveUi,
  serializeNeutralTargets,
  serializeStandardTargets,
  serializeTargets,
  type Generator,
  type ModeView,
  type Panel,
  type TuneState,
  type UiState,
} from "./state.js"

declare global {
  interface Window {
    __tune?: {
      state: TuneState
      targetsTs: string
      neutralTargetsTs: string
      standardTargetsTs: string
    }
  }
}

const GENERATORS: { value: Generator; label: string; file: string }[] = [
  { value: "semantic", label: "Semantic", file: "targets.ts" },
  { value: "neutral", label: "Neutral", file: "neutral-targets.ts" },
  { value: "standard", label: "Standard", file: "standard-targets.ts" },
]

const MODE_VIEWS: { value: ModeView; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "both", label: "Both" },
]

const PANELS: { value: Panel; label: string }[] = [
  { value: "step", label: "Step" },
  { value: "rules", label: "Rules" },
  { value: "seeds", label: "Seeds" },
]

const CELL_VIEWS: { value: "hex" | "numbers"; label: string }[] = [
  { value: "hex", label: "Hex" },
  { value: "numbers", label: "L · C · contrast" },
]

type TabsProps<T extends string> = {
  label: string
  value: T
  options: { value: T; label: string; badge?: number }[]
  onChange: (value: T) => void
}

function Tabs<T extends string>({
  label,
  value,
  options,
  onChange,
}: TabsProps<T>) {
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={o.value === value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
          {o.badge ? <span className="badge">{o.badge}</span> : null}
        </button>
      ))}
    </div>
  )
}

export function App() {
  const [state, setState] = useState<TuneState>(loadState)
  const [ui, setUi] = useState<UiState>(loadUi)
  const [copied, setCopied] = useState("")

  useEffect(() => {
    saveState(state)
    window.__tune = {
      state,
      targetsTs: serializeTargets(state.targets),
      neutralTargetsTs: serializeNeutralTargets(state.neutralTargets),
      standardTargetsTs: serializeStandardTargets(state.standardTargets),
    }
  }, [state])

  useEffect(() => {
    saveUi(ui)
  }, [ui])

  // Arrow keys walk the steps unless a field has focus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
      const target = e.target as HTMLElement | null
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return
      e.preventDefault()
      setUi((u) => {
        const i = SCALE_STEPS.indexOf(u.step)
        const next = Math.min(
          SCALE_STEPS.length - 1,
          Math.max(0, i + (e.key === "ArrowRight" ? 1 : -1))
        )
        return { ...u, step: SCALE_STEPS[next], panel: "step" }
      })
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const update = (patch: Partial<TuneState>) =>
    setState((s) => ({ ...s, ...patch }))
  const setView = (patch: Partial<UiState>) =>
    setUi((u) => ({ ...u, ...patch }))

  const pageError = backgroundError(state.pages.light, state.pages.dark)
  const modes: Mode[] = ui.mode === "both" ? ["light", "dark"] : [ui.mode]

  const rows = useMemo<Row[]>(() => {
    if (pageError) return []
    const generator = ui.generator
    const reference: Row[] = []
    // Both reference rows share one seed. Neither follows the demo strips,
    // which compose from the families' role steps. Like the family seeds, a
    // half-typed hex skips the rows rather than throwing mid-render.
    if (normalizeHex(state.neutral)) {
      const neutral = generateNeutralScale(
        {
          hex: state.neutral,
          lightBackground: state.pages.light,
          darkBackground: state.pages.dark,
        },
        state.neutralTargets
      )
      const standard = generateStandardScale(
        { hex: state.neutral },
        state.standardTargets
      )
      reference.push(
        {
          name: "Neutral",
          entries: neutral.entries,
          notes: [],
          semantic: false,
          active: generator === "neutral",
        },
        {
          name: "Standard",
          entries: standard.entries,
          notes: [],
          semantic: false,
          active: generator === "standard",
        }
      )
    }
    const families = state.seeds
      .filter((seed) => normalizeHex(seed.hex))
      .map((seed) => {
        const result = generateSemanticScale(
          {
            hex: seed.hex,
            lightBackground: state.pages.light,
            darkBackground: state.pages.dark,
          },
          state.targets
        )
        return {
          name: seed.name,
          ...result,
          semantic: true,
          active: generator === "semantic",
        }
      })
    return [...reference, ...families]
  }, [
    state.seeds,
    state.neutral,
    state.pages,
    state.targets,
    state.neutralTargets,
    state.standardTargets,
    pageError,
    ui.generator,
  ])

  const changes: Record<Generator, number> = {
    semantic: countChanges(state.targets, DEFAULT_TARGETS),
    neutral: countChanges(state.neutralTargets, DEFAULT_NEUTRAL_TARGETS),
    standard: countChanges(state.standardTargets, DEFAULT_STANDARD_TARGETS),
  }
  const active = GENERATORS.find((g) => g.value === ui.generator)!

  const copy = async (label: string, text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    window.setTimeout(() => setCopied(""), 1200)
  }

  const copyTargets = () => {
    const text =
      ui.generator === "semantic"
        ? serializeTargets(state.targets)
        : ui.generator === "neutral"
          ? serializeNeutralTargets(state.neutralTargets)
          : serializeStandardTargets(state.standardTargets)
    void copy("targets", text)
  }

  const resetTargets = () => {
    if (ui.generator === "semantic") update({ targets: DEFAULT_TARGETS })
    else if (ui.generator === "neutral") {
      update({ neutralTargets: DEFAULT_NEUTRAL_TARGETS })
    } else update({ standardTargets: DEFAULT_STANDARD_TARGETS })
  }

  const selectStep = (step: ScaleStep) => setView({ step, panel: "step" })

  return (
    <div className="app">
      <header className="topbar">
        <h1>Stera UI Colors · tuning</h1>
        <Tabs
          label="Generator"
          value={ui.generator}
          options={GENERATORS.map((g) => ({
            value: g.value,
            label: g.label,
            badge: changes[g.value],
          }))}
          onChange={(generator) => setView({ generator })}
        />
        <Tabs
          label="Appearance"
          value={ui.mode}
          options={MODE_VIEWS}
          onChange={(mode) => setView({ mode })}
        />
        <Tabs
          label="Cells"
          value={ui.numbers ? "numbers" : "hex"}
          options={CELL_VIEWS}
          onChange={(v) => setView({ numbers: v === "numbers" })}
        />
        <span className="spacer" />
        <button type="button" className="btn" onClick={copyTargets}>
          {copied === "targets" ? "Copied" : `Copy ${active.file}`}
        </button>
        <button
          type="button"
          className="btn"
          disabled={changes[ui.generator] === 0}
          onClick={resetTargets}
        >
          Reset {active.label}
          {changes[ui.generator] > 0 && ` (${changes[ui.generator]})`}
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => void copy("link", window.location.href)}
        >
          {copied === "link" ? "Copied" : "Copy link"}
        </button>
      </header>

      <main className="main">
        {pageError && <p className="error page-error">{pageError}</p>}
        {modes.map((mode) => {
          const page = state.pages[mode]
          const onPage = mode === "light" ? "#111" : "#eee"
          return (
            <section
              key={mode}
              className="mode"
              style={{ background: page, color: onPage }}
            >
              {modes.length > 1 && (
                <h2>{mode === "light" ? "Light" : "Dark"}</h2>
              )}
              <Grid
                rows={rows}
                mode={mode}
                page={page}
                numbers={ui.numbers}
                selectedStep={ui.step}
                onSelectStep={selectStep}
              />
              {ui.generator === "semantic" && (
                <details className="components" open>
                  <summary>Components</summary>
                  <div className="demos">
                    {rows
                      .filter((row) => row.semantic)
                      .map((row) => (
                        <Demos
                          key={row.name}
                          name={row.name}
                          entries={row.entries}
                          mode={mode}
                          page={page}
                        />
                      ))}
                  </div>
                </details>
              )}
            </section>
          )
        })}
      </main>

      <aside className="panel">
        <Tabs
          label="Panel"
          value={ui.panel}
          options={PANELS}
          onChange={(panel) => setView({ panel })}
        />
        <Inspector
          state={state}
          update={update}
          generator={ui.generator}
          step={ui.step}
          modes={modes}
          panel={ui.panel}
        />
      </aside>
    </div>
  )
}
