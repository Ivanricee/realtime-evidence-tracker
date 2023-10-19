import { useEffect, useState } from 'react'
import {
  EMPTY_LIST,
  EVIDENCE,
  E_ACCEPTED,
  E_PENDING,
  E_REJECTED,
  SELECT,
} from '@/const'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import { Fade } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Toaster } from 'sonner'
import { AlertToast } from '@/components/AlertToast'
import { useAlertToast } from '@/hooks/useAlertToast'
import { useEvidenceEdit } from '@/hooks/useEvidenceEdit'

type Props = {
  evidences: Evidence[]
  status: string
  handleViewer: (id: number, url: string) => void
}
type editProps = {
  id: number
  status: string
}
export function ListEvidence({ evidences, status, handleViewer }: Props) {
  const [evidenceFilter, editEvidenceStatus, loadEdit] = useEvidenceEdit({
    evidences,
    status,
  })
  const [selectedItm, setSelectedItm] = useState({
    id: evidenceFilter[0]?.id || 0,
    url: evidenceFilter[0]?.url || '',
  })

  const [alertToast, openAlertToast, resetAlertToast] = useAlertToast()

  const selectFirstListItem = () => {
    if (evidenceFilter.length !== 0) {
      let index = selectedItm.id === evidenceFilter[0]?.id ? 1 : 0
      const selectId = evidenceFilter[index]?.id || 0
      const selectUrl = evidenceFilter[index]?.url || ''
      setSelectedItm({ id: selectId, url: selectUrl })
      handleViewer(selectId, selectUrl)
    }
  }
  const handleEditStatus = ({ id, status }: editProps) => {
    editEvidenceStatus({ id, status })
    selectFirstListItem()
  }
  const handleSelectItem = (id: number, url: string) => {
    setSelectedItm({ id, url })
    handleViewer(id, url)
  }
  useEffect(() => {
    handleViewer(selectedItm.id, selectedItm.url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (evidenceFilter.length === 0) {
      openAlertToast({
        feature: EVIDENCE,
        action: SELECT,
        status: EMPTY_LIST,
      })
      setSelectedItm({ id: 0, url: '' })
    } else if (selectedItm.id === 0) selectFirstListItem()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evidences])
  const title: Record<string, string> = {
    [E_PENDING]: 'Evidencias Pendientes',
    [E_ACCEPTED]: 'Evidencias Aceptadas',
    [E_REJECTED]: 'Evidencias Rechazadas',
    add: 'Agregar Evidencias',
  }

  if (evidenceFilter.length === 0)
    return (
      <div className="flex justify-center items-center h-full p-4">
        <AlertToast
          alertToast={alertToast}
          resetAlertToast={resetAlertToast}
          width="6/6"
          description={title[status]}
          closeBtn={false}
        />
      </div>
    )
  return (
    <div className="p-4 ">
      <h1 className="text-center text-lg text-purple-100 mb-4">
        {title[status]}
      </h1>
      <List
        component="ul"
        aria-label="secondary mailbox folder"
        className="w-full pb-4"
      >
        {evidenceFilter.map((evidence) => {
          const isSelected = selectedItm.id === evidence.id
          return (
            <>
              <ListItem disablePadding className="rounded-md overflow-hidden">
                <ListItemButton
                  selected={isSelected}
                  onClick={() =>
                    handleSelectItem(evidence.id, evidence.url || '')
                  }
                  className={`h-10 ${isSelected ? 'bg-purple-300/30' : ''}`}
                >
                  <ListItemText
                    primary={evidence.url}
                    className="truncate text-purple-100/80 w-1"
                    primaryTypographyProps={{
                      style: { overflow: 'hidden', textOverflow: 'ellipsis' },
                    }}
                  />
                </ListItemButton>

                <Fade in={isSelected} {...(isSelected ? { timeout: 600 } : {})}>
                  <ListItemIcon
                    className="absolute right-0  h-full w-1/3 justify-end items-center
                   bg-gradient-to-l from-zinc-800/80 from-50%  to-90%"
                  >
                    <IconButton
                      aria-label="check"
                      disabled={status === E_ACCEPTED || loadEdit}
                      onClick={() =>
                        handleEditStatus({
                          id: evidence.id,
                          status: E_ACCEPTED,
                        })
                      }
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      disabled={status === E_REJECTED || loadEdit}
                      onClick={() =>
                        handleEditStatus({
                          id: evidence.id,
                          status: E_REJECTED,
                        })
                      }
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </ListItemIcon>
                </Fade>
              </ListItem>
              <Divider component="li" />
            </>
          )
        })}
      </List>
      <Toaster position="bottom-left" richColors closeButton />
    </div>
  )
}
