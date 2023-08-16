'use client'
import TabPanel from '@/components/TabPanel'
import { Evidence } from './Evidence/Evidence'
import { Metadata } from 'next'

type Prop = {
  params: { participant: string }
}
export const metadata: Metadata = {
  title: 'Evidencias',
  description: 'Evidencias filtradas por participantes',
}
export default function DashboardParticipant({ params }: Prop) {
  return (
    //  <section aria-label="Evidence" className="w-full h-full flex flex-col">

    <TabPanel value={0} index={0}>
      <Evidence />
    </TabPanel>

    //  </section>
  )
}
