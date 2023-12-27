import { Badge } from '@nextui-org/react'
import { LuBell, LuSearch } from 'react-icons/lu'

const Navbar = () => {
  return (
    <>
      <div className='flex flex-row justify-between items-center w-full sticky top-6 z-10'>
        <div className='flex flex-row items-center gap-1'>
          <h1 className='text-2xl'>🔥</h1>
          <h1 className='text-xl'>Kounter</h1>
        </div>
        <div className='flex flex-row items-center gap-10 mt-3'>
          <div className='flex flex-row items-center gap-8 tracking-wide'>
            <h1>Home</h1>
            <h1>Statistik</h1>
            <h1>My Link</h1>
            <h1>APi</h1>
            <h1>Pricing</h1>
          </div>
          <div className='flex flex-row items-center gap-3'>
            <div className='bg-white rounded-full p-2 border border-primary-200/80'>
              <LuSearch />
            </div>
            <Badge content="5" color="success" size='md' className='top-1 right-1 text-[10px]'>
              <div className='bg-white rounded-full p-2 border border-primary-200/80'>
                <LuBell />
              </div>
            </Badge>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar