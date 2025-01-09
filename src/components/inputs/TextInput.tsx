import React from 'react'
import styles from './TextInput.module.scss'

interface TextInputProps<T extends string | number> {
  value: T
  funOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  setValue: React.Dispatch<React.SetStateAction<T>>
  type: 'number' | 'text' | undefined
}

const TextInput = <T extends string | number>({
  value,
  funOnChange,
  placeholder,
  setValue,
  type,
}: TextInputProps<T>) => {
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
        onClick={() => setValue('' as T)}
        className={styles['text-input__clear-btn']}
      >
        X
      </button>
    </div>
  )
}

export default TextInput
