'use client'

import * as React from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white dark:bg-black">{children}</div>
}
