import { Grow } from '@mui/material'
interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
  isVertical?: boolean
}
export function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}
export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, isVertical = false } = props
  const idVH = isVertical
    ? `vertical-tab-${index}`
    : `full-width-tabpanel-${index}`
  return (
    <Grow in={value === index}>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={idVH}
        aria-labelledby={`full-width-tab-${index}`}
        className="h-full w-full overflow-auto"
      >
        {value === index && children}
      </div>
    </Grow>
  )
}
