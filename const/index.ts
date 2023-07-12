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
export const CLIPS = 'clips'
export const PARTICIPANTS = 'participants'
export const DATABASE_STATUS = {
  [CLIPS]: {
    [STATUS_SUCCESS]: {
      message: 'Clip agregado correctamente, puedes revisarlo en ',
      connectionStatus: 'success',
    },
    [STATUS_ERROR]: {
      message:
        'Ocurrio un error al intentar agregar el clip en la base de datos',
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
