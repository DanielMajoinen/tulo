'use client'

import { ThemeToggle } from '../theme-toggle'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute bottom-1 right-1">
        <ThemeToggle />
      </div>
      <div className="flex min-h-screen flex-col bg-white dark:bg-black">{children}</div>
    </>
  )
}
