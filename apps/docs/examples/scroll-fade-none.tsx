const releases = Array.from({ length: 40 }, (_, i) => `v1.2.0-beta.${40 - i}`)

function ReleaseList({
  className,
  label,
}: {
  className: string
  label: string
}) {
  return (
    <div className="h-56 w-56 rounded-xl border border-border">
      <div className={className}>
        <h4 className="mb-3 st-body-md-strong text-text">{label}</h4>
        {releases.map((release) => (
          <div
            key={release}
            className="border-b border-border py-2 st-body-sm text-text-subtle last:border-b-0"
          >
            {release}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ScrollFadeNone() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <ReleaseList
        className="h-full scroll-fade overflow-y-auto p-4"
        label="scroll-fade"
      />
      <ReleaseList
        className="h-full scroll-fade overflow-y-auto p-4 scroll-fade-none"
        label="scroll-fade-none"
      />
    </div>
  )
}
