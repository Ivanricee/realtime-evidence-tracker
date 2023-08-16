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

type Props = {
  children: React.ReactNode
}

export default function SecondaryMenu({ children }: Props) {
  const pathname = usePathname()

  const MENU_HREF: Record<MenuKey, any> = {
    [M_EVIDENCIAS]: { url: '/dashboard/evidence', icon: <FindInPageIcon /> },
    [M_PREGUNTAS]: { url: '/dashboard/quiz', icon: <QuizIcon /> },
    [M_BITSSUBS]: { url: '/dashboard/financial', icon: <PaidIcon /> },
  }
  let menuTabValue = 0
  if (pathname.startsWith('/dashboard/quiz')) menuTabValue = 1
  if (pathname.startsWith('/dashboard/financial')) menuTabValue = 2

  return (
    <section aria-label="Evidence" className="w-full h-full flex flex-col">
      <BottomNavigation
        className="w-full rounded-lg bg-opacity-5 bg-transparent bg-gradient-to-r from-violet-300/10 from-10% ... to-90%"
        showLabels
        value={menuTabValue}
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

      <div className="h-full">{children}</div>
    </section>
  )
}
