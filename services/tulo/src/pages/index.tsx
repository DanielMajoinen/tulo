import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
// import Link from 'next/link'

import { api } from '@/utils/api'
import Logo from '@/components/logo'

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: 'from tRPC' })
  // <p className="text-2xl text-white">{hello.data ? hello.data.greeting : 'Loading tRPC query...'}</p>

  return (
    <>
      <Head>
        <title>Tulo</title>
        <meta name="description" content="Tulo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#28252c] to-[#000000]">
        <div className="flex items-baseline justify-between gap-x-1 py-8">
          <h1 className="font-light tracking-tight text-white selection:text-5xl sm:text-[5rem]">Tul</h1>
          <Logo className="" height={50} width={50} color="#e66b6c" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <AuthShowcase />
        </div>
      </main>
    </>
  )
}

function AuthShowcase() {
  const { data: sessionData } = useSession()

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  )

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  )
}
