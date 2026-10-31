import { useCallback, useMemo, useState } from "react"
import {
  DEFAULT_PREFS,
  postToSandbox,
  type FontStrategy,
  type NextFontConvention,
  type RawVariablesPayload,
  type SandboxToUi,
  type StoredPrefs,
  type UnitChoice,
  type VariableDoc,
} from "../shared/messages.js"
import { useFigmaMessages } from "./hooks/useFigmaMessages.js"
import { generateGlobalsCss } from "../core/css/generate.js"
import { generatePartials } from "../core/css/partials.js"
import { deriveFontAssignments } from "../core/css/model.js"
import { PreviewView } from "./views/PreviewView.js"
import { FontStrategyView } from "./views/FontStrategyView.js"
import { OptionsView } from "./views/OptionsView.js"
import { ExportView } from "./views/ExportView.js"

type Step = "preview" | "fonts" | "options" | "export"

const STEPS: { id: Step; label: string }[] = [
  { id: "preview", label: "Preview" },
  { id: "fonts", label: "Fonts" },
  { id: "options", label: "Options" },
  { id: "export", label: "Export" },
]

export function App() {
  const [doc, setDoc] = useState<VariableDoc | null>(null)
  const [raw, setRaw] = useState<RawVariablesPayload | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [prefs, setPrefs] = useState<StoredPrefs>(DEFAULT_PREFS)
  const [step, setStep] = useState<Step>("preview")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const onMessage = useCallback((msg: SandboxToUi) => {
    if (msg.type === "variables-loaded") {
      setDoc(msg.doc)
      setRaw(msg.raw)
      setFileName(msg.fileName)
      setPrefs(msg.prefs)
      setLoading(false)
    } else if (msg.type === "error") {
      setErrorMsg(msg.message)
      setLoading(false)
    }
  }, [])

  useFigmaMessages(onMessage)

  useMemo(() => {
    postToSandbox({ type: "load-variables" })
  }, [])

  const fontAssignments = useMemo(
    () => (doc ? deriveFontAssignments(doc.collections, prefs.prefix) : []),
    [doc, prefs.prefix]
  )

  const generateOptions = useMemo(() => {
    if (!doc) return null
    return {
      collections: doc.collections,
      textStyles: doc.textStyles,
      strategy: prefs.strategy,
      nextConvention: prefs.nextConvention,
      unitByCollectionName: prefs.unitByCollectionName,
      prefix: prefs.prefix,
      darkModeIdByCollectionId: prefs.darkModeIdByCollectionId,
      fontAssignments,
    }
  }, [doc, prefs, fontAssignments])

  const output = useMemo(
    () => (generateOptions ? generateGlobalsCss(generateOptions) : null),
    [generateOptions]
  )
  const partials = useMemo(
    () => (generateOptions ? generatePartials(generateOptions) : null),
    [generateOptions]
  )

  // Partials is the default export mode, so Preview surfaces its warning set —
  // a superset of the single-file one.
  const previewOutput = useMemo(
    () =>
      output && partials ? { ...output, warnings: partials.warnings } : output,
    [output, partials]
  )

  const updatePrefs = (patch: Partial<StoredPrefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch }
      postToSandbox({ type: "save-prefs", prefs: next })
      return next
    })
  }

  const setStrategy = (strategy: FontStrategy) => updatePrefs({ strategy })
  const setNextConvention = (nextConvention: NextFontConvention) =>
    updatePrefs({ nextConvention })
  const setUnit = (collectionName: string, unit: UnitChoice) =>
    updatePrefs({
      unitByCollectionName: {
        ...prefs.unitByCollectionName,
        [collectionName]: unit,
      },
    })
  const setDarkMode = (collectionId: string, modeId: string) =>
    updatePrefs({
      darkModeIdByCollectionId: {
        ...prefs.darkModeIdByCollectionId,
        [collectionId]: modeId,
      },
    })
  const setPrefix = (prefix: string) =>
    updatePrefs({ prefix: prefix.trim() || undefined })

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-text-secondary">
        Loading Figma variables…
      </div>
    )
  }

  if (errorMsg) {
    return (
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="font-semibold text-danger">Error</div>
        <div className="text-text-secondary">{errorMsg}</div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <div className="font-semibold">Stera UI Bridge</div>
          <div className="text-[10px] text-text-secondary">
            {fileName || "Untitled file"}
          </div>
        </div>
      </header>

      <nav className="flex border-b border-border">
        {STEPS.map((s) => (
          <button
            key={s.id}
            onClick={() => setStep(s.id)}
            className={`flex-1 border-b-2 px-3 py-2 text-[11px] transition-colors ${
              step === s.id
                ? "border-brand font-semibold text-text"
                : "border-transparent text-text-secondary hover:text-text"
            }`}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <main className="flex-1 overflow-auto">
        {step === "preview" && doc && (
          <PreviewView
            doc={doc}
            output={previewOutput}
            onAdvance={() => setStep("fonts")}
          />
        )}
        {step === "fonts" && doc && (
          <FontStrategyView
            strategy={prefs.strategy}
            nextConvention={prefs.nextConvention}
            onStrategyChange={setStrategy}
            onConventionChange={setNextConvention}
            fontAssignments={fontAssignments}
          />
        )}
        {step === "options" && doc && (
          <OptionsView
            doc={doc}
            unitByCollectionName={prefs.unitByCollectionName}
            darkModeIdByCollectionId={prefs.darkModeIdByCollectionId}
            prefix={prefs.prefix ?? ""}
            onUnitChange={setUnit}
            onDarkModeChange={setDarkMode}
            onPrefixChange={setPrefix}
          />
        )}
        {step === "export" && output && partials && (
          <ExportView
            output={output}
            partials={partials}
            raw={raw}
            fileName={fileName}
          />
        )}
      </main>
    </div>
  )
}
