import React from 'react'
import styles from './ArticleButton.module.scss'

interface ArticleButtonProps {
  text?: string
}

const ArticleButton = ({ text }: ArticleButtonProps) => {
  return (
    <button className={`${styles.articleButton} `} type="button">
      {text}
    </button>
  )
}

export default ArticleButton
