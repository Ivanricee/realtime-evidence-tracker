type Prop = {
  params: { participant: string }
}
export default function dashboardParticipant({ params }: Prop) {
  return (
    <section aria-label="dashboard evidence" className="w-full h-full">
      <section
        aria-label="user data edition and media"
        className="bg-cyan-900 h-2/3"
      >
        <h1>{params.participant}</h1>
      </section>
      <section
        aria-label="evidence list"
        className="bg-cyan-800 h-1/3"
      ></section>
    </section>
  )
}
