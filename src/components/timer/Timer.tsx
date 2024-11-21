import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Timer.module.scss'
import useTimer from '../../hooks/useTimer'
import { GameContext } from '../../context/Context'
interface TimerProps {
  time: number
}
const Timer = () => {
  const gameContext = useContext(GameContext)
  if (!gameContext) {
    throw new Error('GameContext must be used within an GameProvider')
  }
  const { seconds } = gameContext

  return (
    <div className={styles.timer}>
      <h3 className={styles.timer__title}>Time left:</h3>
      <p className={styles.timer__seconds}>
        <span>{seconds}</span>s
      </p>
    </div>
  )
}

export default Timer
