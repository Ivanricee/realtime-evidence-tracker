export type AlertToast = {
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
export type quizAnswers = {
  answer: string
  option: number
  isCorrect: boolean
}
export type quizData = {
  question: string
  answers: quizAnswers[]
  participants: Participants[]
  time: number
}

export type financeDataType = {
  from: number
  to: number[]
  bits: number
  subs: number
}
