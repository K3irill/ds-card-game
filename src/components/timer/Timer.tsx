import React, { useState } from 'react'
import styles from './Timer.module.scss'

const Timer = ({ time }) => {
  const [seconds, setSeconds] = useState<number>(time)

  return (
    <div>
      <h3>Time left:</h3>
      <p>
        <span>{seconds}</span>s
      </p>
    </div>
  )
}

export default Timer
