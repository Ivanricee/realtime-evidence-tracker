'use client'
import { useRealtimeParticipantEvidence } from '@/hooks/useRealtimeParticipantEvidence'
import {
  AppBar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  Paper,
  Skeleton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import AddParticipant from './AddParticipant'
import { useParams } from 'next/navigation'
import { useAlertToast } from '@/hooks/useAlertToast'
import { AlertToast } from '@/components/AlertToast'
import { NO_DATA, PARTICIPANTS, SELECT } from '@/const'
import { useEffect, useState } from 'react'
import { ParticipantMenuItem } from './ParticipantMenuItem'
import CloseIcon from '@mui/icons-material/Close'

type Card = {
  children: React.ReactNode
}
interface dialog {
  children: React.ReactNode
  open: boolean
  handleClose: () => void
}
function DialogMenu({ children, open, handleClose }: dialog) {
  const theme = useTheme()
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      className="md:hidden"
      PaperProps={{
        style: { backgroundColor: theme.palette.background.default },
      }}
      //TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Participantes
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Cerrar
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  )
}
function Card({ children }: Card) {
  return (
    <Paper
      elevation={12}
      className={`w-full rounded-xl overflow-y-auto bg-transparent
      bg-gradient-to-t from-zinc-800/20 from-15% ... to-50%`}
    >
      {children}
    </Paper>
  )
}
function SkeletonList() {
  return (
    <div className=" flex gap-4 flex-col w-full">
      <Skeleton variant="text" className="text-7xl my-9 mx-8 bg-purple-400/5" />
      {Array.from({ length: 7 }).map((_, index) => {
        return (
          <div className="flex gap-4 px-6" key={index}>
            <Skeleton
              variant="circular"
              className="w-full bg-green-300/5"
              width={85}
              height={60}
            />
            <Skeleton
              variant="rounded"
              className="w-full bg-green-300/5"
              height={60}
            />
          </div>
        )
      })}
    </div>
  )
}
function Participants() {
  const { participant: participantId } = useParams()
  const [alertToast, openAlertToast, resetAlertToast] = useAlertToast()
  const [particEvidence, loading, error] = useRealtimeParticipantEvidence()

  useEffect(() => {
    //Display an alert for errors or empty data.
    if (!loading) {
      let status = null
      if (particEvidence?.length === 0) status = NO_DATA
      if (error) status = error.status
      if (status !== null) {
        openAlertToast({
          feature: PARTICIPANTS,
          action: SELECT,
          status,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particEvidence, loading])

  if (loading)
    return (
      <Card>
        <SkeletonList />
      </Card>
    )
  //error/empty data
  if (alertToast.isOpen)
    return (
      <Card>
        <div className="flex justify-center px-6 mt-6">
          <AlertToast
            alertToast={alertToast}
            resetAlertToast={resetAlertToast}
            width="6/6"
          />
        </div>
      </Card>
    )

  return (
    <>
      <Card>
        <h1 className="text-purple-300/60 text-center py-6 pb-2 text-2xl">
          Participantes
        </h1>
        <AddParticipant />

        <Divider />
        <List component="nav" aria-label="participant menu">
          {particEvidence?.map((participant) => {
            return (
              <ParticipantMenuItem
                key={participant.id}
                participant={participant}
              />
            )
          })}
        </List>
      </Card>
    </>
  )
}

export default function ParticipantMenu() {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  if (matches) return <Participants />
  return (
    <>
      <Button variant="outlined" onClick={handleOpen} className="md:hidden">
        Participantes
      </Button>
      <DialogMenu open={open} handleClose={handleClose}>
        <Participants />
      </DialogMenu>
    </>
  )
}
