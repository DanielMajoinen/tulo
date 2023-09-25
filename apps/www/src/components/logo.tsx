'use client'

import * as React from 'react'

import { Icons } from './icons'

export type LogoProps = React.ComponentPropsWithoutRef<'div'> & {
  hideText?: boolean
  size?: 'sm' | 'base' | 'lg'
}

const Logo = ({ hideText, size, className, ...props }: LogoProps) => {
  let px: number
  let textSize: string
  switch (size) {
    case 'sm':
      px = 15
      textSize = 'text-3xl'
      break
    case 'base':
      px = 30
      textSize = 'text-6xl'
      break
    case 'lg':
      px = 50
      textSize = 'text-8xl'
      break
    default:
      px = 30
      textSize = 'text-6xl'
      break
  }

  return (
    <div className={`flex items-baseline ${className}`} {...props}>
      {hideText ? undefined : <h1 className={`${textSize} font-light tracking-tight text-black dark:text-white`}>Tul</h1>}
      <Icons.tulo height={px} width={px} color="#e66b6c" />
    </div>
  )
}

export default Logo
