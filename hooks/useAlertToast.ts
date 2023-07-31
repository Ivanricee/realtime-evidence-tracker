import { DATABASE_STATUS } from '@/const'
import type { AlertToast } from '@/types'
import { useState } from 'react'
type Props = {
  feature: string
  action: symbol
  status: number
}

type UseAlertToastReturn = [
  AlertToast,
  ({ feature, action, status }: Props) => void,
  () => void,
]
export function useAlertToast(): UseAlertToastReturn {
  const initialAlertToast = {
    message: '',
    connectionStatus: '',
    isOpen: false,
  }
  const [alertToast, setAlertToast] = useState(initialAlertToast)

  const openAlertToast = ({ feature, action, status }: Props) => {
    const { message, connectionStatus } =
      DATABASE_STATUS[feature][action][status]
    setAlertToast({
      message,
      connectionStatus,
      isOpen: true,
    })
  }
  const resetAlertToast = () => {
    setAlertToast({ ...initialAlertToast })
  }
  return [alertToast, openAlertToast, resetAlertToast]
}
