import '@/styles/globals.css'

import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { AxiomWebVitals } from 'next-axiom'

import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { api } from '@/utils/api'

const Tulo: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <AxiomWebVitals />
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(Tulo)
