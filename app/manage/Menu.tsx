'use client'
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import QuizIcon from '@mui/icons-material/Quiz'
import PaidIcon from '@mui/icons-material/Paid'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
type Props = {
  expand: boolean
  children: React.ReactNode
}
export function Menu() {
  const pathname = usePathname()

  return (
    <Paper
      elevation={24}
      className={`w-full rounded-xl overflow-y-auto py-4 flex  items-center text-emerald-50/80
      bg-transparent bg-gradient-to-b from-zinc-800/50 from-35%  to-90%`}
    >
      <List component="nav" aria-label="main menu actions" className="w-full">
        <Link href="/manage/evidence">
          <ListItemButton selected={pathname === '/manage/evidence'}>
            <ListItemIcon className="min-w-0 pr-2 text-emerald-50/80">
              <FindInPageIcon />
            </ListItemIcon>
            <ListItemText primary="Evidencias" />
          </ListItemButton>
        </Link>
        <Link href="/manage/quiz">
          <ListItemButton selected={pathname === '/manage/quiz'}>
            <ListItemIcon className="min-w-0 pr-2 text-emerald-50/80">
              <QuizIcon />
            </ListItemIcon>
            <ListItemText primary="Preguntas" />
          </ListItemButton>
        </Link>
        <Link href="/manage/finance">
          <ListItemButton selected={pathname === '/manage/finance'}>
            <ListItemIcon className="min-w-0 pr-2 text-emerald-50/80">
              <PaidIcon />
            </ListItemIcon>
            <ListItemText primary="Bits/Subs" />
          </ListItemButton>
        </Link>
      </List>
    </Paper>
  )
}
