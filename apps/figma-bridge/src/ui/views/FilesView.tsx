import { useCallback, useEffect, useRef, useState } from "react"
import { SiAlertTriangle, SiDownload, SiFolder, SiSlidersV } from "stera-icons"
import type { CssFile } from "../../core/css/partials.js"
import { Button, IconButton } from "../components/Button.js"

type Props = {
  files: CssFile[]
  activeName: string
  onActiveChange: (name: string) => void
  warnings: string[]
  onOpenSettings: () => void
}

// "typography.css" → "Typography"
function tabLabel(name: string): string {
  const base = name.replace(/\.css$/, "")
  return base.charAt(0).toUpperCase() + base.slice(1)
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // Figma's iframe often blocks the async clipboard API.
    const ta = document.createElement("textarea")
    ta.value = text
    ta.style.position = "fixed"
    ta.style.opacity = "0"
    document.body.appendChild(ta)
    ta.focus()
    ta.select()
    document.execCommand("copy")
    document.body.removeChild(ta)
  }
}

function downloadText(text: string, fileName: string) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/css" }))
  const a = document.createElement("a")
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function FilesView({
  files,
  activeName,
  onActiveChange,
  warnings,
  onOpenSettings,
}: Props) {
  const file = files.find((f) => f.name === activeName) ?? files[0]
  const [copied, setCopied] = useState(false)
  const [warningsOpen, setWarningsOpen] = useState(false)
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(copiedTimer.current), [])

  const handleCopy = useCallback(async () => {
    await copyText(file.contents)
    setCopied(true)
    clearTimeout(copiedTimer.current)
    copiedTimer.current = setTimeout(() => setCopied(false), 1500)
  }, [file])

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-border px-2">
        <div role="tablist" className="flex items-center gap-0.5">
          {files.map((f) => {
            const active = f.name === file.name
            return (
              <button
                key={f.name}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onActiveChange(f.name)}
                className={`h-6 rounded-[5px] px-2 transition-colors ${
                  active
                    ? "bg-surface-secondary font-medium text-text"
                    : "text-text-secondary hover:bg-surface-secondary"
                }`}
              >
                {tabLabel(f.name)}
              </button>
            )
          })}
        </div>
        <IconButton label="Settings" onClick={onOpenSettings}>
          <SiSlidersV size={16} />
        </IconButton>
      </header>

      <div className="relative flex h-10 shrink-0 items-center gap-2 px-3">
        <SiFolder size={14} className="shrink-0 text-icon-secondary" />
        <span className="min-w-0 flex-1 truncate font-mono text-text-secondary">
          styles/{file.path}
        </span>
        {warnings.length > 0 && (
          <IconButton
            label={`${warnings.length} warning${warnings.length === 1 ? "" : "s"}`}
            aria-expanded={warningsOpen}
            onClick={() => setWarningsOpen((open) => !open)}
            className="text-warning hover:text-warning"
          >
            <SiAlertTriangle size={16} />
          </IconButton>
        )}
        <IconButton
          label={`Download ${file.name}`}
          onClick={() => downloadText(file.contents, file.name)}
        >
          <SiDownload size={16} />
        </IconButton>
        <Button onClick={handleCopy}>{copied ? "Copied" : "Copy"}</Button>

        {warningsOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setWarningsOpen(false)}
            />
            <div className="absolute top-full right-3 z-20 max-h-64 w-72 overflow-auto rounded-lg border border-border bg-surface p-3 shadow-lg">
              <div className="mb-1.5 font-medium">Warnings</div>
              <ul className="flex flex-col gap-1.5 text-text-secondary">
                {warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      <pre className="m-0 flex-1 overflow-auto px-3 pt-1 pb-3 font-mono leading-4 whitespace-pre">
        {file.contents}
      </pre>
    </div>
  )
}
