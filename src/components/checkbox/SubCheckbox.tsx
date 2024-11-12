import React, { ChangeEventHandler, ReactNode } from 'react'
import styles from './SubCheckbox.module.scss'
interface SubCheckboxProps {
  text: ReactNode
  onChange: ChangeEventHandler<HTMLInputElement>
}
const SubCheckbox = ({ text, onChange }: SubCheckboxProps) => {
  return (
    <div>
      <input
        onChange={onChange}
        type="checkbox"
        name="subscribe-checkbox"
        id="subscribe-checkbox"
        className={styles['sub-checkbox']}
      />
      <label htmlFor="subscribe-checkbox">
        <p>{text}</p>
      </label>
    </div>
  )
}

export default SubCheckbox
