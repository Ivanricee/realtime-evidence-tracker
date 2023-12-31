import type { MessageStatus } from '@/types'

// -- supabase
export const STATUS_SUCCESS = '201'
export const STATUS_ERROR = '404'
export const EVIDENCE = 'evidence'
export const QUIZ = 'quiz'
export const PARTICIPANTS = 'participants'
export const FINANCE = 'finance'
export const SELECT = Symbol()
export const INSERT = Symbol()
export const UPDATE = Symbol()
export const NO_DATA = 0
export const EMPTY_LIST = 200
export const DATABASE_STATUS = {
  [EVIDENCE]: {
    [INSERT]: {
      [STATUS_SUCCESS]: {
        message: 'Evidencia agregada correctamente, puedes revisarlo en ',
        connectionStatus: 'success',
      },
      [STATUS_ERROR]: {
        message:
          'Ocurrio un error al intentar agregar la evidencia en la base de datos',
        connectionStatus: 'error',
      },
    },
    [SELECT]: {
      [NO_DATA]: {
        message: 'Sin evidencias recientes, agrega una evidencia ',
        connectionStatus: 'info',
      },
      [EMPTY_LIST]: {
        message: 'Lista sin ',
        connectionStatus: 'info',
      },
      [STATUS_ERROR]: {
        message:
          'Ocurrio un error al intentar obtener evidencias, intenta mas tarde',
        connectionStatus: 'error',
      },
    },
  },
  [PARTICIPANTS]: {
    [SELECT]: {
      [NO_DATA]: {
        message:
          'No se encontraron participantes en la búsqueda realizada. revisa',
        connectionStatus: 'info',
      },
      [STATUS_ERROR]: {
        message:
          'Ocurrio un error al obtener los participantes, intenta mas tarde',
        connectionStatus: 'error',
      },
    },
  },
  [FINANCE]: {
    [SELECT]: {
      [NO_DATA]: {
        message: 'No se encontraron deudas en la búsqueda realizada',
        connectionStatus: 'info',
      },
      [STATUS_ERROR]: {
        message: 'Ocurrio un error al obtener deudas, intenta mas tarde',
        connectionStatus: 'error',
      },
    },
  },
} as MessageStatus

//-- menu dasboard

export const M_EVIDENCIAS = 'Evidencias'
export const M_PREGUNTAS = 'Preguntas'
export const M_BITSSUBS = 'Bits & Subscripciones'
export type MenuKey =
  | typeof M_EVIDENCIAS
  | typeof M_PREGUNTAS
  | typeof M_BITSSUBS
export const DASHBOARD_MENU: MenuKey[] = [M_EVIDENCIAS, M_PREGUNTAS, M_BITSSUBS]

//-- Evidence status
export const E_PENDING = 'pending'
export const E_ACCEPTED = 'accepted'
export const E_REJECTED = 'rejected'
export const E_FULFILLED = 'fulfilled'

//finance

export const F_PENDING = 'pending'
export const F_INREVIEW = 'inReview'
export const F_COMPLETED = 'completed'
