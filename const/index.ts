interface MessageStatus {
  [key: string]: {
    [key: symbol]: {
      [key: number]: {
        message: string
        connectionStatus: string
      }
    }
  }
}
export const STATUS_SUCCESS = '201'
export const STATUS_ERROR = '404'
export const EVIDENCE = 'evidence'
export const PARTICIPANTS = 'participants'
export const SELECT = Symbol()
export const INSERT = Symbol()
export const UPDATE = Symbol()
export const NO_DATA = 0
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
  },
  [PARTICIPANTS]: {
    [INSERT]: {
      [STATUS_SUCCESS]: {
        message:
          'Participante agregado correctamente, puedes cerrar o seguir agregando',
        connectionStatus: 'success',
      },
      [STATUS_ERROR]: {
        message: 'Ocurrio un error al intentar crear un nuevo participante',
        connectionStatus: 'error',
      },
    },
    [SELECT]: {
      [NO_DATA]: {
        message:
          'No se encontraron participantes en la búsqueda realizada. revisa',
        connectionStatus: 'info',
      },
    },
  },
} as MessageStatus
