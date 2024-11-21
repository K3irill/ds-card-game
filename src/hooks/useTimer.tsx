import { useState, useRef, useEffect } from 'react'

const useTimer = (initialTime: number) => {
  const [seconds, setSeconds] = useState<number>(initialTime)
  const timerRef = useRef<number | null>(null)

  const startTimer = (newTime?: number) => {
    if (timerRef.current) return
    if (newTime !== undefined) {
      setSeconds(newTime)
    }
    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          timerRef.current = null
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const resetTimer = (newTime: number) => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setSeconds(newTime)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return { seconds, startTimer, resetTimer, stopTimer }
}

export default useTimer
