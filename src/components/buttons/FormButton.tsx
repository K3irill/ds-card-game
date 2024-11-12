import React, { ButtonHTMLAttributes } from 'react'
import styles from './FormButton.module.scss'

interface FormButtonProps {
  text: string
  type: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const FormButton = ({ text, type, onClick }: FormButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles['form-button']}`}
      type={type}
    >
      {text}
    </button>
  )
}

export default FormButton
