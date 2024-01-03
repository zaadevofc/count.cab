import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LuBarChart2, LuChevronsUpDown, LuCode2, LuCrown, LuGithub, LuListTree, LuLoader, LuUserCircle } from 'react-icons/lu';
import { Typewriter } from 'react-simple-typewriter';

let navbarList = [
  { icon: LuBarChart2, title: 'Dashboard', path: '/dash' },
  { icon: LuListTree, title: 'Kounter List', path: '/dash/list' },
  { icon: LuUserCircle, title: 'My Profile', path: '/dash/profile' },
  { icon: LuCrown, title: 'Premium', path: '/dash/premium' },
  { icon: LuCode2, title: 'Docs', path: '/dash/docs', end: true },
  { icon: LuGithub, title: 'Open Source', path: 'https://github.com/zaadevofc/kounter.vercel.app', blank: true },
  { icon: LuGithub, title: 'Author', path: 'https://github.com/zaadevofc', blank: true },
]

const Sidebar = () => {
  const { data: session, status }: any = useSession()
  const pathname = useRouter().pathname

  return (
    <>
      <nav className='lg:hidden z-10 w-full bg-black fixed bottom-0 px-4 py-3 flex items-center justify-around'>
        {navbarList.slice(0, -2).map(x => (
          <Link href={x.path}>
            <x.icon className='stroke-white text-xl' />
          </Link>
        ))}
      </nav>
      <nav className={`hidden lg:flex sticky top-0 flex-col h-full max-h-screen p-3 text-sm w-72 lg:w-56`}>
        <div className='flex items-center gap-1'>
          <img className='w-8 invert' src="/logo.png" alt="Kounter APi Logo" />
          <h1 className='text-xl font-bold text-black'>Kounter</h1>
        </div>
        <div className='flex items-center md:cursor-pointer justify-between mt-3 bg-white border border-slate-300 rounded-lg px-2 py-1 drop-shadow-sm'>
          <div className='flex items-center gap-3'>
            {status == 'loading' && (
              <>
                <LuLoader className='animate-spin text-[24px] opacity-40' />
                <h1 className=' line-clamp-1 animate-pulse'>Loading ...</h1>
              </>
            )}
            {status != 'loading' && (
              <>
                <Image className='w-6 rounded-full' src={session?.token?.picture} alt={session?.token?.name} width={100} height={100} />
                <h1 className=' line-clamp-1 font-medium'>
                  <Typewriter words={[session?.token?.name]} loop={false} delaySpeed={5000} />
                </h1>
              </>
            )}
          </div>
          <LuChevronsUpDown />
        </div>
        <div className='flex flex-col mt-10 gap-6'>
          {navbarList.map((x, i) => (
            <>
              <Link href={x.path} target={x.blank ? '_blank' : ''} className={`flex items-center whitespace-nowrap gap-2 relative md:cursor-pointer`}>
                {pathname == x.path && <span className='-z-10 absolute top-0 bg-black p-4 my-auto inset-y-0 rounded-lg w-full h-full'></span>}
                {pathname != x.path && <span className='absolute top-0 hover:bg-slate-300/20 p-4 py-4 my-auto inset-y-0 rounded-lg w-full h-full'></span>}
                <x.icon className={`text-xl ml-3 stroke-black ${pathname == x.path && 'stroke-white'}`} />
                <h1 className={`${pathname == x.path && '!text-white'} text-black font-medium`}>{x.title}</h1>
              </Link>
              {x.end && <span className='h-[.5px] bg-slate-300 w-full'></span>}
            </>
          ))}
        </div>
      </nav>
    </>
  )
}

export default Sidebar