import { useCallback, useEffect, useMemo, useState } from "react"
import {
  postToSandbox,
  type CollectionSummary,
  type SandboxToUi,
  type StoredPrefs,
  type TargetMode,
} from "../shared/messages.js"
import {
  generateBiModalScale,
  type GenerationResult,
  type ScaleType,
} from "../core/scale/bi-modal.js"
import { backgroundError } from "../core/scale/tuned.js"
import { suggestColorName } from "../core/naming/color-name.js"
import { useFigmaMessages } from "./hooks/useFigmaMessages.js"
import { Button } from "./components/Button.js"
import { CollectionSelect } from "./components/CollectionSelect.js"
import { Field } from "./components/Field.js"
import { GroupSelect } from "./components/GroupSelect.js"
import { HexField } from "./components/HexField.js"
import { ScalePreview } from "./components/ScalePreview.js"
import { SegmentedControl } from "./components/SegmentedControl.js"

const SCALE_TYPE_OPTIONS: { value: ScaleType; label: string }[] = [
  { value: "accent", label: "Tuned" },
  { value: "gray", label: "Standard" },
]

const MODE_OPTIONS: { value: TargetMode; label: string }[] = [
  { value: "add", label: "Add" },
  { value: "update", label: "Update" },
]

const EMPTY_RESULT: GenerationResult = { entries: [], notes: [] }

export function App() {
  const [prefs, setPrefs] = useState<StoredPrefs | null>(null)
  const [collections, setCollections] = useState<CollectionSummary[]>([])
  const [collectionId, setCollectionId] = useState("")
  const [target, setTarget] = useState("")
  // null follows the suggestion for the current color; a string is the user's.
  const [customName, setCustomName] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const onMessage = useCallback((msg: SandboxToUi) => {
    if (msg.type === "loaded") {
      setPrefs(msg.prefs)
      setCollections(msg.collections)
    } else if (msg.type === "variables-written") {
      setErrorMessage("")
      setCollections(msg.collections)
    } else if (msg.type === "legacy-naming") {
      setErrorMessage(
        `"${msg.collectionName}" already uses flat 50–950 names under this color. Switch to a different collection or pick the default.`
      )
    } else if (msg.type === "error") {
      setErrorMessage(msg.message)
    }
  }, [])

  useFigmaMessages(onMessage)

  useEffect(() => {
    postToSandbox({ type: "load" })
  }, [])

  const backgroundMessage = useMemo(
    () =>
      prefs
        ? backgroundError(prefs.lightBackground, prefs.darkBackground)
        : null,
    [prefs]
  )

  const result = useMemo<GenerationResult>(() => {
    if (!prefs || backgroundMessage) return EMPTY_RESULT
    return generateBiModalScale({
      hex: prefs.hex,
      scaleType: prefs.scaleType,
      lightBackground: prefs.lightBackground,
      darkBackground: prefs.darkBackground,
    })
  }, [prefs, backgroundMessage])
  const scale = result.entries
  const suggestedName = useMemo(
    () => (prefs ? suggestColorName(prefs.hex) : ""),
    [prefs]
  )

  const groupedCollections = collections.filter((c) => c.groups.length > 0)
  const targets = groupedCollections.flatMap((c) =>
    c.groups.map((g) => `${c.id}|${g}`)
  )
  // Keep the user's pick across refetches; only fall back when it's gone.
  const activeTarget = targets.includes(target) ? target : (targets[0] ?? "")

  if (!prefs) {
    return (
      <div className="flex h-full items-center justify-center text-text-secondary">
        Loading…
      </div>
    )
  }

  const tuned = prefs.scaleType === "accent"

  const updatePrefs = (patch: Partial<StoredPrefs>) => {
    const next = { ...prefs, ...patch }
    setPrefs(next)
    postToSandbox({ type: "save-prefs", prefs: next })
  }

  const handleHexChange = (hex: string) => {
    updatePrefs({ hex })
    // A cleared name field goes back to following the suggestion.
    setCustomName((name) => (name === "" ? null : name))
  }

  const handleSubmit = () => {
    setErrorMessage("")
    if (prefs.mode === "update") {
      const [id, ...groupParts] = activeTarget.split("|")
      postToSandbox({
        type: "write-variables",
        colorName: groupParts.join("|"),
        collectionId: id,
        scale,
      })
    } else {
      postToSandbox({
        type: "write-variables",
        colorName: (customName ?? suggestedName).trim() || suggestedName,
        collectionId: collectionId || undefined,
        scale,
      })
    }
  }

  const canSubmit =
    scale.length > 0 && (prefs.mode !== "update" || Boolean(activeTarget))

  return (
    <div className="flex h-full">
      <div className="flex w-full flex-col">
        <div className="flex flex-col gap-3 border-b border-border p-4">
          <Field label="Color">
            <HexField
              label="Color"
              value={prefs.hex}
              onChange={handleHexChange}
            />
          </Field>
          <Field label="Scale type">
            <SegmentedControl
              label="Scale type"
              value={prefs.scaleType}
              options={SCALE_TYPE_OPTIONS}
              onChange={(scaleType) => updatePrefs({ scaleType })}
            />
          </Field>
          <Field label="Background">
            <div className="flex gap-2">
              <HexField
                label="Light background"
                placeholder="Light"
                value={prefs.lightBackground}
                onChange={(lightBackground) => updatePrefs({ lightBackground })}
              />
              <HexField
                label="Dark background"
                placeholder="Dark"
                value={prefs.darkBackground}
                onChange={(darkBackground) => updatePrefs({ darkBackground })}
              />
            </div>
          </Field>
        </div>

        <div className="flex flex-col gap-3 p-4">
          <SegmentedControl
            label="Target"
            value={prefs.mode}
            options={MODE_OPTIONS}
            onChange={(mode) => updatePrefs({ mode })}
          />

          {prefs.mode === "add" ? (
            <>
              <Field label="Color name">
                <input
                  type="text"
                  aria-label="Color name"
                  value={customName ?? suggestedName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Blue, Primary, Brand"
                  className="h-6 rounded-md border border-surface-secondary bg-surface-secondary px-2 py-1.5 text-text hover:border-border focus:outline-none focus-visible:border-border-selected"
                />
              </Field>
              <Field label="Collection">
                <CollectionSelect
                  collections={collections}
                  value={collectionId}
                  onChange={setCollectionId}
                />
              </Field>
            </>
          ) : (
            <Field label="Target group">
              <GroupSelect
                collections={groupedCollections}
                value={activeTarget}
                onChange={setTarget}
              />
            </Field>
          )}
        </div>

        {(backgroundMessage || errorMessage) && (
          <div className="px-4 pb-2 text-danger">
            {backgroundMessage ?? errorMessage}
          </div>
        )}

        <div className="mt-auto flex flex-col gap-3 p-4">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full justify-center"
          >
            {prefs.mode === "update" ? "Update Variables" : "Add Variables"}
          </Button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 border-l border-border p-4">
        <ScalePreview scale={scale} tuned={tuned} />
        {result.notes.length > 0 && (
          <ul className="flex flex-col gap-1 text-[9px]/3.5 text-text-secondary">
            {result.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
