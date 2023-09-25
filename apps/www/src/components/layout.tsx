'use client'

import { AxiomWebVitals } from 'next-axiom'

import { ThemeToggle } from './theme-toggle'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AxiomWebVitals />
      <div className="absolute bottom-1 right-1">
        <ThemeToggle />
      </div>
      <div className="flex min-h-screen flex-col bg-white dark:bg-black">{children}</div>
    </>
  )
}
