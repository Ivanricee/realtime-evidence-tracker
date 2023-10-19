'use client'
//import { Paper } from '@mui/material'
import { Theme as MUITheme } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
//import { DefaultColorScheme } from '@mui/material/styles/experimental_extendTheme'

/*interface ExtendedTheme extends MUITheme {
  cssVarPrefix?: string
  colorSchemes: Record<DefaultColorScheme, Record<string, any>>
}*/

const globalTheme = createTheme({
  palette: {},
}) //as ExtendedTheme
export const darkTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#000',
      paper: '#1E2123',
    },
    text: {
      primary: '#F5F5F5',
      secondary: '#ABADAE',
    },

    primary: {
      '50': '#F5FFF7',
      '100': '#EBFFEF',
      '200': '#D1FFDB',
      '300': '#BDFFCB',
      light: '#A7FFBA',
      main: '#92FFA9',
      '600': '#42FF6B',
      dark: '#66B276',
      '700': '#00F034',
      '800': '#009E22',
      '900': '#005212',
    },
    secondary: {
      50: '#EDE7FD',
      100: '#DFD4FC',
      light: '#BBA5F8',
      main: '#9B7AF5',
      dark: '#7B4FF2',
      500: '#5A23EF',
      600: '#430FD1',
      700: '#350CA6',
      800: '#28097C',
      900: '#18064C',
    },
    success: {
      main: '#00FF5E',
    },
    error: {
      main: '#FF003E',
    },
    warning: {
      main: '#ef650c',
    },
    info: {
      main: '#0077D5',
    },
  },
}) //as ExtendedTheme
