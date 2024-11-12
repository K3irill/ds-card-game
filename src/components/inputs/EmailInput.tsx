import React, { ChangeEventHandler, useState, FocusEventHandler } from 'react'
import styles from './EmailInput.module.scss'

interface EmailInputProps {
  text?: string | undefined
  placeholder?: string | undefined
  value?: string | undefined
  onChange?: ChangeEventHandler | undefined
  onBlur?: ChangeEventHandler | undefined
  className?: string | undefined
  inputName?: string | undefined
  id?: string | undefined
  isValid?: Boolean | null
}

const EmailInput = (props: EmailInputProps) => {
  return (
    <>
      {props.text && <label htmlFor={props.id || ''}>{props.text}</label>}

      <input
        className={`${props.className} ${styles['email-input']} ${
          props.isValid === false
            ? styles['email-input--invalid']
            : props.isValid
            ? styles['email-input--valid']
            : ''
        }`}
        id={props.id}
        name={props.inputName}
        type="text"
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
      />
    </>
  )
}

export default EmailInput
