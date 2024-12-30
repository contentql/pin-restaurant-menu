'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { httpBatchLink } from '@trpc/client'
import { KBarProvider } from 'kbar'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { ThemeProvider } from 'next-themes'
import React, { useState } from 'react'
import SuperJSON from 'superjson'

import { trpc } from '@/trpc/client'
import { CartProvider } from '@/utils/cartContext'

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `/api/trpc`,
          transformer: SuperJSON,
        }),
      ],
    }),
  )

  return (
    <ThemeProvider enableSystem attribute='class'>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ProgressBar
            height='2px'
            color='hsl(var(--primary))'
            options={{ showSpinner: false }}
          />
          <KBarProvider>
            <CartProvider>{children}</CartProvider>
          </KBarProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  )
}
