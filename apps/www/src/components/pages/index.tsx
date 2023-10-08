'use client'

import { makeRoutes, Outlet, Router } from '@verdant-web/react-router'
import { Suspense } from 'react'

import Explore from '@/components/pages/Explore'

export default function Index() {
  const routes = makeRoutes([
    {
      component: () => <Explore />,
      exact: true,
      path: '/'
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
