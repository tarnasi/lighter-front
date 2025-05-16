import Navbar from '@/components/Navbar'
import PageTitle from '@/components/PageTitle'
import CategoryTable from '@/components/panel/tables/CategoryTable'
import React from 'react'

type Props = {}

const CategoryPage = async (props: Props) => {
  return (
    <div className='bg-white min-h-screen'>
      <Navbar />
      <PageTitle title='دسته بندی' returnLink='/panel' returnTitle='برگشت' />
      <CategoryTable />
    </div>
  )
}

export default CategoryPage;
