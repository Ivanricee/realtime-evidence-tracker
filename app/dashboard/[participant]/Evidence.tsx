import { useRealtimeEvidence } from '@/hooks/useRealtimeEvidence'
import { useState } from 'react'
import { Button, Paper, Tabs } from '@mui/material'
import Tab from '@mui/material/Tab'
import TabPanel, { a11yProps } from '@/components/TabPanel'
import { ListEvidence } from './ListEvidence'

export function Evidence() {
  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const [evidences, loading, error] = useRealtimeEvidence()

  return (
    <section
      aria-label="user data edition and media"
      className="h-full w-full flex flex-col justify-center gap-4 "
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
          <ListEvidence evidences={evidences} filter="pending" />
        </TabPanel>
        <TabPanel isVertical value={value} index={1}>
          <ListEvidence evidences={evidences} filter="accepted" />
        </TabPanel>
        <TabPanel isVertical value={value} index={2}>
          <ListEvidence evidences={evidences} filter="rejected" />
        </TabPanel>
        <TabPanel isVertical value={value} index={3}>
          Item Four
        </TabPanel>
      </Paper>
    </section>
  )
}
