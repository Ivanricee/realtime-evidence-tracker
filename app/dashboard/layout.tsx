import ParticipantMenu from './Participant/ParticipantMenu'
import SecondaryMenu from './SecondaryMenu'

type Props = {
  children: React.ReactNode
}
export default async function DashboardLayout({ children }: Props) {
  return (
    <div
      className="h-full container mx-auto max-w-[1280px] flex gap-4  relative z-10  flex-col
     md:flex-row"
    >
      <section
        aria-label="participants"
        className="w-full md:h-full md:w-4/12 flex gap-4 items-center flex-col lg:w-3/12"
      >
        <ParticipantMenu />
      </section>
      <section
        aria-label="option menu"
        className="w-full md:w-8/12 xl:w-8/12 rounded-lg lg:w-9/12"
      >
        <SecondaryMenu>{children}</SecondaryMenu>
      </section>
    </div>
  )
}
