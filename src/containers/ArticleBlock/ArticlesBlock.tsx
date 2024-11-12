import React, { Children, ReactNode, useEffect } from 'react'
import styles from './ArticlesBlock.module.scss'
import { Section } from '../../interfaces/DataInterface'
import RunningLine from '../../components/running-line/RunningLine'
interface ArticleProps {
  children: ReactNode
  content: Section
}
function ArticlesBlock({ children, content }: ArticleProps) {
  return (
    <section className={styles['articles-block__wrapper']}>
      <div className={styles['articles-block']}>
        <div className={`${styles['articles-block__container']} __container`}>
          {children}
        </div>
      </div>
      <RunningLine ticker={content.ticker} label={'webinars'} />
    </section>
  )
}

export default ArticlesBlock
