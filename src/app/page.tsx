export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-8">
      <main className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Next.js Template</h1>
        <p className="text-foreground/60 max-w-md text-lg">
          Edit{' '}
          <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm font-semibold dark:bg-white/10">
            src/app/page.tsx
          </code>{' '}
          to get started.
        </p>
      </main>
    </div>
  );
}
