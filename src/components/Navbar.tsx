import { useRouter } from 'next/router';
import { LuBell } from 'react-icons/lu';

let navbarList = [
  { title: 'Dashboard', path: '/dash' },
  { title: 'Kounter List', path: '/dash/list' },
  { title: 'Kounter Detail', path: '/dash/list/detail' },
  { title: 'My Profile', path: '/dash/profile' },
  { title: 'Premium', path: '/dash/premium' },
  { title: 'Docs', path: '/dash/docs' }
]

const Navbar = (props: any) => {
  const pathname = useRouter().pathname
  
  return (
    <>
      <div className='flex items-center justify-between mb-10'>
        <h1 className='text-xl font-bold'>{props.title || navbarList.find(x => x.path == pathname)?.title}</h1>
        <div className='flex'>
          <div className='p-2'>
            <LuBell className='text-xl' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar