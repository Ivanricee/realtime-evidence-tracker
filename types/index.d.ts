export type Toaster = {
  message: string
  connectionStatus: string
  isOpen: boolean
}
export type MessageStatus = {
  [key: string]: {
    [key: symbol]: {
      [key: number]: {
        message: string
        connectionStatus: string
      }
    }
  }
}
