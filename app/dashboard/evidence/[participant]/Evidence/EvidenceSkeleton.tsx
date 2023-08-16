import { Paper, Skeleton } from '@mui/material'
export default function EvidenceSkeleton() {
  return (
    <>
      <Paper
        elevation={12}
        className="rounded-xl flex flex-col h-4/6 gap-4 p-4
  bg-transparent bg-gradient-to-t from-zinc-800/30 from-20% ... to-65%"
      >
        <div className="flex flex-col h-full">
          <Skeleton variant="rounded" className="w-full h-full" />
        </div>
      </Paper>
      <Paper
        elevation={12}
        className="rounded-xl h-2/6 flex gap-6
  bg-transparent bg-gradient-to-t from-zinc-800/30 from-30% ... to-70%"
      >
        <div className="flex flex-col w-2/12">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} variant="text" className="w-full h-10 py-6" />
          ))}
        </div>
        <div className="flex flex-col w-10/12 items-center">
          <Skeleton variant="text" className="w-3/5 h-10 my-2" />
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} variant="text" className="w-full h-12 p" />
          ))}
        </div>
      </Paper>
    </>
  )
}
