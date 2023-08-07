import { Menu } from './Menu'

type Props = {
  children: React.ReactNode
}
export default function ManageLayout({ children }: Props) {
  return (
    <section className="container mx-auto flex w-full h-full gap-4 items-center justify-center">
      <article className="w-3/12">
        <Menu />
      </article>
      <article className="w-9/12 flex flex-col items-center gap-8">
        {children}
      </article>
    </section>
  )
}
