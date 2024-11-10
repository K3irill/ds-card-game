import React from 'react'
import styles from './WebButton.module.scss'

interface webButtonProps {
  text: string
}

const WebButton = ({ text }: webButtonProps) => {
  return (
    <button className={`${styles.webButton} `} type="button">
      {text}
    </button>
  )
}

export default WebButton
