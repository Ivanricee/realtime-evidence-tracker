'use client'
import { NextAppDirEmotionCacheProvider } from './EmotionCache'
import { darkTheme } from './themes'
import { ThemeProvider, ThemeOptions, CssBaseline } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
type Props = {
  children: React.ReactNode
}
export default function ThemeRegistry({ children }: Props) {
  /*<ThemeProvider theme={darkTheme}>
  <NextAppDirEmotionCacheProvider options={{ key: 'css', prepend: true }}>
    <CssBaseline />
    <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
  </NextAppDirEmotionCacheProvider>
</ThemeProvider>

<ThemeProvider theme={darkTheme}>
  <CssBaseline />
  {children}
</ThemeProvider>
*/
  return (
    <ThemeProvider theme={darkTheme}>
      <NextAppDirEmotionCacheProvider options={{ key: 'css', prepend: true }}>
        <CssBaseline />
        <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
      </NextAppDirEmotionCacheProvider>
    </ThemeProvider>
  )
}
