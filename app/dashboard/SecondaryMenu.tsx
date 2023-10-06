'use client'

import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import QuizIcon from '@mui/icons-material/Quiz'
import PaidIcon from '@mui/icons-material/Paid'

import {
  DASHBOARD_MENU,
  M_BITSSUBS,
  M_EVIDENCIAS,
  M_PREGUNTAS,
  type MenuKey,
} from '@/const'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Paper } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export default function SecondaryMenu({ children }: Props) {
  const pathname = usePathname()

  const MENU_HREF: Record<MenuKey, any> = {
    [M_EVIDENCIAS]: { url: '/dashboard/evidence', icon: <FindInPageIcon /> },
    [M_PREGUNTAS]: { url: '/dashboard/quiz', icon: <QuizIcon /> },
    [M_BITSSUBS]: { url: '/dashboard/finance', icon: <PaidIcon /> },
  }
  let menuTabValue = 0
  if (pathname.startsWith('/dashboard/quiz')) menuTabValue = 1
  if (pathname.startsWith('/dashboard/finance')) menuTabValue = 2

  return (
    <div className="w-full h-full flex flex-col">
      <Paper
        elevation={12}
        aria-label="secondary menu"
        className={`bg-transparent rounded-lg pb-4 mx-4 overflow-hidden min-h-[70px]
        bg-gradient-to-t from-zinc-800/20 from-10%  to-90%`}
      >
        <BottomNavigation
          showLabels
          value={menuTabValue}
          className="bg-transparent"
        >
          {DASHBOARD_MENU.map((menu, index) => {
            const { url, icon } = MENU_HREF[menu]
            return (
              <BottomNavigationAction
                key={menu}
                label={menu}
                href={url}
                component={Link}
                icon={icon}
                color="secondary"
              />
            )
          })}
        </BottomNavigation>
      </Paper>
      {children}
    </div>
  )
}
