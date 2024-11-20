import React from 'react'
import styles from './GameResultModal.module.scss'
interface GameResultModalProps {
  textResult: string
  count: number
  resetBtn: any
}
const GameResultModal = ({
  textResult,
  count,
  resetBtn,
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
      <button
        onClick={resetBtn}
        className={styles['game-result-modal__restart-btn']}
      >
        next
      </button>
    </div>
  )
}

export default GameResultModal
