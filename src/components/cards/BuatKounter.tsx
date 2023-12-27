import { Autocomplete, AutocompleteItem, Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { LuGlobe, LuLock, LuPlus, LuX } from 'react-icons/lu';
import ReactInterval from 'react-interval';
import { generateUsername } from "unique-username-generator";

let toastSucces = (text: string) => toast.success(text, {
  position: "bottom-right"
});

const BuatKounter = ({ tab, onSubmit, isLoading, isSuccess, categoryList }: any) => {
  const [isPublicCard, setPublicCard] = useState(true)
  const [isConfett, setConfett] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      setConfett(true)
      toastSucces('Kounter berhasil di tambahkan')
    }
  }, [isLoading])

  return (
    <>
      <Toaster />
      <ReactInterval timeout={2000} enabled={isSuccess} callback={() => setConfett(false)} />
      <section className={`${tab == 'add' ? 'opacity-100' : 'opacity-0 hidden'} duration-1000 flex flex-col gap-5 h-fit sticky top-6 z-10 max-w-xs w-full`}>
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
            <form action={'javascript:void(0);'} onSubmit={onSubmit} className='flex flex-col p-5 gap-3'>
              <Input type="text" description={<p className='text-orange-500'>Judul akan di generate otomatis jika kosong.</p>} defaultValue={generateUsername(' ')} className='text-primary-500' variant='underlined' label="Masukan judul (optional)" />
              <Autocomplete
                variant='underlined'
                label="Pilih kategori (optional)"
                className="max-w-xs"
                defaultInputValue='WEBSITE'
              >
                {categoryList.map((list: any) => (
                  <AutocompleteItem key={list} value={list}>
                    {list}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Input type="text" description={<p className='text-orange-500'>Apikey akan di generate otomatis jika kosong.</p>} defaultValue={Math.random().toString(36).substring(2, 35)} className={`${isPublicCard && 'hidden'} duration-500`} variant='underlined' label="Buat apikey" />
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
              <Button isLoading={isLoading} type='submit' className='mt-2' color='primary'>Buat</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default BuatKounter