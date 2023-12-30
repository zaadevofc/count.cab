import { DOMAttributes } from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { generateUsername } from 'unique-username-generator';
import Container from '~/components/Container';
import Contents from '~/components/Contents';
import Navbar from '~/components/Navbar';
import BuatKounter from '~/components/cards/BuatKounter';
import DetailKounter from '~/components/cards/DetailKounter';
import Profile from '~/components/cards/Profile';
import { CRUD, dellll, putttt } from '~/hooks/api';

let categoryList = ['WEBSITE', 'WORK', 'ORGANIZATION', 'COUNT', 'ADDITIONAL'] as const
let delText = ['Yakin', 'Ya, sangat yakin', 'Begitu yakin', 'Mungkin saja, Yakin', 'Oke sangat yakin', 'Yakin sekali!']

let tabList = [
  { path: 'default', title: 'Dashboard' },
  { path: 'add', title: 'Buat Kounter' },
  { path: 'detail', title: 'Detail Kounter' },
  { path: 'scew9e8n', title: 'Upgrade' },
]

const ToastSuccess = (text: string) => toast.success(text, {
  style: { border: '1px solid #2563eb', color: '#2563eb', borderRadius: '20px', boxShadow: '0 20px 20px rgb(0 0 0 / 0.3)' },
  iconTheme: { primary: '#2563eb', secondary: '#d6e8fd', },
});

const ToastError = (text: string) => toast.error(text, {
  style: { border: '1px solid #dc2626', color: '#dc2626', borderRadius: '20px' },
  iconTheme: { primary: '#dc2626', secondary: '#d6e8fd', },
});

let isKounterMaks = 30;

export default function Home() {
  const [isKounter, setKounter] = useState<any>(null)

  const { data: session, status }: any = useSession()
  const tab: any = useSearchParams().get('tab')
  const id: any = useSearchParams().get('id')
  const router = useRouter()

  const getKounterMutate: any = useQuery({
    queryKey: ['getKounter', 'GET', session?.token?.email],
    queryFn: CRUD as any,
    refetchOnReconnect: true
  })

  const delKounterMutate = useMutation({
    mutationFn: dellll,
    onSettled: (status, err, prev: any) => {
      getKounterMutate.refetch();
    },
  })

  const addKounterMutate = useMutation({
    mutationFn: CRUD,
    onSettled: async (data, err, prev: any) => {
      await getKounterMutate.refetch();
      await router.push(`/dash?tab=detail&id=${prev?.id}`)
    },
  })

  const putKounterMutate = useMutation({
    mutationFn: putttt,
    onSettled: (data, err, prev: any) => {
      getKounterMutate.refetch();
    },
  })

  const delSubmit = (id: any) => delKounterMutate.mutateAsync(id)
  const putKounter = (config: any) => putKounterMutate.mutateAsync(config)

  const addKounterSubmit = (e: DOMAttributes<HTMLFormElement>) => {
    addKounterMutate.mutateAsync({
      type: 'ADD',
      currentLength: Number(getKounterMutate.data?.list['ALL KOUNTER'].length),
      id: `${Math.random().toString(36).substring(2, 30)}`,
      title: e.target[0].value || generateUsername(' '),
      category: (e.target[1].value).toUpperCase() || 'WEBSITE',
      apikey: e.target[5].value == 'PRIVATE' ? (e.target[4].value || `${Math.random().toString(36).substring(2, 35)}`) : undefined,
      visibility: e.target[5].value
    })
    if (addKounterMutate.isSuccess) {
      e.target.reset()
    }
  }

  let getTab = () => {
    let find = tabList.find(x => x.path == tab)
    if (!find) return 'default'
    return tab;
  }

  useEffect(() => {
    if (tab == 'add' || tab == 'detail')
    document.addEventListener('keyup', (e) => e.key == 'Escape' && router.push('/dash'));
  }, [tab]);

  useEffect(() => {
    let t = getTab()
    switch (t) {
      case 'detail':
        if (!id) router.push(`/dash`);
        if (id && getKounterMutate.data) {
          let data = getKounterMutate.data?.list['ALL KOUNTER'];
          let find = data?.find((x: any) => x.id == id)
          if (!find && data.length != 0) router.push(`/dash?tab=detail&id=${data[0]?.id}`);
          if (!find && data.length == 0) router.push(`/dash`);
          if (find) setKounter(find);
        }
        break;
    }

  }, [tab, id, getKounterMutate.data])

  return (
    <>
      <Toaster reverseOrder={false} />
      <Container className='flex-col min-h-screen w-full'>
        <div className='md:fixed top-0 w-full mx-auto flex md:h-64 bg-gray-200/10 z-10'></div>
        <section className='flex flex-col md:flex-row justify-between w-full'>
          <section className='flex flex-col w-full px-4'>
            <Navbar tab={getTab()} tabList={tabList} />
            <Contents
              listKounter={getKounterMutate}
              categoryList={categoryList}
              isLoading={getKounterMutate.isPending}
            />
          </section>
          <Profile
            className="max-[1010px]:hidden"
            delText={delText}
            tab={getTab()}
            isKounterMaks={isKounterMaks}
            allKounter={getKounterMutate.data?.list?.['ALL KOUNTER']}
          />
          <BuatKounter
            className="max-[1010px]:hidden"
            tab={getTab()}
            allKounter={getKounterMutate.data?.list?.['ALL KOUNTER']}
            isKounterMaks={isKounterMaks}
            ToastError={ToastError}
            ToastSuccess={ToastSuccess}
            categoryList={categoryList}
            onSubmit={addKounterSubmit}
            isLoading={addKounterMutate.isPending}
            isSuccess={addKounterMutate.isSuccess}
            isError={addKounterMutate.isError}
          />
          <DetailKounter
            className="max-[1010px]:hidden"
            tab={getTab()}
            ToastError={ToastError}
            ToastSuccess={ToastSuccess}
            allKounter={getKounterMutate.data?.list['ALL KOUNTER']}
            putKounter={putKounter}
            delKounter={delSubmit}
            isKounter={isKounter}
            isDelError={delKounterMutate.isError}
            isDelSuccess={delKounterMutate.isSuccess}
            isPutError={putKounterMutate.isError}
            isPutSuccess={putKounterMutate.isSuccess}
            isPutLoading={putKounterMutate.isPending} />
        </section>
      </Container>
    </>
  )
}
