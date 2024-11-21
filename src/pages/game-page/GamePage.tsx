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
  GameContext,
} from '../../context/Context'
import useGame from '../../hooks/useGame'

const GamePage = () => {
  //контекст_____________________________________________________
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw new Error('AppContext must be used within an AppProvider')
  }
  const { settings, commonStatics, currentStatistics } = appContext

  const gameContext = useContext(GameContext)
  if (!gameContext) {
    throw new Error('GameContext must be used within an GameProvider')
  }
  const { isStarted, setIsStarted, setIsResetGame, setResetKey } = gameContext
  //______________________________________________________________

  const handleStartGame = () => {
    setIsStarted(true)
    console.log('Игра началась!')
  }
  const handleRestartGame = () => {
    setIsResetGame(true)
    setResetKey((prev) => prev + 1)
  }
  return (
    <div className={styles['game-page']}>
      <div className={styles['game-page__container']}>
        <div className={styles['game-page__content']}>
          <div className={styles['game-page__info']}>
            <Statistics content={commonStatics} />
            <div>
              <Timer time={settings?.timer} />
              <div>
                <button onClick={handleStartGame}>START</button>
                <button onClick={handleRestartGame}>RESTART</button>
              </div>
            </div>
            <Statistics content={currentStatistics} />
          </div>
          {isStarted ? (
            <GameBoard />
          ) : (
            <h2 style={{ textAlign: 'center' }}>Нажмите START чтобы начать!</h2>
          )}
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
