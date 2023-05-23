'use client'

import RouteProgressBar from './RouteProgressBar'
import { Box, useColorModeValue, useTheme } from '@chakra-ui/react'
import Navbar from './Navbar'
import { Chart, registerables } from 'chart.js'
import { Global, css } from '@emotion/react'
import { reduceOpacity } from '@/styles'
Chart.register(...registerables)
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = useTheme(),
    color = useColorModeValue('black', 'white'),
    borderColor = useColorModeValue(
      theme.colors.light.border,
      theme.colors.dark.border
    ),
    globalStyles = css``

  Chart.defaults.color = color
  Chart.defaults.borderColor = reduceOpacity(borderColor)

  return (
    <Box>
      <Global styles={globalStyles} />
      <RouteProgressBar />
      <Navbar />
      {children}
    </Box>
  )
}
