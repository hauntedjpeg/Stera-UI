import type { ReactNode } from "react"
import { SiChevronLeft, SiExternalLink } from "stera-icons"
import {
  postToSandbox,
  type FontStrategy,
  type StoredPrefs,
  type UnitChoice,
} from "../../shared/messages.js"
import { Button, IconButton } from "../components/Button.js"
import { Select } from "../components/Select.js"

const FONTS_DOCS_URL = "https://ui.stera.sh/fonts"
const STERA_UI_URL = "https://ui.stera.sh"

const STRATEGIES: { value: FontStrategy; label: string }[] = [
  { value: "next-font", label: "Next.js" },
  { value: "fontsource-variable", label: "Fontsource" },
  { value: "raw", label: "Family name" },
]

const UNITS: { value: UnitChoice; label: string }[] = [
  { value: "rem", label: "rem" },
  { value: "px", label: "px" },
]

type Props = {
  prefs: StoredPrefs
  onPrefsChange: (patch: Partial<StoredPrefs>) => void
  onBack: () => void
}

function openUrl(url: string) {
  postToSandbox({ type: "open-url", url })
}

function Row({
  label,
  description,
  children,
}: {
  label: string
  description: ReactNode
  children: ReactNode
}) {
  return (
    <div className="flex items-start gap-6 py-4">
      <div className="min-w-0 flex-1">
        <div className="text-[13px] leading-5 font-medium">{label}</div>
        <div className="mt-1 text-[10px] leading-4 text-text-secondary">
          {description}
        </div>
      </div>
      {children}
    </div>
  )
}

export function SettingsView({ prefs, onPrefsChange, onBack }: Props) {
  return (
    <div className="flex h-full flex-col">
      <header className="flex h-12 shrink-0 items-center gap-1 border-b border-border px-2">
        <IconButton label="Back" onClick={onBack}>
          <SiChevronLeft size={16} />
        </IconButton>
        <h1 className="m-0 text-[11px] font-medium">Settings</h1>
      </header>

      <div className="flex-1 divide-y divide-border overflow-auto px-4">
        <Row
          label="Prefix"
          description="Adds a prefix to every CSS variable name. Leave it empty for no prefix."
        >
          <input
            type="text"
            aria-label="Prefix"
            value={prefs.prefix ?? ""}
            onChange={(e) =>
              onPrefsChange({ prefix: e.target.value.trim() || undefined })
            }
            placeholder="None"
            spellCheck={false}
            className="h-6 w-30 shrink-0 rounded-[5px] bg-surface-secondary px-2 text-text outline-none placeholder:text-text-tertiary focus-visible:ring-1 focus-visible:ring-brand"
          />
        </Row>

        <Row
          label="Font strategy"
          description={
            <>
              How font families are written in the CSS. Match it to how your
              project loads fonts.{" "}
              <button
                type="button"
                onClick={() => openUrl(FONTS_DOCS_URL)}
                className="underline underline-offset-2 hover:text-text"
              >
                View docs
              </button>
            </>
          }
        >
          <Select
            label="Font strategy"
            value={prefs.strategy}
            options={STRATEGIES}
            onChange={(strategy) => onPrefsChange({ strategy })}
          />
        </Row>

        <Row
          label="Units"
          description="Unit for font sizes, spacing and radius."
        >
          <Select
            label="Units"
            value={prefs.unit}
            options={UNITS}
            onChange={(unit) => onPrefsChange({ unit })}
          />
        </Row>

        <Row
          label="About"
          description="Export your Figma variables and text styles as CSS for Stera UI. If you're not using a forked version of Stera UI this plugin will not work properly."
        >
          <Button variant="secondary" onClick={() => openUrl(STERA_UI_URL)}>
            Stera UI
            <SiExternalLink size={12} className="text-icon-secondary" />
          </Button>
        </Row>
      </div>
    </div>
  )
}
