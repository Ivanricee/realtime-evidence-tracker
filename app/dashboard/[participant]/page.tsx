'use client'
import Paper from '@mui/material/Paper'
type Prop = {
  params: { participant: string }
}
export default function dashboardParticipant({ params }: Prop) {
  return (
    <section aria-label="dashboard evidence" className="w-full h-full">
      <section
        aria-label="user data edition and media"
        className="h-2/3 grid grid-cols-6 grid-rows-7 gap-2"
      >
        <Paper elevation={3} className="col-span-2 row-span-6">
          <h1>{params.participant}</h1>
          <p>Participant info</p>
          <small> get stats realtime participant</small>
          <p>components</p>
          <ol>
            <li>participant badge</li>
            <li>
              participant castigo stats
              <ol>
                <li>sin cumplir [3]</li>
                <li>total [17]</li>
              </ol>
            </li>
          </ol>
        </Paper>

        <Paper elevation={3} className="col-span-4 row-span-5 ">
          Video media
        </Paper>
        <Paper elevation={3} className="col-span-4 ">
          buttons maybe?
        </Paper>
      </section>
      <section aria-label="evidence list" className=" h-1/3 pt-2">
        <Paper elevation={3} className="h-full ">
          LIST OF CLIPS
        </Paper>
      </section>
    </section>
  )
}
