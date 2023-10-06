import { Menu } from './Menu'

type Props = {
  children: React.ReactNode
}
export default function ManageLayout({ children }: Props) {
  return (
    <section className="container mx-auto h-full max-w-[1024px] flex w-full  gap-4 items-center justify-center ">
      <article className="w-3/12">
        <Menu />
      </article>
      <article className="w-9/12 h-full relative">{children}</article>
    </section>
  )
}
