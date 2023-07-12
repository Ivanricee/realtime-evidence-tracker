interface MessageStatus {
  [key: string]: {
    [key: number]: {
      message: string
      connectionStatus: string
    }
  }
}
export const STATUS_SUCCESS = '201'
export const STATUS_ERROR = '404'
export const EVIDENCE = 'evidence'
export const PARTICIPANTS = 'participants'
export const DATABASE_STATUS = {
  [EVIDENCE]: {
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
  [PARTICIPANTS]: {
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
} as MessageStatus
