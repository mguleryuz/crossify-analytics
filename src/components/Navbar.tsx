'use client'

import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/next-js'
import {
  Button,
  HStack,
  IconButton,
  Stack,
  useColorMode,
} from '@chakra-ui/react'
import ConnectButton from '@/components/ConnectButton'

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Stack p={3} spacing={3}>
      <HStack>
        <IconButton
          aria-label="theme-switch"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        >
          Theme
        </IconButton>
        <ConnectButton />
      </HStack>
      <HStack>
        <Button as={Link} href={'users'}>
          Users
        </Button>
        <Button as={Link} href={'payments'}>
          Payments
        </Button>
        <Button as={Link} href={'receipts'}>
          Receipts
        </Button>
      </HStack>
    </Stack>
  )
}
