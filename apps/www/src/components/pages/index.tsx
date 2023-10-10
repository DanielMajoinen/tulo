/* eslint-disable sort-keys-fix/sort-keys-fix */
'use client'

import { makeRoutes, Outlet, Router } from '@verdant-web/react-router'
import { Suspense } from 'react'

import Create from '@/components/pages/Create'
import Explore from '@/components/pages/Explore'
import InputsProvider from '@/components/providers/InputsProvider'

export default function Index() {
  const routes = makeRoutes([
    {
      component: Explore,
      exact: true,
      path: '/'
    },
    {
      component: Create,
      path: '/create',
      children: [
        {
          // match a path parameter and it will be passed
          // by name to your onAccessible/onVisited callbacks
          // and returned by useParams()
          path: ':id',
          component: Create
        }
      ]
    }
  ])

  return (
    <Router routes={routes}>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <InputsProvider>
            <Outlet />
          </InputsProvider>
        </Suspense>
      </main>
    </Router>
  )
}
