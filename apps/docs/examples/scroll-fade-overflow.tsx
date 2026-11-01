const releases = ["v1.2.0", "v1.1.2", "v1.1.1"]

export default function ScrollFadeOverflow() {
  return (
    <div className="max-h-56 w-64 rounded-xl border border-border">
      <div className="max-h-full scroll-fade overflow-y-auto p-4">
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
