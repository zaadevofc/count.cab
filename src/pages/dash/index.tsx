import { DOMAttributes } from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { generateUsername } from 'unique-username-generator';
import Container from '~/components/Container';
import Contents from '~/components/Contents';
import Navbar from '~/components/Navbar';
import BuatKounter from '~/components/cards/BuatKounter';
import DetailKounter from '~/components/cards/DetailKounter';
import Profile from '~/components/cards/Profile';
import { CRUD } from '~/hooks/api';

let categoryList = ['WEBSITE', 'WORK', 'ORGANIZATION', 'COUNT', 'ADDITIONAL'] as const
let delText = ['Yakin', 'Ya, sangat yakin', 'Begitu yakin', 'Mungkin saja, Yakin', 'Oke sangat yakin', 'Yakin sekali!']

export default function Home() {
  const [isKounter, setKounter] = useState<any>(null)
  const { data: session, status }: any = useSession()
  const tab: any = useSearchParams().get('tab')
  const id: any = useSearchParams().get('id')

  const addKounterMutate = useMutation({
    mutationFn: CRUD,
    onSuccess: () => {
      getKounterMutate.refetch()
    }
  })

  const getKounterMutate: any = useQuery({
    queryKey: ['getKounter', 'GET', session?.token?.email],
    queryFn: CRUD as any,
    refetchOnReconnect: true
  })

  const addKounterSubmit = (e: DOMAttributes<HTMLFormElement>) => {
    addKounterMutate.mutateAsync({
      type: 'ADD',
      title: e.target[0].value || generateUsername(' '),
      category: (e.target[1].value).toUpperCase() || 'WEBSITE',
      apikey: e.target[5].value == 'PRIVATE' ? (e.target[4].value || `${Math.random().toString(36).substring(2, 35)}`) : undefined,
      visibility: e.target[5].value
    })
    if (addKounterMutate.isSuccess) {
      e.target.reset()
    }
  }

  useEffect(() => {
    let data = getKounterMutate.data?.list['ALL CONTENTS'];
    let find = data?.find((x: any) => x.id == id)
    if (!find) return;
    setKounter(find)
  }, [getKounterMutate.data])

  useEffect(() => {
    switch (tab) {
      case 'detail':
        if (id.length == 0) return;
        let data = getKounterMutate.data?.list['ALL CONTENTS'];
        let find = data?.find((x: any) => x.id == id)
        if (!find) return;
        setKounter(find)
        break;
    }
  }, [tab, id])

  return (
    <>
      <Container className='flex-col min-h-screen'>
        <div className='fixed top-0 w-full mx-auto flex h-64 bg-[#D6E8FD] z-10'></div>
        <section className='flex flex-row justify-between'>
          <section className='flex flex-col w-full px-4 pr-10'>
            <Navbar />
            <Contents listKounter={getKounterMutate} categoryList={categoryList} />
          </section>
          <Profile tab={tab || 'default'} />
          <BuatKounter tab={tab || 'default'} isSuccess={addKounterMutate.isSuccess} categoryList={categoryList} onSubmit={addKounterSubmit} isLoading={addKounterMutate.isPending} />
          <DetailKounter tab={tab || 'default'} isKounter={isKounter} />
        </section>
      </Container>

      {/* <Modal
        backdrop="blur"
        isOpen={isMDelOpen}
        onOpenChange={onMDelOpenChange}
        classNames={{ backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20" }}
        className='border border-red-500 bg-rose-100'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Yakin ingin menghapus Kounter ini?</ModalHeader>
              <ModalBody>
                <h1>
                  Tindakan ini dapat menghapus seluruh data pada Kounter secara
                  <span className='font-bold'> Permanen</span> dan data tidak dapat
                  dikembalikan lagi?
                </h1>
                <Slider
                  size="md"
                  step={1}
                  color="danger"
                  label="Geser >"
                  showSteps={true}
                  maxValue={5}
                  minValue={0}
                  getValue={(val) => `${delText[val as number]}`}
                  defaultValue={0}
                  className="max-w-md mt-5"
                />
              </ModalBody>
              <ModalFooter>
                <Button startContent={<LuTrash2 className='stroke-white' />} className='mt-3' color="danger">
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </>
  )
}
