import React from 'react'
import style from './SettingsButton.module.scss'

interface SettingsButtonProps {
  text: string
  backg: string
  type: 'submit' | 'reset' | 'button' | undefined
  onClickFunc?: any
}

const SettingsButton = ({
  text,
  backg,
  type,
  onClickFunc,
}: SettingsButtonProps) => {
  return (
    <button
      type={type}
      className={style['settings-btn']}
      style={{ backgroundColor: backg }}
      onClick={onClickFunc}
    >
      {text}
    </button>
  )
}

export default SettingsButton
