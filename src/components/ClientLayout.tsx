'use client'

import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import RouteProgressBar from './RouteProgressBar'
import { Box, HStack, IconButton, useColorMode } from '@chakra-ui/react'
import { ConnectButton } from '.'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box>
      <RouteProgressBar />
      <HStack p={3} gap={5}>
        <IconButton
          aria-label="theme-switch"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        >
          Theme
        </IconButton>
        <ConnectButton />
      </HStack>
      {children}
    </Box>
  )
}
