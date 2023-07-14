'use client'
//import { NextAppDirEmotionCacheProvider } from './EmotionCache'
import { darkTheme } from './themes'
import { ThemeProvider, ThemeOptions, CssBaseline } from '@mui/material'
//import { StyledEngineProvider } from '@mui/material/styles'
type Props = {
  children: React.ReactNode
}
export default function ThemeRegistry({ children }: Props) {
  /*<NextAppDirEmotionCacheProvider options={{ key: 'mui', prepend: true }}>
    <StyledEngineProvider injectFirst></StyledEngineProvider>
</NextAppDirEmotionCacheProvider>*/
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
