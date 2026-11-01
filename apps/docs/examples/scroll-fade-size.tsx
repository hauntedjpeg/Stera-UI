const releases = Array.from({ length: 40 }, (_, i) => `v1.2.0-beta.${40 - i}`)

export default function ScrollFadeSize() {
  return (
    <div className="h-64 w-64 rounded-xl border border-border">
      <div className="h-full scroll-fade overflow-y-auto p-4 scroll-fade-24">
        <h4 className="mb-3 st-label-md-medium text-ink">Releases</h4>
        {releases.map((release) => (
          <div
            key={release}
            className="border-b border-border py-2 st-body-sm text-ink-subtler last:border-b-0"
          >
            {release}
          </div>
        ))}
      </div>
    </div>
  )
}
