import React from 'react'
import styles from './TextInput.module.scss'

interface TextInputProps {
  value: number | string
  funOnChange: () => void
  placeholder: string
  setValue: React.Dispatch<React.SetStateAction<number | string>>
  type: 'number' | 'text' | undefined
}

const TextInput = ({
  value,
  funOnChange,
  placeholder,
  setValue,
  type,
}: TextInputProps) => {
  return (
    <div className={styles['text-input__wrapper']}>
      <input
        className={styles['text-input']}
        type={type}
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
