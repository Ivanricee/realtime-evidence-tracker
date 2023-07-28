'use client'
import TabPanel, { a11yProps } from '@/components/TabPanel'
import AppBar from '@mui/material/AppBar'
import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Evidence } from './Evidence/Evidence'
import {
  DASHBOARD_MENU,
  M_BITSSUBS,
  M_EVIDENCIAS,
  M_PREGUNTAS,
  type MenuKey,
} from '@/const'

type Prop = {
  params: { participant: string }
}

export default function DashboardParticipant({ params }: Prop) {
  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const MENU_COMPONENTS: Record<MenuKey, React.ReactNode> = {
    [M_EVIDENCIAS]: <Evidence />,
    [M_PREGUNTAS]: <Evidence />,
    [M_BITSSUBS]: <Evidence />,
  }
  return (
    <section aria-label="Evidence" className="w-full h-full flex flex-col">
      <AppBar
        position="static"
        className="w-full rounded-lg bg-opacity-5 bg-transparent bg-gradient-to-r from-zinc-700/40 from-10% ... to-65%"
      >
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label="Dashboard menu"
        >
          {DASHBOARD_MENU.map((menu, index) => (
            <Tab key={menu} label={menu} {...a11yProps(index)} />
          ))}
        </Tabs>
      </AppBar>
      <div className="h-full">
        {DASHBOARD_MENU.map((menu, index) => (
          <TabPanel key={menu} value={value} index={index}>
            {MENU_COMPONENTS[menu]}
          </TabPanel>
        ))}
      </div>
    </section>
  )
}
