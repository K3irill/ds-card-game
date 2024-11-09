import React, { Children, ReactNode, useEffect } from 'react'
import styles from './ArticlesBlock.module.scss'

interface ArticleProps {
  children: ReactNode
}
function ArticlesBlock({ children }: ArticleProps) {
  return (
    <>
      <section className={styles['articles-block']}>
        <div className={`${styles['articles-block__container']} __container`}>
          {children}
        </div>
      </section>
    </>
  )
}

export default ArticlesBlock
