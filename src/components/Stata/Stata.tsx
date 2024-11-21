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
      <h3 className={styles['statistic__title']}>{content.title}</h3>
      <ul className={styles['statistic__list']}>
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
            <p>passage:</p> <span>{content.gamePassage}</span>%
          </li>
        ) : (
          ''
        )}
      </ul>
    </div>
  )
}

export default Statistics
