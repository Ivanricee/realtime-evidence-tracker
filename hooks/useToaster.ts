import { DATABASE_STATUS } from '@/const'
import type { Toaster } from '@/types'
import { useState } from 'react'
type Props = {
  feature: string
  action: symbol
  status: number
}

type UseToasterReturn = [
  Toaster,
  ({ feature, action, status }: Props) => void,
  () => void,
]
export function useToaster(): UseToasterReturn {
  const initialToaster = {
    message: '',
    connectionStatus: '',
    isOpen: false,
  }
  const [toaster, setToaster] = useState(initialToaster)

  const openToaster = ({ feature, action, status }: Props) => {
    const { message, connectionStatus } =
      DATABASE_STATUS[feature][action][status]
    setToaster({
      message,
      connectionStatus,
      isOpen: true,
    })
  }
  const resetToaster = () => {
    setToaster({ ...initialToaster })
  }
  return [toaster, openToaster, resetToaster]
}
