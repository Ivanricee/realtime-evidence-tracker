import './globals.css'
import ThemeRegistry from './theme/ThemeRegistry'
export const metadata = {
  title: 'Evidence tracker',
  description: 'App for tracking users evidence',
}
/*
body:before {
background: none;
}
*/
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-none" id="__next">
        <main className="w-full h-screen bg-cover p-6 overflow-hidden  min-h-[600px]">
          <ThemeRegistry>{children}</ThemeRegistry>
        </main>
      </body>
    </html>
  )
}
