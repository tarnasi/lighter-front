'use client'

import React from 'react'
import Link from 'next/link'
import Menu from './Menu'
import Image from 'next/image'


type Props = {}

const logo_name = "پخش سوسنی"

export default function Navbar({}: Props) {
  return (
    <nav className="h-15 px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800">
        <div className='h-full flex items-center justify-center'>
            <Link href="/" className='flex justify-center items-center gap-2'>
              <Image src="/logo/logo-3.png" alt='tinyfire' width={32} height={32} />
              <div className="text-lg tracking-wide font-bold">{logo_name}</div>
            </Link>
        </div>
    </nav>
  )
}
