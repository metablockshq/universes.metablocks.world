import { useEffect } from 'react'

import { random } from './string'

export const useAtom = (atom) => {
  const id = random()
  const [state, setState] = atom.deref()

  useEffect(() => {
    atom.addWatch(id, (_, _previous, current) => {
      setState(current)
    })

    return () => {
      atom.removeWatch(id)
    }
  }, [])

  return state
}
