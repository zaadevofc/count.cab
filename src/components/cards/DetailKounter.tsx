import { Button, Switch } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LuAlertCircle, LuExternalLink, LuEye, LuGlobe, LuLock, LuMousePointerClick, LuX } from 'react-icons/lu'
import { url } from '~/consts'

let kounterIcon = (ctg: string) => {
  if (ctg == 'WEBSITE') return ['🌐', 'bg-blue-100']
  if (ctg == 'WORK') return ['💪', 'bg-yellow-100']
  if (ctg == 'ORGANIZATION') return ['🏢', 'bg-gray-100']
  if (ctg == 'COUNT') return ['📌', 'bg-emerald-100']
  if (ctg == 'ADDITIONAL') return ['🚀', 'bg-rose-100']
}

const DetailKounter = ({ tab, isKounter }: any) => {
  const router = useRouter();
  
  return (
    <>
      <section className={`${tab == 'detail' ? 'opacity-100' : 'opacity-0 hidden'} duration-1000 flex flex-col gap-5 h-fit sticky top-6 z-10 max-w-xs w-full`}>
        <div className='flex flex-col'>
          <div className={`flex flex-col bg-white rounded-2xl shadow-sm border border-primary-200/80`}>
            <div className='flex flex-row p-5 items-center justify-between rounded-t-2xl bg-primary-500'>
              <div className='flex flex-row gap-2'>
                <div className='flex flex-row items-center gap-x-3'>
                  <LuAlertCircle className='stroke-white' />
                  <h1 className='text-white'>Detail Kounter</h1>
                </div>
              </div>
              <div onClick={() => router.push('/dash')} className='md:cursor-pointer'>
                <LuX className='stroke-white' />
              </div>
            </div>
            <section className='flex flex-row items-center gap-4 p-3'>
              <div className={`${kounterIcon((isKounter?.category)?.toUpperCase())?.[1]} p-3 rounded-xl w-fit`}>
                <h1 className='text-2xl'>{kounterIcon((isKounter?.category)?.toUpperCase())?.[0]}</h1>
              </div>
              <div className='flex flex-col'>
                <h1 className='font-bold -mb-0.5'>{isKounter?.title}</h1>
                <h1 className='font-bold text-xs text-gray-500'>{isKounter?.id}</h1>
                <div className='flex flex-row items-center gap-2 text-xs mt-1'>
                  <div className='flex flex-row items-center gap-1 text-xs'>
                    {isKounter?.visibility == 'PUBLIC' && <LuGlobe className='fill-teal-300' />}
                    {isKounter?.visibility == 'PRIVATE' && <LuLock className='fill-rose-300' />}
                    <h1 className='capitalize'>{(isKounter?.visibility)?.toLowerCase()}</h1>
                  </div>
                  {isKounter?.status == 'ONLINE' && <h1 className='text-xs text-green-500 capitalize'>
                    {(isKounter?.status)?.toLowerCase()}
                  </h1>}
                  {isKounter?.status == 'OFFLINE' && <h1 className='text-xs text-danger-500 capitalize'>
                    {(isKounter?.status)?.toLowerCase()}
                  </h1>}
                </div>
              </div>
            </section>
            <hr className='' />
            <div className='flex flex-row p-3 gap-5 items-center'>
              <div className='flex flex-row items-center gap-3 p-2'>
                <div className='bg-blue-300/30 rounded-full p-2'>
                  <LuEye className='fill-blue-300 text-2xl' />
                </div>
                <div className='flex flex-col -space-y-1'>
                  <h1 className='font-bold text-lg'>{isKounter?.count}</h1>
                  <h1 className='text-xs'>Kounter</h1>
                </div>
              </div>
              <div className='flex flex-row items-center gap-3 p-2'>
                <div className='bg-rose-300/30 rounded-full p-2'>
                  <LuMousePointerClick className='fill-rose-300 text-2xl' />
                </div>
                <div className='flex flex-col -space-y-1'>
                  <h1 className='font-bold text-lg'>{isKounter?.click}</h1>
                  <h1 className='text-xs'>Diklik</h1>
                </div>
              </div>
            </div>
            <div className='flex flex-col p-3 gap-2'>
              <div className='flex flex-row items-center text-sm justify-between bg-default-200 py-0.5 px-1.5 rounded-lg'>
                <h1 className='font-[Quicksand]'>ID :</h1>
                <h1 className='font-bold'>{isKounter?.id}</h1>
              </div>
              <div className='flex flex-row items-center text-sm justify-between bg-default-200 py-0.5 px-1.5 rounded-lg'>
                <h1 className='font-[Quicksand]'>Apikey :</h1>
                <h1 className='font-bold'>{isKounter?.apikey ?? <span className='text-red-500'>Not Found</span>}</h1>
              </div>
              <div className='flex flex-row items-center text-sm justify-between bg-default-200 py-0.5 px-1.5 rounded-lg'>
                <h1 className='font-[Quicksand]'>CreatedAt :</h1>
                <h1 className='font-bold'>{isKounter?.createdAt}</h1>
              </div>
              <div className='mt-5 flex flex-col gap-2'>
                <Switch isSelected={isKounter?.visibility == 'PUBLIC'} size="sm">
                  <div className='flex flex-col'>
                    <h1 className='font-bold'>Kounter Publik</h1>
                    <h1 className='text-xs leading-4'>Kounter bisa di akses oleh siapapun yang memiliki link.</h1>
                  </div>
                </Switch>
                <Switch isSelected={isKounter?.status == 'OFFLINE'} color='danger' size="sm">
                  <div className='flex flex-col'>
                    <h1 className='font-bold'>Disable Kounter</h1>
                    <h1 className='text-xs leading-4'>Ini akan menonaktifkan kounter, yang dapat kounter tidak bisa di akses.</h1>
                  </div>
                </Switch>
              </div>
              <div className='mt-5 flex flex-col gap-2'>
                <Button color='primary'>Simpan Perubahan</Button>
                <Button color='danger'>Hapus Kounter</Button>
                <div className='flex flex-row items-center gap-2'>
                  <Link href={`${url('/hit/')}${isKounter?.id}${isKounter?.visibility == 'PRIVATE' ? '/' + isKounter?.apikey : ''}`} target='_blank' className='w-full'>
                    <Button endContent={<LuExternalLink className='stroke-white' />} color='danger' className='text-white w-full'>HIT Kounter</Button>
                  </Link>
                  <Link href={`${url('/get/')}${isKounter?.id}${isKounter?.visibility == 'PRIVATE' ? '/' + isKounter?.apikey : ''}`} target='_blank' className='w-full'>
                    <Button endContent={<LuExternalLink className='stroke-white' />} color='success' className='text-white w-full'>GET Kounter</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default DetailKounter