import { useState, type ChangeEvent, type FocusEvent } from "react"
import { normalizeHex } from "../../core/color/hex.js"

type Props = {
  value: string
  onChange: (hex: string) => void
  label: string
  placeholder?: string
}

function stripHash(hex: string): string {
  return hex.replace(/^#/, "").toUpperCase()
}

/**
 * A hex input with a swatch. Reports only valid colors; an invalid draft is
 * flagged while typing and reverts to the last valid value on blur.
 */
export function HexField({ value, onChange, label, placeholder }: Props) {
  const [raw, setRaw] = useState(() => stripHash(value))
  const [lastValid, setLastValid] = useState(() => stripHash(value))
  const [valid, setValid] = useState(true)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setRaw(input)
    const hex = normalizeHex(input)
    if (hex) {
      setValid(true)
      setLastValid(stripHash(input))
      onChange(hex)
    } else {
      setValid(input.length === 0)
    }
  }

  const handleBlur = () => {
    const hex = normalizeHex(raw)
    setRaw(hex ? stripHash(raw) : lastValid)
    setValid(true)
  }

  return (
    <div className="relative flex-1">
      <div
        className="absolute top-1.25 left-1.25 size-3.5 shrink-0 rounded-xs"
        style={{ backgroundColor: normalizeHex(raw) ?? value }}
      />
      <input
        type="text"
        aria-label={label}
        value={raw}
        onChange={handleChange}
        onFocus={(e: FocusEvent<HTMLInputElement>) => e.target.select()}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`h-6 w-full rounded-md border bg-surface-secondary px-2 pl-6 text-text focus:border-border-selected focus:outline-none ${
          valid
            ? "border-surface-secondary hover:border-border"
            : "border-border-danger"
        }`}
      />
    </div>
  )
}
