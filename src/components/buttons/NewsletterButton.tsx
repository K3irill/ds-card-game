import React, { ButtonHTMLAttributes } from 'react'
import styles from './NewsletterButton.module.scss'

interface NewLetterButtonProps {
  text: string
  type: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const NewsletterButton = ({ text, type, onClick }: NewLetterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles['newsletter-button']}`}
      type={type}
    >
      {text}
    </button>
  )
}

export default NewsletterButton
