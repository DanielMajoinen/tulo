/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.mjs')
import { withAxiom } from 'next-axiom'
import NextPWA from 'next-pwa'

const withPWA = NextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import("next").NextConfig & import("next-pwa").PWAConfig} */
const config = withPWA(
  withAxiom({
    reactStrictMode: true,

    /**
     * If you are using `appDir` then you must comment the below `i18n` config out.
     *
     * @see https://github.com/vercel/next.js/issues/41980
     */
    i18n: {
      locales: ['en'],
      defaultLocale: 'en'
    }
  })
)

export default config
