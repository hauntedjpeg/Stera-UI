import { useCallback, useMemo, useState } from "react"
import type { GenerateResult } from "../../core/css/generate.js"
import type { PartialsResult } from "../../core/css/partials.js"
import { generateRawJson } from "../../core/json/export.js"
import type { RawVariablesPayload } from "../../shared/messages.js"

type Format = "partials" | "css" | "json"

const FORMATS: { id: Format; label: string }[] = [
  { id: "partials", label: "Partials" },
  { id: "css", label: "Single file" },
  { id: "json", label: "JSON" },
]

type Props = {
  output: GenerateResult
  partials: PartialsResult
  raw: RawVariablesPayload | null
  fileName: string
}

function sanitizeFileName(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return "figma"
  return trimmed.replace(/[/\\:*?"<>|]+/g, "-")
}

export function ExportView({ output, partials, raw, fileName }: Props) {
  const [format, setFormat] = useState<Format>("partials")
  const [activeFile, setActiveFile] = useState(0)
  const [copied, setCopied] = useState(false)

  const json = useMemo(() => (raw ? generateRawJson(raw) : ""), [raw])

  const files = partials.files
  const fileKey = files.map((f) => f.name).join("|")
  const [prevFileKey, setPrevFileKey] = useState(fileKey)
  if (fileKey !== prevFileKey) {
    setPrevFileKey(fileKey)
    setActiveFile(0)
  }

  const selected = files[activeFile] ?? files[0]
  const cssBlocked = format !== "json" && output.errors.length > 0

  const text =
    format === "json"
      ? json
      : format === "css"
        ? output.css
        : (selected?.contents ?? "")
  const downloadName =
    format === "json"
      ? `${sanitizeFileName(fileName)}-variables.json`
      : format === "css"
        ? "globals.css"
        : (selected?.name ?? "styles.css")

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
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
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [text])

  const handleDownload = useCallback(() => {
    const blob = new Blob([text], {
      type: format === "json" ? "application/json" : "text/css",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = downloadName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [text, format, downloadName])

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-2">
        <div className="flex rounded border border-[var(--color-border)] text-[11px]">
          {FORMATS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFormat(f.id)}
              className={`px-2 py-1 ${
                format === f.id
                  ? "bg-[var(--color-surface-secondary)] font-semibold"
                  : ""
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <button
          onClick={handleCopy}
          disabled={cssBlocked || !text}
          className="rounded border border-[var(--color-border)] px-3 py-1.5 font-medium hover:bg-[var(--color-surface-secondary)] disabled:opacity-50"
        >
          {copied ? "Copied" : "Copy"}
        </button>
        <button
          onClick={handleDownload}
          disabled={cssBlocked || !text}
          className="rounded bg-[var(--color-brand)] px-3 py-1.5 font-semibold text-[var(--color-brand-text)] disabled:opacity-50"
        >
          Download {downloadName}
        </button>
      </div>

      {format === "partials" && !cssBlocked && files.length > 0 && (
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-2">
          <div className="flex rounded border border-[var(--color-border)] font-mono text-[10px]">
            {files.map((f, i) => (
              <button
                key={f.path}
                onClick={() => setActiveFile(i)}
                className={`px-2 py-1 ${
                  i === activeFile
                    ? "bg-[var(--color-surface-secondary)] font-semibold"
                    : "text-[var(--color-text-secondary)]"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
          <div className="text-[10px] text-[var(--color-text-secondary)]">
            paste into{" "}
            <span className="font-mono">styles/{selected?.path}</span>
          </div>
        </div>
      )}

      {cssBlocked ? (
        <div className="p-4">
          <div className="mb-2 font-semibold text-[var(--color-danger)]">
            Cannot export CSS
          </div>
          <ul className="list-inside list-disc">
            {output.errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      ) : (
        <pre className="flex-1 overflow-auto bg-[var(--color-surface-secondary)] p-3 font-mono text-[10px] leading-relaxed">
          {text}
        </pre>
      )}
    </div>
  )
}
