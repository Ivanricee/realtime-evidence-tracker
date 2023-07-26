import { useRealtimeEvidence } from '@/hooks/useRealtimeEvidence'
import { Button, Paper } from '@mui/material'

export function Evidence() {
  const [evidences, loading, error] = useRealtimeEvidence()
  return (
    <section
      aria-label="user data edition and media"
      className="h-full w-full flex flex-col justify-center gap-4"
    >
      <Paper
        elevation={12}
        className="rounded-xl flex flex-col h-4/6 gap-4 p-4
  bg-transparent bg-gradient-to-t from-zinc-800/30 from-20% ... to-65%"
      >
        <div className="h-5/6 bg-black/60 bg-opacity-80 rounded-lg w-full flex justify-center items-center">
          <h3 className="text-indigo-200/60">
            Ve evidencias con ayuda de la lista de abajo
          </h3>
        </div>
        <div className="flex gap-6 rounded-xl h-1/6 w-full justify-center items-center">
          {
            //disabled
          }
          <Button variant="outlined" className="w-32 h-16">
            Aceptar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className="w-32 h-16 border-purple-500 text-purple-300/90"
          >
            Descartar
          </Button>
        </div>
      </Paper>
      <Paper
        elevation={12}
        className="rounded-xl h-2/6
  bg-transparent bg-gradient-to-t from-zinc-800/30 from-30% ... to-70%%
  "
      >
        <ul>
          {evidences.map((evidence) => {
            return (
              <>
                <h1>{evidence.status}</h1>
              </>
            )
          })}
        </ul>
      </Paper>
    </section>
  )
}
