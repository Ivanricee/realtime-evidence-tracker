import { Menu } from './Menu'

type Props = {
  children: React.ReactNode
}
export default function ManageLayout({ children }: Props) {
  return (
    <section
      className="container mx-auto h-full max-w-[1024px] flex w-full  gap-4 items-center justify-start flex-col md:flex-row +
    overflow-y-auto md:justify-center"
    >
      <article className="w-full md:w-3/12 sm:w-6/12">
        <Menu />
      </article>
      <article className="w-full md:w-9/12 h-full relative">{children}</article>
    </section>
  )
}
