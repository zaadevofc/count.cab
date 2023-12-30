import { Badge, Card, CardBody, Skeleton, Tab, Tabs } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { LuEye, LuGhost, LuGlobe, LuLock, LuMousePointerClick } from 'react-icons/lu';

let kounterIcon = (ctg: string) => {
  if (ctg == 'WEBSITE') return ['🌐', 'bg-blue-100']
  if (ctg == 'WORK') return ['💪', 'bg-yellow-100']
  if (ctg == 'ORGANIZATION') return ['🏢', 'bg-gray-100']
  if (ctg == 'COUNT') return ['📌', 'bg-emerald-100']
  if (ctg == 'ADDITIONAL') return ['🚀', 'bg-rose-100']
}

const Contents = ({ categoryList, listKounter, isLoading }: any) => {
  const router = useRouter();
  const { status } = useSession()

  return (
    <>
      <div className='flex flex-row gap-3 w-full justify-between'>
        <div className='flex flex-col w-full'>
          <div className='flex flex-row items-center justify-between md:sticky top-20 z-10 ml-1'>
            <h1 className='text-4xl font-extrabold py-10'>All Contents</h1>
          </div>
          <Tabs aria-label="Kounter" variant='underlined' className='mb-2 md:sticky top-[199px] z-10 -ml-3 overflow-x-scroll'>
            {['ALL CONTENTS', ...categoryList].map((category: any) => (
              <Tab key={category} title={category} className='text-[15px]'>
                <Card className='bg-transparent shadow-none border-none p-0 -ml-3'>
                  <CardBody className={`grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 bg-transparent gap-3`}>
                    {(status == 'loading' || isLoading) && [...new Array(11)].map(x => (
                      <Skeleton className="rounded-xl border-2 border-gray-300">
                        <div className='w-20 h-[70px]'></div>
                      </Skeleton>
                    ))}
                    {(status != 'loading' && !isLoading && (!listKounter?.data?.['list'][category] || listKounter?.data?.['list'][category].length == 0)) && (
                      <section className='flex flex-row items-center gap-4 opacity-80 bg-white drop-shadow-sm border border-primary-200/80 rounded-xl p-3'>
                        <div className={`p-3 rounded-xl w-fit -rotate-12`}>
                          <LuGhost className='text-3xl stroke-orange-600' />
                        </div>
                        <h1 className='font-bold text-lg capitalize'>Kounter Kosong</h1>
                      </section>
                    )}
                    {((status !== 'loading' || !isLoading)) && (listKounter?.data?.['list'][category])?.map((data: any) => (
                      <section onClick={() => router.push('/dash?tab=detail&id=' + data.id)} className={`flex flex-row items-center gap-4 min-w-full drop-shadow-sm md:cursor-pointer active:scale-[.98] bg-white rounded-xl p-3 border ${data.status == 'ONLINE' ? 'border-primary-200/80' : 'border-red-400'}`}>
                        <Badge content={data.status == 'ONLINE' ? 'ON' : 'OFF'} color={data.status == 'ONLINE' ? 'success' : 'danger'} size="sm" className='z-0 text-white right-1'>
                          <div className={`${kounterIcon((data.category)?.toUpperCase())?.[1]} p-3 rounded-xl w-fit`}>
                            <h1 className='text-2xl'>{kounterIcon((data.category)?.toUpperCase())?.[0]}</h1>
                          </div>
                        </Badge>
                        <div className='flex flex-col gap-2'>
                          <h1 className='font-bold text-[16px] line-clamp-1'>{data.title}</h1>
                          <div className='flex flex-row items-center gap-3'>
                            <div className='flex flex-row items-center gap-1'>
                              <LuEye className='fill-blue-300' />
                              <h1 className='text-xs'>{data.count}</h1>
                            </div>
                            <div className='flex flex-row items-center gap-1'>
                              <LuMousePointerClick className='fill-rose-300' />
                              <h1 className='text-xs'>{data.click}</h1>
                            </div>
                            <div className='flex flex-row items-center gap-1 text-xs'>
                              {data.visibility == 'PUBLIC' && <LuGlobe className='fill-teal-300' />}
                              {data.visibility == 'PRIVATE' && <LuLock className='fill-rose-300' />}
                              <h1 className='capitalize'>{(data.visibility)?.toLowerCase()}</h1>
                            </div>
                          </div>
                        </div>
                      </section>
                    ))}
                  </CardBody>
                </Card>
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default Contents