'use client'

import React from 'react'
import Link from 'next/link'
import Menu from './Menu'


type Props = {}

export default function Navbar({}: Props) {
  return (
    <nav className="h-15 px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-teal-500 border-b">
        <div className='h-full flex items-center justify-between'>
            {/* MOBILE */}
            <Link href="/">
                <div className="text-2xl tracking-wide font-bold">DD</div>
            </Link>
            <Menu />
        </div>
    </nav>
  )
}
