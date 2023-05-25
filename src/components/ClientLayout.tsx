'use client'

import RouteProgressBar from './RouteProgressBar'
import { Box, useColorModeValue, useTheme } from '@chakra-ui/react'
import Navbar from './Navbar'
import { Chart, registerables } from 'chart.js'
import { Global, css } from '@emotion/react'
import { reduceOpacity } from '@/styles'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { UserRoles } from '@/types/data-contracts'
import Auth from './Auth'
import baseApiUrl from '@/lib/contants/baseApiUrl'
Chart.register(...registerables)

async function getUserRole(address?: string | `0x${string}`) {
  if (!address) return
  const res = await fetch(
    `${baseApiUrl}/api/users/role?dbName=crossifyDev&address=${address}`
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json() as Promise<{ role?: UserRoles }>
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [role, setRole] = useState({ isLoading: true, data: UserRoles.USER }),
    { address, isDisconnected } = useAccount(),
    theme = useTheme(),
    color = useColorModeValue('black', 'white'),
    borderColor = useColorModeValue(
      theme.colors.light.border,
      theme.colors.dark.border
    ),
    globalStyles = css``

  Chart.defaults.color = color
  Chart.defaults.borderColor = reduceOpacity(borderColor)

  useEffect(() => {
    setRole((prev) => ({ ...prev, isLoading: true }))
    getUserRole(address).then((res) => {
      setRole({ isLoading: false, data: res?.role ?? UserRoles.USER })
    })
  }, [address])

  const showAuth = ![UserRoles.SUPER].includes(role.data) || isDisconnected

  return (
    <>
      <Global styles={globalStyles} />
      <Box>
        <RouteProgressBar />
        {!showAuth ? (
          <>
            <Navbar />
            {children}
          </>
        ) : (
          <Auth isLoading={role.isLoading} />
        )}
      </Box>
    </>
  )
}
