import Navbar from '@/components/Navbar'
import PageTitle from '@/components/PageTitle'

type Props = {
  params: {
    id: string
  }
}

async function BarndPage({params}: Props) {
  return (
    <div className='bg-white min-h-screen'>
      <Navbar />
      <PageTitle title='ویرایش برند' returnLink='/panel' returnTitle='برگشت' />
    </div>
  )
}

export default BarndPage