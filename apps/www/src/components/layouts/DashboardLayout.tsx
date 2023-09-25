'use client'

import { PiggyBank } from 'lucide-react'

import Sidebar from './Sidebar'
import { Button } from '../ui/button'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <Sidebar>
        <Button className="flex w-full gap-3 rounded-none hover:bg-[#e66b6c]" variant="ghost">
          <PiggyBank />
          <span>Accounts</span>
        </Button>
      </Sidebar>
      <div className="flex min-h-screen flex-1 flex-col bg-white dark:bg-black">{children}</div>
    </div>
  )
}
