import { useEffect, useState, useRef } from 'react'
import {
  EMPTY_LIST,
  EVIDENCE,
  E_ACCEPTED,
  E_PENDING,
  E_REJECTED,
  SELECT,
} from '@/const'
import { editEvidence } from '@/app/actions/getEvidence'
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
import { Toaster, toast } from 'sonner'
import { AlertToast } from '@/components/AlertToast'
import { useAlertToast } from '@/hooks/useAlertToast'

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
  const filterEvidence = evidences.filter(
    (evidence) => evidence.status === status
  )
  const initSelectedItms = useRef({
    id: filterEvidence[0]?.id || 0,
    url: filterEvidence[0]?.url || '',
  })
  const [selectedItm, setSelectedItm] = useState(initSelectedItms.current)
  const [loadEdit, setLoadEdit] = useState(false)
  const [alertToast, openAlertToast, resetAlertToast] = useAlertToast()
  const handleEditStatusClick = async ({ id, status }: editProps) => {
    setLoadEdit(true)
    const res = await editEvidence({ id, status })
    if (res === 204) {
      let statusMsg = 'Evidencia aceptada'
      if (status === E_REJECTED) statusMsg = 'Evidencia rechazada.'
      toast.success(statusMsg)
    } else {
      toast.error('Algo salio mal, intenta mas terde')
    }
    if (filterEvidence.length !== 0) {
      setSelectedItm((prevItem) => {
        let index = 0
        if (prevItem.id === filterEvidence[0]?.id) index = 1

        const initItemId = filterEvidence[index]?.id
        const initItemUrl = filterEvidence[index]?.url || ''
        handleViewer(initItemId, initItemUrl)
        return {
          id: initItemId,
          url: initItemUrl,
        }
      })
    }
    setLoadEdit(false)
  }
  const handleListItemClick = (
    id: number,
    url: string,
    event?: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setSelectedItm({ id, url })
    handleViewer(id, url)
  }
  useEffect(() => {
    handleViewer(selectedItm.id, selectedItm.url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (filterEvidence.length === 0) {
      openAlertToast({
        feature: EVIDENCE,
        action: SELECT,
        status: EMPTY_LIST,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evidences])
  const title: Record<string, string> = {
    [E_PENDING]: 'Evidencias Pendientes',
    [E_ACCEPTED]: 'Evidencias Aceptadas',
    [E_REJECTED]: 'Evidencias Rechazadas',
    add: 'Agregar Evidencias',
  }

  if (filterEvidence.length === 0)
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
        component="nav"
        aria-label="secondary mailbox folder"
        className="w-full pb-4"
      >
        {filterEvidence.map((evidence) => {
          const isSelected = selectedItm.id === evidence.id
          return (
            <div key={evidence.id}>
              <ListItem disablePadding className="rounded-md overflow-hidden">
                <ListItemButton
                  selected={isSelected}
                  onClick={(event) =>
                    handleListItemClick(evidence.id, evidence.url || '', event)
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
                        handleEditStatusClick({
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
                        handleEditStatusClick({
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
            </div>
          )
        })}
      </List>
      <Toaster position="bottom-left" richColors closeButton />
    </div>
  )
}
