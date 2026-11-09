import { useEffect, useRef, useState } from "react"
import type {
  ScaleEntry,
  ScaleStep,
  ScaleType,
} from "../../core/scale/bi-modal.js"
import { displayHex, isLightColor } from "../../core/color/hex.js"
import { ROLE_BANDS, STEP_ROLES } from "../../core/scale/roles.js"
import { Tabs } from "./Tabs.js"
import { copyText } from "../utils/clipboard.js"

const COPIED_FEEDBACK_MS = 1200

type PreviewMode = "light" | "dark"

const PREVIEW_MODE_OPTIONS: { value: PreviewMode; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
]

type Props = {
  scale: ScaleEntry[]
  /** Semantic and Neutral ramps are role bands and follow the role table;
   *  Standard ones are a flat ladder. */
  scaleType: ScaleType
}

export function ScalePreview({ scale, scaleType }: Props) {
  const banded = scaleType !== "gray"
  const [mode, setMode] = useState<PreviewMode>("light")
  const [copiedStep, setCopiedStep] = useState<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleCopy = async (step: ScaleStep, label: string) => {
    const ok = await copyText(label)
    if (!ok) return
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
    setCopiedStep(step)
    timeoutRef.current = window.setTimeout(() => {
      setCopiedStep(null)
      timeoutRef.current = null
    }, COPIED_FEEDBACK_MS)
  }

  const hexes = new Map(
    scale.map((entry) => [
      entry.step,
      mode === "light" ? entry.light : entry.dark,
    ])
  )

  const swatch = (step: ScaleStep, className: string) => {
    const hex = hexes.get(step)
    if (!hex) return null
    return (
      <Swatch
        key={step}
        step={step}
        hex={hex}
        role={banded ? STEP_ROLES[step] : undefined}
        copied={copiedStep === step}
        onCopy={handleCopy}
        className={className}
      />
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-10 items-center justify-between pr-2 pl-4">
        <h2 className="font-semibold text-text">Preview</h2>
        <Tabs
          label="Preview appearance"
          value={mode}
          options={PREVIEW_MODE_OPTIONS}
          onChange={setMode}
        />
      </div>

      {scale.length === 0 ? (
        <div className="flex flex-1 p-4 pt-1">
          <div className="flex-1 rounded-md border border-dashed border-border" />
        </div>
      ) : banded ? (
        <div className="flex flex-1 flex-col gap-2 p-4 pt-1">
          {ROLE_BANDS.map((band) => (
            <div
              key={band.name}
              className="flex flex-1 flex-col overflow-hidden rounded-md"
            >
              {swatch(band.steps[0], "flex-[2] items-start justify-start p-2")}
              <div className="flex flex-1">
                {swatch(
                  band.steps[1],
                  "flex-1 items-center justify-start px-2"
                )}
                {swatch(
                  band.steps[2],
                  "flex-1 items-center justify-start px-2"
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 p-4 pt-1">
          <div className="flex flex-1 flex-col overflow-hidden rounded-md">
            {scale.map((entry) =>
              swatch(entry.step, "flex-1 items-center justify-center")
            )}
          </div>
        </div>
      )}
    </div>
  )
}

type SwatchProps = {
  step: ScaleStep
  hex: string
  /** Shown as a tooltip; omitted for Standard ramps, which have no roles. */
  role: string | undefined
  copied: boolean
  onCopy: (step: ScaleStep, label: string) => void
  className: string
}

function Swatch({ step, hex, role, copied, onCopy, className }: SwatchProps) {
  const label = displayHex(hex)
  const textClass = `text-[9px] font-medium ${
    isLightColor(label) ? "text-black/80" : "text-white/90"
  }`
  return (
    <button
      type="button"
      aria-label={`Copy ${label} (step ${step})`}
      title={role}
      onClick={() => onCopy(step, label)}
      className={`group relative flex cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-border-selected focus-visible:ring-inset ${className}`}
      style={{ backgroundColor: label }}
    >
      {copied ? (
        <span className={textClass}>Copied</span>
      ) : (
        <>
          <span
            className={`${textClass} group-hover:hidden group-focus-visible:hidden`}
          >
            {step}
          </span>
          <span
            className={`${textClass} hidden group-hover:inline group-focus-visible:inline`}
          >
            {label}
          </span>
        </>
      )}
    </button>
  )
}
