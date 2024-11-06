import React from 'react'
import styles from './IconButton.module.scss'

interface IconButtonProps {
  url: string
}

function IconButton({ url }: IconButtonProps) {
  return (
    <button type="button" className={styles.iconButton}>
      <img src={url} alt="click" />
    </button>
  )
}

export default IconButton
