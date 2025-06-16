import RegisterForm from '@/components/forms/RegisterForm'
import Navbar from '@/components/Navbar'
import PageTitle from '@/components/PageTitle'
import React from 'react'

type Props = {}

const UsersPage = async (props: Props) => {
  return (
    <div className='bg-white min-h-screen'>
      <PageTitle title='ایجاد کاربر جدید' returnLink='/panel/users' returnTitle='برگشت' />
      <div className='flex justify-center'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default UsersPage;
