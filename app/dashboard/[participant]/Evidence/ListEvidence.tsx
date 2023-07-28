import List from '@mui/material/List'
import { useEffect } from 'react'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useState, useRef } from 'react'
type Props = {
  evidences: Evidence[]
  status: string
  handleViewer: (id: number, url: string) => void
}
export function ListEvidence({ evidences, status, handleViewer }: Props) {
  const filterEvidence = evidences.filter(
    (evidence) => evidence.status === status
  )
  const initSelectedItms = useRef({
    id: filterEvidence[0]?.id || 0,
    url: filterEvidence[0]?.url || '',
  })
  const [selectedItm, setSelectedItm] = useState(initSelectedItms.current)

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
    url: string
  ) => {
    setSelectedItm({ id, url })
    handleViewer(id, url)
  }
  useEffect(() => {
    handleViewer(selectedItm.id, selectedItm.url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const title: Record<string, string> = {
    pending: 'Evidencias Pendientes',
    accepted: 'Evidencias Aceptadas',
    rejected: 'Evidencias Rechazadas',
    add: 'Agregar Evidencias',
  }
  return (
    <div className="p-4 ">
      <h1 className="text-center text-lg text-purple-100 mb-4">
        {title[status]}
      </h1>
      <List
        component="nav"
        aria-label="secondary mailbox folder"
        className="w-full pb-4"
      >
        {filterEvidence.map((evidence) => {
          const isSelected = selectedItm.id === evidence.id
          return (
            <div key={evidence.id}>
              <ListItemButton
                selected={isSelected}
                onClick={(event) =>
                  handleListItemClick(event, evidence.id, evidence.url || '')
                }
                className={`h-10 ${isSelected ? 'bg-purple-300/30' : ''}`}
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
