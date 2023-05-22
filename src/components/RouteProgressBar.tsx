'use client'

import { useColorModeValue, useTheme } from '@chakra-ui/react'
import ProgressBar from 'next-nprogress-bar'

export default function RouteProgressBar() {
  const theme = useTheme(),
    sliderColor = useColorModeValue(
      theme.colors?.light?.accent[400],
      theme.colors?.dark?.accent[400]
    )
  return (
    <ProgressBar
      height="4px"
      color={sliderColor}
      options={{ showSpinner: false }}
      shallowRouting
      appDirectory
    />
  )
}
