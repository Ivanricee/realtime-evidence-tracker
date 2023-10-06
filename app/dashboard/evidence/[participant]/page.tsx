'use client'
import TabPanel from '@/components/TabPanel'
import { Evidence } from './Evidence/Evidence'

type Prop = {
  params: { participant: string }
}

export default function DashboardParticipant({ params }: Prop) {
  return (
    <TabPanel value={0} index={0}>
      <Evidence />
    </TabPanel>
  )
}
