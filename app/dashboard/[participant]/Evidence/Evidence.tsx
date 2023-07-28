import { useRealtimeEvidence } from '@/hooks/useRealtimeEvidence'
import React, { useState, useEffect } from 'react'
import { Button, Paper, Tabs } from '@mui/material'
import Tab from '@mui/material/Tab'
import TabPanel, { a11yProps } from '@/components/TabPanel'
import { ListEvidence } from './ListEvidence'
import EvidenceSkeleton from './EvidenceSkeleton'
import { useToaster } from '@/hooks/useToaster'
import { Toaster } from '@/components/Toaster'
import { EVIDENCE, NO_DATA, SELECT } from '@/const'
import { useParams } from 'next/navigation'
import { PlayMedia } from './PlayMedia'

type cardProps = {
  children: React.ReactNode
}
function Card({ children }: cardProps) {
  return (
    <section
      aria-label="user data edition and media"
      className="h-full w-full flex flex-col justify-center gap-4 "
    >
      {children}
    </section>
  )
}
export function Evidence() {
  const [value, setValue] = useState(0)
  const [evidences, loading, error] = useRealtimeEvidence()
  const [toaster, openToaster, resetToaster] = useToaster()
  const { participant: participantId } = useParams()
  const [media, setMedia] = useState({ id: 0, url: '' })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  useEffect(() => {
    if (!loading) {
      let status = null
      if (evidences?.length === 0) status = NO_DATA
      if (error) status = error.status
      if (status !== null) {
        openToaster({
          feature: EVIDENCE,
          action: SELECT,
          status,
        })
      } else if (toaster.isOpen) resetToaster()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evidences])

  const handleViewer = (id: number, url: string) => {
    setMedia({ id, url })
  }

  if (toaster.isOpen)
    return (
      <Card>
        <div className="flex justify-center px-6 mt-6">
          <Toaster
            toaster={toaster}
            resetToaster={resetToaster}
            width="6/6"
            linkTitle="Aqui"
            linkSrc={`/participants/${participantId}`}
          />
        </div>
      </Card>
    )
  if (loading)
    return (
      <Card>
        <EvidenceSkeleton />
      </Card>
    )
  return (
    <Card>
      <Paper
        elevation={12}
        className="rounded-xl flex flex-col h-4/6 gap-4 p-4
  bg-transparent bg-gradient-to-t from-zinc-800/30 from-20% ... to-65%"
      >
        <div className="h-5/6 bg-black/60 bg-opacity-80 rounded-lg w-full flex justify-center items-center overflow-hidden">
          {media.url !== '' ? (
            <PlayMedia url={media.url} />
          ) : (
            <h3 className="text-indigo-200/60">
              Ve evidencias con ayuda de la lista de abajo
            </h3>
          )}
        </div>
        <div className="flex gap-6 rounded-xl h-1/6 w-full justify-center items-center">
          {
            //disabled
          }
          <Button variant="outlined" className="w-32 h-12">
            Aceptar
          </Button>
          <Button variant="outlined" color="secondary" className="w-32 h-12">
            Descartar
          </Button>
        </div>
      </Paper>
      <Paper
        elevation={12}
        className="rounded-xl h-2/6 flex
  bg-transparent bg-gradient-to-t from-zinc-800/30 from-30% ... to-70%"
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          indicatorColor="secondary"
          textColor="secondary"
          value={value}
          onChange={handleChange}
          aria-label="evidence"
          sx={{ borderRight: 2, borderColor: 'divider', textAlign: 'left' }}
        >
          <Tab label="pendientes" {...a11yProps(0)} />
          <Tab label="Aceptados" {...a11yProps(1)} />
          <Tab label="Rechazados" {...a11yProps(2)} />
          <Tab label="Agregar" {...a11yProps(3)} />
        </Tabs>
        <TabPanel isVertical value={value} index={0}>
          <ListEvidence
            evidences={evidences}
            status="pending"
            handleViewer={handleViewer}
          />
        </TabPanel>
        <TabPanel isVertical value={value} index={1}>
          <ListEvidence
            evidences={evidences}
            status="accepted"
            handleViewer={handleViewer}
          />
        </TabPanel>
        <TabPanel isVertical value={value} index={2}>
          <ListEvidence
            evidences={evidences}
            status="rejected"
            handleViewer={handleViewer}
          />
        </TabPanel>
        <TabPanel isVertical value={value} index={3}>
          Item Four
        </TabPanel>
      </Paper>
    </Card>
  )
}
