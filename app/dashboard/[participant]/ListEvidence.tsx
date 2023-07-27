import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useState } from 'react'
type Props = {
  evidences: Evidence[]
  filter: string
}
export function ListEvidence({ evidences, filter }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index)
  }
  const title: Record<string, string> = {
    pending: 'Evidencias Pendientes',
    accepted: 'Evidencias Aceptadas',
    rejected: 'Evidencias Rechazadas',
    add: 'Agregar Evidencias',
  }
  const filterEvidence = evidences.filter(
    (evidence) => evidence.status === filter
  )
  return (
    <div className="p-4 ">
      <h1 className="text-center text-lg text-purple-100 mb-4">
        {title[filter]}
      </h1>
      <List
        component="nav"
        aria-label="secondary mailbox folder"
        className="w-full pb-4"
      >
        {filterEvidence.map((evidence, index) => {
          return (
            <div key={evidence.id}>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
                className={`h-10 ${
                  selectedIndex === index ? 'bg-purple-300/30' : ''
                }`}
              >
                <ListItemText
                  primary={evidence.url}
                  className="text-purple-100/80 truncate "
                />
              </ListItemButton>
              <Divider component="li" />
            </div>
          )
        })}
      </List>
    </div>
  )
}
