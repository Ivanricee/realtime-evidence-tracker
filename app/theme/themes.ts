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
  palette: {
    mode: 'dark',
    background: {
      default: '#161617',
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
      50: '#FCE8ED',
      100: '#FAD6DE',
      200: '#F4A9B9',
      300: '#EF8098',
      light: '#E95475',
      main: '#e42a53',
      600: '#BE183C',
      dark: '#9F1D3A',
      700: '#91122E',
      800: '#5F0C1E',
      900: '#320610',
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
