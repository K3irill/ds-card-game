import React, { useContext } from 'react'
import styles from './GameResultModal.module.scss'
import { AppContext } from '../../../context/Context'
interface GameResultModalProps {
  textResult: string
  count: number
  nextBtn: () => void
  currentBtn: () => void
}
const GameResultModal = ({
  textResult,
  count,
  nextBtn,
  currentBtn,
}: GameResultModalProps) => {
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw new Error('AppContext must be used within an AppProvider')
  }
  const { cardsBy } = appContext
  return (
    <div
      className={`${styles['game-result-modal']} ${
        styles['game-result-modal--' + textResult]
      }`}
    >
      <h2>{textResult}</h2>
      <p>
        <span>{count}</span>
        {textResult === 'success' ? 'guesses' : 'mistakes'}
      </p>
      <div>
        <button
          onClick={currentBtn}
          className={styles['game-result-modal__restart-btn']}
        >
          current images
        </button>
        <button
          disabled={cardsBy === 'custom'}
          onClick={nextBtn}
          className={styles['game-result-modal__restart-btn']}
        >
          new images
        </button>
      </div>
    </div>
  )
}

export default GameResultModal
