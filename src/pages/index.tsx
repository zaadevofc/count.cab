import { Button } from "@nextui-org/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Container from "~/components/Container";

const Index = () => {
  const [isLog, setLog] = useState<any>([])

  const router = useRouter()
  const { status } = useSession()

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
      <Container className="flex-col min-h-screen items-center justify-center">
        <div className="flex flex-col bg-white shadow-md border border-blue-400 px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-xs">
          <div className='flex flex-row items-center gap-1'>
            <img className='w-8 invert' src="/logo.png" alt="" />
            <h1 className='text-xl font-bold text-blue-600'>Kounter</h1>
          </div>
          <div className="mt-4 self-center text-xl sm:text-lg text-gray-800">
            Selamat datang, Login untuk melanjutkan.
          </div>
          <div className="flex flex-col gap-3 mt-10 mx-auto">
            <Button isDisabled={isLog[0]} onClick={() => LogIn('google')} className="flex flex-row justify-between items-center">
              <img className="w-6" src="/logo/google.svg" alt="" />
              <h1>Lanjutkan melalui Google</h1>
            </Button>
            <Button isDisabled={isLog[1]} onClick={() => LogIn('github')} className="flex flex-row justify-between items-center">
              <img className="w-6" src="/logo/github.svg" alt="" />
              <h1>Lanjutkan melalui Github</h1>
            </Button>
            <Button isDisabled={isLog[2]} onClick={() => LogIn('discord')} className="flex flex-row justify-between items-center">
              <img className="w-6" src="/logo/discord.svg" alt="" />
              <h1>Lanjutkan melalui Discord</h1>
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center mt-6">
          <div className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
            <h1>
              Copyright &copy; 2023 Built by{' '}
              <a href="https://instagram.com/zaadevofc" target="_blank" className="text-blue-500 font-semibold font-[quicksand]">
                zaadevofc
              </a>
            </h1>
          </div>
        </div>
      </Container>

    </>
  );
};

export default Index;
