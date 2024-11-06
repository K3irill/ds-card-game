import React from 'react'
import styles from './NavButton.module.scss'

interface navButtonProps {
  buttonName: string
}

const navButton = ({ buttonName }: navButtonProps) => {
  return (
    <button
      className={`${styles.navButton} ${
        styles[buttonName.replace(/[ &]/g, '')]
      }`}
      style={{}}
      type="button"
    >
      {buttonName}
    </button>
  )
}

export default navButton
