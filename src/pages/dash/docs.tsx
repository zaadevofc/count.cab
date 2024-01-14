import { useEffect } from 'react';
import Layout from '~/components/Layout';
import { usePushVisits } from '~/hooks/use';

const Dashboard = () => {
  const { mutateAsync } = usePushVisits()

  useEffect(() => {
    let push = async () => await mutateAsync('docs')
    push()
  }, [])

  return (
    <>
      <Layout>
        <h1>Premium Page</h1>
      </Layout>
    </>
  )
}

export default Dashboard