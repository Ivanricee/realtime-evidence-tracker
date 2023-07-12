'use client'
import { Paper } from '@mui/material'
import { createTheme } from '@mui/material/styles'
const globalTheme = createTheme({
  palette: {},
})
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  /* components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#000000",
        },
      },
    },
  },*/
})
