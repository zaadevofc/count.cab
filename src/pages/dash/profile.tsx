'use client'

import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect } from "react"
import { LuBadgeCheck } from "react-icons/lu"
import Layout from "~/components/Layout"
import { parseImgAuth } from "~/consts"
import { useAnalytics, useKounterList, usePushVisits } from "~/hooks/use"

const Profile = () => {
  const { data: session, status }: any = useSession()

  const { mutateAsync } = usePushVisits()
  const { data: dataAnalytics, isPending: isPending1 }: any = useAnalytics(session?.token?.email)
  const { isPending: isPending2, data, refetch }: any = useKounterList(session?.token?.email)

  useEffect(() => {
    let push = async () => await mutateAsync('profile')
    push()
  }, [])

  if (status != 'loading') return (
    <>
      <Layout>
        <div className="flex flex-col gap-10">
          <div className="flex gap-8">
            <div className="flex flex-col gap-3 relative">
              <Image className="rounded-xl drop-shadow-lg" src={parseImgAuth(session?.token?.picture)} width={180} height={180} alt="" />
              <span className="absolute -top-3 -right-3 text-4xl">
                <LuBadgeCheck className='fill-green-600 stroke-white' />
              </span>
              <h1 className="mx-auto px-2 text-sm rounded-lg bg-blue-500 text-white border border-gray-700">Free</h1>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{session?.token?.name}</h1>
                <h1 className="">{session?.token?.email}</h1>
              </div>
              {data ? (
                <div className="flex flex-col">
                  <h1>Limit :</h1>
                  <h1>
                    <span className={`font-bold text-3xl ${data?.available <= 5 && 'text-red-600'}`}>{data?.available}</span>
                    <span>/{data?.limit}</span>
                  </h1>
                </div>
              ) : (
                <h1 className="my-5">Loading...</h1>
              )}
              <div onClick={() => signOut()} className="bg-red-600/20 w-fit cursor-pointer rounded-lg px-4 py-1 border border-red-600">
                <h1 className="text-red-600 font-bold">Logout</h1>
              </div>
            </div>
          </div>
          {(dataAnalytics && data) && (
            <>
              <div className="flex items-center justify-evenly border-t py-5 border-black">
                <div className="flex text-center flex-col">
                  <h1 className="text-3xl font-bold">{dataAnalytics?.list}</h1>
                  <h1>Kounter List</h1>
                </div>
                <span className="h-10 w-[1px] bg-black"></span>
                <div className="flex text-center flex-col">
                  <h1 className="text-3xl font-bold">{dataAnalytics?.online}</h1>
                  <h1>Kounter Online</h1>
                </div>
                <span className="h-10 w-[1px] bg-black"></span>
                <div className="flex text-center flex-col">
                  <h1 className="text-3xl font-bold">{dataAnalytics?.count}</h1>
                  <h1>Total Kounter</h1>
                </div>
                <span className="h-10 w-[1px] bg-black"></span>
                <div className="flex text-center flex-col">
                  <h1 className="text-3xl font-bold">{dataAnalytics?.click}</h1>
                  <h1>Total Click</h1>
                </div>
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  )
}

export default Profile