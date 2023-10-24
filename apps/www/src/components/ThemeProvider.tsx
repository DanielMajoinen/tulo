import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

import RootLayout from '@/components/layouts/RootLayout'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...props}>
        <RootLayout>{children}</RootLayout>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
