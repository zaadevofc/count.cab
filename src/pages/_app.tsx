import { NextUIProvider } from "@nextui-org/react";
import splitbee from "@splitbee/web";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Toaster } from "react-hot-toast";
import Headers from '~/components/Headers';
import '~/styles/globals.css';

splitbee.init()
const queryClient = new QueryClient()
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>
            <AnimatePresence mode="wait" initial={false}>
              <Headers />
              <Toaster reverseOrder={false} />
              <Component {...pageProps} />
              <Analytics />
            </AnimatePresence>
          </NextUIProvider >
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}