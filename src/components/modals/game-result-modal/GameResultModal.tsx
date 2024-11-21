import React from 'react'
import styles from './GameResultModal.module.scss'
interface GameResultModalProps {
  textResult: string
  count: number
  nextBtn: any
  currentBtn: any
}
const GameResultModal = ({
  textResult,
  count,
  nextBtn,
  currentBtn,
}: GameResultModalProps) => {
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
