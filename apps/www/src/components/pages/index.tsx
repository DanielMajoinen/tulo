'use client'

import { makeRoutes, Outlet, Router } from '@verdant-web/react-router'
import { Suspense } from 'react'

import AccountsPage from '@/components/pages/AccountsPage'
import HomePage from '@/components/pages/HomePage'

export default function Index() {
  const routes = makeRoutes([
    {
      component: () => <HomePage />,
      exact: true,
      path: '/'
    },
    {
      component: () => <AccountsPage />,
      exact: true,
      path: '/accounts'
    }
  ])

  return (
    <Router routes={routes}>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </Router>
  )
}
