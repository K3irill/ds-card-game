import React, { useContext } from 'react'
import Card from '../Card/Card'
import styles from './GameBoard.module.scss'
import GameResultModal from '../modals/game-result-modal/GameResultModal'
import useGame from '../../hooks/useGame'
import { AppContext } from '../../context/Context'

const GameBoard = () => {
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw new Error('AppContext must be used within an AppProvider')
  }
  const { currentStatistics, cardsBy } = appContext

  const {
    cards,
    gameOver,
    gameResult,
    isLoading,
    handleCardClick,
    newGameWithNewImages,
    newGameWithCurrentImages,
    loadingText,
    error,
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

      {cardsBy === 'api' && isLoading ? (
        <div className={styles['game-board__loading-container']}>
          <div className={styles['game-board__loading-img']}>
            <span>{loadingText || 'Loading...'}</span>
            <img src="/img/moroz.gif" alt="Loading animation" />
          </div>
        </div>
      ) : (
        <>
          {error && <p className={styles['game-board__error']}>{error}</p>}

          {cards.map((card) => (
            <Card
              key={card.id}
              cardObject={card}
              handleCardClick={handleCardClick}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default GameBoard
