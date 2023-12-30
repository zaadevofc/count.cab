import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Skeleton, Tab, Tabs } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { LuBell, LuSearch } from 'react-icons/lu'


const Navbar = ({ tab, tabList }: any) => {
  const { data: session, status }: any = useSession()
  let notifs = [
    { title: `Hallo, ${session?.token?.name}`, desc: 'Selamat datang di Kounter. Catat jumlah data dengan mudah dengan Kounter!', icon: '👋', href: '#' },
    { title: 'Pengumuman', desc: 'Untuk sementara batas maksimal Kounter setiap user adalah 30. Guna memperkecil ukuran database.', icon: '⚠️', href: '#' },
  ]

  return (
    <>
      <div className='flex flex-row justify-between items-center w-full md:sticky top-6 z-10 lg:pr-5'>
        <div className='flex flex-row items-center gap-1'>
          <img className='w-9 invert' src="/logo.png" alt="" />
          <h1 className='text-2xl font-bold text-blue-600'>Kounter</h1>
        </div>
        <div className='flex flex-row items-center gap-5 xl:gap-10 mt-3'>
          <Tabs selectedKey={tab} key={'/@/' + tab} color={'primary'} variant='light' radius="full" className='hidden xl:block '>
            {tabList.map((x: any) => (
              <Tab key={x.path} title={x.title} className='!bg-transparent' />
            ))}
          </Tabs>
          <div className='flex flex-row items-center gap-3'>
            <Skeleton isLoaded={status != 'loading'} className='rounded-full'>
              <div className='bg-white rounded-full p-2 border border-primary-200/80'>
                <LuSearch />
              </div>
            </Skeleton>
            <Dropdown isDisabled={status == 'loading'} showArrow={true} placement='bottom-end' className='border border-primary-200/80 rounded-2xl'>
              <Badge isInvisible={status == 'loading'} content="2" color="success" size='md' className='top-1 right-1 text-[10px] text-white'>
                <Skeleton isLoaded={status != 'loading'} className='rounded-full'>
                  <DropdownTrigger>
                    <div className='bg-white rounded-full p-2 border border-primary-200/80 md:cursor-pointer'>
                      <LuBell />
                    </div>
                  </DropdownTrigger>
                </Skeleton>
              </Badge>
              <DropdownMenu variant="faded">
                {notifs.map(x => (
                  <DropdownItem
                    className='border-b border-b-blue-200/80'
                    key="new"
                    description={<h1 className='max-w-[250px]'>{x.desc}</h1>}
                    startContent={<span className='text-2xl'>{x.icon}</span>}
                  >
                    <h1 className='font-bold'>{x.title}</h1>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar