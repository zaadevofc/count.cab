import { useEffect } from 'react';
import Layout from '~/components/Layout';
import { usePushVisits } from '~/hooks/use';

const Dashboard = () => {
  const { mutateAsync } = usePushVisits()

  useEffect(() => {
    let push = async () => await mutateAsync('premium')
    push()
  }, [])

  return (
    <>
      <Layout>
        <div className="w-full mx-auto bg-white text-gray-600 mb-10">
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-5xl md:text-4xl font-bold mb-5 sdsd">Premium</h1>
            <h3 className="text-lg font-medium mb-10">Upgrade kounter untuk akses fitur yang terkunci dan akses kounter tanpa batas dengan.</h3>
          </div>
          <div className='flex flex-col'>
            <div className='flex p-5 rounded-lg border border-black'>
              <div className='flex flex-col'>
                <h1 className='text-4xl font-bold'>Rp. 22000</h1>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Dashboard