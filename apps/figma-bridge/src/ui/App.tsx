import { useCallback, useEffect, useMemo, useState } from "react"
import {
  DEFAULT_PREFS,
  postToSandbox,
  type SandboxToUi,
  type StoredPrefs,
  type VariableDoc,
} from "../shared/messages.js"
import { useFigmaMessages } from "./hooks/useFigmaMessages.js"
import { generatePartials } from "../core/css/partials.js"
import { deriveFontAssignments } from "../core/css/model.js"
import { FilesView } from "./views/FilesView.js"
import { SettingsView } from "./views/SettingsView.js"
import { UnsupportedView } from "./views/UnsupportedView.js"

export function App() {
  const [doc, setDoc] = useState<VariableDoc | null>(null)
  const [prefs, setPrefs] = useState<StoredPrefs>(DEFAULT_PREFS)
  const [view, setView] = useState<"files" | "settings">("files")
  const [activeFile, setActiveFile] = useState("index.css")
  const [loadError, setLoadError] = useState<string | null>(null)

  const onMessage = useCallback((msg: SandboxToUi) => {
    if (msg.type === "variables-loaded") {
      setDoc(msg.doc)
      setPrefs(msg.prefs)
    } else if (msg.type === "error") {
      setLoadError(msg.message)
    }
  }, [])

  useFigmaMessages(onMessage)

  useEffect(() => {
    postToSandbox({ type: "load-variables" })
  }, [])

  const partials = useMemo(() => {
    if (!doc) return null
    return generatePartials({
      collections: doc.collections,
      textStyles: doc.textStyles,
      strategy: prefs.strategy,
      unit: prefs.unit,
      prefix: prefs.prefix,
      fontAssignments: deriveFontAssignments(doc.collections, prefs.prefix),
    })
  }, [doc, prefs])

  const updatePrefs = (patch: Partial<StoredPrefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch }
      postToSandbox({ type: "save-prefs", prefs: next })
      return next
    })
  }

  if (loadError) return <UnsupportedView cause={loadError} readFailed />

  if (!partials) {
    return (
      <div className="flex h-full items-center justify-center text-text-secondary">
        Loading variables…
      </div>
    )
  }

  if (partials.errors.length > 0) {
    return <UnsupportedView cause={partials.errors[0]} />
  }

  if (view === "settings") {
    return (
      <SettingsView
        prefs={prefs}
        onPrefsChange={updatePrefs}
        onBack={() => setView("files")}
      />
    )
  }

  return (
    <FilesView
      files={partials.files}
      activeName={activeFile}
      onActiveChange={setActiveFile}
      warnings={partials.warnings}
      onOpenSettings={() => setView("settings")}
    />
  )
}
