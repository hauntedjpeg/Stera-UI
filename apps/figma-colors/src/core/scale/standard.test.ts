import { describe, expect, it } from "vitest"
import { normalizeHex } from "../color/hex.js"
import { hexToOklch } from "./gamut.js"
import { generateStandardScale } from "./standard.js"
import {
  DEFAULT_STANDARD_TARGETS as T,
  type Mode,
  type StandardTargets,
} from "./standard-targets.js"
import { SCALE_STEPS, type ScaleEntry, type ScaleStep } from "./steps.js"

const VIVID = ["#d0ee38", "#ffd800", "#14ae5c", "#f24822", "#3b82f6", "#f9a8d4"]
const MUTED = ["#64748b", "#8b8d98", "#1e3a8a", "#0d9488"]
const ACHROMATIC = ["#808080", "#000000", "#ffffff", "#111111"]
const ALL = [...VIVID, ...MUTED, ...ACHROMATIC]
const HEX_6 = /^#[0-9a-f]{6}$/

function hexAt(entries: ScaleEntry[], step: ScaleStep, mode: Mode): string {
  const entry = entries.find((e) => e.step === step)
  if (!entry) throw new Error(`No entry for step ${step}`)
  return mode === "light" ? entry.light : entry.dark
}

function L(entries: ScaleEntry[], step: ScaleStep, mode: Mode): number {
  return hexToOklch(hexAt(entries, step, mode)).L
}

/** The lightness gap between each pair of neighboring steps, always positive. */
function gaps(entries: ScaleEntry[], mode: Mode): number[] {
  const out: number[] = []
  for (let i = 1; i < SCALE_STEPS.length; i++) {
    const previous = L(entries, SCALE_STEPS[i - 1], mode)
    const current = L(entries, SCALE_STEPS[i], mode)
    out.push(Math.abs(current - previous))
  }
  return out
}

function hueDistance(a: number, b: number): number {
  const d = Math.abs(((a - b) % 360) + 360) % 360
  return d > 180 ? 360 - d : d
}

describe("generateStandardScale", () => {
  it("returns 24 six-digit hexes in step order and is deterministic", () => {
    const a = generateStandardScale({ hex: "#8b8d98" })
    const b = generateStandardScale({ hex: "#8b8d98" })
    expect(a).toEqual(b)
    expect(a.entries.map((e) => e.step)).toEqual([...SCALE_STEPS])
    for (const entry of a.entries) {
      expect(entry.light).toMatch(HEX_6)
      expect(entry.dark).toMatch(HEX_6)
    }
    expect(a.notes).toEqual([])
  })

  it("puts every step on its target lightness, for every seed", () => {
    for (const hex of ALL) {
      const { entries } = generateStandardScale({ hex })
      for (const mode of ["light", "dark"] as const) {
        for (const step of SCALE_STEPS) {
          expect(
            Math.abs(L(entries, step, mode) - T[mode].L[step])
          ).toBeLessThan(0.005)
        }
      }
    }
  })

  it("gives every family the same lightness at the same step", () => {
    const reference = generateStandardScale({ hex: "#8b8d98" }).entries
    for (const hex of ALL) {
      const { entries } = generateStandardScale({ hex })
      for (const mode of ["light", "dark"] as const) {
        for (const step of SCALE_STEPS) {
          expect(
            Math.abs(L(entries, step, mode) - L(reference, step, mode))
          ).toBeLessThan(0.005)
        }
      }
    }
  })

  it("keeps the low end smooth and steps harder at the high end", () => {
    const { entries } = generateStandardScale({ hex: "#8b8d98" })
    for (const mode of ["light", "dark"] as const) {
      const g = gaps(entries, mode)
      // Non-decreasing all the way up: no gap is tighter than the one before.
      for (let i = 1; i < g.length; i++) {
        expect(g[i]).toBeGreaterThanOrEqual(g[i - 1] - 0.0005)
      }
      // And the high end is meaningfully more dramatic, not just equal.
      const low = g.slice(0, 5)
      const high = g.slice(6)
      const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length
      expect(mean(high)).toBeGreaterThan(mean(low) * 1.3)
    }
  })

  it("darkens light and lightens dark from 25 to 950", () => {
    for (const hex of ALL) {
      const { entries } = generateStandardScale({ hex })
      expect(L(entries, 950, "light")).toBeLessThan(L(entries, 25, "light"))
      expect(L(entries, 950, "dark")).toBeGreaterThan(L(entries, 25, "dark"))
    }
  })

  it("gives vivid seeds the curve chroma where the gamut allows it", () => {
    for (const mode of ["light", "dark"] as const) {
      const { entries } = generateStandardScale({ hex: "#f24822" })
      for (const step of SCALE_STEPS) {
        const C = hexToOklch(hexAt(entries, step, mode)).C
        expect(C).toBeLessThan(T[mode].K[step] + 0.002)
      }
    }
  })

  it("scales chroma down for a muted seed of the same hue", () => {
    const vivid = generateStandardScale({ hex: "#3b82f6" }).entries
    const muted = generateStandardScale({ hex: "#64748b" }).entries
    for (const step of [200, 300, 400, 500] as const) {
      expect(hexToOklch(hexAt(muted, step, "light")).C).toBeLessThan(
        hexToOklch(hexAt(vivid, step, "light")).C
      )
    }
  })

  it("keeps gray seeds gray with no NaN anywhere", () => {
    for (const hex of ACHROMATIC) {
      const { entries } = generateStandardScale({ hex })
      for (const entry of entries) {
        for (const value of [entry.light, entry.dark]) {
          const { L: l, C, H } = hexToOklch(value)
          expect(Number.isNaN(l)).toBe(false)
          expect(Number.isNaN(H)).toBe(false)
          expect(C).toBeLessThan(0.001)
        }
      }
    }
  })

  it("keeps the seed hue at every step", () => {
    for (const hex of VIVID) {
      const seed = hexToOklch(normalizeHex(hex) as string)
      const { entries } = generateStandardScale({ hex })
      for (const mode of ["light", "dark"] as const) {
        for (const step of SCALE_STEPS) {
          const { C, H } = hexToOklch(hexAt(entries, step, mode))
          if (C < 0.02) continue
          expect(hueDistance(H, seed.H)).toBeLessThan(2 + 0.2 / C)
        }
      }
    }
  })

  it("does not preserve the seed, whatever its lightness", () => {
    // Standard trades the seed hex for one ladder shared by every family. The
    // seed's own lightness is dropped, so it does not land on any step.
    for (const seed of ["#f59e0b", "#64748b", "#3b82f6", "#78350f"]) {
      const { entries } = generateStandardScale({ hex: seed })
      for (const mode of ["light", "dark"] as const) {
        expect(SCALE_STEPS.map((s) => hexAt(entries, s, mode))).not.toContain(
          seed
        )
      }
      // Every step still sits on the shared ladder, not near the seed.
      for (const step of SCALE_STEPS) {
        expect(
          Math.abs(L(entries, step, "light") - T.light.L[step])
        ).toBeLessThan(0.005)
      }
    }
  })

  it("applies custom targets", () => {
    const custom: StandardTargets = {
      ...T,
      light: { ...T.light, L: { ...T.light.L, 25: 0.9 } },
    }
    const { entries } = generateStandardScale({ hex: "#3b82f6" }, custom)
    expect(Math.abs(L(entries, 25, "light") - 0.9)).toBeLessThan(0.005)
  })

  it("rejects an invalid hex", () => {
    expect(() => generateStandardScale({ hex: "nope" })).toThrow(/Invalid hex/)
  })
})
