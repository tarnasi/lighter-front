import Navbar from '@/components/Navbar'
import UserTable from '@/components/tables/UserTables'
import React from 'react'

type Props = {}

const PanelPage = async (props: Props) => {
  return (
    <>
      <Navbar />
      <UserTable />
    </>
  )
}

export default PanelPage;
