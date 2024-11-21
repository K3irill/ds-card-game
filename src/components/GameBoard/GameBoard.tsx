import React, { useContext, useEffect, useState } from 'react'
import Card from '../Card/Card'
import styles from './GameBoard.module.scss'
import { CardItem } from '../../interfaces/card.interface'
import useFetch from '../../hooks/useFetch'
import { AppContext } from '../../context/Context'
import {
  incrementGamesCount,
  incrementGuessCount,
  incrementMistakesCount,
  updatePassage,
} from '../../context/contexHandlers'
import GameResultModal from '../modals/game-result-modal/GameResultModal'
import useGame from '../../hooks/useGame'

const GameBoard = () => {
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw new Error('AppContext must be used within an AppProvider')
  }
  const {
    settings,
    setSettings,
    commonStatics,
    setCommonStatics,
    setCurrentStatistics,
    currentStatistics,
  } = appContext

  const {
    cards,
    gameOver,
    gameResult,
    isLoading,
    setFlippedCards,
    handleCardClick,
    newGameWithNewImages,
    newGameWithCurrentImages,
    loadingText,
    setIsStarted,
  } = useGame()

  return (
    <div className={styles['game-board']}>
      {gameOver && (
        <GameResultModal
          nextBtn={newGameWithNewImages}
          currentBtn={newGameWithCurrentImages}
          textResult={gameResult}
          count={
            gameResult === 'success'
              ? currentStatistics.guessCount
              : currentStatistics.mistakesCount
          }
        />
      )}

      {isLoading ? (
        <div>{loadingText}</div>
      ) : (
        cards.map((card) => (
          <Card
            key={card.id}
            cardObject={card}
            handleCardClick={handleCardClick}
          />
        ))
      )}
    </div>
  )
}

export default GameBoard
