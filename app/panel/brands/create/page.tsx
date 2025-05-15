import Navbar from '@/components/Navbar'
import PageTitle from '@/components/PageTitle'
import BrandTable from '@/components/tables/BrandTable'
import React from 'react'

type Props = {}

async function BarndPage({}: Props) {
  return (
    <div className='bg-white min-h-screen'>
      <Navbar />
      <PageTitle title='ساخت برند جدید' returnLink='/panel/brands' returnTitle='برگشت' />
    </div>
  )
}

export default BarndPage