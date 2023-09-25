'use client'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white dark:bg-black">{children}</div>
    </>
  )
}
