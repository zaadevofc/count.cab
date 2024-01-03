import { Button } from "@nextui-org/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { visit } from "~/hooks/api";

const Index = () => {
  const [isLog, setLog] = useState<any>([])

  const router = useRouter()
  const { status } = useSession()

  // const visitMutate = useMutation({
  //   mutationFn: visit
  // })

  // useEffect(() => {
  //   let hit = () => visitMutate.mutateAsync(VISIT_MAIN_API)
  //   hit()
  // }, [])

  const LogIn = (prov: LiteralUnion<BuiltInProviderType>) => {
    let set = isLog.length == 0;
    if (prov == 'google') {
      set && setLog([true])
      set && signIn(prov)
    } else if (prov == 'github') {
      set && setLog(['', true])
      set && signIn(prov)
    } else if (prov == 'discord') {
      set && setLog(['', '', true])
      set && signIn(prov)
    }
  }

  if (status == 'authenticated') return router.push('/dash')
  if (status == 'unauthenticated') return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center">
        <div className="flex flex-col gap-5 bg-white rounded-lg p-8 max-w-sm border border-black">
          <div className='flex items-center gap-1'>
            <img className='w-8 invert' src="/logo.png" alt="Kounter APi Logo" />
            <h1 className='text-xl font-bold text-black'>Kounter</h1>
          </div>
          <h1 className="font-medium">Login untuk melanjutkan :</h1>
          <div className="flex flex-col gap-3">
            <Button isDisabled={isLog[0]} onPress={() => LogIn('google')} className="flex gap-3 justify-between w-full bg-black" radius="sm">
              <img className="w-5" src="/logo/google.svg" alt="" />
              <h1 className="text-white font-medium">Login menggunakan Google</h1>
            </Button>
            <Button isDisabled={isLog[1]} onPress={() => LogIn('github')} className="flex gap-3 justify-between w-full bg-black" radius="sm">
              <img className="w-5 bg-white rounded-full" src="/logo/github.svg" alt="" />
              <h1 className="text-white font-medium">Login menggunakan Github</h1>
            </Button>
            <Button isDisabled={isLog[2]} onPress={() => LogIn('discord')} className="flex gap-3 justify-between w-full bg-black" radius="sm">
              <img className="w-5" src="/logo/discord.svg" alt="" />
              <h1 className="text-white font-medium">Login menggunakan Discord</h1>
            </Button>
          </div>
        </div>
        <div className="flex flex-col text-center gap-2 items-center">
          <h1 className="mt-5 font-medium text-sm">Copyright &copy; 2023 Built by <Link href={'https://github.com/zaadevofc'} className="font-extrabold">zaadevofc</Link></h1>
        </div>
      </div>
    </>
  );
};

export default Index;
