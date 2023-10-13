/* eslint-disable sort-keys-fix/sort-keys-fix */
'use client'

import { makeRoutes, Outlet, Router } from '@verdant-web/react-router'
import { Suspense } from 'react'

import { DashboardLayout, ExploreLayout } from '@/components/layouts'
import Board from '@/components/pages/board'
import Create from '@/components/pages/create'
import Explore from '@/components/pages/explore'
import InputsProvider from '@/components/providers/InputsProvider'

export function SPA() {
  const routes = makeRoutes([
    {
      path: '/explore',
      component: ExploreLayout,
      children: [
        {
          index: true,
          component: Explore
        },
        {
          path: ':id',
          component: Create
        }
      ]
    },
    {
      path: '/', // Redirected by middleware to users first board, or the explore page if they have no boards
      component: DashboardLayout,
      children: [
        {
          component: Board,
          path: '/board', // Redirected by middleware to users first board
          children: [
            {
              path: ':id',
              component: Board,
              onVisited: async ({ id }) => {
                // TODO: Retrieve board from param
                console.log(id)
              }
            }
          ]
        }
      ]
    }
  ])

  return (
    <Router routes={routes}>
      <main>
        <Suspense>
          <InputsProvider>
            <Outlet />
          </InputsProvider>
        </Suspense>
      </main>
    </Router>
  )
}

export default SPA
