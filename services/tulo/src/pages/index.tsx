import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | Tulo</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
        <div className="flex items-baseline justify-between gap-x-1 py-8">
          <h1 className="text-[5rem] font-light tracking-tight text-black selection:text-5xl dark:text-white">Welcome</h1>
        </div>
        <AuthShowcase />
      </main>
    </>
  )
}

function AuthShowcase() {
  const { data: sessionData } = useSession()

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">{sessionData && <span>Logged in as {sessionData.user?.name}</span>}</p>
      <button
        className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20 dark:bg-white/10 dark:text-white"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  )
}
