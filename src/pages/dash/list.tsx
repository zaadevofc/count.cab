import { Accordion, AccordionItem, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalHeader, Skeleton, useDisclosure } from "@nextui-org/react"
import moment from "moment"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import queryString from 'query-string'
import { useEffect, useMemo, useState } from "react"
import { LuCheck, LuCornerDownRight, LuExternalLink, LuEye, LuGlobe, LuListFilter, LuLoader2, LuLock, LuMousePointerClick, LuPenSquare, LuPlus, LuSearch } from "react-icons/lu"
import { generateUsername } from 'unique-username-generator'
import Layout from "~/components/Layout"
import { randomID, tempArray } from "~/consts"
import { useKounterAdd, useKounterDel, useKounterList, useKounterPut } from "~/hooks/use"

let filterList = ['website', 'work', 'organization', 'count', 'additional']

const List = () => {
  const { isOpen: isDetailOpen, onOpen: setDetailOpen, onOpenChange: setDetailChange } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: setAddOpen, onOpenChange: setAddChange } = useDisclosure();

  const [dataDetail, setDataDetail] = useState<any>(null)
  const [dataDetailId, setDataDetailId] = useState<any>('')
  const [isFilter, setFilter] = useState<any>(new Set());
  const [isSearch, setSearch] = useState<string>(' ');
  const [isEditLoading, setEditLoading] = useState(false)
  const [isAddLoading, setAddLoading] = useState(false)
  const [isDelLoading, setDelLoading] = useState(false)
  const [isDataEdit, setDataEdit] = useState({ key: '', value: '', data: {} })

  const [isVisibilitySet, setVisbilitySet] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC')
  const [isNameSet, setNameSet] = useState<string>(generateUsername(' '))
  const [isCategorySet, setCategorySet] = useState<string>('WEBSITE')
  const [isApikeySet, setApikeySet] = useState<string>(randomID())

  const filter = useMemo(() => Array.from(isFilter).join(" ").split(' '), [isFilter]);
  let router = useRouter()
  let { data: session, status }: any = useSession()
  const { isPending, data, refetch } = useKounterList(session?.token?.email)
  const [isList, setList] = useState(data)

  useEffect(() => {
    if (!filter[0]) {
      let search = data?.all?.filter((x: any) => Object.values(x).join(' ').toLowerCase().match(isSearch.trim().toLowerCase()))
      setList({ all: search } as any)
    }
    if (filter[0]) {
      let parse = data?.all?.filter((x: any) => filter.includes(x.category.toLowerCase()))
      let search = parse?.filter((x: any) => Object.values(x).join(' ').toLowerCase().match(isSearch.trim().toLowerCase()))
      setList({ all: search } as any)
    }
    let setQuery = (query?: any) => queryString.stringifyUrl({ url: router.asPath, query })
    if (isSearch || filter) {
      router.push(setQuery({ q: isSearch.trim(), filter: filter.join(',') }))
    }
  }, [data, filter, isSearch])

  useEffect(() => {
    let parse = queryString.parseUrl(router.asPath)
    if (parse.query.q) setSearch(parse.query.q as string)
    if (parse.query.filter) setFilter(new Set((parse.query.filter as string)?.split(',')))
  }, [])

  useEffect(() => {
    if (dataDetailId) {
      let find = data?.all?.find((x: any) => x.id == dataDetailId)
      setDataDetail(find)
    } else setDataDetail(null)
  }, [isDetailOpen, data])

  let listDetail = [
    { title: 'Name', key: 'title', value: dataDetail?.title, edit: true, input: true, maxLength: 30 },
    { title: 'ID', value: dataDetail?.id },
    { title: 'Visibility', key: 'visibility', value: dataDetail?.visibility, edit: true, input: false, opts: ['PUBLIC', 'PRIVATE'] },
    { title: 'Status', key: 'status', value: dataDetail?.status, edit: true, input: false, opts: ['ONLINE', 'OFFLINE'] },
    { title: 'Category', key: 'category', value: dataDetail?.category, edit: true, input: false, opts: filterList.map(x => x.toUpperCase()) },
    { title: 'Apikey', key: 'apikey', value: dataDetail?.apikey || 'Not Found', edit: true, input: true, maxLength: 20 },
    { title: 'CreatedAt', value: moment(Number(dataDetail?.createdAt)).format('DD, MMM YYYY hh:mm A') },
  ]

  const { mutateAsync, isPending: isPutLoading } = useKounterPut();
  const setSaveEdit = async ({ key }: { key: string }) => {
    setEditLoading(true)
    if (key == isDataEdit.key && dataDetailId) {
      await mutateAsync({ id: dataDetailId, ...isDataEdit.data })
      if (!isPutLoading) await refetch()
    }
  }

  useEffect(() => {
    setEditLoading(false)
    setAddLoading(false)
    setDelLoading(false)
    setNameSet(generateUsername(' '))
    setApikeySet(randomID())
  }, [data])

  const { mutateAsync: addMutateAsync, isPending: isAddPending, isSuccess: isAddSuccess } = useKounterAdd()

  const saveKounter = async () => {
    setAddLoading(true)
    await addMutateAsync({
      limit: data?.limit,
      id: randomID(),
      title: isNameSet.trim() || generateUsername(' '),
      category: isCategorySet || 'WEBSITE',
      apikey: isVisibilitySet == 'PRIVATE' ? (isApikeySet.replace(/\s/g, '') || randomID()) : '',
      visibility: isVisibilitySet,
      createdAt: Date.now().toString()
    })
    if (!isAddPending) {
      await refetch()
      await setAddChange()
    }
  }

  const { mutateAsync: delMutateAsync, isPending: isDelPending, isSuccess: isDelSuccess } = useKounterDel()

  const delKounter = async () => {
    setDelLoading(true)
    await delMutateAsync({ id: dataDetailId })
    if (!isDelPending) {
      await refetch()
      await setDetailChange()
    }
  }

  return (
    <>
      <Layout title={`Kounter List ${data ? `(${data?.all?.length}/30)` : ''}`}>
        <div className="flex flex-col mb-4 w-full sticky top-0 py-3 bg-white z-50">
          <div className="flex max-[715px]:flex-wrap justify-between gap-3">
            <div className="flex items-center gap-2 w-full border border-black px-2 py-0.5 md:cursor-pointer rounded-lg">
              <LuSearch className='text-lg opacity-70' />
              <input disabled={!data} onChange={(e: any) => setSearch(e.target.value.trim() || ' ')} defaultValue={isSearch} type="text" placeholder="Cari kounter..." className={`w-full outline-none font-medium`} />
            </div>
            <Dropdown radius="sm" isDisabled={!!data}>
              <DropdownTrigger>
                <div className="flex gap-2 w-fit items-center border border-black px-2 py-1 md:cursor-pointer active:scale-[.97] rounded-lg">
                  <LuListFilter />
                  <h1 className="font-medium whitespace-nowrap">Filter</h1>
                </div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Filter category"
                variant="flat"
                closeOnSelect={false}
                selectionMode="multiple"
                selectedKeys={isFilter}
                onSelectionChange={setFilter}
              >
                {!!data ? filterList.map(x => <DropdownItem key={x} className="capitalize">{x}</DropdownItem>) : <DropdownItem isReadOnly>Loading...</DropdownItem>}
              </DropdownMenu>
            </Dropdown>
            <div onClick={() => data?.canMake && setAddOpen()} className={`${!data?.canMake ? 'opacity-50 cursor-not-allowed' : 'md:cursor-pointer active:scale-[.97]'} flex gap-2 w-fit items-center bg-black px-2 py-1 rounded-lg`}>
              <LuPlus className='stroke-white' />
              <h1 className="font-medium text-white whitespace-nowrap">Tambah Kounter</h1>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            {filter.map((x: any) => (
              <h1 onClick={() => setFilter(new Set(filter.filter(y => y != x)))} className="bg-black text-white px-2 w-fit mt-2 lowercase font-medium rounded-lg text-xs">
                {x}
              </h1>
            ))}
          </div>
        </div>
        <div className="grid max-[715px]:grid-cols-1 max-[876px]:grid-cols-2 grid-cols-3 lg:grid-cols-4 gap-5">
          {(isPending && !data) && tempArray(11).map(x => (
            <Skeleton className="rounded-lg">
              <div className="w-40 h-32"></div>
            </Skeleton>
          ))}
          {(!isPending && !!data) && isList?.all?.map((x: any, i: any) => (
            <div onClick={() => { setDetailOpen(); setDataDetailId(x.id) }} key={x.id} className="shadow-none h-fit md:cursor-pointer border border-black rounded-lg p-3 hover:shadow-lg duration-150">
              <div className="flex flex-col -space-y-0.5">
                <h1 className="line-clamp-1 font-bold">{x.title}</h1>
                <h1 className="text-sm">{x.id}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="bg-black text-white px-1 w-fit mt-2 lowercase font-medium rounded-lg text-xs">{x.category}</h1>
                {x.status == 'ONLINE' && <h1 className="bg-green-500 text-white px-1 w-fit mt-2 lowercase font-medium rounded-lg text-xs">{x.status}</h1>}
                {x.status == 'OFFLINE' && <h1 className="bg-red-500 text-white px-1 w-fit mt-2 lowercase font-medium rounded-lg text-xs">{x.status}</h1>}
              </div>
              <div className='flex flex-row items-center gap-3 mt-4'>
                <div className='flex flex-row items-center gap-1'>
                  <LuEye className='fill-white' />
                  <h1 className='text-xs font-medium'>{x.count}</h1>
                </div>
                <div className='flex flex-row items-center gap-1'>
                  <LuMousePointerClick className='fill-white' />
                  <h1 className='text-xs font-medium'>{x.click}</h1>
                </div>
                <div className='flex flex-row items-center gap-1 text-xs'>
                  {x.visibility == 'PUBLIC' && <LuGlobe className='fill-white' />}
                  {x.visibility == 'PRIVATE' && <LuLock className='fill-white' />}
                  <h1 className='capitalize text-sm font-medium'>{(x.visibility)?.toLowerCase()}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Layout>

      <Modal isOpen={isDetailOpen} onOpenChange={setDetailChange} radius="sm" hideCloseButton className="border border-black">
        <ModalContent>
          {(onClose) => (
            <>
              <Skeleton isLoaded={dataDetail}>
                <ModalHeader>Kounter Detail</ModalHeader>
                <ModalBody className="mb-4">
                  <div className="grid grid-cols-2 items-center gap-3 justify-between">
                    <div className='flex justify-between items-center h-fit gap-6 px-3 py-1 w-full rounded-lg border border-black'>
                      <div className='flex flex-col'>
                        <h1 className='text-lg font-bold'>{dataDetail?.count}</h1>
                        <h1 className=' text-[13px]'>Kounter</h1>
                      </div>
                      <div className='bg-black p-2 rounded-lg'>
                        <LuEye className='text-lg stroke-white' />
                      </div>
                    </div>
                    <div className='flex justify-between items-center h-fit gap-6 px-3 py-1 w-full rounded-lg border border-black'>
                      <div className='flex flex-col'>
                        <h1 className='text-lg font-bold'>{dataDetail?.click}</h1>
                        <h1 className=' text-[13px]'>Klik</h1>
                      </div>
                      <div className='bg-black p-2 rounded-lg'>
                        <LuMousePointerClick className='text-lg stroke-white' />
                      </div>
                    </div>
                  </div>
                  <Accordion hideIndicator showDivider={false} itemClasses={{ trigger: "py-0", content: 'min-h-0 py-0' }} className="mt-3">
                    {listDetail.map(x => (
                      <AccordionItem key={x.title} aria-label={x.title} onPress={() => setDataEdit({ key: '', value: '', data: {} })}
                        title={
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <h1>{x.title}</h1>
                              {x.edit && <LuPenSquare className='text-xs md:cursor-pointer' />}
                            </div>
                            <h1 className="font-medium">{x.value}</h1>
                          </div>
                        }>
                        {(x.edit && !isDelLoading) && (
                          <div className="flex items-center gap-2 my-1">
                            {x.input ? (
                              <>
                                <div className="flex items-center gap-2 w-full border border-black text-sm px-2 py-0.5 md:cursor-pointer rounded-lg">
                                  <LuCornerDownRight className='text-sm opacity-70' />
                                  <input maxLength={x.maxLength} onChange={(e: any) => setDataEdit({ key: x.title, value: e.target.value.trim(), data: { [x.key]: e.target.value.trim() } })} type="text" placeholder={`New ${x.title}...`} className="w-full outline-none font-medium" />
                                </div>
                                {isDataEdit.value.length <= 5 ? (
                                  <div className={`opacity-50 flex py-1 px-2 cursor-not-allowed gap-2 w-fit text-sm justify-center items-center bg-black rounded-lg`}>
                                    <h1 className="font-medium text-white whitespace-nowrap">save</h1>
                                  </div>
                                ) : (
                                  <div onClick={() => setSaveEdit({ key: x.title })} className={`${isEditLoading ? '' : ''} flex py-1 px-2 md:cursor-pointer active:scale-[.97] gap-2 w-fit text-sm justify-center items-center bg-black rounded-lg`}>
                                    {!isEditLoading && <h1 className="font-medium text-white whitespace-nowrap">save</h1>}
                                    {isEditLoading && <LuLoader2 className='stroke-white animate-spin text-xl' />}
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <div className="flex items-center gap-2 w-full border border-black text-sm px-2 py-0.5 md:cursor-pointer rounded-lg">
                                  <LuCornerDownRight className='text-sm opacity-70' />
                                  <select onChange={(e: any) => setDataEdit({ key: x.title, value: e.target.value.trim(), data: { [x.key]: e.target.value.trim() } })} defaultValue={x.value} name={x.title} id={x.title} className="w-full outline-none font-medium">
                                    {x?.opts?.map(y => <option value={y}>{y}</option>)}
                                  </select>
                                </div>
                                {(x.value == (isDataEdit.value || x.value)) ? (
                                  <div className={`opacity-50 flex py-1 px-2 cursor-not-allowed gap-2 w-fit text-sm justify-center items-center bg-black rounded-lg`}>
                                    <h1 className="font-medium text-white whitespace-nowrap">save</h1>
                                  </div>
                                ) : (
                                  <div onClick={() => setSaveEdit({ key: x.title })} className={`${isEditLoading ? '' : ''} flex py-1 px-2 md:cursor-pointer active:scale-[.97] gap-2 w-fit text-sm justify-center items-center bg-black rounded-lg`}>
                                    {!isEditLoading && <h1 className="font-medium text-white whitespace-nowrap">save</h1>}
                                    {isEditLoading && <LuLoader2 className='stroke-white animate-spin text-xl' />}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <div className={`flex items-center justify-between px-2 bg-red-500/20 rounded-sm py-2`}>
                    <div className="flex flex-col">
                      <h1 className="text-red-500 font-semibold">Delete Kounter</h1>
                      <h1 className="text-[13px] leading-tight w-3/4">Data yang telah di simpan tidak akan pernah bisa di kembalikan.</h1>
                    </div>
                    <h1 onClick={() => !isDelLoading && delKounter()} className={`${isDelPending ? 'opacity-50 cursor-not-allowed' : 'md:cursor-pointer active:scale-[.97]'} flex gap-1 items-center bg-red-500 h-fit px-2 py-0.5 rounded-lg font-medium text-white`}>
                      {isDelPending && <LuLoader2 className='animate-spin stroke-white' />}
                      Delete
                    </h1>
                  </div>
                  <div className="flex mt-3 gap-3">
                    <Link href={`/hit/${dataDetail?.id}${dataDetail?.visibility == 'PRIVATE' ? `/${dataDetail?.apikey || 'SET_YOUR_APIKEY'}` : ``}`} target="_blank" className="flex gap-2 w-full justify-center items-center bg-black px-2 py-1 md:cursor-pointer active:scale-[.97] rounded-lg">
                      <LuExternalLink className='stroke-white' />
                      <h1 className="font-medium text-white whitespace-nowrap">HIT Kounter</h1>
                    </Link>
                    <Link href={`/get/${dataDetail?.id}${dataDetail?.visibility == 'PRIVATE' ? `/${dataDetail?.apikey || 'SET_YOUR_APIKEY'}` : ``}`} target="_blank" className="flex gap-2 w-full justify-center items-center bg-black px-2 py-1 md:cursor-pointer active:scale-[.97] rounded-lg">
                      <LuExternalLink className='stroke-white' />
                      <h1 className="font-medium text-white whitespace-nowrap">GET Kounter</h1>
                    </Link>
                  </div>
                </ModalBody>
              </Skeleton>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isAddOpen} onOpenChange={setAddChange} radius="sm" hideCloseButton className="border border-black">
        <ModalContent>
          {(onClose) => (
            <>
              <Skeleton isLoaded={!!data}>
                <ModalHeader>Add Kounter</ModalHeader>
                <ModalBody className="mb-4">
                  <div className="grid grid-cols-2 items-center gap-3 justify-between">
                    <div onClick={() => !isAddLoading && setVisbilitySet('PUBLIC')} className={`${isVisibilitySet == 'PUBLIC' && 'bg-black'} md:cursor-pointer duration-200 flex justify-between items-center h-fit gap-6 px-3 py-2 w-full rounded-lg border border-black`}>
                      <div className='flex flex-col gap-2'>
                        <div className="flex gap-2 items-center">
                          <LuGlobe className={`${isVisibilitySet == 'PUBLIC' && 'stroke-white'} text-sm opacity-70`} />
                          <h1 className={`${isVisibilitySet == 'PUBLIC' && 'text-white'} text-sm font-bold`}>Kounter Public</h1>
                        </div>
                        <h1 className={`${isVisibilitySet == 'PUBLIC' && 'text-white'} text-[13px] leading-tight`}>Kounter dapat di akses siapa saja yang memiliki link</h1>
                      </div>
                    </div>
                    <div onClick={() => !isAddLoading && setVisbilitySet('PRIVATE')} className={`${isVisibilitySet == 'PRIVATE' && 'bg-black'} md:cursor-pointer duration-200 flex justify-between items-center h-fit gap-6 px-3 py-2 w-full rounded-lg border border-black`}>
                      <div className='flex flex-col gap-2'>
                        <div className="flex gap-2 items-center">
                          <LuGlobe className={`${isVisibilitySet == 'PRIVATE' && 'stroke-white'} text-sm opacity-70`} />
                          <h1 className={`${isVisibilitySet == 'PRIVATE' && 'text-white'} text-sm font-bold`}>Kounter Private</h1>
                        </div>
                        <h1 className={`${isVisibilitySet == 'PRIVATE' && 'text-white'} text-[13px] leading-tight`}>Kounter hanya dapat di akses menggunakan apikey</h1>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 my-3">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center">
                        <h1>Name (optional)</h1>
                      </div>
                      <div className="flex mt-2 items-center gap-2 w-full border border-black text-sm px-2 py-0.5 md:cursor-pointer rounded-lg">
                        <LuCornerDownRight className='text-sm opacity-70' />
                        <input disabled={isAddLoading} onChange={(e) => setNameSet(e.target.value)} defaultValue={isNameSet} placeholder="..." type="text" className="w-full outline-none font-medium" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center">
                        <h1>Category (optional)</h1>
                      </div>
                      <div className="flex mt-2 items-center gap-2 w-full border border-black text-sm px-2 py-0.5 md:cursor-pointer rounded-lg">
                        <LuCornerDownRight className='text-sm opacity-70' />
                        <select disabled={isAddLoading} onChange={(e) => setCategorySet(e.target.value)} name={'Kounter category'} id={'Kounter category'} className="w-full outline-none font-medium">
                          {filterList.map(x => x.toUpperCase()).map(y => <option value={y}>{y}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className={`${isVisibilitySet == 'PUBLIC' && 'hidden'} flex flex-col`}>
                      <div className="flex justify-between items-center">
                        <h1>New Apikey (optional)</h1>
                      </div>
                      <div className="flex mt-2 items-center gap-2 w-full border border-black text-sm px-2 py-0.5 md:cursor-pointer rounded-lg">
                        <LuCornerDownRight className='text-sm opacity-70' />
                        <input disabled={isAddLoading} onChange={(e) => setApikeySet(e.target.value)} defaultValue={isApikeySet} placeholder="..." type="text" className="w-full outline-none font-medium" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span></span>
                    <div onClick={() => !isAddLoading && saveKounter()} className={`${isAddLoading ? 'opacity-50 cursor-not-allowed' : 'md:cursor-pointer active:scale-[.97]'} flex gap-2 items-center bg-black px-2 py-1 rounded-lg`}>
                      {isAddLoading ? <LuLoader2 className='animate-spin stroke-white' /> : <LuCheck className='stroke-white' />}
                      <h1 className="font-medium text-white whitespace-nowrap">Simpan</h1>
                    </div>
                  </div>
                </ModalBody>
              </Skeleton>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default List