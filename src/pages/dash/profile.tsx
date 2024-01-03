import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Layout from "~/components/Layout"
import { parseImgAuth } from "~/consts"

const Profile = () => {
  const { data: session, status }: any = useSession()

  return (
    <>
      <Layout>
        <div className="flex items-start md:items-center gap-7">
          <Image className="w-20 md:w-28 drop-shadow-md border-2 border-black rounded-full" unoptimized src={parseImgAuth(session?.token?.picture)} alt="a" quality={100} width={500} height={500} />
          <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between w-full">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h1 className="text-lg md:text-[24px] font-[poppins] font-bold">{session?.token?.name}</h1>
                <h1 className="font-medium -mt-1">{session?.token?.email}</h1>
                <h1 className="bg-yellow-500/20 border border-yellow-500 w-fit mt-2 font-medium px-2 rounded-lg text-xs">Basic Plan</h1>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 onClick={() => signOut()} className="bg-red-500 w-fit px-2 py-1 md:cursor-pointer text-xs md:text-[15px] active:scale-[.97] rounded-lg font-medium text-white">Logout</h1>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Profile