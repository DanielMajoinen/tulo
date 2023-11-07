/* eslint-disable sort-keys-fix/sort-keys-fix */
'use client'

import { makeRoutes, Outlet, Router } from '@verdant-web/react-router'
import { Suspense } from 'react'

import { DashboardLayout, ExploreLayout } from '@/components/layouts'
import NotFound from '@/components/pages/404'
import Board from '@/components/pages/board'
import Explore from '@/components/pages/explore'
import ExploreTemplate from '@/components/pages/explore/ExploreTemplate'
import BoardsProvider from '@/stores/boards/BoardsProvider'
import DocumentsProvider from '@/stores/documents/DocumentsProvider'
import InputsProvider from '@/stores/inputs/InputsProvider'

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
          component: ExploreTemplate
        }
      ]
    },
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          index: true,
          component: NotFound
        },
        {
          component: Board,
          path: '/board',
          children: [
            {
              index: true,
              component: NotFound
            },
            {
              path: ':id',
              component: Board
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
          <BoardsProvider>
            <InputsProvider>
              <DocumentsProvider>
                <Outlet />
              </DocumentsProvider>
            </InputsProvider>
          </BoardsProvider>
        </Suspense>
      </main>
    </Router>
  )
}

export default SPA
