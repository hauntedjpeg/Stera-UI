export default function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl px-8 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Getting Started</h1>
      <p className="mt-4 text-muted-foreground">
        Stera UI is a component registry for React. Components are copied into
        your project so you own the code and can customize freely.
      </p>

      <h2 className="mt-12 text-xl font-semibold">Installation</h2>
      <pre className="mt-4 rounded-md bg-muted p-4 text-sm">
        <code>pnpm dlx stera-ui init</code>
      </pre>

      <h2 className="mt-12 text-xl font-semibold">Adding Components</h2>
      <pre className="mt-4 rounded-md bg-muted p-4 text-sm">
        <code>pnpm dlx stera-ui add button</code>
      </pre>

      <h2 className="mt-12 text-xl font-semibold">Available Components</h2>
      <pre className="mt-4 rounded-md bg-muted p-4 text-sm">
        <code>pnpm dlx stera-ui list</code>
      </pre>
    </main>
  )
}
