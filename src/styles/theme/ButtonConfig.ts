import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  variants: {
    base: {
      background: 'light.primary.50',
      border: '1px solid',
      _dark: {
        background: 'dark.primary.700',
      },
    },
    frame: {
      border: '1px solid',
      background: 'light.primary.100',
      boxShadow: 'light',
      _dark: {
        background: 'dark.primary.800',
        boxShadow: `dark`,
      },
    },
    accent: {
      color: 'white',
      background: 'light.accent.400',
      _dark: {
        background: 'dark.accent.400',
      },
      _disabled: {
        opacity: 0.7,
      },
    },
  },
  baseStyle: {
    fontWeight: 'regular',
    borderRadius: 'xl',
    borderColor: 'light.border !important',
    _focus: {
      outlineColor: 'light.accent.400',
    },
    _dark: {
      borderColor: 'dark.border !important',
      _focus: {
        outlineColor: 'dark.accent.400',
      },
    },
    _active: {
      color: 'white',
      background: 'light.accent.400',
      _dark: {
        background: 'dark.accent.400',
      },
    },
    _hover: {
      bg: 'light.accent.300 !important',
      _dark: {
        bg: 'dark.accent.300 !important',
      },
    },
  },
  defaultProps: {
    variant: 'base',
    size: 'sm',
  },
})
