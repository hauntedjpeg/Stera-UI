import { useEffect, useRef, useState } from "react"
import type { ScaleEntry } from "../../core/scale/bi-modal.js"
import { displayHex, isLightColor } from "../../core/color/hex.js"
import { STEP_ROLES } from "../../core/scale/roles.js"
import { copyText } from "../utils/clipboard.js"

const COPIED_FEEDBACK_MS = 1200

type Props = {
  scale: ScaleEntry[]
  /** Tuned ramps follow the role table; Standard ones do not. */
  tuned: boolean
}

export function ScalePreview({ scale, tuned }: Props) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="grid grid-cols-2 gap-2 text-[9px]/3.5 font-medium tracking-wide text-text-secondary">
        <div>Light</div>
        <div>Dark</div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2">
        <Column entries={scale} pick={(e) => e.light} tuned={tuned} />
        <Column entries={scale} pick={(e) => e.dark} tuned={tuned} />
      </div>
    </div>
  )
}

type ColumnProps = {
  entries: ScaleEntry[]
  pick: (entry: ScaleEntry) => string
  tuned: boolean
}

function Column({ entries, pick, tuned }: ColumnProps) {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleCopy = async (step: number, label: string) => {
    const ok = await copyText(label)
    if (!ok) return
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
    setCopiedStep(step)
    timeoutRef.current = window.setTimeout(() => {
      setCopiedStep(null)
      timeoutRef.current = null
    }, COPIED_FEEDBACK_MS)
  }

  return (
    <div className="flex flex-col gap-1">
      {entries.map((entry) => {
        const label = displayHex(pick(entry))
        const textClass = `text-[9px] font-medium ${
          isLightColor(label) ? "text-black/80" : "text-white/90"
        }`
        return (
          <button
            key={entry.step}
            type="button"
            aria-label={`Copy ${label} (step ${entry.step})`}
            title={tuned ? STEP_ROLES[entry.step] : undefined}
            onClick={() => handleCopy(entry.step, label)}
            className="group relative flex flex-1 cursor-pointer items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-border-selected"
            style={{ backgroundColor: label }}
          >
            {copiedStep === entry.step ? (
              <span className={textClass}>Copied</span>
            ) : (
              <>
                <span
                  className={`${textClass} group-hover:hidden group-focus-visible:hidden`}
                >
                  {entry.step}
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
      })}
    </div>
  )
}
