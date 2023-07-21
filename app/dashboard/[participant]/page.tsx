'use client'
import ParticipantStats from '@/components/ParticipantStats/Index'
import { Box, Button } from '@mui/material'
import Paper from '@mui/material/Paper'
type Prop = {
  params: { participant: string }
}
export default function dashboardParticipant({ params }: Prop) {
  return (
    <section aria-label="dashboard evidence" className="w-full h-full flex">
      <section
        aria-label="user data edition and media"
        className="h-full w-full flex flex-col justify-center "
      >
        <Paper
          elevation={12}
          className="rounded-xl flex flex-col h-4/6 gap-4 p-4
          bg-transparent bg-gradient-to-t from-zinc-800/30 from-20% ... to-65%"
        >
          <div className="h-5/6 bg-black/60 bg-opacity-80 rounded-lg w-full flex justify-center items-center">
            <h3 className="text-indigo-300">
              Ve evidencias con ayuda de la lista de abajo
            </h3>
          </div>
          <div className="flex rounded-xl h-1/6 w-full justify-evenly items-center">
            <Button variant="outlined" disabled>
              Aceptar
            </Button>
            <Button variant="outlined">Descartar</Button>
          </div>
        </Paper>

        <Paper
          elevation={12}
          className="rounded-xl h-2/6
          bg-transparent bg-gradient-to-t from-zinc-800/30 from-30% ... to-70%%
          "
        >
          LIST OF CLIPS
        </Paper>
      </section>
    </section>
  )
}
