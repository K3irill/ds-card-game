import React from 'react'
import styles from './Stata.module.scss'

type Content = {
  title: string
  gamesCount: number
  guessCount: number
  mistakesCount: number
  gamePassage?: number
}
interface StatisticsProps {
  content: Content
}

const Statistics = ({ content }: StatisticsProps) => {
  return (
    <div className={styles['statistic']}>
      <h3>{content.title}</h3>
      <ul>
        <li>
          <p>games played:</p>
          <span>{content.gamesCount}</span>
        </li>
        <li>
          <p>guess count:</p>
          <span>{content.guessCount}</span>
        </li>
        <li>
          <p>mistakes count:</p>
          <span>{content.mistakesCount}</span>
        </li>
        {content.gamePassage >= 0 ? (
          <li>
            passage: <span>{content.gamePassage}</span>%
          </li>
        ) : (
          ''
        )}
      </ul>
    </div>
  )
}

export default Statistics
