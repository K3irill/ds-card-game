import React from 'react'
import styles from './TextInput.module.scss'

interface TextInputProps {
  value: number
  funOnChange: any
  placeholder: string
  setValue: any
}

const TextInput = ({
  value,
  funOnChange,
  placeholder,
  setValue,
}: TextInputProps) => {
  return (
    <div className={styles['text-input__wrapper']}>
      <input
        className={styles['text-input']}
        type="number"
        value={value}
        onChange={funOnChange}
        placeholder={placeholder}
      />
      <button
        onClick={() => setValue('')}
        className={styles['text-input__clear-btn']}
      >
        X
      </button>
    </div>
  )
}

export default TextInput
