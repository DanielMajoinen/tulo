import * as React from 'react'

import { Icons } from './icons'

export type LogoProps = React.ComponentPropsWithoutRef<'div'> & {
  hideText?: boolean
}

const Logo = ({ hideText, ...props }: LogoProps) => (
  <div className="flex items-baseline justify-center">
    <div {...props}>
      {hideText ? undefined : <h1 className="text-[5rem] font-light tracking-tight selection:text-5xl dark:text-white">Tul</h1>}
      <Icons.tulo className="h-50 w-50" color="#e66b6c" />
    </div>
  </div>
)

export default Logo
