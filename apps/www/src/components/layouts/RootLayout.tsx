import { type ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-white dark:bg-black">{children}</div>
}
