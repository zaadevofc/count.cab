import { Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { LuActivity, LuEye, LuListTree, LuMousePointerClick } from 'react-icons/lu';
import Layout from '~/components/Layout';
import { tempArray } from '~/consts';
import { useAnalytics } from '~/hooks/use';

const Dashboard = () => {
  const { data: session, status }: any = useSession()
  const { data } = useAnalytics(session?.token?.email)

  const topKounterHead = ['Rank', 'ID', 'Name', 'Category', 'Count', 'Click', 'Visibility'];
  const dashCards = [
    { icon: LuListTree, count: data?.list, title: 'Kounter List', per: data?.limit },
    { icon: LuActivity, count: data?.online, title: 'Kounter Online' },
    { icon: LuEye, count: data?.count, title: 'Total Kounter' },
    { icon: LuMousePointerClick, count: data?.click, title: 'Total Klik' },
  ]

  return (
    <>
      <Layout>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full justify-between gap-3 md:gap-5'>
          {!data && tempArray(4).map(x => (
            <Skeleton className='rounded-lg'>
              <div className='w-full h-20'></div>
            </Skeleton>
          ))}
          {data && dashCards.map(x => (
            <div className='flex justify-between items-center h-fit gap-6 p-3 w-full rounded-lg border border-black'>
              <div className='flex flex-col'>
                <h1 className='text-2xl font-bold'>
                  {x.count}
                  {x.per && <span className='text-sm'>/{x.per}</span>}
                </h1>
                <h1 className=' text-sm'>{x.title}</h1>
              </div>
              <div className='bg-black p-2 rounded-lg'>
                <x.icon className='text-2xl stroke-white' />
              </div>
            </div>
          ))}
        </div>
        <div className='flex w-full justify-between mt-10 gap-5'>
          <div className='flex flex-col w-full'>
            <h1 className='text-xl font-bold'>Top Kounter</h1>
            <Skeleton isLoaded={data} className='mt-5 rounded-lg'>
              <Table radius='sm' className='border border-black rounded-lg' aria-label="Top Kounter Data | Kounter APi">
                <TableHeader>
                  {topKounterHead.map(x => <TableColumn className={`bg-black text-white ${x == 'Rank' && 'text-center'}`} key={x}>{x}</TableColumn>)}
                </TableHeader>
                <TableBody emptyContent="Data tidak ditemukan">
                  {data?.top?.slice(0, 10).map((x: any, i: any) => (
                    <TableRow key={i + 1}>
                      <TableCell className='text-center'>{i + 1}</TableCell>
                      <TableCell>{x.id}</TableCell>
                      <TableCell className='line-clamp-1 font-medium'>{x.title}</TableCell>
                      <TableCell>{x.category}</TableCell>
                      <TableCell>{x.count}</TableCell>
                      <TableCell>{x.click}</TableCell>
                      <TableCell>{x.visibility}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Skeleton>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Dashboard