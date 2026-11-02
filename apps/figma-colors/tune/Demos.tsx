import { isLightColor } from "../src/core/color/hex.js"
import type { ScaleEntry } from "../src/core/scale/steps.js"
import type { Mode } from "../src/core/scale/targets.js"
import { hexOf } from "./Grid.js"

type Props = {
  name: string
  entries: ScaleEntry[]
  mode: Mode
  page: string
}

/** How the roles compose in real components, one strip per family and mode. */
export function Demos({ name, entries, mode, page }: Props) {
  const c = (step: Parameters<typeof hexOf>[1]) => hexOf(entries, step, mode)
  const onSolid = isLightColor(c(500)) ? "#000" : "#fff"
  const onBold = isLightColor(c(950)) ? "#000" : "#fff"
  return (
    <div className="demo" style={{ background: page }}>
      <div className="demo-name">{name}</div>

      <div className="demo-group" title="surface 500 · hover 600 · pressed 700">
        <button
          type="button"
          className="demo-button"
          style={{ background: c(500), color: onSolid }}
        >
          Button
        </button>
        <button
          type="button"
          className="demo-button"
          style={{ background: c(600), color: onSolid }}
        >
          Hover
        </button>
        <button
          type="button"
          className="demo-button"
          style={{ background: c(700), color: onSolid }}
        >
          Pressed
        </button>
      </div>

      <div
        className="demo-callout"
        title="subtle 25 · border 200 · ink 500 · ink-bold 950"
        style={{ background: c(25), borderColor: c(200) }}
      >
        <strong style={{ color: c(950) }}>Callout title</strong>
        <span style={{ color: c(500) }}>
          Body text in ink on the subtle surface.
        </span>
        <span style={{ color: c(300) }}>Subtle ink at 300.</span>
      </div>

      <div className="demo-group" title="muted 200 · hover 300 · pressed 400">
        {([200, 300, 400] as const).map((step) => (
          <span
            key={step}
            className="demo-chip"
            style={{ background: c(step), color: c(step === 400 ? 950 : 500) }}
          >
            Chip
          </span>
        ))}
      </div>

      <div
        className="demo-bold"
        title="bold 950 · hover 900 · pressed 800"
        style={{ background: c(950), color: onBold }}
      >
        <span>Bold section</span>
        <span className="demo-bold-states">
          <i style={{ background: c(900) }} />
          <i style={{ background: c(800) }} />
        </span>
      </div>

      <div className="demo-ink" style={{ color: c(500) }}>
        <span style={{ color: c(950) }}>ink-bold 950</span>
        <span>ink 500</span>
        <span style={{ color: c(300) }}>ink-subtle 300</span>
        <span
          style={{
            borderBottom: `2px solid ${c(300)}`,
            paddingBottom: 2,
          }}
        >
          border-bold 300
        </span>
      </div>
    </div>
  )
}
