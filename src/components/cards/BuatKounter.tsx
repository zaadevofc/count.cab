import { Autocomplete, AutocompleteItem, Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LuGlobe, LuLock, LuPlus, LuX } from 'react-icons/lu';
import ReactInterval from 'react-interval';
import { generateUsername } from 'unique-username-generator';

let Gu = () => generateUsername(' ')
let Mr = () => Math.random().toString(36).substring(2, 35)

const BuatKounter = ({ className, tab, onSubmit, isLoading, isSuccess, isError, categoryList, allKounter, isKounterMaks, ToastError, ToastSuccess }: any) => {
  const [isPublicCard, setPublicCard] = useState(true)
  const [isCanMake, setCanMake] = useState(4)
  const [isStartInt, setStartInt] = useState(false)
  const [isSubmit, setSubmit] = useState(false)

  const [isName, setName] = useState(Gu())
  const [isKey, setKey] = useState(Mr())

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      setStartInt(true)
      ToastSuccess('Berhasil menambahkan Kounter.');
    } 
    if (isError) {
      ToastError('Gagal menambahkan Kounter.');
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (isCanMake == 0) {
      setStartInt(false)
      setCanMake(4)
      setSubmit(false)
      setName(Gu())
      setKey(Mr())
    }
  }, [isCanMake])

  return (
    <>
      <ReactInterval timeout={1000} enabled={isStartInt} callback={() => setCanMake(x => x - 1)} />
      <section className={`${className} ${tab == 'add' ? 'opacity-100' : 'opacity-0 hidden'} duration-1000 flex flex-col gap-5 h-fit md:sticky top-6 z-10 max-w-xs w-full`}>
        <div className='flex flex-col'>
          <div className={`flex flex-col bg-white rounded-2xl shadow-sm border border-primary-200/80`}>
            <div className='flex flex-row p-5 items-center justify-between rounded-t-2xl bg-primary-500'>
              <div className='flex flex-row gap-2'>
                <div className='flex flex-row items-center gap-x-3'>
                  <LuPlus className='stroke-white' />
                  <h1 className='text-white'>Buat Kounter</h1>
                </div>
              </div>
              <div onClick={() => router.push('/dash')} className='md:cursor-pointer'>
                <LuX className='stroke-white' />
              </div>
            </div>
            <form inlist={{ ['ss']: 'hahahhah' }} action={'javascript:void(0);'} onSubmit={onSubmit} className='flex flex-col p-5 gap-3'>
              <Input
                type="text"
                description={<p className='text-orange-500'>Judul akan di generate otomatis jika kosong.</p>}
                className='text-primary-500'
                value={isName}
                onChange={(e) => setName(e.target.value)}
                variant='underlined'
                label="Masukan Judul (optional)" />
              <Autocomplete
                variant='underlined'
                label="Pilih Kategori (optional)"
                className="max-w-xs"
                defaultInputValue='WEBSITE'
              >
                {categoryList.map((list: any) => (
                  <AutocompleteItem key={list} value={list}>
                    {list}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Input
                type="text"
                description={<p className='text-orange-500'>Apikey akan di generate otomatis jika kosong.</p>}
                className={`${isPublicCard && 'hidden'} duration-500`}
                value={isKey}
                onChange={(e) => setKey(e.target.value)}
                variant='underlined'
                label="Buat Apikey"
              />
              <input type="text" className='hidden' defaultValue={isPublicCard ? 'PUBLIC' : 'PRIVATE'} />
              <div className='flex flex-col gap-3'>
                <div onClick={() => setPublicCard(true)} className={`${isPublicCard ? 'bg-teal-300/20 border-2 border-teal-300 opacity-100' : 'bg-teal-300/20 border-2 border-teal-300 opacity-50'} md:cursor-pointer active:scale-[.98] select-none duration-150 flex flex-row items-center gap-3 rounded-2xl px-3 p-2`}>
                  <div>
                    <LuGlobe className='text-2xl' />
                  </div>
                  <div className='flex flex-col'>
                    <h1 className='text-sm font-bold'>Kounter Publik</h1>
                    <p className='text-xs'>Kounter bisa di akses oleh siapapun yang memiliki link.</p>
                  </div>
                </div>
                <div onClick={() => setPublicCard(false)} className={`${!isPublicCard ? 'bg-rose-300/20 border-2 border-rose-300 opacity-100' : 'bg-rose-300/20 border-2 border-rose-300 opacity-50'} md:cursor-pointer active:scale-[.98] select-none duration-150 flex flex-row items-center gap-3 rounded-2xl px-3 p-2`}>
                  <div>
                    <LuLock className='text-2xl' />
                  </div>
                  <div className='flex flex-col'>
                    <h1 className='text-sm font-bold'>Kounter Private</h1>
                    <p className='text-xs'>Link hanya bisa di akses menggunakan apikey.</p>
                  </div>
                </div>
              </div>
              {(allKounter && (isKounterMaks == Number(allKounter?.length))) ? (
                <Button isDisabled={true} className={`mt-2`} color='danger'>Batas Kounter Maks. 30</Button>
              ) : (
                <>
                  <Button isLoading={isLoading} onPress={() => setSubmit(true)} type='submit' className={`${isSubmit && 'hidden'} mt-2`} color='primary'>Buat</Button>
                  <Button isLoading={true} className={`${isCanMake != 4 && 'hidden'} ${!isSubmit && 'hidden'} mt-2`} color='primary'>Buat</Button>
                  <Button isDisabled={true} className={`${isCanMake == 4 && 'hidden'} mt-2`} color='primary'>Buat setelah {isCanMake}d</Button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default BuatKounter