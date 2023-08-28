import { useState } from 'react'
type Actions<T, K extends keyof T> = {
  add: (newState: T) => void
  remove: (idProp: K, id: T[K]) => void
  clear: () => void
}
//const [selectedParticipants, { add, remove, clear }] = useArrayState<Participants,'id'>([])
export const useArrayState = <T, K extends keyof T>(
  initialState: T[] = []
): [T[], Actions<T, K>] => {
  const [state, setState] = useState(initialState)

  const add = (newState: T) => {
    setState((currentState) => [...currentState, newState])
  }
  // remove('id', itmSelected.id)
  const remove = (idProp: K, id: T[K]) => {
    setState((currentState) =>
      currentState.filter((itemState) => itemState[idProp] !== id)
    )
  }
  const clear = () => setState([])
  return [state, { add, remove, clear }]
}
