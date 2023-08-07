import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Switch from '@mui/material/Switch'
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined'
import SaveIcon from '@mui/icons-material/Save'
import PrintIcon from '@mui/icons-material/Print'
import ShareIcon from '@mui/icons-material/Share'
import { Button } from '@mui/material'

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}))

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
]

export default function CustomSpeedDial({ isHidden }: { isHidden: boolean }) {
  const [hidden, setHidden] = React.useState(false)

  const handleHiddenChange = () => {
    console.log('asda33')

    setHidden((prevHidden) => !prevHidden)
  }

  return (
    <div className="bg-orange-400 flex  z-40">
      <StyledSpeedDial
        ariaLabel="SpeedDial playground example"
        hidden={isHidden}
        icon={<SpeedDialIcon />}
        className="h-auto  z-50 bottom-0 right-0 "
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            className="bg-amber-500"
          />
        ))}
      </StyledSpeedDial>
    </div>
  )
}
