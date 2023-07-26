import { Grow } from '@mui/material'
interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}
export function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}
export default function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props

  return (
    <Grow in={value === index}>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        className="h-full"
      >
        {value === index && children}
      </div>
    </Grow>
  )
}
