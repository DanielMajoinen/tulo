'use client'

import NextAuthProvider from '@/lib/auth/Provider'
import TrpcProvider from '@/lib/trpc/Provider'
import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <TrpcProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </TrpcProvider>
    </NextAuthProvider>
  )
}
