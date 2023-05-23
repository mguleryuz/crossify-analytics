import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import Card from './CardConfig'
import Tabs from './TabsConfig'
import Button from './ButtonConfig'
import Divider from './DividerConfig'
import Frame from './FrameConfig'
import Modal from './ModalConfig'
import Accordion from './AccordionConfig'
import Tag from './TagConfig'
import Menu from './MenuConfig'
import Skeleton from './SkeletonConfig'
import Input from './InputConfig'
import Table from './TableConfig'

export const { light, dark } = {
  light: {
    primary: { 50: 'white', 100: '#ECFDF5', 200: '#D1FAE5', 300: '#6EE7B7' },
    secondary: { 50: '#FDFBFB', 100: '#E5E5E5', 200: '#D1D5DB' },
    accent: { 300: '#86EFAC', 400: '#4ADE80', 500: '#ECFDF5' },
    border: '#A7C3B8',
  },
  dark: {
    primary: { 700: '#115E59', 800: '#0E403C', 900: '#072E2E' },
    secondary: { 700: '#404040', 800: '#262626', 900: '#171717' },
    accent: { 300: '#4ADE80', 400: '#22C55E', 900: '#5EEAD4' },
    border: '#14B8A6', // teal
  },
}

const bg = {
  dark: `conic-gradient(from -45deg at 215% 215%, ${dark.accent[900]} -175deg, ${dark.primary[900]} 0deg, ${dark.accent[900]} 175deg, ${dark.primary[900]} 360deg)`,
  light: `conic-gradient(from -45deg at 0% 0%, ${light.accent[500]} -175deg, ${light.primary[50]} 0deg, ${light.accent[500]} 175deg, ${light.primary[50]} 360deg)`,
}

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const fonts = {
  heading: `'Open Sans', sans-serif`,
  body: `'Open Sans', sans-serif`,
}

const colors = {
  light,
  dark,
}

const shadows = {
  light: `-4px 4px 6px -3px rgba(0, 0, 0, 0.1)`,
  dark: `-4px 4px 6px -3px rgba(0, 0, 0, 0.5)`,
}

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode(bg.light, bg.dark)(props),
    },
  }),
}

export default extendTheme({
  config,
  fonts,
  styles,
  colors,
  shadows,
  components: {
    Accordion,
    Modal,
    Frame,
    Card,
    Tabs,
    Button,
    Divider,
    Tag,
    Menu,
    Skeleton,
    Input,
    Table,
  },
})
