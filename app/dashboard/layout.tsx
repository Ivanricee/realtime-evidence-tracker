import ParticipantMenu from './ParticipantMenu'

type Props = {
  children: React.ReactNode
}
export default async function DashboardLayout({ children }: Props) {
  return (
    <section className="h-full relative">
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
      <section className="flex gap-4 h-full relative z-10">
        <section
          aria-label="evidence list"
          className="h-full w-4/12 flex items-center flex-col xl:flex-row-reverse xl:w-5/12"
        >
          <ParticipantMenu expand />
        </section>
        <div className="w-8/12 xl:w-7/12 rounded-lg">{children}</div>
      </section>
    </section>
  )
}
