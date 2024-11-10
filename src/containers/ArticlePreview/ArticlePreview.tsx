import React, { Children, ReactNode, useEffect } from 'react'
import styles from './ArticlePreview.module.scss'
import RunningLine from '../../components/running-line/RunningLine'
import { Ticker } from '../../interfaces/DataInterface'
interface ArticlePreviewProps {
  children: ReactNode
  ticker: Ticker
}
function ArticlePreview({ children, ticker }: ArticlePreviewProps) {
  return (
    <div className={styles['article-preview__wrapper']}>
      <section className={styles['article-preview']}>
        <div className={`${styles['article-preview__container']} __container`}>
          {children}
        </div>
      </section>
      <RunningLine ticker={ticker} label={'articles'} />
    </div>
  )
}

export default ArticlePreview
