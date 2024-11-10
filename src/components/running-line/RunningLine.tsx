import React from 'react'
import styles from './RunningLine.module.scss'
import { Ticker } from '../../interfaces/DataInterface'

interface RunningLineProps {
  ticker: Ticker
  label: string
  optional?: string | undefined
}

const RunningLine = ({ ticker, label, optional }: RunningLineProps) => {
  const background = {
    backgroundColor: ticker.color,
  }

  return (
    <div
      className={`${styles['running-line']} ${
        styles['running-line--' + label]
      } ${optional}`}
      style={background}
    >
      <div className={styles['running-line__content']}>
        {Array.from({ length: 2 }).map((_, repeatIndex) => (
          <React.Fragment key={repeatIndex}>
            {Array.from({ length: 30 }).map((f, index) => (
              <h2
                key={`${repeatIndex}-${index}`}
                className={styles['running-line__text']}
              >
                {ticker.text}
                <img src="/icons/star.svg" alt="Star" />
              </h2>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default RunningLine
