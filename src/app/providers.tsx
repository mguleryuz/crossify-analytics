'use client'

import React from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { chains, config } from '../wagmi'
import { useState, useEffect } from 'react'
import { theme } from '@/styles'
import useRainbowTheme from '@/styles/useRainbowTheme'
import ClientLayout from '@/components/ClientLayout'
import '@rainbow-me/rainbowkit/styles.css'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const rainbowTheme = useRainbowTheme()

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <WagmiConfig config={config}>
          <RainbowKitProvider chains={chains} theme={rainbowTheme}>
            {mounted && <ClientLayout>{children}</ClientLayout>}
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </CacheProvider>
  )
}
