import ParticipantMenu from './Participant/ParticipantMenu'

type Props = {
  children: React.ReactNode
}
export default async function DashboardLayout({ children }: Props) {
  return (
    <section className="h-full ">
      <section className="flex gap-4 h-full relative z-10">
        <section
          aria-label="evidence list"
          className="h-full w-4/12 flex gap-4 items-center flex-col xl:flex-row-reverse xl:w-5/12"
        >
          <ParticipantMenu expand />
        </section>
        <div className="w-8/12 xl:w-7/12 rounded-lg">{children}</div>
      </section>
    </section>
  )
}
