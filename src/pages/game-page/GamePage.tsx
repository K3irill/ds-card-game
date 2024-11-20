import React, { useContext, useEffect } from 'react'
import GameBoard from '../../components/GameBoard/GameBoard'
import Statistics from '../../components/Stata/Stata'
import styles from './GamePage.module.scss'
import Timer from '../../components/timer/Timer'
import {
  GameSettingsContext,
  CommonStatisticsContext,
  CurrentStatisticsContext,
  AppContext,
} from '../../context/Context'

const GamePage = () => {
  // контекст ----------------------------------------
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw new Error('AppContext must be used within an AppProvider')
  }

  const {
    settings,
    setSettings,
    commonStatics,
    setCommonStatics,
    currentStatistics,
  } = appContext

  useEffect(() => {
    console.log(settings?.timer)
  }, [])

  return (
    <div className={styles['game-page']}>
      <div className={styles['game-page__container']}>
        <div className={styles['game-page__content']}>
          <div className={styles['game-page__info']}>
            <Statistics content={commonStatics} />
            <div>
              <Timer time={settings?.timer} />
              <div>
                <button>START</button>
                <button>RESET</button>
              </div>
            </div>
            <Statistics content={currentStatistics} />
          </div>
          <GameBoard />
        </div>
      </div>
    </div>
  )
}

export default GamePage

// const changeTimer = () => {
//   setSettings((prev) => ({ ...prev, timer: 60 }))
// }
// useEffect(() => {
//   console.log('Settings:', settings)
// }, [settings])
