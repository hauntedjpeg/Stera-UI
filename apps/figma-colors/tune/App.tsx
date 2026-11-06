import { useEffect, useMemo, useState } from "react"
import { normalizeHex } from "../src/core/color/hex.js"
import {
  backgroundError,
  generateSemanticScale,
} from "../src/core/scale/semantic.js"
import { generateStandardScale } from "../src/core/scale/standard.js"
import { DEFAULT_STANDARD_TARGETS } from "../src/core/scale/standard-targets.js"
import { DEFAULT_TARGETS, type Mode } from "../src/core/scale/targets.js"
import { Controls } from "./Controls.js"
import { Demos } from "./Demos.js"
import { Grid, type Row } from "./Grid.js"
import {
  DEFAULT_SEEDS,
  loadState,
  saveState,
  serializeStandardTargets,
  serializeTargets,
  type TuneState,
} from "./state.js"

declare global {
  interface Window {
    __tune?: {
      state: TuneState
      targetsTs: string
      standardTargetsTs: string
    }
  }
}

const MODES: Mode[] = ["light", "dark"]

export function App() {
  const [state, setState] = useState<TuneState>(loadState)
  const [copied, setCopied] = useState("")

  useEffect(() => {
    saveState(state)
    window.__tune = {
      state,
      targetsTs: serializeTargets(state.targets),
      standardTargetsTs: serializeStandardTargets(state.standardTargets),
    }
  }, [state])

  const pageError = backgroundError(state.pages.light, state.pages.dark)

  const rows = useMemo<Row[]>(() => {
    if (pageError) return []
    const neutral = generateStandardScale(
      { hex: state.neutral },
      state.standardTargets
    )
    const semantic = state.seeds
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
        return { name: seed.name, ...result, semantic: true }
      })
    return [
      { name: "Neutral", entries: neutral.entries, notes: [], semantic: false },
      ...semantic,
    ]
  }, [
    state.seeds,
    state.neutral,
    state.pages,
    state.targets,
    state.standardTargets,
    pageError,
  ])

  const update = (patch: Partial<TuneState>) =>
    setState((s) => ({ ...s, ...patch }))

  const copy = async (label: string, text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    window.setTimeout(() => setCopied(""), 1200)
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>Stera UI Colors · tuning</h1>
        <div className="toolbar">
          <button
            type="button"
            onClick={() => copy("targets", serializeTargets(state.targets))}
          >
            {copied === "targets" ? "Copied" : "Copy targets.ts"}
          </button>
          <button
            type="button"
            onClick={() =>
              copy("standard", serializeStandardTargets(state.standardTargets))
            }
          >
            {copied === "standard" ? "Copied" : "Copy standard-targets.ts"}
          </button>
          <button
            type="button"
            onClick={() => copy("link", window.location.href)}
          >
            {copied === "link" ? "Copied" : "Copy link"}
          </button>
          <button
            type="button"
            onClick={() =>
              update({
                targets: DEFAULT_TARGETS,
                standardTargets: DEFAULT_STANDARD_TARGETS,
              })
            }
          >
            Reset targets
          </button>
          <label className="check">
            <input
              type="checkbox"
              checked={state.numbers}
              onChange={(e) => update({ numbers: e.target.checked })}
            />
            Numbers (L · C · contrast)
          </label>
        </div>

        <details open>
          <summary>Seeds and pages</summary>
          <fieldset>
            <legend>Pages</legend>
            <label className="hex">
              <span>Light</span>
              <input
                value={state.pages.light}
                onChange={(e) =>
                  update({ pages: { ...state.pages, light: e.target.value } })
                }
              />
            </label>
            <label className="hex">
              <span>Dark</span>
              <input
                value={state.pages.dark}
                onChange={(e) =>
                  update({ pages: { ...state.pages, dark: e.target.value } })
                }
              />
            </label>
            {pageError && <p className="error">{pageError}</p>}
          </fieldset>
          <fieldset>
            <legend>Seeds</legend>
            <label className="hex">
              <span>Neutral</span>
              <input
                value={state.neutral}
                onChange={(e) => update({ neutral: e.target.value })}
              />
            </label>
            {state.seeds.map((seed, i) => (
              <div key={i} className="seed">
                <input
                  className="seed-name"
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
                onClick={() => update({ seeds: DEFAULT_SEEDS })}
              >
                Reset seeds
              </button>
            </div>
          </fieldset>
        </details>

        <Controls
          targets={state.targets}
          onChange={(targets) => update({ targets })}
          standardTargets={state.standardTargets}
          onStandardChange={(standardTargets) => update({ standardTargets })}
        />
      </aside>

      <main className="main">
        {MODES.map((mode) => {
          const page = state.pages[mode]
          const onPage = mode === "light" ? "#111" : "#eee"
          return (
            <section
              key={mode}
              className="mode"
              style={{ background: page, color: onPage }}
            >
              <h2>{mode === "light" ? "Light" : "Dark"}</h2>
              <Grid
                rows={rows}
                mode={mode}
                page={page}
                numbers={state.numbers}
              />
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
            </section>
          )
        })}
      </main>
    </div>
  )
}
