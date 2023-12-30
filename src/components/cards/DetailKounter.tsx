import { Button, Skeleton, Switch, Tooltip } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { LuAlertCircle, LuExternalLink, LuEye, LuGlobe, LuLoader, LuLock, LuMousePointerClick, LuPenSquare, LuTrash2, LuX } from 'react-icons/lu'
import { url } from '~/consts'

let kounterIcon = (ctg: string) => {
  if (ctg == 'WEBSITE') return ['🌐', 'bg-blue-100']
  if (ctg == 'WORK') return ['💪', 'bg-yellow-100']
  if (ctg == 'ORGANIZATION') return ['🏢', 'bg-gray-100']
  if (ctg == 'COUNT') return ['📌', 'bg-emerald-100']
  if (ctg == 'ADDITIONAL') return ['🚀', 'bg-rose-100']
}

const DetailKounter = ({ className, tab, isKounter, delKounter, putKounter, isPutLoading, ToastSuccess, ToastError, isPutError, isPutSuccess, isDelError, isDelSuccess }: any) => {
  const [isChange, setChange] = useState(false)
  const [whatChange, setWhatChange] = useState<Object | null>({})

  const [isVisibility, setVisibility] = useState<any>()
  const [isStatus, setStatus] = useState<any>()
  const [isEditKey, setEditKey] = useState<boolean>(false)
  const [isDel, setDel] = useState<boolean>(false)
  const [isNewKey, setNewKey] = useState<any>(null)

  const { status } = useSession()
  const router = useRouter();

  useEffect(() => {
    setVisibility(isKounter?.visibility == 'PUBLIC' ? true : false)
    setStatus(isKounter?.status == 'OFFLINE' ? true : false)
    setEditKey(false)
    setNewKey('')
    setDel(false)
  }, [isKounter])

  useEffect(() => {
    if (
      isVisibility != (isKounter?.visibility == 'PUBLIC' ? true : false)
      || isStatus != (isKounter?.status == 'OFFLINE' ? true : false)
      || (isNewKey && isNewKey != isKounter?.apikey)
    ) { setChange(true) } else setChange(false)
    if (isNewKey && isNewKey?.trim().length <= 5) setChange(false);
    setWhatChange({
      id: isKounter?.id,
      visibility: isVisibility ? 'PUBLIC' : 'PRIVATE',
      status: isStatus ? 'OFFLINE' : 'ONLINE',
      apikey: isNewKey ? isNewKey.trim().replace(/\s/g, '') : isKounter?.apikey
    })
  }, [isVisibility, isStatus, isNewKey])

  useEffect(() => {
    if (isPutSuccess) ToastSuccess('Kounter berhasil di update.');
    if (isPutError) ToastError('Kounter gagal di update.');
  }, [isPutSuccess, isPutError])

  useEffect(() => {
    if (isDelSuccess) ToastSuccess('Kounter berhasil di hapus.');
    if (isDelError) ToastError('Kounter gagal di hapus.');
  }, [isDelError, isDelSuccess])

  return (
    <>
      <section className={`${className} ${tab == 'detail' ? 'opacity-100' : 'opacity-0 hidden'} duration-1000 flex flex-col gap-5 h-fit md:sticky top-6 z-10 max-w-xs w-full`}>
        <Skeleton isLoaded={status != 'loading' && isKounter} className='rounded-2xl border border-gray-300'>
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
              <section className='flex flex-row gap-4 p-3'>
                <div className={`${kounterIcon((isKounter?.category)?.toUpperCase())?.[1]} p-3 rounded-xl w-fit h-fit`}>
                  <h1 className='text-2xl'>{kounterIcon((isKounter?.category)?.toUpperCase())?.[0]}</h1>
                </div>
                <div className='flex flex-col w-full relative'>
                  <div className='flex flex-col gap-1'>
                    <div className='flex flex-row justify-between w-full'>
                      <h1 className='font-bold leading-tight'>{isKounter?.title}</h1>
                    </div>
                    <h1 className='font-bold text-xs text-gray-500'>{isKounter?.id}</h1>
                  </div>
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
                  <Tooltip showArrow={true} placement='bottom-end' size='sm' color='danger' content="Hapus kounter?">
                    <Button isLoading={isDel} onPress={() => { delKounter(isKounter?.id); setDel(true) }} key={`del-${isKounter?.id}`} size='sm' isIconOnly className='bg-transparent absolute right-0 bottom-0'>
                      <LuTrash2 className='stroke-red-500 text-medium' />
                    </Button>
                  </Tooltip>
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
                <div className={`${isEditKey ? 'shadow-lg shadow-slate-500/50 border border-slate-500' : ''} duration-500 flex flex-row items-center text-sm justify-between bg-default-200 py-0.5 px-1.5 rounded-lg`}>
                  <h1 className='font-[Quicksand]'>{isEditKey ? 'New Apikey :' : 'Apikey :'}</h1>
                  <div className='flex flex-row items-center gap-2'>
                    <input autoFocus {...!isEditKey && { value: '' }} maxLength={20} onKeyUp={(e: any) => setNewKey(e.target.value)} type="text" name="" id="" className={`${!isEditKey && 'hidden'} max-w-40 bg-transparent outline-none`} />
                    <h1 className={`${isEditKey && 'hidden'} font-bold`}>{isKounter?.apikey ?? <span className='text-red-500'>Not Found</span>}</h1>
                    <span className='h-4 w-[.5px] bg-slate-400'></span>
                    <Tooltip isDisabled={isPutLoading} showArrow={true} placement='top-end' size='sm' color={isEditKey ? 'danger' : 'primary'} content={isEditKey ? 'Batalkan' : 'Edit apikey'}>
                      <div onClick={() => setEditKey((x) => {
                        if (isEditKey && !isPutLoading) {
                          setNewKey('')
                          return false;
                        } else {
                          return true;
                        }
                      })}>
                        {(!isEditKey && !isPutLoading) && <LuPenSquare className='stroke-blue-600 md:cursor-pointer' />}
                        {(isEditKey && !isPutLoading) && <LuX className='stroke-red-600 md:cursor-pointer' />}
                        {isPutLoading && <LuLoader className='animate-spin' />}
                      </div>
                    </Tooltip>
                  </div>
                </div>
                <div className='flex flex-row items-center text-sm justify-between bg-default-200 py-0.5 px-1.5 rounded-lg'>
                  <h1 className='font-[Quicksand]'>CreatedAt :</h1>
                  <h1 className='font-bold'>{isKounter?.createdAt}</h1>
                </div>
                <div className='mt-5 flex flex-col gap-2'>
                  <Switch onValueChange={(x) => setVisibility((y: any) => {
                    if (isKounter?.visibility == 'PUBLIC' && !isKounter?.apikey && !isNewKey) {
                      setEditKey(true)
                      return true
                    }
                    if (isKounter?.apikey) {
                      return !y
                    }
                  })} isSelected={isVisibility || (!isKounter?.apikey && !isNewKey)} size="sm">
                    <div className={`duration-500 flex flex-col`}>
                      <h1 className='font-bold'>Kounter Publik</h1>
                      <h1 className='text-xs leading-4'>Kounter bisa di akses oleh siapapun yang memiliki link.</h1>
                    </div>
                  </Switch>
                  <Switch onValueChange={(x) => setStatus((y: any) => !y)} isSelected={isStatus} color='danger' size="sm">
                    <div className='flex flex-col'>
                      <h1 className='font-bold'>Disable Kounter</h1>
                      <h1 className='text-xs leading-4'>Ini akan menonaktifkan kounter, yang dapat kounter tidak bisa di akses.</h1>
                    </div>
                  </Switch>
                </div>
                <div className='mt-5 flex flex-col gap-2'>
                  <Button isLoading={isPutLoading} onPress={() => { putKounter(whatChange); setChange(false) }} isDisabled={!isChange} color='primary'>Simpan Perubahan</Button>
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
        </Skeleton>
      </section>
    </>
  )
}

export default DetailKounter