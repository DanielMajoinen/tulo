/* eslint-disable sort-keys-fix/sort-keys-fix */
'use client'

import { makeRoutes, Outlet, Router } from '@verdant-web/react-router'
import { Suspense } from 'react'

import { DashboardLayout, ExploreLayout } from '@/components/layouts'
import Board from '@/components/pages/board'
import Explore from '@/components/pages/explore'
import ExploreNewBoard from '@/components/pages/explore/ExploreNewBoard'
import BoardsProvider from '@/stores/boards/BoardsProvider'
import FilesProvider from '@/stores/files/FilesProvider'
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
          component: ExploreNewBoard
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
          <BoardsProvider>
            <InputsProvider>
              <FilesProvider>
                <Outlet />
              </FilesProvider>
            </InputsProvider>
          </BoardsProvider>
        </Suspense>
      </main>
    </Router>
  )
}

export default SPA
