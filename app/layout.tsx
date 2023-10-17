import './globals.css'
import ThemeRegistry from './theme/ThemeRegistry'
export const metadata = {
  title: 'Evidence tracker',
  description: 'App for tracking users evidence',
}

/*body:before {
background: none;
}*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-transparent " id="__next">
        <main className="w-full h-screen bg-cover p-6 overflow-hidden  min-h-[600px] relative">
          <div
            className="absolute aspect-video h-60 bg-green-500 blur-3xl bg-opacity-10
          rounded-full translate-y-40 left-[10%] top-[10%]"
          ></div>
          <div
            className="absolute aspect-video h-56 bg-violet-600 blur-3xl bg-opacity-20
          rounded-full right-20 bottom-20 top-0 left-0"
          ></div>
          <div
            className="absolute aspect-video h-72 bg-violet-500 blur-3xl bg-opacity-10
          rounded-full top-[60%] left-[50%]"
          ></div>
          <div
            className="absolute aspect-video h-80 bg-green-500 blur-3xl bg-opacity-10
            rounded-full top-[30%] left-[50%]"
          ></div>
          <ThemeRegistry>{children}</ThemeRegistry>
        </main>
      </body>
    </html>
  )
}
