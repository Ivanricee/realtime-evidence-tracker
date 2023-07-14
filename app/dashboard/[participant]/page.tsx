'use client'
import { Box } from '@mui/material'
import Paper from '@mui/material/Paper'
type Prop = {
  params: { participant: string }
}
export default function dashboardParticipant({ params }: Prop) {
  return (
    <section aria-label="dashboard evidence" className="w-full h-full">
      <section
        aria-label="user data edition and media"
        className="h-2/3 grid grid-cols-6 grid-rows-7 gap-4"
      >
        <Paper
          className="col-span-2 row-span-6 rounded-xl
          bg-transparent bg-gradient-to-t from-zinc-800/30 from-20% ... to-35%"
          elevation={12}
        >
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

        <Paper
          elevation={12}
          className="col-span-4 row-span-5  rounded-xl
          bg-transparent bg-gradient-to-t from-zinc-800/30 from-20% ... to-65%"
        >
          Video media
        </Paper>
        <Paper
          elevation={12}
          className="col-span-4  rounded-xl
          bg-transparent bg-gradient-to-t from-zinc-800/30 from-20% ... to-60%"
        >
          buttons maybe?
        </Paper>
      </section>
      <section aria-label="evidence list" className=" h-1/3 pt-4">
        <Paper
          elevation={12}
          className="h-full rounded-xl
          bg-transparent bg-gradient-to-t from-zinc-800/30 from-30% ... to-70%%
          "
        >
          LIST OF CLIPS
        </Paper>
      </section>
    </section>
  )
}
