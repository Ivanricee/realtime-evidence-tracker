import Link from 'next/link'
import {
  Avatar,
  Badge,
  ListItemButton,
  ListItemText,
  Fade,
  IconButton,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { usePathname } from 'next/navigation'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { useState } from 'react'
import { ParticipantForm } from './ParticipantForm'
import { memo } from 'react'
import { DeleteParticipant } from './DeleteParticipant'

type Props = {
  participant: participantEvidenceView
}

const DELETE = Symbol()
const EDIT = Symbol()
const ParticipantMenuItemComponent = ({ participant }: Props) => {
  const pathname = usePathname()
  const [itemAction, setItemAction] = useState<symbol | null>(null)
  //---------------------------
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const closeActions = () => {
    setAnchorEl(null)
  }
  //--------------------------
  const openModal = ({ type }: { type: symbol }) => {
    setItemAction(type)
    closeActions()
  }

  const closeModal = () => {
    setItemAction(null)
  }
  const currentSetting: Record<symbol | string, React.ReactNode> = {
    [DELETE]: (
      <DeleteParticipant
        isOpen
        closeModal={closeModal}
        participant={participant}
      />
    ),
    [EDIT]: (
      <ParticipantForm
        isOpen
        closeModal={closeModal}
        participant={participant}
      />
    ),
  }
  const setting = currentSetting[itemAction || ''] ?? null

  const isSelected = pathname === `/dashboard/evidence/${participant.id}`

  return (
    <div key={participant.id} className="relative">
      <Link key={participant.id} href={`/dashboard/evidence/${participant.id}`}>
        <ListItemButton dense selected={isSelected}>
          <ListItemAvatar className="pr-4">
            <Badge badgeContent={participant.pendingevidence} color="primary">
              <Avatar
                alt="profile participant"
                src={participant.imgProfile!}
                sx={{ width: 56, height: 56 }}
              />
            </Badge>
          </ListItemAvatar>
          <ListItemText primary={participant.name} className="text-gray-400" />
        </ListItemButton>
      </Link>
      <Fade in={isSelected} {...(isSelected ? { timeout: 600 } : {})}>
        <div
          className="flex items-center absolute z-50 right-0 bottom-0 top-0 w-1/3 justify-end
          bg-gradient-to-l from-emerald-800/5 from-70% to-100%"
        >
          <IconButton
            size="large"
            id={`${participant.name}Edit`}
            aria-controls={open ? 'action-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className="text-emerald-100/50"
            aria-label="participant edition"
          >
            <MoreVertIcon fontSize="inherit" />
          </IconButton>
          <Menu
            id={`${participant.name}menu-action`}
            anchorEl={anchorEl}
            open={open}
            onClose={closeActions}
            MenuListProps={{
              'aria-labelledby': 'action-button',
            }}
          >
            <MenuItem
              aria-label="edit"
              onClick={() => openModal({ type: EDIT })}
            >
              <EditIcon />
            </MenuItem>
            <MenuItem
              aria-label="delete"
              onClick={() => openModal({ type: DELETE })}
            >
              <DeleteOutlineIcon aria-label="delete" />
            </MenuItem>
          </Menu>
        </div>
      </Fade>
      {setting}
    </div>
  )
}
ParticipantMenuItemComponent.displayName = 'ParticipantMenuItem'
export const ParticipantMenuItem = memo(
  ParticipantMenuItemComponent,
  (prevProps, nextProps) => prevProps.participant === nextProps.participant
)
