import React, { Children, ReactNode, useEffect } from 'react'
import styles from './ArticlePreview.module.scss'

interface ArticlePreviewProps {
  children: ReactNode
}
function ArticlePreview({ children }: ArticlePreviewProps) {
  return (
    <section className={styles['article-preview']}>
      <div className={`${styles['article-preview__container']} __container`}>
        {children}
      </div>
    </section>
  )
}

export default ArticlePreview
