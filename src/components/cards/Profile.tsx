import { Accordion, AccordionItem, Badge, Button, Skeleton } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LuCheck, LuCrown, LuLogOut, LuPlus, LuUser, LuWallet } from 'react-icons/lu'

const Profile = ({ tab }: any) => {
  const { data: session, status }: any = useSession()
  const router = useRouter();

  return (
    <>
      <section className={`${tab == 'default' ? 'opacity-100' : 'opacity-0 hidden'} duration-1000 flex flex-col gap-5 h-fit sticky top-6 z-10 max-w-xs w-full`}>
        <div className={`flex flex-col p-5 gap-8 bg-white rounded-2xl shadow-sm border border-primary-200/80`}>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-row gap-2'>
              <div className='flex flex-row items-center gap-x-3'>
                <LuUser />
              </div>
            </div>
            <div className='md:cursor-pointer' onClick={() => signOut()}>
              <LuLogOut />
            </div>
          </div>
          <div className='flex flex-col items-center gap-3'>
            {status != 'loading' ? (
              <Badge content={<LuCheck />} shape="circle" isOneChar color="success" size='md' className='top-1 right-1 text-[10px]'>
                <div>
                  <img className='w-28 rounded-2xl drop-shadow-lg' src={session?.token?.picture} alt="" />
                </div>
              </Badge>
            ) : (
              <Skeleton className="rounded-2xl">
                <div className="w-28 h-28 rounded-2xl bg-default-300"></div>
              </Skeleton>
            )}
            <div className='flex flex-col items-center'>
              {status != 'loading' ? (
                <h1 className='text-2xl font-bold tracking-wide'>{session?.token?.name}</h1>
              ) : (
                <Skeleton className="rounded-2xl">
                  <div className="w-40 h-8 rounded-2xl bg-default-300"></div>
                </Skeleton>
              )}
              {status != 'loading' ? (
                <h1 className='text-sm bg-primary-50 text-primary-400 px-2 rounded-lg'>{session?.token?.email}</h1>
              ) : (
                <Skeleton className="rounded-2xl mt-1">
                  <div className="w-24 h-5 rounded-2xl bg-default-300"></div>
                </Skeleton>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <Skeleton isLoaded={status != 'loading'} className="rounded-2xl">
            <div className={`flex flex-row items-center gap-3`}>
              <Button onClick={() => router.push('/dash?tab=add')} color="primary" startContent={<LuPlus className='stroke-white' />} className='w-full shadow-md'>
                Buat Kounter
              </Button>
            </div>
          </Skeleton>
          <Skeleton isLoaded={status != 'loading'} className="rounded-2xl">
            <Button color="secondary" startContent={<LuCrown className='stroke-white' />} className={`w-full shadow-md bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-800 via-violet-900 to-purple-800`}>
              Upgrade Premium
            </Button>
          </Skeleton>
        </div>
        <div className={``}>
          <Accordion variant='shadow'>
            <AccordionItem key="1" title={
              <div className='flex flex-row gap-2 items-center pb-2'>
                <LuWallet className='fill-orange-500' />
                <h1 className='font-bold text-orange-500'>Open Donation~</h1>
              </div>
            } aria-label="Open Donation" subtitle="Jika merasa ini bermanfaat bisa donasi semau kamu. Guna biaya saat database penuh dan down pada server. Klik disini">
              <div className='flex flex-row items-center pb-2 gap-3'>
                <Link href='https://saweria.co/zaadevofc' target='_blank' className='flex flex-row gap-2 items-center bg-yellow-500/50 border border-yellow-600 w-fit p-2 rounded-xl'>
                  <div className='w-8'>
                    <img className='w-full drop-shadow-md' src="https://saweria.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcapy_happy.603c7293.svg&w=384&q=75" alt="" />
                  </div>
                  <h1 className='font-[Comfortaa]'>Saweria</h1>
                </Link>
                <Link href='https://trakteer.id/zaadevofc/tip' target='_blank' className='flex flex-row gap-2 items-center bg-red-500/50 border border-red-600 w-fit p-2 rounded-xl'>
                  <div className='w-6'>
                    <img className='w-full drop-shadow-md' src="https://trakteer.id/images/v2/trakteer-logo-circle.png" alt="" />
                  </div>
                  <h1 className='font-[Quicksand] font-bold'>Trakteer</h1>
                </Link>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  )
}

export default Profile