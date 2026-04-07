export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold tracking-tight">Stera UI</h1>
      <p className="mt-4 text-lg text-text-secondary">
        A component registry for React, built on Base UI and Tailwind CSS.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="/docs"
          className="rounded-md bg-bg-brand px-4 py-2 text-sm font-medium text-text-onbrand"
        >
          Documentation
        </a>
      </div>
    </main>
  )
}
