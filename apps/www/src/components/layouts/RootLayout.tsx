'use client'

import Head from 'next/head'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Add viewport settings for the PWA */}
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      {/* Page content */}
      <main>
        <div className="flex min-h-screen flex-col bg-white dark:bg-black">{children}</div>
      </main>
    </>
  )
}
