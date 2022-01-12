import { useState, useEffect } from 'react'
import useSWR from 'swr'

import { random } from './string'

// observe defAtom state changes
const useAtom = (atom) => {
  const id = random()
  const [state, setState] = useState(atom.deref())

  useEffect(() => {
    // add a watcher with this id
    atom.addWatch(id, (_, _previous, current) => {
      setState(current)
    })

    return () => {
      // remove watcher when component unmounts
      atom.removeWatch(id)
    }
  }, [])

  // should we expose id?
  return state
}

// https://github.com/siddharthkp/use-timeout
const useTimeout = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setTimeout(tick, delay)
      return () => clearTimeout(id)
    }
  }, [delay])
}

// https://github.com/donavon/use-interval
const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const handler = (...args) => savedCallback.current(...args)

    if (delay !== null) {
      const id = setInterval(handler, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const useResource = (url) => {
  const { data, error } = useSWR(url)
  const isLoading = !data && !error
  return { data, error, isLoading }
}

export { useResource, useInterval, useTimeout, useAtom }
