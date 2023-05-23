'use client'

import { useColorModeValue, useTheme } from '@chakra-ui/react'
import { lightTheme, Theme } from '@rainbow-me/rainbowkit'
import { merge } from 'lodash'

export default function useRainbowTheme() {
  const chakraTheme = useTheme()
  const accentColor = useColorModeValue(
    chakraTheme.colors?.light?.accent?.[400],
    chakraTheme.colors?.dark?.accent?.[400]
  )
  const modalBackground = useColorModeValue(
    'white',
    chakraTheme.colors?.dark?.primary?.[800]
  )
  const secondaryColor = useColorModeValue(
    chakraTheme.colors?.gray?.[600],
    chakraTheme.colors?.gray?.[300]
  )
  const profileAction = useColorModeValue(
    chakraTheme.colors?.gray?.[200],
    chakraTheme.colors?.dark?.primary?.[700]
  )

  const theme = merge(lightTheme(), {
    colors: {
      accentColor,
      modalBackground,
      modalText: secondaryColor,
      modalTextSecondary: secondaryColor,
      modalTextDim: secondaryColor,
      closeButton: secondaryColor,
      profileAction,
    },
  } as Theme)

  return theme
}
