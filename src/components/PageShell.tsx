import type { ReactNode } from 'react'

type PageShellProps = {
  title: string
  description: string
  children?: ReactNode
}

export const PageShell = ({ title, description, children }: PageShellProps) => {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-6">
      <header className="mb-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </header>
      {children}
    </main>
  )
}
