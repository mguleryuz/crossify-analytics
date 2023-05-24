'use client'

import { Heading, Spinner, Stack } from '@chakra-ui/react'
import ConnectButtonC from './ConnectButton'
import { useAccount } from 'wagmi'

export default function Auth({ isLoading }: { isLoading: boolean }) {
  const { isConnected } = useAccount()
  return (
    <Stack
      w={'100vw'}
      h={'100vh'}
      justify={'center'}
      align={'center'}
      spacing={10}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {isConnected && <Heading>Insufficient Role!</Heading>}
          <ConnectButtonC />
        </>
      )}
    </Stack>
  )
}
