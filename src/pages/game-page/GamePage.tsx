import React, { useContext, useEffect, useState } from 'react'
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
  const { settings, commonStatics, currentStatistics, resetStats } = appContext

  const gameContext = useContext(GameContext)
  if (!gameContext) {
    throw new Error('GameContext must be used within an GameProvider')
  }
  const { isStarted, setIsStarted, setIsResetGame, setResetKey, resetTimer } =
    gameContext
  //______________________________________________________________
  const [startBtnText, setStartBtnText] = useState<string>('START')
  const handleStartGame = () => {
    setIsStarted((prev) => {
      const newState = !prev
      if (!newState) {
        resetTimer(settings.timer)
        resetStats()
      }
      return newState
    })
    setStartBtnText((prev) => (prev === 'START' ? 'STOP' : 'START'))
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
            <div className={styles['game-page__activities']}>
              <Timer />
              <div className={styles['game-page__buttons']}>
                <button
                  className={styles['game-page__btn']}
                  onClick={handleStartGame}
                >
                  {startBtnText}
                </button>
                <button
                  className={styles['game-page__btn']}
                  onClick={handleRestartGame}
                >
                  RESTART
                </button>
              </div>
            </div>
            <Statistics
              content={currentStatistics}
              maxMistakes={settings.maxMistakes}
            />
          </div>
          {isStarted ? (
            <GameBoard />
          ) : (
            <h2 className={styles['game-page__greeting']}>
              Нажмите START чтобы начать!
            </h2>
          )}
        </div>
      </div>
    </div>
  )
}

export default GamePage
